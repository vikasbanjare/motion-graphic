// ============================================================================
// ENGRAVING MATERIAL — per-object variant (three.js ShaderMaterial)
// Same line/coverage/duotone model as engraving.frag.glsl, but:
//   * tone comes from its own lighting (key + wrap + rim + ambient), times albedo
//   * line phase can follow the SURFACE: uPhaseMode 0 = screen (reference look),
//     1 = UV iso-lines (u = vUv.y * uLinesPerUV, e.g. latitude rings / column bands),
//     2 = object-space planar (lines slice the object, move with it)
//   * each object can carry its own palette (the reference's hummingbird collage
//     uses a different ink per object: violet flowers, olive leaves)
// Pair with engravingMaterial.vert.glsl.
// ============================================================================
precision highp float;

varying vec3 vNormalV;   // view-space normal
varying vec3 vPosV;      // view-space position
varying vec3 vPosO;      // object-space position
varying vec2 vUv;

uniform vec2  uResolution;
uniform vec3  uKeyDir;        // view-space, normalized, pointing TO the light
uniform float uKey, uWrap, uAmbient, uRim, uRimPow, uSpec, uShininess;
uniform float uAlbedo;
uniform sampler2D tAlbedo; uniform float uUseAlbedoMap;

uniform int   uPhaseMode;
uniform float uLinesPerUV;    // mode 1
uniform vec3  uPlaneDir;      // mode 2, object space
uniform float uPlanePeriod;   // mode 2, object units

uniform float uPeriodFrac, uAngle, uToneGamma, uDmax, uTHi, uCovGamma, uFill;
uniform float uWobble, uWobbleScale, uWidthJitter, uSkew, uDetail, uAA;
uniform vec3  uStops[4]; uniform vec4 uStopPos; uniform int uStopCount;
uniform float uGrain, uMottle, uMottleScale, uSeed;

float hash(vec2 i, float seed){ return fract(sin(i.x*12.9898 + i.y*78.233 + seed*37.719) * 43758.5453); }
float vnoise(vec2 p, float seed){
  vec2 i = floor(p), f = p - i; vec2 u = f*f*(3.0-2.0*f);
  float a = hash(i, seed), b = hash(i+vec2(1.0,0.0), seed), c = hash(i+vec2(0.0,1.0), seed), d = hash(i+vec2(1.0,1.0), seed);
  float ab = a + (b-a)*u.x, cd = c + (d-c)*u.x; return ab + (cd-ab)*u.y;
}
float fbm(vec2 p, int oct, float seed){
  float s = 0.0, amp = 0.5, tot = 0.0;
  for (int o = 0; o < 4; o++){ if (o >= oct) break;
    s += amp * (vnoise(p, seed + float(o))*2.0 - 1.0); tot += amp; p = p*2.03 + vec2(17.1, 9.2); amp *= 0.5; }
  return s / tot;
}
vec3 gradientMap(float v){
  vec3 col = uStops[0];
  for (int i = 1; i < 4; i++){ if (i >= uStopCount) break;
    col = mix(col, uStops[i], clamp((v - uStopPos[i-1]) / max(uStopPos[i] - uStopPos[i-1], 1e-5), 0.0, 1.0)); }
  return col;
}

void main(){
  vec2 frag = gl_FragCoord.xy; float H = uResolution.y; float P = uPeriodFrac * H;
  // ---- lighting -> tone
  vec3 N = normalize(vNormalV); vec3 V = normalize(-vPosV);
  float ndl = dot(N, uKeyDir);
  float diff = clamp((ndl + uWrap) / (1.0 + uWrap), 0.0, 1.0);
  float spec = pow(max(dot(N, normalize(uKeyDir + V)), 0.0), uShininess) * uSpec;
  float rim = pow(1.0 - max(dot(N, V), 0.0), uRimPow) * uRim;
  float alb = uAlbedo * (uUseAlbedoMap > 0.5 ? dot(texture2D(tAlbedo, vUv).rgb, vec3(0.299,0.587,0.114)) : 1.0);
  float t = clamp((uAmbient + uKey * diff) * alb + spec + rim, 0.0, 1.0);
  t = pow(t, uToneGamma);
  if (uDetail > 0.0) t = clamp(t + uDetail * fbm(frag / (P * 1.5), 3, uSeed + 18.0), 0.0, 1.0);

  // ---- line phase
  float sc = uWobbleScale * P;                      // periods
  float wob = uWobble * fbm(frag / sc, 3, uSeed);
  float u;
  if (uPhaseMode == 1)      u = vUv.y * uLinesPerUV + wob;
  else if (uPhaseMode == 2) u = dot(vPosO, normalize(uPlaneDir)) / uPlanePeriod + wob;
  else                      u = dot(frag, vec2(-sin(uAngle), cos(uAngle))) / P + wob;
  float fw = fwidth(u);
  float dist = 1.0 - abs(fract(u) - 0.5) * 2.0;
  dist = mix(dist, fract(u), uSkew);
  float w = max(fw * 2.0 * uAA, 1e-4) * 0.5;
  // fade lines out where they would alias (object-space modes seen at grazing angles)
  float alias = smoothstep(0.35, 0.6, fw);
  float jit = uWidthJitter * fbm(vec2(floor(u) * 0.37, 0.0) + frag / (sc * 2.5), 2, uSeed + 11.0);
  float c = clamp(uDmax * pow(clamp((uTHi - t) / uTHi, 0.0, 1.0), uCovGamma) * (1.0 + jit), 0.0, 1.0);
  float m = 1.0 - smoothstep(c - w, c + w, dist);
  m = mix(m, c, alias);                                   // average coverage instead of moire
  float v = (1.0 - uFill * (1.0 - t)) * (1.0 - m);

  vec3 col = gradientMap(clamp(v, 0.0, 1.0));
  float ms = uMottleScale * H;
  float pap = 1.0 + uGrain * (vnoise(frag * 0.9, uSeed + 5.0) * 2.0 - 1.0) * 1.7 + uMottle * fbm(frag / ms, 4, uSeed + 7.0) * 1.6;
  gl_FragColor = vec4(clamp(col * pap, 0.0, 1.0), 1.0);
}
