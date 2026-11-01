"use client";
import { toolkit, levelLabel, type Level } from "@/data/content";
import { useReveal } from "./useReveal";
import s from "./Toolkit.module.scss";

export default function Toolkit() {
  const ref = useReveal<HTMLElement>();
  const levels = Object.keys(levelLabel) as Level[];
  return (
    <section id="toolkit" ref={ref} className={s.sec} aria-labelledby="tk-t">
      <p className="mono" data-reveal>Chapter 03 / The toolkit</p>
      <h2 id="tk-t" className={s.h} data-reveal>The tools and skills in my current stack.</h2>
      <ul className={s.legend} data-reveal aria-label="Skill status legend">
        {levels.map((l) => <li key={l}><i className={`${s.dot} ${s[l]}`} aria-hidden="true" />{levelLabel[l]}</li>)}
      </ul>
      <div className={s.grid}>
        {toolkit.map((g) => (
          <div key={g.group} className={s.group} data-reveal>
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it.name}><i className={`${s.dot} ${s[it.level]}`} aria-hidden="true" /><span>{it.name}</span><span className="mono">{levelLabel[it.level]}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
