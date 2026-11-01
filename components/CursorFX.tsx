"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import s from "./CursorFX.module.scss";

/**
 * Dot (instant) + ring (eased, stretches with speed).
 * Over links/buttons the ring morphs into a frame around the element and is gently pulled toward the pointer.
 */
export default function CursorFX() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const spot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ring.current!, d = dot.current!, sp = spot.current!;
    gsap.set([r, d], { xPercent: -50, yPercent: -50 });
    const rx = gsap.quickTo(r, "x", { duration: 0.6, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.6, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.1, ease: "power2" });
    const dy = gsap.quickTo(d, "y", { duration: 0.1, ease: "power2" });
    let hovered: HTMLElement | null = null, px = 0, py = 0, lx = 0, ly = 0, lt = 0, idle = 0;

    const center = (el: HTMLElement) => { const b = el.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2] as const; };
    const follow = () => {
      if (hovered) { const [cx, cy] = center(hovered); rx(cx + (px - cx) * 0.2); ry(cy + (py - cy) * 0.2); }
      else { rx(px); ry(py); }
    };
    const shape = (el: HTMLElement | null) => {
      if (el) {
        const b = el.getBoundingClientRect();
        gsap.to(r, { width: b.width + 18, height: b.height + 12, borderRadius: 2, rotation: 0, scaleX: 1, scaleY: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        gsap.to(d, { scale: 0, duration: 0.25 });
        r.dataset.mode = "link";
      } else {
        gsap.to(r, { width: 36, height: 36, borderRadius: 18, duration: 0.45, ease: "power3.out", overwrite: "auto" });
        gsap.to(d, { scale: 1, duration: 0.25 });
        r.dataset.mode = "free";
      }
    };

    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      dx(px); dy(py); follow();
      sp.style.setProperty("--mx", `${px}px`); sp.style.setProperty("--my", `${py}px`);
      r.dataset.on = d.dataset.on = sp.dataset.on = "1";
      if (!hovered) { // stretch the ring along the direction of travel
        const now = performance.now(), dt = Math.max(now - lt, 8);
        const vx = (px - lx) / dt, vy = (py - ly) / dt, v = Math.hypot(vx, vy);
        if (v > 0.15) gsap.to(r, { rotation: (Math.atan2(vy, vx) * 180) / Math.PI, scaleX: 1 + Math.min(v * 0.22, 0.55), scaleY: 1 - Math.min(v * 0.05, 0.14), duration: 0.2, overwrite: "auto" });
        clearTimeout(idle);
        idle = window.setTimeout(() => gsap.to(r, { scaleX: 1, scaleY: 1, duration: 0.7, ease: "elastic.out(1, 0.5)", overwrite: "auto" }), 80);
        lx = px; ly = py; lt = now;
      }
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("a,button");
      if (el !== hovered) { hovered = el; shape(el); follow(); }
    };
    const down = () => gsap.to(d, { scale: hovered ? 0 : 2.6, duration: 0.2 });
    const up = () => gsap.to(d, { scale: hovered ? 0 : 1, duration: 0.3, ease: "back.out(2)" });
    const leave = () => { r.dataset.on = d.dataset.on = sp.dataset.on = "0"; };
    const scroll = () => { if (hovered) follow(); };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("scroll", scroll, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      clearTimeout(idle);
      window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down); window.removeEventListener("pointerup", up);
      window.removeEventListener("scroll", scroll); document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (<>
    <div ref={spot} className={s.spot} aria-hidden="true" />
    <div ref={ring} className={s.ring} aria-hidden="true" />
    <div ref={dot} className={s.dot} aria-hidden="true" />
  </>);
}
