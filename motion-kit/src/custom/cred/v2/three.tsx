import React, { useMemo } from "react";
import { staticFile, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { engrave, hexToVec3, setU, type EOpts, type Pal } from "./engrave.ts";

type V3 = [number, number, number];

/** Camera driven by the Remotion frame only (deterministic). roll in radians about the view axis. */
export const Cam: React.FC<{ pos: V3; target: V3; fov?: number; roll?: number }> = ({ pos, target, fov = 35, roll = 0 }) => {
  const { camera } = useThree();
  const cam = camera as THREE.PerspectiveCamera;
  cam.fov = fov;
  cam.near = 0.05;
  cam.far = 800;
  cam.position.set(...pos);
  cam.up.set(Math.sin(roll), Math.cos(roll), 0);
  cam.lookAt(new THREE.Vector3(...target));
  cam.updateProjectionMatrix();
  return null;
};

/** Transparent full-frame 3D layer. */
export const World: React.FC<{ children: React.ReactNode; aa?: boolean; style?: React.CSSProperties }> = ({ children, aa = false, style }) => {
  const { width, height } = useVideoConfig();
  return (
    <ThreeCanvas
      width={width}
      height={height}
      dpr={1}
      linear
      flat
      style={{ position: "absolute", inset: 0, ...style }}
      gl={{ antialias: aa, alpha: true, preserveDrawingBuffer: true }}
    >
      {children}
    </ThreeCanvas>
  );
};

export type Live = { foilPhase?: number; dim?: number; opacity?: number; atmos?: number; pal?: Pal };

const setPal = (m: THREE.Material, pal?: Pal) => {
  if (!pal) return;
  const u = (m as THREE.ShaderMaterial).uniforms;
  pal.forEach(([h], i) => u.uStops.value[i].copy(hexToVec3(h)));
};

const liveU = (l?: Live) => {
  const u: Record<string, number> = {};
  if (!l) return u;
  if (l.foilPhase !== undefined) u.uFoilPhase = l.foilPhase;
  if (l.dim !== undefined) u.uDim = l.dim;
  if (l.opacity !== undefined) u.uOpacity = l.opacity;
  if (l.atmos !== undefined) u.uAtmos = l.atmos;
  return u;
};

/** One engraved mesh. `m` is fixed per mesh (memoised by geometry); `live` uniforms may change per frame. */
export const EMesh: React.FC<{
  g: THREE.BufferGeometry;
  m: EOpts;
  pos?: V3;
  rot?: V3;
  scale?: number | V3;
  live?: Live;
  double?: boolean;
}> = ({ g, m, pos, rot, scale, live, double }) => {
  const { width, height } = useVideoConfig();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mat = useMemo(() => {
    const x = engrave({ res: [width, height], ...m });
    if (double) x.side = THREE.DoubleSide;
    if (m.opacity !== undefined || live?.opacity !== undefined) x.transparent = true;
    return x;
  }, [g, width, height]);
  setU(mat, liveU(live));
  setPal(mat, live?.pal);
  return <mesh geometry={g} material={mat} position={pos} rotation={rot} scale={scale} />;
};

/** CC0 glTF (Poly Haven) through the engraving material; the base-colour map becomes the tone albedo.
 * Normalised: centred on X/Z, bottom at y=0, largest dimension = size. */
export const Gltf: React.FC<{
  url: string;
  size: number;
  m: Omit<EOpts, "map">;
  pos?: V3;
  rot?: V3;
  live?: Live;
  pick?: (name: string, i: number) => boolean;
  perMaterial?: (matName: string) => Partial<EOpts>;
}> = ({ url, size, m, pos, rot, live, pick, perMaterial }) => {
  const { width, height } = useVideoConfig();
  const gltf = useLoader(GLTFLoader, staticFile(url));
  const { obj, mats } = useMemo(() => {
    const root = gltf.scene.clone(true);
    const mats: THREE.ShaderMaterial[] = [];
    let i = 0;
    const drop: THREE.Object3D[] = [];
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      if (pick && !pick(mesh.name, i++)) {
        drop.push(mesh);
        return;
      }
      const src = mesh.material as THREE.MeshStandardMaterial;
      const map = src.map ?? null;
      if (map) map.colorSpace = THREE.NoColorSpace;
      const extra = perMaterial ? perMaterial(src.name) : {};
      const mat = engrave({ res: [width, height], albedoNoise: 0.15, noiseScale: 30, mapAmt: 0.8, ...m, ...extra, map });
      mat.side = THREE.DoubleSide;
      mesh.material = mat;
      mats.push(mat);
    });
    drop.forEach((d) => d.parent?.remove(d));
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const s = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    const k = size / Math.max(s.x, s.y, s.z);
    root.position.set(-c.x, -box.min.y, -c.z);
    const wrap = new THREE.Group();
    wrap.add(root);
    wrap.scale.setScalar(k);
    return { obj: wrap, mats };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gltf, size, width, height]);
  for (const x of mats) {
    setU(x, liveU(live));
    setPal(x, live?.pal);
  }
  return (
    <group position={pos} rotation={rot}>
      <primitive object={obj} />
    </group>
  );
};

export const M = {
  suitcase: "custom/cred-v2/models/vintage_suitcase/vintage_suitcase_1k.gltf",
  box: "custom/cred-v2/models/cardboard_box_01/cardboard_box_01_1k.gltf",
  camera: "custom/cred-v2/models/Camera_01/Camera_01_1k.gltf",
  watch: "custom/cred-v2/models/vintage_pocket_watch/vintage_pocket_watch_1k.gltf",
  vase: "custom/cred-v2/models/brass_vase_03/brass_vase_03_1k.gltf",
};
