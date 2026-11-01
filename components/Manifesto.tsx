"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Manifesto.module.scss";

const text = "I like turning rough ideas into clear, useful experiences. I care about how something works, how it looks, and whether it genuinely helps the person using it.";
const facts = [
  ["Current focus", "Building web projects while strengthening my programming and frontend fundamentals."],
  ["Creative practice", "Exploring promotional design and simple digital touchpoints for local businesses."],
  ["Long-term direction", "Growing into a software engineer, then building deeper expertise in AI and machine learning."],
];

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-w]", { opacity: 0.18 }, { opacity: 1, stagger: 0.1, ease: "none",
        scrollTrigger: { trigger: "[data-block]", start: "top 78%", end: "bottom 50%", scrub: true } });
      gsap.from("[data-fact]", { y: 28, opacity: 0, duration: 0.75, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: "[data-facts]", start: "top 85%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className={s.sec} aria-label="Introduction">
      <p className={s.big} data-block>{text.split(" ").map((w, i) => <span key={i} data-w>{w} </span>)}</p>
      <dl className={s.facts} data-facts>
        {facts.map(([t, d]) => <div key={t} data-fact><dt className="mono">{t}</dt><dd>{d}</dd></div>)}
      </dl>
    </section>
  );
}
