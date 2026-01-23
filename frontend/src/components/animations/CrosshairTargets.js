import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const targets = [
  { x: 10, y: 15 },  // Top left
  { x: 90, y: 20 },  // Top right
  { x: 15, y: 50 },  // Middle left
  { x: 85, y: 55 },  // Middle right
  { x: 20, y: 85 },  // Bottom left
  { x: 80, y: 90 },  // Bottom right
];

export const CrosshairTargets = () => {
  const canvasRef = useRef(null);
  const currentTargetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let animationFrame;
    const beam = { x: targets[0].x, y: targets[0].y, progress: 0 };

    const animateBeam = () => {
      const nextTarget = (currentTargetRef.current + 1) % targets.length;
      const from = targets[currentTargetRef.current];
      const to = targets[nextTarget];

      gsap.to(beam, {
        x: to.x,
        y: to.y,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw beam
          const fromX = (from.x / 100) * canvas.width;
          const fromY = (from.y / 100) * canvas.height;
          const toX = (beam.x / 100) * canvas.width;
          const toY = (beam.y / 100) * canvas.height;

          const gradient = ctx.createLinearGradient(fromX, fromY, toX, toY);
          gradient.addColorStop(0, 'rgba(255, 106, 0, 0)');
          gradient.addColorStop(0.5, 'rgba(255, 106, 0, 0.6)');
          gradient.addColorStop(1, 'rgba(255, 106, 0, 0)');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.stroke();

          // Draw glow at current position
          const glowGradient = ctx.createRadialGradient(toX, toY, 0, toX, toY, 20);
          glowGradient.addColorStop(0, 'rgba(255, 106, 0, 0.8)');
          glowGradient.addColorStop(1, 'rgba(255, 106, 0, 0)');
          ctx.fillStyle = glowGradient;
          ctx.beginPath();
          ctx.arc(toX, toY, 20, 0, Math.PI * 2);
          ctx.fill();
        },
        onComplete: () => {
          currentTargetRef.current = nextTarget;
          setTimeout(animateBeam, 500);
        }
      });
    };

    animateBeam();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      gsap.killTweensOf(beam);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Canvas for animated beam */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Static crosshair targets */}
      {targets.map((target, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-10"
          style={{
            left: `${target.x}%`,
            top: `${target.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            <circle
              cx="15"
              cy="15"
              r="8"
              fill="none"
              stroke="#FF6A00"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <line x1="15" y1="0" x2="15" y2="8" stroke="#FF6A00" strokeWidth="1.5" />
            <line x1="15" y1="22" x2="15" y2="30" stroke="#FF6A00" strokeWidth="1.5" />
            <line x1="0" y1="15" x2="8" y2="15" stroke="#FF6A00" strokeWidth="1.5" />
            <line x1="22" y1="15" x2="30" y2="15" stroke="#FF6A00" strokeWidth="1.5" />
            {/* Center dot with pulse */}
            <motion.circle
              cx="15"
              cy="15"
              r="3"
              fill="#FF6A00"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          </svg>
        </motion.div>
      ))}
    </>
  );
};