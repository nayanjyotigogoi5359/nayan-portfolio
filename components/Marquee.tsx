import s from "./Marquee.module.scss";
const words = ["JavaScript", "Java", "HTML", "CSS / SCSS", "Next.js", "React", "Visual design", "AI / ML" ];
export default function Marquee() {
  const row = words.map((w) => <span key={w}>{w}</span>);
  return (
    <div className={s.wrap} aria-hidden="true">
      <div className={s.track}>{row}{row}</div>
    </div>
  );
}
