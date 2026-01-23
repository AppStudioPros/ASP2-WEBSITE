import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.3 + 0.2
}));

export const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: particle.id % 2 === 0 ? '#00E5FF' : '#FF6A00',
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.id % 2 === 0 ? '#00E5FF' : '#FF6A00'}`
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};