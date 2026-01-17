import { motion } from 'framer-motion';

export const FireAnimation = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: { width: 24, height: 32 },
    md: { width: 36, height: 48 },
    lg: { width: 48, height: 64 }
  };
  
  const { width, height } = sizes[size] || sizes.md;

  return (
    <div 
      className={`relative inline-flex items-end justify-center ${className}`} 
      style={{ width, height }}
      data-testid="fire-animation"
    >
      {/* Base glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: width * 1.5,
          height: height * 0.6,
          background: 'radial-gradient(ellipse at center bottom, rgba(255,100,0,0.4) 0%, rgba(255,60,0,0.2) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Fire container */}
      <div className="relative" style={{ width, height }}>
        {/* Outer flame layer - red/dark orange */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{
            width: width * 0.9,
            height: height * 0.95,
            marginLeft: -width * 0.45,
            background: 'linear-gradient(to top, #ff4500 0%, #ff6a00 30%, #ff8c00 60%, rgba(255,140,0,0) 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            filter: 'blur(1px)',
          }}
          animate={{
            scaleX: [1, 0.92, 1.05, 0.95, 1],
            scaleY: [1, 1.08, 0.94, 1.04, 1],
            skewX: [0, 2, -3, 1, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle flame layer - orange */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{
            width: width * 0.7,
            height: height * 0.85,
            marginLeft: -width * 0.35,
            background: 'linear-gradient(to top, #ff6a00 0%, #ffa500 40%, #ffcc00 70%, rgba(255,200,0,0) 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            filter: 'blur(0.5px)',
          }}
          animate={{
            scaleX: [1, 1.08, 0.9, 1.04, 1],
            scaleY: [1, 0.92, 1.1, 0.96, 1],
            skewX: [0, -3, 2, -1, 0],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.05,
          }}
        />

        {/* Inner flame layer - yellow/white core */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{
            width: width * 0.45,
            height: height * 0.65,
            marginLeft: -width * 0.225,
            background: 'linear-gradient(to top, #ffcc00 0%, #ffeb3b 30%, #fff9c4 60%, rgba(255,255,255,0) 100%)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          }}
          animate={{
            scaleX: [1, 0.88, 1.12, 0.94, 1],
            scaleY: [1, 1.15, 0.88, 1.06, 1],
            skewX: [0, 3, -2, 1, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.08,
          }}
        />

        {/* White hot core */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{
            width: width * 0.2,
            height: height * 0.35,
            marginLeft: -width * 0.1,
            background: 'linear-gradient(to top, #fff9c4 0%, #ffffff 50%, rgba(255,255,255,0) 100%)',
            borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
          }}
          animate={{
            scaleY: [1, 1.2, 0.9, 1.1, 1],
            opacity: [0.9, 1, 0.85, 1, 0.9],
          }}
          transition={{
            duration: 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Sparks */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 2,
              height: 2 + Math.random() * 2,
              left: `${35 + (i - 2.5) * 10}%`,
              bottom: '50%',
              background: i % 2 === 0 ? '#ffcc00' : '#ff6a00',
              boxShadow: '0 0 3px #ff6a00',
            }}
            animate={{
              y: [0, -height * (0.5 + Math.random() * 0.5)],
              x: [(i - 2.5) * 2, (i - 2.5) * (8 + Math.random() * 8)],
              opacity: [1, 0],
              scale: [1, 0.2],
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.4,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Flicker highlights */}
        <motion.div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2"
          style={{
            width: width * 0.3,
            height: width * 0.3,
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.2, 0.5, 0.3],
            scale: [1, 1.2, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default FireAnimation;
