"use client";
import { origin } from "@/data/content";
import { useReveal } from "./useReveal";
import s from "./Origin.module.scss";

export default function Origin() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="origin" ref={ref} className={s.sec} aria-labelledby="origin-t">
      <p className="mono" data-reveal>Chapter 02 / The origin</p>
      <h2 id="origin-t" className={s.h} data-reveal>From curiosity to building things of my own.</h2>
      <ol className={s.list}>
        {origin.map((item, i) => (
          <li key={item.label} data-reveal>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <h3>{item.label}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
