"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/content";
import CodeField from "./CodeField";
import s from "./Hero.module.scss";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-line]", { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.15 });
      gsap.from("[data-fade]", { opacity: 0, y: 12, duration: 0.8, delay: 0.7, stagger: 0.08 });
      gsap.from("[data-stage]", { opacity: 0, scale: 0.94, duration: 1.5, ease: "power3.out", delay: 0.2 });
      gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } })
        .to("[data-stage]", { scale: 1.1, yPercent: -6, ease: "none" }, 0)
        .to("[data-copy]", { yPercent: -14, opacity: 0.25, ease: "none" }, 0);
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="entry" ref={root} className={s.hero} aria-labelledby="hero-title">
      <div className={s.gridbg} aria-hidden="true" />
      <div className={s.stage} data-stage aria-hidden="true"><CodeField /></div>

      <div className={`mono ${s.hud} ${s.tl}`} data-fade>{profile.name} / Portfolio<br />{profile.location}</div>
      <div className={`mono ${s.hud} ${s.tr}`} data-fade>Status: learning + building<br />Chapter 01 / Entry</div>

      <div data-copy className={s.copy}>
        <p className={`mono ${s.meta}`} data-fade>{profile.role}</p>
        <h1 id="hero-title" className={s.title}>
          <span className={s.mask}><span data-line>Curious by nature.</span></span>
          <span className={s.mask}><span data-line className={s.blue}>Built to create.</span></span>
        </h1>
        <div className={s.foot}>
          <p className={s.intro} data-fade>
            I'm Nayan. I'm building a foundation in software engineering through web projects, visual design experiments and ideas for local businesses.
          </p>
          <div className={s.cta} data-fade>
            <a href="#experiments" className={s.primary}>Explore selected work</a>
            <a href="#connection" className={s.secondary}>Get in touch</a>
          </div>
        </div>
      </div>
      <a href="#origin" className={`mono ${s.scroll}`} data-fade>Scroll</a>
    </section>
  );
}
