import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Cam, World } from "./three.tsx";
import { cardBody, roundRect } from "./models.ts";
import { Paper, Sheen } from "./fx.tsx";
import { C, SERIF, T, easeIn, expoOut, lerp, ramp } from "./look.ts";

/**
 * Product shot: the card as clean CG (no line screen, as the reference's product worlds) in a LIGHT seamless studio
 * (CRITIQUE 5: not a black studio), copy on the RIGHT, exit by flipping the card to its back and cutting on the flip.
 * Card art is ours (no logos): graphite face, engraved silver guilloche, rosette, hex cartouche, chip, holo strip.
 */

const BAND = ["#f1caca", "#fbd8b9", "#fcd8a3", "#fadba3", "#ebdbaf", "#c7e5d2", "#a3c8e4", "#8daad3", "#89a0c8", "#889bbc"];

const faceTexture = (back = false) => {
  const W = 2048, H = 1292;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d")!;
  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#5b5b64");
  g.addColorStop(0.5, "#3c3c44");
  g.addColorStop(1, "#60606a");
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  // guilloche rings from the top-right (the film's opening family)
  x.strokeStyle = "rgba(225,225,238,0.34)";
  x.lineWidth = 2;
  for (let i = 0; i < 70; i++) {
    x.beginPath();
    for (let k = 0; k <= 300; k++) {
      const a = Math.PI * 0.45 + (k / 300) * Math.PI * 0.65;
      const r = 500 + i * 26 + 13 * Math.sin(31 * a + i * 0.08);
      const px = W * 1.05 + r * Math.cos(a), py = -H * 0.25 + r * Math.sin(a);
      if (k) x.lineTo(px, py);
      else x.moveTo(px, py);
    }
    x.stroke();
  }
  if (!back) {
    // rosette
    x.strokeStyle = "rgba(225,225,235,0.55)";
    x.lineWidth = 1.6;
    for (let i = 0; i < 26; i++) {
      x.beginPath();
      const R = 300 * (0.55 + 0.45 * (i / 26));
      for (let k = 0; k <= 360; k++) {
        const t = (k / 360) * Math.PI * 2;
        const r = R + 300 * 0.09 * Math.sin(14 * t + i * 0.37);
        const px = 1650 + r * Math.cos(t), py = 430 + r * Math.sin(t);
        if (k) x.lineTo(px, py);
        else x.moveTo(px, py);
      }
      x.stroke();
    }
    // chip
    const cg = x.createLinearGradient(300, 520, 540, 700);
    cg.addColorStop(0, "#d8c79a");
    cg.addColorStop(0.5, "#a88f58");
    cg.addColorStop(1, "#e3d5ad");
    x.fillStyle = cg;
    x.beginPath();
    x.roundRect(300, 520, 240, 182, 30);
    x.fill();
    x.strokeStyle = "rgba(60,45,20,0.7)";
    x.lineWidth = 3;
    x.beginPath();
    x.moveTo(420, 520); x.lineTo(420, 575); x.moveTo(300, 585); x.lineTo(385, 585); x.moveTo(455, 585); x.lineTo(540, 585);
    x.moveTo(300, 640); x.lineTo(385, 640); x.moveTo(455, 640); x.lineTo(540, 640); x.moveTo(420, 650); x.lineTo(420, 702);
    x.stroke();
    x.strokeRect(385, 575, 70, 75);
    // hex cartouche
    x.save();
    x.translate(560, 980);
    x.strokeStyle = "rgba(225,225,235,0.6)";
    for (let i = 0; i < 26; i++) {
      x.lineWidth = i === 25 ? 5 : 1.4;
      const r = 40 + i * 5.6;
      x.beginPath();
      for (let k = 0; k <= 6; k++) {
        const a = (Math.PI / 3) * k + Math.PI / 6;
        const px = r * Math.cos(a), py = r * Math.sin(a);
        if (k) x.lineTo(px, py);
        else x.moveTo(px, py);
      }
      x.stroke();
    }
    x.restore();
    // "5%" outline column
    x.save();
    x.font = "700 70px Newsreader";
    x.strokeStyle = "rgba(225,225,235,0.5)";
    x.lineWidth = 1.8;
    for (let i = 0; i < 7; i++) {
      x.save();
      x.translate(1930, 170 + i * 150);
      x.rotate(-Math.PI / 2);
      x.strokeText("5%", -35, 0);
      x.restore();
    }
    x.restore();
  } else {
    // back: magnetic stripe + signature panel
    x.fillStyle = "#0b0b0d";
    x.fillRect(0, 150, W, 230);
    x.fillStyle = "#d9d6cf";
    x.fillRect(120, 470, 1100, 150);
  }
  // diagonal holographic strip
  x.save();
  x.translate(back ? 600 : 1380, 646);
  x.rotate((-62 * Math.PI) / 180);
  const sg = x.createLinearGradient(-900, 0, 900, 0);
  for (let cyc = 0; cyc < 3; cyc++) BAND.forEach((col, i) => sg.addColorStop(Math.min(1, (cyc + (0.9 * i) / 9) / 3), col));
  x.fillStyle = sg;
  x.fillRect(-900, -44, 1800, 88);
  x.restore();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
};

const Env: React.FC = () => {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pm = new THREE.PMREMGenerator(gl);
    scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 1.1;
  }, [gl, scene]);
  return null;
};

const Card: React.FC<{ f: number }> = ({ f }) => {
  const { fps } = useVideoConfig();
  const lf = f - T.studio;
  const geo = useMemo(() => {
    const body = cardBody();
    const face = new THREE.ShapeGeometry(roundRect(8.56, 5.398, 0.32), 12);
    const uv = face.getAttribute("uv") as THREE.BufferAttribute;
    const pos = face.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / 8.56 + 0.5, pos.getY(i) / 5.398 + 0.5);
    return { body, face };
  }, []);
  const mats = useMemo(() => {
    const front = new THREE.MeshPhysicalMaterial({ map: faceTexture(false), roughness: 0.32, metalness: 0.35, clearcoat: 0.8, clearcoatRoughness: 0.15 });
    const back = new THREE.MeshPhysicalMaterial({ map: faceTexture(true), roughness: 0.4, metalness: 0.3, clearcoat: 0.6 });
    const body = new THREE.MeshPhysicalMaterial({ color: "#1a1a1e", roughness: 0.3, metalness: 0.6 });
    return { front, back, body };
  }, []);
  // entrance carrying the whip energy (down-left), roll 12 -> 0 on a spring
  const e = interpolate(lf, [0, 31], [0, 1], { ...C, easing: expoOut });
  const sp = spring({ frame: lf, fps, config: { stiffness: 158, damping: 25 } });
  const roll = THREE.MathUtils.degToRad(12 * (1 - sp));
  const x = lerp(9.5, -4.0, e) - Math.max(0, lf - 31) * 0.004;
  const y = lerp(6.5, 0.3, e);
  const sc = lerp(0.75, 0.92, e);
  const flip = ramp(f, T.flip, T.lockup, easeIn);
  const yaw = THREE.MathUtils.degToRad(-24 + lf * 0.12) + Math.PI * flip;
  const pitch = THREE.MathUtils.degToRad(-8);
  const glint = (lf / 24) * 0.6;
  mats.front.clearcoatRoughness = 0.12 + 0.05 * Math.sin(glint);
  return (
    <group position={[x, y, 0]} rotation={[pitch, yaw, roll]} scale={sc}>
      <mesh geometry={geo.body} material={mats.body} />
      <mesh geometry={geo.face} material={mats.front} position={[0, 0, 0.0425]} />
      <mesh geometry={geo.face} material={mats.back} position={[0, 0, -0.0425]} rotation={[0, Math.PI, 0]} />
    </group>
  );
};

export const StudioTake: React.FC = () => {
  const lf = useCurrentFrame();
  const f = lf + T.studio;
  const glow = ramp(f, 572, 620);
  const copyIn = ramp(f, 572, 588, expoOut);
  const copyOut = ramp(f, T.flip, T.flip + 14, easeIn);
  const keyAng = (lf / 84) * 0.5;
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #ecebe7 0%, #dcd8d0 58%, #c9c3b8 100%)" }}>
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 60% 45% at 38% 100%, rgba(255,255,255,0.95), rgba(255,255,255,0.35) 45%, rgba(255,255,255,0) 85%)", opacity: glow }} />
      {/* soft contact shadow */}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse 22% 4% at 35% 80%, rgba(40,36,30,0.28), rgba(40,36,30,0) 100%)", opacity: ramp(f, 566, 590) * (1 - ramp(f, T.flip, T.flip + 12)) }} />
      <World>
        <Cam pos={[0, 0.6, 16]} target={[0, 0.3, 0]} fov={34} />
        <Env />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-6 + Math.sin(keyAng) * 3, 5, 6]} intensity={1.8} color="#fff6ea" />
        <directionalLight position={[8, 2, -6]} intensity={2.4} color="#874bf9" />
        <directionalLight position={[-8, 3, -5]} intensity={1.6} color="#ffffff" />
        <Card f={f} />
      </World>
      <Paper id="studio" mottle={0.02} grain={0.06} />
      <div style={{ position: "absolute", left: 0.585 * 1920 + (0.03 * (1 - copyIn) + 0.05 * copyOut) * 1920, top: 0.4 * 1080, opacity: copyIn * (1 - copyOut) }}>
        <Sheen t={lf / 24} ink="#2e2e33" sheen="#a7a7b4" boxW={800} fontSize={112} fontFamily={SERIF} letterSpacing="-0.03em" opsz>
          zero joining fee
        </Sheen>
      </div>
    </AbsoluteFill>
  );
};
