"use client";
import { links } from "@/data/content";
import { useReveal } from "./useReveal";
import s from "./Connection.module.scss";

export default function Connection() {
  const ref = useReveal<HTMLElement>();
  const allItems: [string, string | null][] = [
    ["Email", links.email],
    ["GitHub", links.github],
    ["LinkedIn", links.linkedin],
    ["Instagram", links.instagram],
  ];
  const items = allItems.filter((item): item is [string, string] => Boolean(item[1]));

  return (
    <section id="connection" ref={ref} className={s.sec} aria-labelledby="co-t">
      <p className="mono" data-reveal>Chapter 07 / The connection</p>
      <h2 id="co-t" className={s.h} data-reveal>Have a useful problem to solve?</h2>
      <p className={s.copy} data-reveal>
        I'm interested in thoughtful collaborations, practical website work and ideas that make a business easier to use or understand. The best way to reach me is by email.
      </p>
      <ul className={s.links} data-reveal>
        {items.map(([label, href]) => (
          <li key={label}>
            <a href={href} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noopener noreferrer"}>
              {label}<span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ul>
      <p className={s.word} aria-hidden="true">NAYAN</p>
      <p className={`mono ${s.foot}`}>Nayan Gogoi · Assam, India</p>
    </section>
  );
}
