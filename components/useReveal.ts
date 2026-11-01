"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Reveals direct children marked [data-reveal] once, on scroll. Respects reduced motion. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", ref.current).forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0 },
          { clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}
