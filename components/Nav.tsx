"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import s from "./Nav.module.scss";

const items = [
  ["Home", "#entry"], ["About", "#origin"], ["Toolkit", "#toolkit"], ["Projects", "#experiments"], ["Contact", "#connection"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className={s.header}>
      <a href="#entry" className={s.mark} aria-label="Nayan, back to top">N/</a>
      <nav aria-label="Primary" className={s.desktop}>
        {items.map(([l, h]) => <a key={h} href={h}>{l}</a>)}
      </nav>
      <button className={s.toggle} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-nav" aria-label="Mobile" className={s.mobile}
            initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
            {items.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{l}</a>)}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
