"""
Line-screen ENGRAVING + duotone renderer (offline, numpy/opencv).

Mirrors engraving.frag.glsl 1:1 so parameters calibrated here transfer to the shader.

Model (all lengths are fractions of frame HEIGHT so the look is resolution independent):
  t      = tone of the shaded input after levels + gamma            (0 = shadow, 1 = highlight)
  u      = dot(p, n) / P + wobble*fbm(p)                           (line phase; n = normal of the line direction)
           or a caller-supplied phase map (UV / surface-following mode)
  dist   = 1 - |fract(u) - 0.5| * 2                                (0 at a line centre, 1 mid-gap; uniform in [0,1])
  c(t)   = dmax * clamp((t_hi - t)/t_hi, 0, 1) ^ cov_gamma         (ink coverage = line thickness / period)
  m      = 1 - smoothstep(c - w, c + w, dist)                      (anti-aliased ink mask, w from fwidth)
  F(t)   = 1 - fill * (1 - t)                                      (tonal fill printed under the lines)
  v      = F * (1 - m)                                             (0 = ink, 1 = paper)
  rgb    = gradient_map(v, stops) * paper(p)                       (duotone / tritone in sRGB + paper multiply)
"""
import numpy as np, cv2

# ---------------------------------------------------------------- noise (same hash as the GLSL)
def _hash(ix, iy, seed=0.0):
    return np.modf(np.sin(ix * 12.9898 + iy * 78.233 + seed * 37.719) * 43758.5453)[0] % 1.0

def value_noise(x, y, seed=0.0):
    ix, iy = np.floor(x), np.floor(y)
    fx, fy = x - ix, y - iy
    ux, uy = fx * fx * (3 - 2 * fx), fy * fy * (3 - 2 * fy)
    a = _hash(ix, iy, seed); b = _hash(ix + 1, iy, seed)
    c = _hash(ix, iy + 1, seed); d = _hash(ix + 1, iy + 1, seed)
    return (a + (b - a) * ux) + ((c + (d - c) * ux) - (a + (b - a) * ux)) * uy  # 0..1

def fbm(x, y, octaves=4, seed=0.0):
    s, amp, tot = 0.0, 0.5, 0.0
    for o in range(octaves):
        s = s + amp * (value_noise(x, y, seed + o) * 2 - 1)
        tot += amp; x = x * 2.03 + 17.1; y = y * 2.03 + 9.2; amp *= 0.5
    return s / tot  # ~ -1..1

def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0 + 1e-12), 0, 1)
    return t * t * (3 - 2 * t)

def hex2rgb(h):
    h = h.lstrip('#'); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], np.float64) / 255.0

# ---------------------------------------------------------------- defaults (calibrated, see README / report)
DEFAULTS = dict(
    # ---- calibrated against the reference (see out/consensus.json, out/calib2_*.json, report) ----
    period_frac=0.0065,   # line period / frame height  (measured 0.0056 lighthouse, 0.0069 columns, 0.0077 flowers; 0.0105 under the lens)
    angle_deg=45.0,       # line direction, CCW from +x, y up ('/')  (measured 38..52, mode 45)
    black=0.0, white=1.0,
    tone_gamma=1.2,       # applied AFTER levels that map the input to the reference tone quantiles (src/cg_levels.py)
    dmax=0.80,            # max ink coverage in deepest shadow (lines never fully close)
    t_hi=0.75,            # tone above which lines vanish (clean highlights)  (all 4 scenes)
    cov_gamma=1.6,        # coverage curve shape (scenes split 1.0 / 1.6)
    fill=0.40,            # tonal fill printed under the lines (CG calibration 0.4; photo re-synthesis 0.5..0.65)
    wobble=0.7,           # line phase noise, periods (CG calibration; smooth-input re-synthesis optimum 0.9)
    wobble_scale=2.77,    # wobble feature size in PERIODS (calibrated: 0.018 H at P=0.0065 H)
    width_jitter=0.10,    # per-line coverage irregularity
    seg_len=4.0,          # line BREAKUP: dash length in periods (0 = off). Each dash gets its own phase offset / width / optional gap
    seg_jitter=0.35,      # dash phase offset range, periods
    seg_width=0.3,        # dash width variation (+-)
    seg_gap=0.2,          # probability that a dash ends in a gap
    skew=0.0,             # 0 = lines grow symmetrically about their centre, 1 = grow from one edge (sawtooth threshold -> detail shifts lines)
    detail=0.25,          # micro-texture added to tone at 1.5 periods (CG calibration; re-synthesis optimum 0.4)
    cross=0.0,            # crosshatch amount (ref: no systematic crosshatch -> 0)
    cross_angle_deg=-90.0, t_cross=0.2,
    outline=0.0, outline_lo=0.08, outline_hi=0.25,
    aa=1.0,
    stops=((0.0, '#3b5a2e'), (1.0, '#caf1b8')),   # lighthouse mint by default (measured)
    grain=0.015, mottle=0.04, mottle_scale=0.012, # paper: 360p stats hp 3.55 / grain 1.82 / mottle 2.36 / slope -2.21 (ref 3.34/1.83/2.28/-2.18)
    vignette=0.13,        # ref intro paper: -13.4% luma from centre to corners
    seed=3.0,
)
LENS_PRESET = dict(period_frac=0.0105, fill=0.65, aa=2.0, cov_gamma=1.0)            # magnifier close-ups (green rock)
SMOOTH_INPUT_PRESET = dict(wobble=0.9, detail=0.4, seg_len=0.0, tone_gamma=1.15)    # detail-poor input judged at 360p (re-synthesis optimum)

def gradient_map(v, stops):
    pos = np.array([s[0] for s in stops]); cols = np.array([hex2rgb(s[1]) if isinstance(s[1], str) else s[1] for s in stops])
    out = np.empty(v.shape + (3,))
    for k in range(3):
        out[..., k] = np.interp(v, pos, cols[:, k])
    return out

def prepare_fields(H, W, phase=None, frame_h=None, **kw):
    """param-independent fields (line phase, jitter, paper). frame_h: height used for scaling (default H)."""
    p = dict(DEFAULTS); p.update(kw)
    FH = frame_h or H
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float64)
    yu = (H - 1) - yy                                   # y-up like gl_FragCoord
    P = p['period_frac'] * FH
    sc = p['wobble_scale'] * P                          # in periods
    wob = p['wobble'] * fbm(xx / sc, yu / sc, 3, p['seed'])
    if phase is None:
        a = np.radians(p['angle_deg']); n = (-np.sin(a), np.cos(a)); dvec = (np.cos(a), np.sin(a))
        u = (xx * n[0] + yu * n[1]) / P + wob
        along = (xx * dvec[0] + yu * dvec[1]) / P
        fw = (abs(n[0]) + abs(n[1])) / P + 0 * xx
    else:
        u = phase + wob
        gy, gx = np.gradient(u); fw = np.abs(gx) + np.abs(gy)
        along = (xx + yu) / P * 0.7071
    jit = p['width_jitter'] * fbm(np.floor(u) * 0.37 + xx / (sc * 2.5), yu / (sc * 2.5), 2, p['seed'] + 11)
    det = fbm(xx / (P * 1.5), yu / (P * 1.5), 3, p['seed'] + 18)
    F = dict(u=u, fw=fw, jit=jit, P=P, det=det, along=along)
    if p['cross'] > 0:
        a2 = np.radians(p['angle_deg'] + p['cross_angle_deg']); n2 = (-np.sin(a2), np.cos(a2))
        F['u2'] = (xx * n2[0] + yu * n2[1]) / P + wob
    ms = p['mottle_scale'] * FH
    pap = 1 + p['grain'] * (value_noise(xx * 0.9, yu * 0.9, p['seed'] + 5) * 2 - 1) * 1.7 \
            + p['mottle'] * fbm(xx / ms, yu / ms, 4, p['seed'] + 7) * 1.6
    r = np.hypot((xx - W / 2) / FH, (yy - H / 2) / FH)
    F['pap'] = pap * (1 - p['vignette'] * smoothstep(0.15, 0.95, r))
    return F

def engrave(L, mask=None, phase=None, bg_tone=1.0, fields=None, frame_h=None, return_tone_only=False, **kw):
    """L: HxW float luminance 0..1 of the shaded subject (3D render / photo).
       mask: HxW 0..1 alpha (None = full frame). phase: optional HxW line-phase map in PERIOD units
       (surface-following / UV mode); None = screen-space fixed angle (reference behaviour).
       returns (rgb HxWx3 float 0..1, v tone HxW)"""
    p = dict(DEFAULTS); p.update(kw)
    H, W = L.shape
    Fd = fields or prepare_fields(H, W, phase=phase, frame_h=frame_h, **kw)
    u, fw, jit, P = Fd['u'], Fd['fw'], Fd['jit'], Fd['P']
    t = np.clip((L - p['black']) / max(p['white'] - p['black'], 1e-6), 0, 1) ** p['tone_gamma']
    if p.get('detail', 0) > 0:
        t = np.clip(t + p['detail'] * Fd['det'], 0, 1)
    gapm = 1.0; segw = 0.0
    if p.get('seg_len', 0) > 0:
        kc = np.floor(u + 0.5)                                    # index of the nearest line
        al = Fd['along'] / p['seg_len'] + _hash(kc, 0 * kc, p['seed'] + 31) * 13.7
        sg = np.floor(al)
        r1 = _hash(kc, sg, p['seed'] + 41); r2 = _hash(kc, sg, p['seed'] + 53); r3 = _hash(kc, sg, p['seed'] + 67)
        u = u + p['seg_jitter'] * (r1 - 0.5)
        segw = p['seg_width'] * (r2 - 0.5) * 2
        fa = al - sg; gl = 0.35 / p['seg_len']                     # gap ~0.35 period long at the dash end
        gapm = 1 - (r3 < p['seg_gap']) * (1 - smoothstep(0, gl, 1 - fa))
    dist = 1 - np.abs((u % 1.0) - 0.5) * 2
    if p.get('skew', 0) > 0:
        dist = dist + (np.mod(u, 1.0) - dist) * p['skew']
    w = np.maximum(fw * 2 * p['aa'], 1e-4) * 0.5
    c = p['dmax'] * np.clip((p['t_hi'] - t) / p['t_hi'], 0, 1) ** p['cov_gamma']
    c = np.clip(c * (1 + jit + segw), 0, 1)
    m = (1 - smoothstep(c - w, c + w, dist)) * gapm
    if p['cross'] > 0 and 'u2' in Fd:
        d2 = 1 - np.abs((Fd['u2'] % 1.0) - 0.5) * 2
        c2 = p['cross'] * np.clip((p['t_cross'] - t) / p['t_cross'], 0, 1)
        m = np.maximum(m, 1 - smoothstep(c2 - w, c2 + w, d2))
    Fl = 1 - p['fill'] * (1 - t)
    v = Fl * (1 - m)
    if p['outline'] > 0:
        ts = cv2.GaussianBlur(t.astype(np.float32), (0, 0), max(P * 0.35, 0.5))
        gx = cv2.Sobel(ts, cv2.CV_32F, 1, 0, ksize=3); gy = cv2.Sobel(ts, cv2.CV_32F, 0, 1, ksize=3)
        e = np.hypot(gx, gy) * P / 4.0                       # contrast change per period
        v = v * (1 - p['outline'] * smoothstep(p['outline_lo'], p['outline_hi'], e))
    if mask is not None:
        v = v * mask + bg_tone * (1 - mask)
    if return_tone_only:
        return v
    rgb = gradient_map(np.clip(v, 0, 1), p['stops'])
    return np.clip(rgb * Fd['pap'][..., None], 0, 1), v

def to_ref_scale(rgb, out_h=360, codec=False, crf=30, tmpdir='/tmp'):
    """downscale like the reference delivery (640x360) and optionally x264 round-trip."""
    H, W = rgb.shape[:2]
    small = cv2.resize((rgb * 255).astype(np.float32), (int(round(W * out_h / H)), out_h), interpolation=cv2.INTER_AREA)
    small = np.clip(small, 0, 255).astype(np.uint8)
    if codec:
        import subprocess, os
        h, w = small.shape[:2]; w2, h2 = w - w % 2, h - h % 2; small = small[:h2, :w2]
        fn = os.path.join(tmpdir, 'rt.mp4')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{w2}x{h2}', '-r', '24', '-i', '-',
                        '-c:v', 'libx264', '-crf', str(crf), '-pix_fmt', 'yuv420p', fn], input=np.repeat(small[None], 3, 0).tobytes(), check=True)
        raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', fn, '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout
        small = np.frombuffer(raw, np.uint8).reshape(h2, w2, 3)
    return small

def match_levels(L, mask, ref_T_quantiles, extra_gamma=1.05):
    """Levels so the subject's 5/50/95th luminance percentiles land on the reference tone quantiles
    (same rule as src/cg_levels.py). Returns dict(black, white, tone_gamma)."""
    v = L[mask > 0.5] if mask is not None else L.ravel()
    q05, q50, q95 = np.percentile(v, [5, 50, 95]); T05, T50, T95 = ref_T_quantiles
    if q95 - q05 < 0.15:
        return dict(black=0.0, white=1.0, tone_gamma=extra_gamma)
    white = q05 + (q95 - q05) * (1 - T05) / (T95 - T05); black = q05 - (q95 - q05) * T05 / (T95 - T05)
    mid = np.clip((q50 - black) / (white - black), 1e-3, 0.999)
    g = float(np.clip(np.log(max(T50, 1e-3)) / np.log(mid), 0.6, 2.5))
    return dict(black=float(black), white=float(white), tone_gamma=g * extra_gamma)
# reference tone quantiles (5/50/95 %) measured with resynth.tone_from_ref on each scene crop
REF_TONE_Q = dict(columns=(0.034, 0.484, 0.927), lighthouse=(0.235, 0.671, 0.998), green_rock=(0.104, 0.555, 0.940), flowers=(0.181, 0.399, 0.983))
