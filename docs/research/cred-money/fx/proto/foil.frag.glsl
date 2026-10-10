// Thin-film / angle-dependent iridescent foil for engraved objects. GLSL ES 1.00 (WebGL1).
// Parameters are set from measurements of the reference film (see fx findings):
//   * hue lives mostly in blue/cyan (shell 68% of foil pixels at 180-240 deg, turtle 76% at 210-270)
//     with warm (0-60 deg) accents (shell 16%); cards are warm-dominant (0-60 deg: 59%).
//   * blend that best reproduces the measured chroma-vs-luma curve: OVERLAY (decisive on cards,
//     marginal on shell). Dark engraving lines stay neutral; mid-tones carry the colour.
//   * 1-1.5 hue cycles across an object (shell: blue core r<0.45R, mixed rainbow ring 0.5-0.6R, pale rim).
//   * colour is attached to the object; it shifts only when the object/camera moves (0 change in a
//     static hold, measured), so drive uView from object rotation / camera motion, NOT from time.
precision highp float;
varying vec2 vUv;
uniform vec2  uRes;
uniform sampler2D uBase;     // engraving (rgb luminance) ; alpha = object mask
uniform sampler2D uRamp;     // 256x1 palette ramp (measured), cyclic
uniform float uUseBase;      // 1 = sample uBase, 0 = procedural engraved card (prototype only)
uniform vec2  uView;         // object tilt / view offset in radians (x: yaw, y: pitch)
uniform vec2  uCenter;       // origin of the radial thickness term (e.g. shell hinge), uv
uniform float uThick0;       // film thickness at centre, nm (default 320)
uniform float uThick1;       // film thickness at rim, nm (default 560) -> ~1-1.5 cycles
uniform float uNoiseAmp;     // nm of fbm thickness noise (default 90)
uniform float uNoiseFreq;    // fbm frequency in uv units (default 3.0)
uniform float uRibs;         // radial rib count (0 = off). Ribs tilt the normal -> alternate hues
uniform float uRibDepth;     // 0..1 normal tilt from ribs (default 0.35)
uniform float uIOR;          // film index (default 1.38)
uniform float uPalette;      // 0 = physical thin-film RGB, 1 = measured palette ramp
uniform float uSat;          // foil colour saturation 0..1 (fit: 0.6-1.0)
uniform float uVal;          // foil colour value 0..1 (fit: 0.5-0.7)
uniform float uAlpha;        // overlay strength (fit: 0.5 shell, 1.0 turtle/cards)
uniform float uBump;         // how much engraving luminance perturbs the normal (default 0.6)
uniform vec3  uLevels;       // base remap lo, hi, gamma. Measured foil objects sit in mid-tones:
                             // luma p2/p50/p98 = 0.15/0.45/0.75 (shell), 0.23/0.43/0.90 (turtle). default (0.12,0.80,1.6)
uniform float uCycles;       // palette cycles from uCenter to the object's rim (measured 1-1.5). default 1.25
uniform float uViewGain;     // how strongly the normal/view shifts the palette phase. default 0.9

const float PI = 3.14159265;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){ float a=0.5, s=0.0; for(int i=0;i<5;i++){ s+=a*noise(p); p=p*2.03+17.1; a*=0.5; } return s; }

vec3 rgb2hsv(vec3 c){
  vec4 K = vec4(0., -1./3., 2./3., -1.); vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r)); float d = q.x - min(q.w, q.y);
  return vec3(abs(q.z + (q.w - q.y) / (6.*d + 1e-10)), d / (q.x + 1e-10), q.x);
}
vec3 hsv2rgb(vec3 c){ vec3 p = abs(fract(c.xxx + vec3(0., 2./3., 1./3.)) * 6. - 3.); return c.z * mix(vec3(1.), clamp(p - 1., 0., 1.), c.y); }

// Two-beam thin-film interference, three wavelengths (R 650, G 532, B 450 nm).
// Returns reflectance-like RGB in 0..1 and the optical path difference (nm).
vec3 thinFilm(float d, float cosI, float n, out float opd){
  float sinT2 = (1.0 - cosI*cosI) / (n*n);
  float cosT = sqrt(max(1.0 - sinT2, 0.0));
  opd = 2.0 * n * d * cosT;
  vec3 lambda = vec3(650.0, 532.0, 450.0);
  return 0.5 + 0.5 * cos(2.0*PI*opd/lambda + PI);   // +PI: phase flip at the denser interface
}

float overlay1(float b, float f){ return b < 0.5 ? 2.0*b*f : 1.0 - 2.0*(1.0-b)*(1.0-f); }
vec3 overlay(vec3 b, vec3 f){ return vec3(overlay1(b.r,f.r), overlay1(b.g,f.g), overlay1(b.b,f.b)); }

// prototype base: engraved rounded card with wavy line field (used when uUseBase = 0)
vec4 proceduralCard(vec2 uv){
  vec2 p = (uv - 0.5) * vec2(uRes.x/uRes.y, 1.0);
  vec2 hb = vec2(0.72, 0.45); float r = 0.07;
  vec2 q = abs(p) - hb + r; float sd = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  float mask = clamp(0.5 - sd * uRes.y, 0.0, 1.0);
  float ph = (p.y + 0.018*sin(p.x*9.0 + 3.0*sin(p.y*4.0))) * 95.0;
  float line = abs(fract(ph) - 0.5) * 2.0;                   // 0 at line centre
  float shade = 0.55 + 0.35 * p.x;                            // darker toward the left
  float ink = smoothstep(shade, shade - 0.18, line);
  float ros = length(p - vec2(0.38, 0.05));
  float rings = abs(fract(ros*40.0 + 0.2*sin(atan(p.y-0.05, p.x-0.38)*12.0)) - 0.5) * 2.0;
  ink = max(ink, smoothstep(0.25, 0.05, rings) * step(ros, 0.22));
  float lum = mix(0.93, 0.18, ink);
  return vec4(vec3(lum), mask);
}

void main(){
  vec2 uv = vUv;
  vec4 base = uUseBase > 0.5 ? texture2D(uBase, uv) : proceduralCard(uv);
  float b0 = dot(base.rgb, vec3(0.2126, 0.7152, 0.0722));
  float b = uLevels.x + (uLevels.y - uLevels.x) * pow(clamp(b0, 0.0, 1.0), uLevels.z);

  // surface normal: object tilt + engraving bump + optional ribs
  vec2 px = 1.0 / uRes;
  float bx = uUseBase > 0.5 ? dot(texture2D(uBase, uv + vec2(px.x*2.0, 0.)).rgb - texture2D(uBase, uv - vec2(px.x*2.0, 0.)).rgb, vec3(0.333)) : 0.0;
  float by = uUseBase > 0.5 ? dot(texture2D(uBase, uv + vec2(0., px.y*2.0)).rgb - texture2D(uBase, uv - vec2(0., px.y*2.0)).rgb, vec3(0.333)) : 0.0;
  vec2 rel = uv - uCenter;
  float ang = atan(rel.y, rel.x);
  float rib = uRibs > 0.0 ? sin(ang * uRibs) * uRibDepth : 0.0;
  vec3 n = normalize(vec3(uView.x + bx*uBump + rib*cos(ang+PI*0.5), uView.y + by*uBump + rib*sin(ang+PI*0.5), 1.0));
  float cosI = clamp(n.z, 0.05, 1.0);

  // film thickness: radial ramp from uCenter + fbm (drifts only with view, not time)
  float rad = clamp(length(rel) * 2.0, 0.0, 1.0);
  float d = mix(uThick0, uThick1, rad) + uNoiseAmp * (fbm(uv * uNoiseFreq + uView * 2.0) - 0.5) * 2.0;

  float opd;
  vec3 film = thinFilm(d, cosI, uIOR, opd);
  // palette phase: radial cycles + fbm wobble + view/normal dependence (moves only when the object moves)
  float phase = uCycles * rad + (uNoiseAmp / 300.0) * (fbm(uv * uNoiseFreq + uView * 2.0) - 0.5) + uViewGain * (n.x * 0.8 + n.y * 0.6) + rib * 0.5;
  vec3 pal = texture2D(uRamp, vec2(fract(phase), 0.5)).rgb;            // measured palette, cyclic
  vec3 foil = mix(film, pal, uPalette);
  vec3 hsv = rgb2hsv(foil);
  foil = hsv2rgb(vec3(hsv.x, uSat, uVal));                              // fitted S/V for overlay

  vec3 outc = mix(vec3(b), overlay(vec3(b), foil), uAlpha);
  gl_FragColor = vec4(outc * base.a, base.a);                           // premultiplied
}
