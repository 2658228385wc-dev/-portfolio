import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: "div" | "nav" | "h1" | "h2" | "h3" | "p" | "span" | "section";
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  as = "div",
}: FadeInProps) {
  const Component = useMemo(() => motion.create(as), [as]);

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
    >
      {children}
    </Component>
  );
}
