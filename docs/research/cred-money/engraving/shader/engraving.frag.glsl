// ============================================================================
// ENGRAVING / LINE-SCREEN DUOTONE  — full-screen post-process fragment shader
// three.js ShaderMaterial (GLSL ES 1.0 style; three r150+ converts for WebGL2)
// Mirrors src/engrave.py exactly, so parameters calibrated offline transfer 1:1.
//
// Reference behaviour this reproduces (measured on the 640x360 reference):
//  * one straight line screen, fixed in SCREEN space (phase does not travel with
//    objects: |dphi|<=0.04 rad while objects drift 0.25 px/frame)
//  * period 0.55-0.80 % of frame height (2.0-2.9 px @360p = 6-8.6 px @1080p), angle ~45deg ('/')
//  * line thickness grows with darkness, lines vanish in highlights, never fully close
//  * whole image gradient-mapped to 2-3 colour stops (PC1 explains 93-99.7 % of colour)
//  * printed on paper: fine grain + low-freq mottle (1/f^2), mild vignette
// ============================================================================
precision highp float;

uniform sampler2D tColor;      // shaded scene (rgb) + coverage alpha
uniform sampler2D tNormal;     // optional view-space normal pass (rgb = n*0.5+0.5), for uMode==1
uniform vec2  uResolution;     // render size in px
uniform float uInputLinear;    // 1.0 if tColor holds linear values (three render target), 0.0 if sRGB
uniform int   uMode;           // 0 = screen-fixed angle (reference), 1 = bend with surface normal
uniform float uBend;           // mode 1: how far lines rotate with the normal (0..1)

uniform float uPeriodFrac;     // line period / frame height            (cal: 0.0065)
uniform float uAngle;          // line direction, radians CCW from +x   (cal: 45deg)
uniform float uBlack, uWhite, uToneGamma;   // input levels
uniform float uDmax;           // max ink coverage                      (cal)
uniform float uTHi;            // tone where lines vanish               (cal)
uniform float uCovGamma;       // coverage curve shape                  (cal)
uniform float uFill;           // tonal fill under the lines            (cal)
uniform float uWobble;         // line displacement, periods
uniform float uWobbleScale;    // wobble feature size, in PERIODS (cal 2.77)
uniform float uWidthJitter;    // per-line width irregularity
uniform float uSegLen, uSegJitter, uSegWidth, uSegGap;  // line BREAKUP: dash length (periods), phase offset, width var, gap prob
uniform float uSkew;           // 0 = symmetric line growth, 1 = edge-anchored (sawtooth) -> detail kinks lines
uniform float uDetail;         // micro-texture injected into tone (stand-in for photographic detail)
uniform float uCross, uCrossAngle, uTCross;  // optional crosshatch (ref: off)
uniform float uOutline, uOutlineLo, uOutlineHi;
uniform float uAA;             // edge softness multiplier (1 = 1px AA)

uniform vec3  uStops[4];       // gradient-map colours (sRGB 0..1), ink -> paper
uniform vec4  uStopPos;        // their positions 0..1
uniform int   uStopCount;      // 2..4
uniform float uBgTone;         // tone where alpha==0 (1 = paper)

uniform float uGrain, uMottle, uMottleScale, uVignette;
uniform float uSeed;

varying vec2 vUv;

// ---------------------------------------------------------------- noise (== engrave.py)
float hash(vec2 i, float seed){ return fract(sin(i.x*12.9898 + i.y*78.233 + seed*37.719) * 43758.5453); }
float vnoise(vec2 p, float seed){
  vec2 i = floor(p), f = p - i; vec2 u = f*f*(3.0-2.0*f);
  float a = hash(i, seed), b = hash(i+vec2(1.0,0.0), seed), c = hash(i+vec2(0.0,1.0), seed), d = hash(i+vec2(1.0,1.0), seed);
  float ab = a + (b-a)*u.x, cd = c + (d-c)*u.x; return ab + (cd-ab)*u.y;
}
float fbm(vec2 p, int oct, float seed){
  float s = 0.0, amp = 0.5, tot = 0.0;
  for (int o = 0; o < 4; o++){
    if (o >= oct) break;
    s += amp * (vnoise(p, seed + float(o))*2.0 - 1.0); tot += amp;
    p = p*2.03 + vec2(17.1, 9.2); amp *= 0.5;
  }
  return s / tot;
}
float luma(vec3 c){ return dot(c, vec3(0.299, 0.587, 0.114)); }
float toneAt(vec2 frag){
  vec4 s = texture2D(tColor, frag / uResolution);
  float L = luma(s.rgb / max(s.a, 1e-3));          // un-premultiply MSAA edges
  if (uInputLinear > 0.5) L = pow(max(L, 0.0), 1.0/2.2);
  return L;
}
vec3 gradientMap(float v){
  vec3 col = uStops[0];
  for (int i = 1; i < 4; i++){
    if (i >= uStopCount) break;
    float p0 = uStopPos[i-1], p1 = uStopPos[i];
    col = mix(col, uStops[i], clamp((v - p0) / max(p1 - p0, 1e-5), 0.0, 1.0));
  }
  return col;
}

void main(){
  vec2 frag = gl_FragCoord.xy;                 // y up, like engrave.py's yu
  float H = uResolution.y;
  float P = uPeriodFrac * H;
  vec4 src = texture2D(tColor, vUv);
  float alpha = src.a;

  // --- tone (un-premultiply: MSAA-resolved edges carry colour*alpha)
  float L = luma(src.rgb / max(alpha, 1e-3));
  if (uInputLinear > 0.5) L = pow(max(L, 0.0), 1.0/2.2);
  float t = pow(clamp((L - uBlack) / max(uWhite - uBlack, 1e-5), 0.0, 1.0), uToneGamma);
  if (uDetail > 0.0) t = clamp(t + uDetail * fbm(frag / (P * 1.5), 3, uSeed + 18.0), 0.0, 1.0);

  // --- line phase (screen space, fixed — the reference behaviour)
  float sc = uWobbleScale * P;
  float wob = uWobble * fbm(frag / sc, 3, uSeed);
  float ang = uAngle;
  if (uMode == 1){
    vec3 n = texture2D(tNormal, vUv).xyz * 2.0 - 1.0;
    ang += uBend * n.x * 0.7854;               // tilt with the surface: contour-following hatch
  }
  vec2 nrm = vec2(-sin(ang), cos(ang));
  float u = dot(frag, nrm) / P + wob;
  float fw = fwidth(u);
  // --- breakup into straight dashes, each with its own small offset / width / optional end gap
  float gapm = 1.0, segw = 0.0;
  if (uSegLen > 0.0){
    float kc = floor(u + 0.5);
    float al = dot(frag, vec2(cos(ang), sin(ang))) / P / uSegLen + hash(vec2(kc, 0.0), uSeed + 31.0) * 13.7;
    float sg = floor(al);
    float r1 = hash(vec2(kc, sg), uSeed + 41.0), r2 = hash(vec2(kc, sg), uSeed + 53.0), r3 = hash(vec2(kc, sg), uSeed + 67.0);
    u += uSegJitter * (r1 - 0.5);
    segw = uSegWidth * (r2 - 0.5) * 2.0;
    float fa = al - sg, gl = 0.35 / uSegLen;
    gapm = 1.0 - step(r3, uSegGap - 1e-6) * (1.0 - smoothstep(0.0, gl, 1.0 - fa));
  }
  float dist = 1.0 - abs(fract(u) - 0.5) * 2.0;           // 0 = line centre, 1 = mid-gap
  dist = mix(dist, fract(u), uSkew);
  float w = max(fw * 2.0 * uAA, 1e-4) * 0.5;

  // --- coverage (= line thickness / period) from tone
  float jit = uWidthJitter * fbm(vec2(floor(u) * 0.37, 0.0) + frag / (sc * 2.5), 2, uSeed + 11.0);
  float c = uDmax * pow(clamp((uTHi - t) / uTHi, 0.0, 1.0), uCovGamma);
  c = clamp(c * (1.0 + jit + segw), 0.0, 1.0);
  float m = (1.0 - smoothstep(c - w, c + w, dist)) * gapm;

  if (uCross > 0.0){
    float a2 = ang + uCrossAngle;
    float u2 = dot(frag, vec2(-sin(a2), cos(a2))) / P + wob;
    float d2 = 1.0 - abs(fract(u2) - 0.5) * 2.0;
    float c2 = uCross * clamp((uTCross - t) / uTCross, 0.0, 1.0);
    m = max(m, 1.0 - smoothstep(c2 - w, c2 + w, d2));
  }

  // --- tonal fill under the ink, then ink
  float F = 1.0 - uFill * (1.0 - t);
  float v = F * (1.0 - m);

  // --- optional outline from tone gradient (contrast change per period)
  if (uOutline > 0.0){
    float r = max(P * 0.5, 1.0);
    float gx = toneAt(frag + vec2(r, 0.0)) - toneAt(frag - vec2(r, 0.0));
    float gy = toneAt(frag + vec2(0.0, r)) - toneAt(frag - vec2(0.0, r));
    float e = 2.0 * P * length(vec2(gx, gy)) / (2.0 * r);
    v *= 1.0 - uOutline * smoothstep(uOutlineLo, uOutlineHi, e);
  }

  v = mix(uBgTone, v, alpha);

  // --- duotone / tritone gradient map + paper multiply
  vec3 col = gradientMap(clamp(v, 0.0, 1.0));
  float ms = uMottleScale * H;
  float pap = 1.0 + uGrain * (vnoise(frag * 0.9, uSeed + 5.0) * 2.0 - 1.0) * 1.7
                  + uMottle * fbm(frag / ms, 4, uSeed + 7.0) * 1.6;
  float rr = length((frag - 0.5 * uResolution) / H);
  pap *= 1.0 - uVignette * smoothstep(0.15, 0.95, rr);
  gl_FragColor = vec4(clamp(col * pap, 0.0, 1.0), 1.0);
}
