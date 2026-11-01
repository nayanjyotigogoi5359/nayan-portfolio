"use client";
import { projects } from "@/data/content";
import { useReveal } from "./useReveal";
import Visual from "./Visuals";
import s from "./Experiments.module.scss";

export default function Experiments() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="experiments" ref={ref} className={s.sec} aria-labelledby="ex-t">
      <p className="mono" data-reveal>Chapter 04 / Selected work</p>
      <h2 id="ex-t" className={s.h} data-reveal>Builds, experiments and creative practice.</h2>
      <p className={s.intro} data-reveal>A mix of personal development work and ideas I'm validating. Each project is labeled by its current stage—no inflated client claims or made-up results.</p>
      {projects.map((p, i) => (
        <article key={p.id} className={`${s.project} ${i % 2 ? s.flip : ""}`} data-reveal>
          <div className={s.visual} aria-hidden="true">
            <div className={s.grid} />
            <div className={s.art}><Visual id={p.id} /></div>
            <span className="mono">{p.status}</span>
          </div>
          <div className={s.body}>
            <p className="mono">Project / 0{i + 1}</p>
            <h3>{p.name}</h3>
            <p className={s.desc}>{p.description}</p>
            <dl>
              <dt className="mono">The problem</dt><dd>{p.problem}</dd>
              <dt className="mono">My approach</dt><dd>{p.approach}</dd>
              <dt className="mono">Tools & focus</dt><dd>{p.tools.join(" · ")}</dd>
            </dl>
            {p.link && <a href={p.link} className={s.link} target="_blank" rel="noopener noreferrer">View project <span aria-hidden="true">↗</span></a>}
          </div>
        </article>
      ))}
    </section>
  );
}
