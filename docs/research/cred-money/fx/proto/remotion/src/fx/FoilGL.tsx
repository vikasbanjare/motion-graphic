/**
 * <FoilGL>: WebGL thin-film foil over an engraved object (base image rgb + mask alpha).
 * Deterministic per frame: all uniforms derive from props (drive `view` from object/camera motion).
 * Render with `--gl=swangle` (CPU) or `--gl=angle` (GPU) so headless Chrome has WebGL.
 */
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { continueRender, delayRender } from "remotion";
import { FOIL_FRAG } from "./foilShader";

export type FoilParams = {
  view: [number, number];      // radians-ish tilt; measured: colour shifts only with motion
  center?: [number, number];   // uv origin of radial thickness term
  thick0?: number; thick1?: number; noiseAmp?: number; noiseFreq?: number;
  ribs?: number; ribDepth?: number; ior?: number;
  palette?: number;            // 0 physical, 1 measured ramp
  sat?: number; val?: number; alpha?: number; bump?: number;
  levels?: [number, number, number]; cycles?: number; viewGain?: number;
};
export type RampStop = { hue: number; share: number };

const VERT = `attribute vec2 p; varying vec2 vUv; void main(){ vUv = vec2(p.x*0.5+0.5, 0.5-p.y*0.5); gl_Position = vec4(p,0.,1.); }`;

/** Build a cyclic 256x1 hue ramp; each stop occupies a length proportional to its measured share. */
export const buildRamp = (stops: RampStop[]): Uint8Array => {
  const out = new Uint8Array(256 * 4);
  const total = stops.reduce((s, x) => s + x.share, 0);
  const centers: number[] = []; let acc = 0;
  for (const s of stops) { centers.push((acc + s.share / 2) / total); acc += s.share; }
  const hsv2rgb = (h: number) => {
    const f = (n: number) => { const k = (n + h / 60) % 6; return 1 - Math.max(0, Math.min(k, 4 - k, 1)); };
    return [f(5), f(3), f(1)];
  };
  for (let i = 0; i < 256; i++) {
    const t = i / 256;
    const n = stops.length;
    let a = n - 1; for (let j = 0; j < n; j++) if (centers[j] <= t) a = j;
    const before = t < centers[0];                       // wrap segment: last stop -> first stop
    const b = (a + 1) % n;
    const ca = before ? centers[n - 1] - 1 : centers[a];
    const cb = b === 0 ? centers[0] + (before ? 0 : 1) : centers[b];
    const u = Math.min(1, Math.max(0, (t - ca) / Math.max(cb - ca, 1e-6)));
    let ha = stops[a].hue, hb = stops[b].hue; let dh = ((hb - ha + 540) % 360) - 180; // shortest arc
    const h = (ha + dh * u + 360) % 360;
    const [r, g, bl] = hsv2rgb(h);
    out.set([r * 255, g * 255, bl * 255, 255], i * 4);
  }
  return out;
};

export const FoilGL: React.FC<{
  width: number; height: number; baseSrc?: string; maskSrc?: string; ramp: RampStop[]; params: FoilParams; style?: React.CSSProperties;
}> = ({ width, height, baseSrc, maskSrc, ramp, params, style }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const glState = useRef<{ gl: WebGLRenderingContext; prog: WebGLProgram } | null>(null);
  const [baseReady, setBaseReady] = useState(!baseSrc);
  const [handle] = useState(() => (baseSrc ? delayRender("foil base") : null));

  // one-time GL setup + base texture (rgb from baseSrc, alpha from maskSrc)
  useEffect(() => {
    const c = ref.current!; const gl = c.getContext("webgl", { premultipliedAlpha: true, preserveDrawingBuffer: true, antialias: true })!;
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader"); return s; };
    const prog = gl.createProgram()!; gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FOIL_FRAG)); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    // ramp texture on unit 1
    const rt = gl.createTexture(); gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, rt);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, buildRamp(ramp));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(prog, "uRamp"), 1);
    gl.uniform1i(gl.getUniformLocation(prog, "uBase"), 0);
    glState.current = { gl, prog };
    if (baseSrc) {
      const load = (src: string) => new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
      Promise.all([load(baseSrc), maskSrc ? load(maskSrc) : Promise.resolve(null)]).then(([b, m]) => {
        const cv = document.createElement("canvas"); cv.width = width; cv.height = height; const cx = cv.getContext("2d")!;
        cx.drawImage(b, 0, 0, width, height); const img = cx.getImageData(0, 0, width, height);
        if (m) { cx.clearRect(0, 0, width, height); cx.drawImage(m, 0, 0, width, height); const md = cx.getImageData(0, 0, width, height).data; for (let i = 0; i < img.data.length; i += 4) img.data[i + 3] = md[i + 3]; }
        const t = gl.createTexture(); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, t);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        setBaseReady(true); if (handle !== null) continueRender(handle);
      }).catch((e) => { console.error(e); if (handle !== null) continueRender(handle); });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // draw every frame (synchronous; Remotion screenshots after layout effects)
  useLayoutEffect(() => {
    const s = glState.current; if (!s || !baseReady) return;
    const { gl, prog } = s; const u = (n: string) => gl.getUniformLocation(prog, n);
    const p = { center: [0.5, 0.5], thick0: 320, thick1: 560, noiseAmp: 90, noiseFreq: 3, ribs: 0, ribDepth: 0.35, ior: 1.38, palette: 1, sat: 0.85, val: 0.6, alpha: 0.85, bump: 0.6, levels: [0.12, 0.8, 1.6] as [number, number, number], cycles: 1.25, viewGain: 0.9, ...params };
    gl.viewport(0, 0, width, height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(u("uRes"), width, height); gl.uniform1f(u("uUseBase"), baseSrc ? 1 : 0);
    gl.uniform2f(u("uView"), p.view[0], p.view[1]); gl.uniform2f(u("uCenter"), p.center![0], p.center![1]);
    gl.uniform1f(u("uThick0"), p.thick0!); gl.uniform1f(u("uThick1"), p.thick1!); gl.uniform1f(u("uNoiseAmp"), p.noiseAmp!); gl.uniform1f(u("uNoiseFreq"), p.noiseFreq!);
    gl.uniform1f(u("uRibs"), p.ribs!); gl.uniform1f(u("uRibDepth"), p.ribDepth!); gl.uniform1f(u("uIOR"), p.ior!); gl.uniform1f(u("uPalette"), p.palette!);
    gl.uniform1f(u("uSat"), p.sat!); gl.uniform1f(u("uVal"), p.val!); gl.uniform1f(u("uAlpha"), p.alpha!); gl.uniform1f(u("uBump"), p.bump!);
    gl.uniform3f(u("uLevels"), p.levels![0], p.levels![1], p.levels![2]); gl.uniform1f(u("uCycles"), p.cycles!); gl.uniform1f(u("uViewGain"), p.viewGain!);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  });
  return <canvas ref={ref} width={width} height={height} style={{ width, height, ...style }} />;
};

/** Measured palettes (hue centre of each 30-degree bin, share of foil pixels). */
export const RAMP_PEARL: RampStop[] = [ // shell + turtle, blue-dominant with warm accents
  { hue: 195, share: 0.2 }, { hue: 225, share: 0.52 }, { hue: 255, share: 0.16 }, { hue: 300, share: 0.02 },
  { hue: 15, share: 0.033 }, { hue: 45, share: 0.048 }, { hue: 165, share: 0.028 },
];
export const RAMP_SHELL: RampStop[] = [ // scallop shell (t=41.75-42.25 s): blue core + warm/teal ring
  { hue: 195, share: 0.24 }, { hue: 225, share: 0.304 }, { hue: 255, share: 0.096 }, { hue: 345, share: 0.016 },
  { hue: 15, share: 0.109 }, { hue: 45, share: 0.149 }, { hue: 165, share: 0.078 },
];
/** Presets fitted against the reference's measured hue histogram + chroma|luma curve (see compare_foil.py). */
export const FOIL_PRESETS = {
  pearl: { sat: 0.82, val: 0.55, alpha: 1.0, levels: [0.2, 0.85, 1.4] as [number, number, number], cycles: 1.25, viewGain: 0.9 },
  shell: { sat: 0.66, val: 0.5, alpha: 0.95, levels: [0.15, 0.75, 1.5] as [number, number, number], cycles: 2.2, viewGain: 1.1, ribs: 24, ribDepth: 0.35 },
};
export const RAMP_CARD: RampStop[] = [ // bank-card glints, warm-dominant
  { hue: 15, share: 0.475 }, { hue: 45, share: 0.114 }, { hue: 165, share: 0.028 }, { hue: 195, share: 0.108 },
  { hue: 225, share: 0.105 }, { hue: 285, share: 0.045 }, { hue: 315, share: 0.047 }, { hue: 345, share: 0.079 },
];
