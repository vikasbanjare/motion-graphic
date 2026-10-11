/**
 * Night film 02, "The Map" (20 s, 480 frames, 24 fps). UNOFFICIAL SPEC WORK; facts and sources in ./kit.tsx.
 * One continuous engraved map, one camera flight. The card lies on the map; a route draws out of it and the camera
 * follows: through a toll gate that reads ₹0 ("zero joining fee"), down a shopping street ("5% rewards"), to an
 * airport where a plane takes off ("redeem on flights"), a hotel ("and hotels"), a store ("and 2,000+ products").
 * Then the camera pulls back to the whole map, which folds down into the card; the card turns metal; lockup.
 * Look: the CRED-reference engraved world in a mint duotone, coral route.
 */
import React, { useMemo } from "react";
import { AbsoluteFill, Audio, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { face } from "../v3/card.ts";
import { Hatch, Icon, Logo, Paper, SANS, SERIF, Words, expoOut, inOut, lerp, ramp, useFonts } from "./kit.tsx";

export const F02_FRAMES = 480;
const MW = 3840, MH = 2160;
const INK = "#2c5537";
const ROUTE = "#c8553d";
const P = {
  card: [700, 1500],
  toll: [1250, 1150],
  shops: [1900, 700],
  airport: [2700, 900],
  hotel: [3250, 1500],
  store: [2400, 1750],
} as const;
// camera keys: frame, x, y, scale
const KEYS: [number, number, number, number][] = [
  [0, 700, 1500, 1.9], [50, 700, 1500, 1.6], [80, 1250, 1150, 1.5], [120, 1250, 1150, 1.58], [150, 1900, 700, 1.4],
  [195, 1900, 700, 1.47], [225, 2700, 900, 1.3], [265, 2700, 900, 1.36], [290, 3250, 1500, 1.4], [320, 3250, 1500, 1.46],
  [350, 2400, 1750, 1.4], [388, 2400, 1750, 1.46], [420, 1920, 1080, 0.5], [480, 1920, 1080, 0.5],
];
const cam = (f: number) => {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const [a, ax, ay, as] = KEYS[i], [b, bx, by, bs] = KEYS[i + 1];
    if (f >= a && f < b) {
      const t = inOut((f - a) / (b - a));
      return { x: lerp(ax, bx, t), y: lerp(ay, by, t), s: Math.exp(lerp(Math.log(as), Math.log(bs), t)) };
    }
  }
  const [, x, y, s] = KEYS[KEYS.length - 1];
  return { x, y, s };
};
/** Keep the view inside the map. */
const camC = (f: number) => {
  const c = cam(f);
  const hx = 960 / c.s, hy = 540 / c.s;
  return { s: c.s, x: hx * 2 >= MW ? MW / 2 : Math.min(MW - hx, Math.max(hx, c.x)), y: hy * 2 >= MH ? MH / 2 : Math.min(MH - hy, Math.max(hy, c.y)) };
};

const rnd = (i: number) => {
  const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};

/** The map itself: topography, river, roads, blocks, trees, landmarks. Static (memoised). */
const MapArt: React.FC = () => {
  const art = useMemo(() => {
    const hills = [[600, 500, 420], [3300, 500, 380], [1500, 1900, 360]];
    const topo: string[] = [];
    hills.forEach(([cx, cy, R], h) => {
      for (let i = 0; i < 14; i++) {
        const r = R * (1 - i / 15);
        let d = "";
        for (let k = 0; k <= 90; k++) {
          const a = (k / 90) * Math.PI * 2;
          const rr = r * (1 + 0.12 * Math.sin(3 * a + h + i * 0.3) + 0.06 * Math.sin(7 * a + i));
          d += `${k ? "L" : "M"}${(cx + rr * Math.cos(a)).toFixed(0)},${(cy + 0.7 * rr * Math.sin(a)).toFixed(0)}`;
        }
        topo.push(d + "Z");
      }
    });
    let river = "M -50 1950";
    for (let x = 0; x <= MW + 50; x += 60) river += ` L ${x} ${1950 - 0.18 * x + 90 * Math.sin(x / 260)}`;
    const blocks: [number, number, number, number][] = [];
    const marks = [P.card, P.toll, P.shops, P.airport, P.hotel, P.store];
    for (let i = 0; i < 160 && blocks.length < 34; i++) {
      const near = [P.shops, P.hotel, P.store, P.toll][i % 4];
      const x = Math.round((near[0] + (rnd(i) - 0.5) * 900) / 120) * 120, y = Math.round((near[1] + (rnd(i + 99) - 0.5) * 640) / 110) * 110;
      if (marks.some((m) => Math.hypot(m[0] - x, m[1] - y) < 300)) continue;
      if (blocks.some((b) => Math.abs(b[0] - x) < 130 && Math.abs(b[1] - y) < 120)) continue;
      blocks.push([x, y, 70 + rnd(i + 7) * 30, 56 + rnd(i + 3) * 30]);
    }
    const trees: [number, number, number][] = [];
    for (let i = 0; i < 90; i++) trees.push([rnd(i + 500) * MW, rnd(i + 900) * MH, 14 + rnd(i + 40) * 22]);
    return { topo, river, blocks, trees };
  }, []);
  const roads = [
    [P.card, P.toll], [P.toll, P.shops], [P.shops, P.airport], [P.airport, P.hotel], [P.hotel, P.store], [P.store, P.card],
    [[0, 1050], [MW, 980]], [[1600, 0], [2000, MH]],
  ];
  return (
    <svg width={MW} height={MH} style={{ position: "absolute", left: 0, top: 0 }}>
      <Hatch id="mp" ink={INK} pitch={9} />
      <rect width={MW} height={MH} fill="#e8f0da" />
      {art.topo.map((d, i) => <path key={i} d={d} fill="none" stroke={INK} strokeOpacity={0.22} strokeWidth={2} />)}
      <path d={art.river} fill="none" stroke="#a8c9b6" strokeWidth={70} strokeLinecap="round" />
      <path d={art.river} fill="none" stroke={INK} strokeOpacity={0.35} strokeWidth={2} strokeDasharray="12 10" />
      {roads.map(([a, b], i) => (
        <g key={i}>
          <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={INK} strokeOpacity={0.5} strokeWidth={30} />
          <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#eef4e3" strokeWidth={24} />
        </g>
      ))}
      {art.trees.map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="url(#mp-m)" stroke={INK} strokeWidth={2} opacity={0.75} />)}
      {art.blocks.map(([x, y, w, h], i) => <rect key={i} x={x - w / 2} y={y - h / 2} width={w} height={h} fill={i % 3 ? "url(#mp-m)" : "url(#mp-d)"} stroke={INK} strokeWidth={2.5} />)}
      {/* landmarks */}
      <g transform={`translate(${P.toll[0] - 150}, ${P.toll[1] - 230})`}>
        <rect x={20} y={120} width={26} height={200} fill="url(#mp-d)" stroke={INK} strokeWidth={4} />
        <rect x={254} y={120} width={26} height={200} fill="url(#mp-d)" stroke={INK} strokeWidth={4} />
        <rect x={0} y={60} width={300} height={90} rx={12} fill="#f4f8ec" stroke={INK} strokeWidth={5} />
        <text x={150} y={130} textAnchor="middle" fontFamily={SERIF} fontWeight={700} fontSize={70} fill={INK}>₹0</text>
      </g>
      {[[P.shops, "bag", 380], [P.airport, "globe", 0], [P.hotel, "bell", 360], [P.store, "box", 380]].map(([p, k, sz], i) =>
        (sz as number) > 0 ? (
          <g key={i} transform={`translate(${(p as unknown as number[])[0] - (sz as number) / 2}, ${(p as unknown as number[])[1] - (sz as number) - 20}) scale(${(sz as number) / 200})`}>
            <Icon kind={k as never} h="mp" ink={INK} sw={3} />
          </g>
        ) : null,
      )}
      {/* runway */}
      <g transform={`translate(${P.airport[0]}, ${P.airport[1]}) rotate(-20)`}>
        <rect x={-380} y={-40} width={760} height={80} fill="#d9e4ca" stroke={INK} strokeWidth={4} />
        {Array.from({ length: 12 }, (_, i) => <rect key={i} x={-350 + i * 60} y={-4} width={34} height={8} fill={INK} />)}
      </g>
    </svg>
  );
};

/** A map-legend style label that carries the headline (keeps type readable over the map). */
const Legend: React.FC<{ f: number; from: number; to: number; big: string[]; small?: string }> = ({ f, from, to, big, small }) => {
  if (f < from - 1 || f > to + 1) return null;
  const p = ramp(f, from, from + 12, expoOut);
  const q = 1 - ramp(f, to - 8, to);
  return (
    <div style={{ position: "absolute", left: 90, top: 80, padding: "30px 44px 34px", background: "rgba(246,250,238,0.94)", border: `3px solid ${INK}`, borderRadius: 14, boxShadow: "0 18px 40px rgba(20,40,25,0.2)", opacity: p * q, transform: `translateY(${(1 - p) * 26}px)` }}>
      <div style={{ position: "absolute", inset: 8, border: `1px solid ${INK}`, borderRadius: 8, opacity: 0.5 }} />
      {big.map((b, i) => <Words key={i} f={f} at={from + 3 + i * 3} text={b} size={78} color={INK} />)}
      {small && <div style={{ marginTop: 14 }}><Words f={f} at={from + 10} text={small} size={34} color={INK} font={SANS} weight={500} tracking="-0.01em" /></div>}
    </div>
  );
};

export const F02Map: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const c = camC(f);
  const routeP = interpolate(f, [40, 80, 150, 225, 290, 350, 400], [0, 0.18, 0.4, 0.62, 0.8, 1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const routePts = [P.card, P.toll, P.shops, P.airport, P.hotel, P.store];
  const routeD = "M " + routePts.map((p) => `${p[0]} ${p[1]}`).join(" L ");
  const takeoff = ramp(f, 232, 266, inOut);
  const coinPop = ramp(f, 156, 170, expoOut);
  const fold = ramp(f, 420, 446, inOut);
  const flip = ramp(f, 446, 462, inOut);
  const lights = ramp(f, 444, 458);
  // the card on the map in map coordinates
  const cw = 520, ch = 328;
  return (
    <AbsoluteFill style={{ background: "#1f3d28" }}>
      <AbsoluteFill style={{ clipPath: fold > 0 ? `inset(${fold * 30}% ${fold * 30}% ${fold * 30}% ${fold * 30}% round ${fold * 40}px)` : undefined, opacity: 1 - lights }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: MW, height: MH, transformOrigin: "0 0", transform: `translate(${960 - c.x * c.s}px, ${540 - c.y * c.s}px) scale(${c.s})` }}>
          <MapArt />
          <svg width={MW} height={MH} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d={routeD} fill="none" stroke={ROUTE} strokeWidth={10} strokeDasharray="2 0" pathLength={1} strokeDashoffset={0} opacity={0} />
            <path d={routeD} fill="none" stroke={ROUTE} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={`${routeP} 1`} />
            {/* coin popping at the shops */}
            <g transform={`translate(${P.shops[0] + 170}, ${P.shops[1] - 330 - coinPop * 60}) scale(${coinPop * 0.9})`} opacity={coinPop}>
              <Hatch id="cn" ink={ROUTE} pitch={8} />
              <Icon kind="coin" h="cn" ink={ROUTE} sw={4} />
            </g>
            {/* the plane taking off along the runway */}
            <g transform={`translate(${P.airport[0] - 300 + takeoff * 760}, ${P.airport[1] + 100 - takeoff * 380}) scale(${0.9 + takeoff * 0.5})`} opacity={f > 200 ? 1 : 0}>
              <Hatch id="pl" ink={INK} pitch={7} />
              <Icon kind="plane" h="pl" ink={INK} sw={3} />
            </g>
          </svg>
          <div style={{ position: "absolute", left: P.card[0] - cw / 2, top: P.card[1] - ch / 2, width: cw, height: ch, transform: "rotate(-8deg)", boxShadow: "0 18px 40px rgba(20,40,25,0.35)", borderRadius: 20 }}>
            <Img src={face("print").url} style={{ width: "100%", height: "100%", borderRadius: 20 }} />
          </div>
        </div>
        <Paper opacity={0.85} />
      </AbsoluteFill>
      {/* the folded map becomes the card, which turns metal */}
      {fold > 0.6 && (
        <AbsoluteFill style={{ perspective: 1800 }}>
          <div style={{ position: "absolute", left: 960 - 380, top: 200, width: 760, height: 480, transform: `rotateY(${180 * flip}deg)`, transformStyle: "preserve-3d", opacity: ramp(f, 432, 440) }}>
            <Img src={face("print").url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 28, backfaceVisibility: "hidden" }} />
            <Img src={face("metal").url} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: 28, backfaceVisibility: "hidden", transform: "rotateY(180deg)", boxShadow: "0 30px 70px rgba(0,0,0,0.5)" }} />
          </div>
        </AbsoluteFill>
      )}
      <Legend f={f} from={6} to={50} big={["the CRED IndusInd Bank", "RuPay credit card"]} />
      <Legend f={f} from={84} to={124} big={["zero joining fee"]} />
      <Legend f={f} from={154} to={198} big={["5% rewards"]} small="on online shopping" />
      <Legend f={f} from={228} to={268} big={["redeem on flights"]} />
      <Legend f={f} from={292} to={324} big={["and hotels"]} />
      <Legend f={f} from={352} to={392} big={["and 2,000+ products"]} small="on CRED store" />
      {f >= 456 && <Logo f={f} at={456} y={720} h={96} />}
      <Audio src={staticFile("custom/cred-night/f02.wav")} />
    </AbsoluteFill>
  );
};
