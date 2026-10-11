import React from "react";
import { Sprite } from "./paint2d.tsx";
import { useVideoConfig } from "remotion";
import { PenPaths, SketchPaths, Svg, type SketchShape, type Stroke } from "./layers.tsx";
import { lighten, mix, useLook } from "./look.ts";
import { mpD, union, type Pt, type Ring } from "./paths.ts";

/**
 * Isometric solids drawn by the whole team: p5.brush washes the faces (three tones of one hue), roughjs hachures the
 * shade face, perfect-freehand inks the edges. One object = three tools, so every world is built the same way and the
 * worlds blend.
 */
const C = Math.cos(Math.PI / 6), S = 0.5;
export type View = { ox: number; oy: number; k: number };
export const iso = (x: number, y: number, z: number, v: View): Pt => [v.ox + (x - y) * C * v.k, v.oy + (x + y) * S * v.k - z * v.k];

export type Face = { ring: Ring; tone: 0 | 1 | 2 }; // 0 lit top, 1 mid, 2 shade
export type Solid = {
  faces: Face[];
  edges: Pt[][];
  shadow: Ring;
  hue: string;
  detail?: Stroke[];
  decal?: boolean; // lies on another solid: no paper occluder under it
  rest?: Solid; // the solid before moveSolid (its sprite is painted once, at rest)
  dy?: number; // vertical offset from rest
};

export const box = (x: number, y: number, z: number, w: number, d: number, h: number, v: View, hue: string): Solid => {
  const P = (a: number, b: number, c: number) => iso(a, b, c, v);
  const top: Ring = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const right: Ring = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)];
  const left: Ring = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)];
  const g = 0.35; // shadow falls back-right
  const shadow: Ring = [P(x, y, 0), P(x + w + h * g, y, 0), P(x + w + h * g, y + d + h * g * 0.5, 0), P(x, y + d + h * g * 0.5, 0)];
  return {
    hue,
    faces: [
      { ring: left, tone: 1 },
      { ring: right, tone: 2 },
      { ring: top, tone: 0 },
    ],
    edges: [
      [...top, top[0]],
      [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y, z)],
      [P(x, y + d, z), P(x, y + d, z + h)],
      [P(x + w, y + d, z), P(x + w, y + d, z + h)],
      [P(x + w, y, z), P(x + w, y, z + h)],
    ],
    shadow,
  };
};

const ell = (cx: number, cy: number, z: number, r: number, a0: number, a1: number, v: View, n = 28): Pt[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return iso(cx + r * Math.cos(a), cy + r * Math.sin(a), z, v);
  });

export const cylinder = (cx: number, cy: number, z: number, r: number, h: number, v: View, hue: string): Solid => {
  const top = ell(cx, cy, z + h, r, 0, 360, v, 48);
  const sideFront = [...ell(cx, cy, z, r, -45, 135, v), ...ell(cx, cy, z + h, r, 135, -45, v)];
  // split the side into a lit half and a shade half at the front meridian (45 deg)
  const lit = [...ell(cx, cy, z, r, 45, 135, v, 14), ...ell(cx, cy, z + h, r, 135, 45, v, 14)];
  const shade = [...ell(cx, cy, z, r, -45, 45, v, 14), ...ell(cx, cy, z + h, r, 45, -45, v, 14)];
  const shadow = ell(cx + h * 0.3, cy + h * 0.1, 0, r * 1.05, 0, 360, v, 36);
  return {
    hue,
    faces: [
      { ring: sideFront, tone: 1 },
      { ring: lit, tone: 1 },
      { ring: shade, tone: 2 },
      { ring: top, tone: 0 },
    ],
    edges: [top, ell(cx, cy, z, r, -45, 135, v), [iso(cx + r * C * 0.0 + r * Math.cos(-Math.PI / 4), cy + r * Math.sin(-Math.PI / 4), z, v), iso(cx + r * Math.cos(-Math.PI / 4), cy + r * Math.sin(-Math.PI / 4), z + h, v)], [iso(cx + r * Math.cos((3 * Math.PI) / 4), cy + r * Math.sin((3 * Math.PI) / 4), z, v), iso(cx + r * Math.cos((3 * Math.PI) / 4), cy + r * Math.sin((3 * Math.PI) / 4), z + h, v)]],
    shadow,
  };
};

/** A sphere (ball, globe, fruit): one disc with a lit cap and a shade crescent. */
export const sphere = (cx: number, cy: number, z: number, r: number, v: View, hue: string): Solid => {
  const [sx, sy] = iso(cx, cy, z + r, v);
  const R = r * v.k;
  const disc: Ring = Array.from({ length: 48 }, (_, i) => [sx + R * Math.cos((i / 48) * Math.PI * 2), sy + R * Math.sin((i / 48) * Math.PI * 2)]);
  const cap: Ring = Array.from({ length: 32 }, (_, i) => [sx - R * 0.25 + R * 0.55 * Math.cos((i / 32) * Math.PI * 2), sy - R * 0.3 + R * 0.45 * Math.sin((i / 32) * Math.PI * 2)]);
  const shade: Ring = [
    ...Array.from({ length: 25 }, (_, i) => {
      const a = (-0.15 + (i / 24) * 1.3) * Math.PI;
      return [sx + R * Math.cos(a), sy + R * Math.sin(a)] as Pt;
    }),
    ...Array.from({ length: 25 }, (_, i) => {
      const a = (1.15 - (i / 24) * 1.3) * Math.PI;
      return [sx + R * 0.15 + R * 0.82 * Math.cos(a), sy - R * 0.05 + R * 0.9 * Math.sin(a)] as Pt;
    }),
  ];
  const [gx, gy] = iso(cx + r * 0.4, cy + r * 0.2, 0, v);
  const shadow: Ring = Array.from({ length: 32 }, (_, i) => [gx + R * 1.1 * Math.cos((i / 32) * Math.PI * 2), gy + R * 0.45 * Math.sin((i / 32) * Math.PI * 2)]);
  return { hue, faces: [{ ring: disc, tone: 1 }, { ring: shade, tone: 2 }, { ring: cap, tone: 0 }], edges: [[...disc, disc[0]]], shadow };
};

/** Lift a solid by dy screen px and scale about its base (for drops and pops). */
export const moveSolid = (s: Solid, dyIn: number, scaleIn = 1, about?: Pt): Solid => {
  // settle the spring tail to exactly zero so a resting object paints the same picture every frame (cache hit)
  const dy = Math.abs(dyIn) > 0.5 ? dyIn : 0;
  const scale = Math.abs(scaleIn - 1) > 0.002 ? scaleIn : 1;
  const a = about ?? s.shadow[0] ?? s.faces[0].ring[0];
  const m = (p: Pt): Pt => [a[0] + (p[0] - a[0]) * scale, a[1] + (p[1] - a[1]) * scale + dy];
  return {
    ...s,
    rest: scale === 1 ? (s.rest ?? s) : undefined,
    dy: (s.dy ?? 0) + dy,
    faces: s.faces.map((f) => ({ ...f, ring: f.ring.map(m) })),
    edges: s.edges.map((e) => e.map(m)),
    detail: s.detail?.map((d) => ({ ...d, pts: d.pts.map(m) })),
    shadow: s.shadow.map((p) => [a[0] + (p[0] - a[0]) * scale, a[1] + (p[1] - a[1]) * scale] as Pt),
  };
};

const tones = (hue: string): [string, string, string] => [lighten(hue, 0.16), hue, mix(lighten(hue, -0.14), "#1d2240", 0.18)];

/** Outline of a solid: union of its faces (polygon-clipping). */
export const silhouette = (s: Solid): Ring[] => union(...s.faces.map((f) => f.ring)).map((poly) => poly[0]);

/**
 * Draws solids, listed BACK TO FRONT, with the three tools:
 *   p5.brush   an opaque paper underpaint per object (so it hides what is behind it), then the three face washes
 *   roughjs    hachure on the shade faces
 *   perfect-freehand  the edges
 * Hidden lines: each object's hatch and pen are masked by the union of the silhouettes in front of it
 * (polygon-clipping), so back edges never draw across a front object.
 */
export const Solids: React.FC<{ solids: Solid[]; f: number; seed?: number; ink?: string; shadowInk?: string; hatch?: boolean; washOpacity?: number; id?: string }> = ({ solids, f, seed = 3, ink, shadowInk = "#7d7a86", hatch = true, washOpacity = 150, id = "sol" }) => {
  const look = useLook();
  const { width: W, height: H } = useVideoConfig();
  const sil = solids.map(silhouette);
  // each object is a cached watercolour sprite painted once at rest and translated while it falls; an opaque paper
  // silhouette under it hides whatever is behind (the sprite itself is multiplied, like ink on paper)
  return (
    <>
      {solids.map((s, i) => (s.shadow.length > 2 ? <Sprite key={`sh${i}`} shapes={[{ ring: (s.rest ?? s).shadow, color: shadowInk, opacity: 70, bleed: 0.12, texture: 0.4 }]} seed={seed + i * 13} /> : null))}
      {solids.map((s, i) => {
        const r = s.rest ?? s;
        const t = tones(s.hue);
        const dy = s.rest ? (s.dy ?? 0) : 0;
        return (
          <React.Fragment key={i}>
            {s.decal ? null : (
              <Svg>
                <path d={mpD(union(...sil[i]))} fill={look.paper} />
              </Svg>
            )}
            <Sprite shapes={r.faces.map((fc) => ({ ring: fc.ring, color: t[fc.tone], opacity: washOpacity, bleed: 0.02, texture: 0.5 }))} seed={seed + i * 7} dy={dy} />
          </React.Fragment>
        );
      })}
      <Svg>
        <defs>
          {solids.map((_, i) => {
            const front = sil.slice(i + 1).flat();
            if (!front.length) return null;
            return (
              <mask key={i} id={`${id}m${i}`} maskUnits="userSpaceOnUse" x={-W} y={-H} width={W * 3} height={H * 3}>
                <rect x={-W} y={-H} width={W * 3} height={H * 3} fill="#fff" />
                <path d={mpD(union(...front))} fill="#000" />
              </mask>
            );
          })}
        </defs>
        {solids.map((s, i) => {
          const t = tones(s.hue);
          const sk: SketchShape[] = hatch
            ? s.faces.filter((fc) => fc.tone === 2).map((fc) => ({ ring: fc.ring, fill: t[2], stroke: "none", hachureGap: 6, hachureAngle: -60, fillWeight: 0.35, roughness: 0.9, opacity: 0.55 }))
            : [];
          const pen: Stroke[] = [...s.edges.map((e) => ({ pts: e, size: 0.42, color: ink, taper: 8 })), ...(s.detail ?? [])];
          return (
            <g key={i} mask={i < solids.length - 1 ? `url(#${id}m${i})` : undefined}>
              <g style={{ mixBlendMode: "multiply" }}>
                <SketchPaths shapes={sk} f={f} hold={3} />
              </g>
              <PenPaths strokes={pen} f={f} />
            </g>
          );
        })}
      </Svg>
    </>
  );
};
