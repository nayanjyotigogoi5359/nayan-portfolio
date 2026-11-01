"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import s from "./ScrollProgress.module.scss";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div className={s.bar} style={{ scaleX }} aria-hidden="true" />;
}
