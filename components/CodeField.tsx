"use client";
import { useEffect, useRef } from "react";
import s from "./CodeField.module.scss";

const CHARS = "01{}<>/=()[];#$*+&|%".split("");
type Cell = { x: number; y: number; a: number; b: number };

/** Draws a processor chip (in cell units) used as a mask for the dot grid. */
function drawShape(c: CanvasRenderingContext2D, W: number, H: number) {
  const s = Math.min(W, H), cx = W / 2, cy = H / 2;
  c.strokeStyle = c.fillStyle = "#fff"; c.lineCap = "round"; c.lineJoin = "round";
  c.lineWidth = 2.2; c.strokeRect(cx - 0.22 * s, cy - 0.22 * s, 0.44 * s, 0.44 * s);
  c.lineWidth = 1.3; c.strokeRect(cx - 0.13 * s, cy - 0.13 * s, 0.26 * s, 0.26 * s);
  c.font = `700 ${Math.max(5, 0.1 * s)}px monospace`; c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText("</>", cx, cy);
  c.lineWidth = 1.1;
  const dot = (x: number, y: number) => { c.beginPath(); c.arc(x, y, 1, 0, Math.PI * 2); c.fill(); };
  const line = (x1: number, y1: number, x2: number, y2: number) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); dot(x2, y2); };
  for (let i = 0; i < 6; i++) {
    const o = (-0.165 + i * 0.066) * s, len = (0.1 + ((i * 2) % 3) * 0.035) * s, e = 0.22 * s;
    line(cx + o, cy - e, cx + o, cy - e - len);
    line(cx + o, cy + e, cx + o, cy + e + len);
    line(cx - e, cy + o, cx - e - len, cy + o);
    line(cx + e, cy + o, cx + e + len, cy + o);
  }
}

export default function CodeField() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current, canvas = cv.current;
    if (!wrapEl || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const fam = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() || "monospace";
    let cells: Cell[] = [], W = 0, H = 0;
    let cX = -9999, cY = -9999, mx = -9999, my = -9999, power = 0, target = 0;
    let raf = 0, running = false, visible = true;

    const build = () => {
      const r = wrapEl.getBoundingClientRect();
      W = r.width; H = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cell = W < 480 ? 11 : 14, cols = Math.floor(W / cell), rows = Math.floor(H / cell);
      const m = document.createElement("canvas"); m.width = cols; m.height = rows;
      const mc = m.getContext("2d");
      if (!mc || !cols || !rows) { cells = []; return; }
      drawShape(mc, cols, rows);
      const d = mc.getImageData(0, 0, cols, rows).data, ox = (W - cols * cell) / 2, oy = (H - rows * cell) / 2;
      cells = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++)
        if (d[(j * cols + i) * 4 + 3] > 90) cells.push({ x: ox + (i + 0.5) * cell, y: oy + (j + 0.5) * cell, a: Math.random(), b: Math.random() });
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      mx += (cX - mx) * 0.2; my += (cY - my) * 0.2; power += (target - power) * 0.08;
      const R = 130;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      for (const c of cells) {
        const dx = c.x - mx, dy = c.y - my, d = Math.hypot(dx, dy) || 1;
        const k = Math.max(0, 1 - d / R), e = k * k * (3 - 2 * k) * power;
        if (e < 0.04) {
          const wave = 0.5 + 0.5 * Math.sin(t * 0.0012 + (c.x + c.y) * 0.018);
          ctx.fillStyle = `rgba(112,183,255,${0.2 + 0.18 * wave})`;
          ctx.fillRect(c.x - 0.8, c.y - 0.8, 1.6, 1.6);
          continue;
        }
        const ch = CHARS[Math.floor(c.a * CHARS.length + t * 0.012 * (0.4 + c.b)) % CHARS.length];
        ctx.font = `${9 + e * 7}px ${fam}`;
        const w = e * e;
        ctx.fillStyle = `rgba(${Math.round(112 + 143 * w)},${Math.round(183 + 72 * w)},255,${0.35 + 0.65 * e})`;
        ctx.fillText(ch, c.x + (dx / d) * e * 8, c.y + (dy / d) * e * 8);
      }
    };

    const tick = (t: number) => {
      if (!running) return;
      if (fine) {
        const r = wrapEl.getBoundingClientRect(); // follows scroll as well as the pointer
        cX = lastX - r.left; cY = lastY - r.top;
      } else { cX = W * (0.5 + 0.32 * Math.sin(t * 0.0006)); cY = H * (0.5 + 0.3 * Math.sin(t * 0.0009 + 1)); target = 0.9; }
      draw(t);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!fine) { draw(0); return; }
      if (!running && visible && !document.hidden) { running = true; raf = requestAnimationFrame(tick); }
    };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    let lastX = -9999, lastY = -9999;
    const move = (e: PointerEvent) => { lastX = e.clientX; lastY = e.clientY; target = 1; };
    const leave = () => { target = 0; };
    const vis = () => (document.hidden ? stop() : start());

    build();
    const ro = new ResizeObserver(() => { build(); if (reduce || !fine) draw(0); });
    ro.observe(wrapEl);
    if (reduce) { draw(0); return () => ro.disconnect(); }

    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); });
    io.observe(wrapEl);
    if (fine) { window.addEventListener("pointermove", move); document.addEventListener("pointerleave", leave); }
    document.addEventListener("visibilitychange", vis);
    start();
    return () => {
      stop(); ro.disconnect(); io.disconnect();
      window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return <div ref={wrap} className={s.wrap} aria-hidden="true"><canvas ref={cv} className={s.cv} /></div>;
}
