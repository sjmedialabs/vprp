"use client";

import { motion } from "framer-motion";

const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  top: `${(i * 13) % 100}%`,
  left: `${(i * 17) % 100}%`,
  duration: 6 + (i % 5),
  delay: (i % 7) * 0.4,
}));

export function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {PARTICLES.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/70"
          style={{ top: particle.top, left: particle.left }}
          animate={{ y: [0, -24, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
