"use client";

import { motion } from "framer-motion";

interface TabUnderlineProps {
  active: boolean;
}

export function TabUnderline({ active }: TabUnderlineProps) {
  if (!active) return null;

  return (
    <motion.div
      layoutId="tab-underline"
      className="neon-underline absolute -bottom-1 left-0 h-0.5 w-full rounded-full"
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
    />
  );
}
