"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import s from "./Portrait.module.scss";

const N = 9;

export default function Portrait() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top top", end: "+=145%", pin: true, scrub: 1 } });
      tl.from("[data-strip]", { yPercent: (i: number) => (i % 2 ? 1 : -1) * (45 + ((i * 13) % 35)), opacity: 0, ease: "power3.out", stagger: { each: 0.05, from: "center" } }, 0)
        .fromTo("[data-frame]", { rotationY: -18, rotationX: 5, scale: 0.9 }, { rotationY: 0, rotationX: 0, scale: 1, ease: "none", duration: 1.2 }, 0)
        .fromTo("[data-photo]", { "--g": 1, "--b": 0.6 }, { "--g": 0, "--b": 1, ease: "none", duration: 1 }, 0.4)
        .fromTo("[data-tint]", { opacity: 0.75 }, { opacity: 0, ease: "none", duration: 1 }, 0.4)
        .fromTo("[data-scan]", { top: "0%", opacity: 1 }, { top: "100%", ease: "none", duration: 1.2 }, 0)
        .to("[data-scan]", { opacity: 0, duration: 0.1 }, 1.2)
        .fromTo("[data-t]", { opacity: 0, x: -28 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.55 }, 0.4)
        .to("[data-frame]", { rotationY: 6, scale: 1.025, ease: "none", duration: 0.8 }, 1.3)
        .to("[data-ring]", { rotate: 100, ease: "none", duration: 2.2 }, 0);
    });
    mm.add("(max-width: 899px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo("[data-frame]", { y: 24, opacity: 0.7 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={ref} className={s.sec} aria-label="Portrait of Nayan">
      <div className={s.copy}>
        <p className="mono" data-t>Nayan / Assam, India</p>
        <h2 data-t>The person behind the builds.</h2>
        <p className={s.sub} data-t>BCA student. Learning in public, one project at a time.</p>
      </div>
      <div className={s.stage}>
        <svg className={s.orbit} viewBox="0 0 400 400" aria-hidden="true"><g data-ring style={{ transformOrigin: "200px 200px" }} fill="none" stroke="#70B7FF" strokeWidth=".7"><circle cx="200" cy="200" r="190" strokeDasharray="2 9" /><circle cx="200" cy="200" r="160" opacity=".5" /><path d="M200 10v26M200 364v26M10 200h26M364 200h26" stroke="#245BFF" strokeWidth="1.5" /></g></svg>
        <div className={s.frame} data-frame>
          <div className={s.photo} data-photo role="img" aria-label="Portrait of Nayan">
            {Array.from({ length: N }, (_, i) => (
              <span key={i} className={s.strip} data-strip style={{ backgroundPosition: `${(i / (N - 1)) * 100}% 0` }} />
            ))}
            <i className={s.tint} data-tint />
          </div>
          <i className={s.scan} data-scan />
          <i className={`${s.corner} ${s.c1}`} /><i className={`${s.corner} ${s.c2}`} />
        </div>
      </div>
    </section>
  );
}
