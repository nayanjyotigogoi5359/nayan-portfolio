"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "./useReveal";
import s from "./Frontier.module.scss";

const now = ["JavaScript & Java foundations", "Frontend development", "Software engineering", "AI / ML foundations"];

export default function Frontier() {
  const ref = useReveal<HTMLElement>();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-ring]", { scale: 0.15, opacity: 0 }, { scale: 3.2, opacity: 0.7, stagger: 0.12, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    }, ref);
    return () => ctx.revert();
  }, [ref]);
  return (
    <section id="frontier" ref={ref} className={s.sec} aria-labelledby="fr-t">
      <div className={s.tunnel} aria-hidden="true">{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} className={s.ring} data-ring />)}</div>
      <div className={s.content}>
        <p className="mono" data-reveal>Chapter 06 / The next frontier</p>
        <h2 id="fr-t" className={s.h} data-reveal>Building the foundations for a career in software engineering and AI/ML.</h2>
        <p className={s.p} data-reveal>
          My long-term goal is to become a software engineer, build useful products and work with people beyond my local market. AI and machine learning are where I want to grow next. For now, the priority is stronger fundamentals, consistent practice and projects I can explain properly.
        </p>
        <ul className={s.now} data-reveal aria-label="Current focus">
          {now.map((n) => <li key={n}>{n}</li>)}
        </ul>
      </div>
    </section>
  );
}
