"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Process.module.scss";

const steps = [
  ["Understand the need", "Start with the person, the context and the problem—not a favourite tool."],
  ["Choose a clear direction", "Reduce the idea to the simplest useful experience and make the priorities visible."],
  ["Build in small steps", "Create a working version, check the details and test the important interactions."],
  ["Review what shipped", "Fix what is confusing, document the decisions and be honest about what still needs work."],
];

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-line]", { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "0 50%",
        scrollTrigger: { trigger: "[data-steps]", start: "top 75%", end: "bottom 60%", scrub: true } });
      gsap.from("[data-step]", { y: 24, opacity: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: "[data-steps]", start: "top 80%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className={s.sec} aria-labelledby="pr-t">
      <p className="mono" data-reveal>Chapter 05 / How I approach a build</p>
      <h2 id="pr-t" className={s.h}>A practical process, not decoration.</h2>
      <div className={s.steps} data-steps>
        <span className={s.line} data-line aria-hidden="true" />
        <ol>
          {steps.map(([t, d], i) => (
            <li key={t} data-step><span className="mono">{String(i + 1).padStart(2, "0")}</span><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
