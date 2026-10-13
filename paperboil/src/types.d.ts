// p5.brush ships untyped JS. Only the standalone build is used (no p5.js).
declare module "p5.brush/standalone" {
  type Point = [number, number] | [number, number, number];
  export function load(canvas: HTMLCanvasElement | OffscreenCanvas): void;
  export function seed(n: number): void;
  export function noiseSeed(n: number): void;
  export function clear(color?: string): void;
  export function render(): void;
  export function push(): void;
  export function pop(): void;
  export function translate(x: number, y: number): void;
  export function rotate(angle: number): void;
  export function scale(x: number, y?: number): void;
  export function scaleBrushes(n: number): void;
  export function set(name: string, color: string, weight: number): void;
  export function noStroke(): void;
  export function fill(color: string, opacity?: number): void;
  export function noFill(): void;
  export function fillBleed(strength: number, direction?: "in" | "out", angle?: number): void;
  export function fillTexture(texture?: number, border?: number, scatter?: boolean): void;
  export function wash(color: string, opacity?: number): void;
  export function noWash(): void;
  export function polygon(points: Point[]): unknown;
  export function spline(points: Point[], curvature?: number): void;
  export function line(x1: number, y1: number, x2: number, y2: number): void;
  export function circle(x: number, y: number, radius: number, irregular?: boolean | number): void;
  export function rect(x: number, y: number, w: number, h: number, mode?: "corner" | "center"): void;
}
