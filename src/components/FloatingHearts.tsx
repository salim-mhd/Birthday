'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
}

export default function FloatingHearts() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const symbols = ['❤️', '💖', '✨', '🌸', '💕', '💫', '🌹', '🦋'];
    const generated: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      size: Math.floor(Math.random() * 14) + 14, // 14px to 28px
      duration: Math.random() * 12 + 14, // 14s to 26s
      delay: Math.random() * 10,
      opacity: Math.random() * 0.45 + 0.25,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{
            left: `${p.x}vw`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
            rotate: [0, p.id % 2 === 0 ? 45 : -45, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          {p.symbol}
        </motion.div>
      ))}

      {/* Subtle ambient light glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
    </div>
  );
}

