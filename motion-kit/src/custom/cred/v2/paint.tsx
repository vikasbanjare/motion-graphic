import React, { useLayoutEffect, useMemo, useRef } from "react";
import { AbsoluteFill, continueRender, delayRender, useVideoConfig } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { contours } from "d3-contour";
import * as brush from "p5.brush/standalone";

/**
 * Painted pass (v3). The 3D world renders a flat id pass of every object wrapped in <Paint>; d3-contour traces each
 * object's mask into polygons; p5.brush paints a watercolour wash and a pencil silhouette per object on a 2D layer that
 * sits UNDER the engraved render (the engraved World is composited with multiply over it).
 *
 * Determinism: the brush is re-seeded per object id every frame, so a frame always paints the same picture.
 * Synchronisation: the probe lives inside the ThreeCanvas root, the brush layer outside it; they meet on a per-frame
 * promise (the "bus"), and the brush layer holds the frame with delayRender until its masks arrive.
 */

export type Region = { id: number; wash: string; ink: string; rings: [number, number][][] };

export type PaintBus = { set: (f: number, r: Region[]) => void; get: (f: number) => Promise<Region[]> };

export const makeBus = (): PaintBus => {
  const slots = new Map<number, { p: Promise<Region[]>; res: (r: Region[]) => void }>();
  const slot = (f: number) => {
    let s = slots.get(f);
    if (!s) {
      let res!: (r: Region[]) => void;
      const p = new Promise<Region[]>((r) => (res = r));
      s = { p, res };
      slots.set(f, s);
      // keep the map small: a render walks forward, a still asks for one frame
      for (const k of slots.keys()) if (Math.abs(k - f) > 48) slots.delete(k);
    }
    return s;
  };
  return { set: (f, r) => slot(f).res(r), get: (f) => slot(f).p };
};

/** Marks a group as one painted object: its silhouette gets a wash in `wash` and a pencil line in `ink`. */
export const Paint: React.FC<{ id: number; wash: string; ink: string; children: React.ReactNode }> = ({ id, wash, ink, children }) => (
  <group userData={{ paint: { id, wash, ink } }}>{children}</group>
);

const MW = 480, MH = 270; // mask resolution (1/4 of 1080p)

/** Inside a World: renders the id pass for frame `f` and publishes the traced regions on the bus. */
export const MaskProbe: React.FC<{ bus: PaintBus; f: number }> = ({ bus, f }) => {
  const { gl, scene, camera } = useThree();
  const rt = useMemo(() => new THREE.WebGLRenderTarget(MW, MH, { depthBuffer: true }), []);
  const mats = useMemo(() => new Map<number, THREE.MeshBasicMaterial>(), []);
  useLayoutEffect(() => {
    const info = new Map<number, { wash: string; ink: string }>();
    const swaps: [THREE.Mesh, THREE.Material | THREE.Material[]][] = [];
    const occluder = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (!m.isMesh) return;
      let p: THREE.Object3D | null = m;
      let tag: { id: number; wash: string; ink: string } | undefined;
      while (p && !tag) {
        tag = p.userData?.paint;
        p = p.parent;
      }
      let mat = occluder;
      if (tag) {
        info.set(tag.id, { wash: tag.wash, ink: tag.ink });
        let mm = mats.get(tag.id);
        if (!mm) {
          mm = new THREE.MeshBasicMaterial({ color: new THREE.Color(tag.id / 255, 0, 0), side: THREE.DoubleSide });
          mats.set(tag.id, mm);
        }
        mat = mm;
      }
      swaps.push([m, m.material]);
      m.material = mat;
    });
    const prevClear = new THREE.Color();
    gl.getClearColor(prevClear);
    const prevAlpha = gl.getClearAlpha();
    gl.setRenderTarget(rt);
    gl.setClearColor(0x000000, 1);
    gl.clear(true, true, true);
    gl.render(scene, camera);
    const px = new Uint8Array(MW * MH * 4);
    gl.readRenderTargetPixels(rt, 0, 0, MW, MH, px);
    gl.setRenderTarget(null);
    gl.setClearColor(prevClear, prevAlpha);
    for (const [m, mat] of swaps) m.material = mat;
    occluder.dispose();
    // per id: binary grid (flip y: GL rows run bottom-up) -> contours at 0.5
    const regions: Region[] = [];
    const sx = 1920 / MW, sy = 1080 / MH;
    for (const [id, c] of info) {
      const grid = new Float64Array(MW * MH);
      let n = 0;
      for (let y = 0; y < MH; y++)
        for (let x = 0; x < MW; x++) {
          const v = px[((MH - 1 - y) * MW + x) * 4] === id ? 1 : 0;
          grid[y * MW + x] = v;
          n += v;
        }
      if (n < 40) continue;
      const mp = contours().size([MW, MH]).thresholds([0.5])(Array.from(grid))[0];
      const rings: [number, number][][] = [];
      for (const poly of mp.coordinates) {
        const outer = poly[0];
        if (outer.length < 8) continue;
        rings.push(outer.map(([x, y]) => [x * sx, y * sy] as [number, number]));
      }
      if (rings.length) regions.push({ id, ...c, rings });
    }
    regions.sort((a, b) => a.id - b.id);
    bus.set(f, regions);
  });
  return null;
};

// ---- the brush layer ------------------------------------------------------------------------------------------------

let scaled = false;
/** Chaikin smoothing + decimation: grid-traced rings are stair-stepped. */
const smooth = (r: [number, number][], keep = 3): [number, number][] => {
  const d = r.filter((_, i) => i % keep === 0);
  const out: [number, number][] = [];
  for (let i = 0; i < d.length; i++) {
    const a = d[i], b = d[(i + 1) % d.length];
    out.push([a[0] * 0.75 + b[0] * 0.25, a[1] * 0.75 + b[1] * 0.25], [a[0] * 0.25 + b[0] * 0.75, a[1] * 0.25 + b[1] * 0.75]);
  }
  return out;
};

/** Paints the regions of frame `f` (watercolour wash + pencil silhouette). Place it UNDER the engraved World. */
export const BrushLayer: React.FC<{ bus: PaintBus; f: number; washOpacity?: number; pencil?: number; bleed?: number }> = ({ bus, f, washOpacity = 150, pencil = 1.1, bleed = 0.08 }) => {
  const { width: W, height: H } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  useLayoutEffect(() => {
    const h = delayRender(`painted pass f${f}`, { timeoutInMilliseconds: 120000 });
    let alive = true;
    bus.get(f).then((regions) => {
      if (!alive || !ref.current) return continueRender(h);
      brush.load(ref.current);
      if (!scaled) {
        brush.scaleBrushes(5);
        scaled = true;
      }
      brush.clear("#ffffff");
      brush.push();
      brush.translate(-W / 2, -H / 2);
      for (const r of regions) {
        brush.seed(1000 + r.id * 97);
        brush.noiseSeed(500 + r.id * 31);
        const area = (ring: [number, number][]) => {
          let a = 0;
          for (let i = 0; i < ring.length; i++) {
            const p0 = ring[i], p1 = ring[(i + 1) % ring.length];
            a += p0[0] * p1[1] - p1[0] * p0[1];
          }
          return Math.abs(a / 2);
        };
        // thin parts (a string, a handle) get the pencil only; the wash needs a body to sit in
        const rings = r.rings.map((ring) => smooth(ring));
        const bodies = rings.filter((ring) => area(ring) > 2500);
        // wash: a watercolour fill with a little bleed and paper texture
        brush.noStroke();
        brush.noHatch();
        brush.fill(r.wash, washOpacity);
        brush.fillTexture(0.55, 0.4);
        for (const ring of bodies) {
          brush.fillBleed(Math.min(bleed, (bleed * Math.sqrt(area(ring))) / 260), "out");
          brush.polygon(ring);
        }
        // silhouette: a soft pencil line
        brush.noFill();
        brush.set("HB", r.ink, pencil);
        for (const ring of rings) brush.polygon(ring);
      }
      brush.pop();
      brush.render();
      continueRender(h);
    });
    return () => {
      alive = false;
    };
  }, [bus, f, W, H, washOpacity, pencil, bleed]);
  return (
    <AbsoluteFill>
      <canvas ref={ref} width={W} height={H} style={{ position: "absolute", inset: 0, width: W, height: H, mixBlendMode: "multiply" }} />
    </AbsoluteFill>
  );
};
