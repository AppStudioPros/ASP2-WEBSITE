import { motion } from 'framer-motion';

export const FireAnimation = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: { width: 28, height: 36 },
    md: { width: 40, height: 52 },
    lg: { width: 56, height: 72 }
  };
  
  const { width, height } = sizes[size] || sizes.md;

  return (
    <div 
      className={`relative inline-flex items-end justify-center ${className}`} 
      style={{ width, height }}
      data-testid="fire-animation"
    >
      {/* Ambient glow underneath */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: width * 2,
          height: height * 0.5,
          background: 'radial-gradient(ellipse at center, rgba(255,120,0,0.5) 0%, rgba(255,80,0,0.25) 40%, transparent 70%)',
          filter: 'blur(12px)',
        }}
        animate={{
          opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Fire container with filter for realism */}
      <div 
        className="relative" 
        style={{ 
          width, 
          height,
          filter: 'contrast(1.1) brightness(1.05)',
        }}
      >
        {/* Back flame - darkest red */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{
            width: width * 1,
            height: height * 1,
            marginLeft: -width * 0.5,
            background: `
              radial-gradient(ellipse 50% 80% at 50% 100%, 
                #8B0000 0%, 
                #B22222 20%,
                #DC143C 40%,
                #FF4500 60%,
                transparent 80%
              )
            `,
            borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
            filter: 'blur(2px)',
          }}
          animate={{
            scaleX: [1, 0.88, 1.08, 0.94, 1],
            scaleY: [1, 1.12, 0.9, 1.05, 1],
            rotate: [0, 1, -2, 1, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Middle flame - orange */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{
            width: width * 0.75,
            height: height * 0.9,
            marginLeft: -width * 0.375,
            background: `
              radial-gradient(ellipse 60% 85% at 50% 100%, 
                #FF4500 0%, 
                #FF6B00 25%,
                #FF8C00 45%,
                #FFA500 65%,
                transparent 85%
              )
            `,
            borderRadius: '50% 50% 45% 45% / 65% 65% 35% 35%',
            filter: 'blur(1px)',
          }}
          animate={{
            scaleX: [1, 1.12, 0.88, 1.06, 1],
            scaleY: [1, 0.88, 1.15, 0.94, 1],
            rotate: [0, -2, 2, -1, 0],
          }}
          transition={{
            duration: 0.45,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.05,
          }}
        />

        {/* Inner flame - yellow/gold */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{
            width: width * 0.5,
            height: height * 0.75,
            marginLeft: -width * 0.25,
            background: `
              radial-gradient(ellipse 60% 90% at 50% 100%, 
                #FFA500 0%, 
                #FFB800 20%,
                #FFCC00 40%,
                #FFE135 60%,
                transparent 85%
              )
            `,
            borderRadius: '50% 50% 45% 45% / 70% 70% 30% 30%',
          }}
          animate={{
            scaleX: [1, 0.85, 1.15, 0.92, 1],
            scaleY: [1, 1.18, 0.85, 1.08, 1],
            rotate: [0, 3, -3, 2, 0],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.08,
          }}
        />

        {/* Core flame - bright yellow/white */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{
            width: width * 0.28,
            height: height * 0.5,
            marginLeft: -width * 0.14,
            background: `
              radial-gradient(ellipse 70% 95% at 50% 100%, 
                #FFEB3B 0%, 
                #FFF59D 30%,
                #FFFDE7 55%,
                rgba(255,255,255,0.9) 70%,
                transparent 90%
              )
            `,
            borderRadius: '50% 50% 45% 45% / 75% 75% 25% 25%',
          }}
          animate={{
            scaleX: [1, 1.2, 0.8, 1.1, 1],
            scaleY: [1, 0.85, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 0.25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dancing flame tips - left */}
        <motion.div
          className="absolute origin-bottom"
          style={{
            width: width * 0.2,
            height: height * 0.4,
            left: '15%',
            bottom: height * 0.4,
            background: `
              radial-gradient(ellipse 80% 100% at 50% 100%, 
                #FF6B00 0%, 
                #FF8C00 40%,
                transparent 80%
              )
            `,
            borderRadius: '50% 50% 40% 40% / 80% 80% 20% 20%',
            filter: 'blur(1px)',
          }}
          animate={{
            scaleY: [0.8, 1.2, 0.6, 1, 0.8],
            scaleX: [1, 0.8, 1.1, 0.9, 1],
            rotate: [-15, -25, -10, -20, -15],
            y: [0, -5, 2, -3, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dancing flame tips - right */}
        <motion.div
          className="absolute origin-bottom"
          style={{
            width: width * 0.2,
            height: height * 0.35,
            right: '18%',
            bottom: height * 0.45,
            background: `
              radial-gradient(ellipse 80% 100% at 50% 100%, 
                #FF6B00 0%, 
                #FFA500 40%,
                transparent 80%
              )
            `,
            borderRadius: '50% 50% 40% 40% / 80% 80% 20% 20%',
            filter: 'blur(1px)',
          }}
          animate={{
            scaleY: [0.7, 1.1, 0.5, 0.9, 0.7],
            scaleX: [1, 0.9, 1.1, 0.85, 1],
            rotate: [15, 25, 8, 18, 15],
            y: [0, -4, 3, -2, 0],
          }}
          transition={{
            duration: 0.45,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.1,
          }}
        />

        {/* Embers/sparks */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              left: `${30 + Math.random() * 40}%`,
              bottom: '35%',
              background: `radial-gradient(circle, ${i % 3 === 0 ? '#FFF' : i % 3 === 1 ? '#FFE135' : '#FF6B00'} 0%, ${i % 2 === 0 ? '#FFA500' : '#FF4500'} 100%)`,
              boxShadow: `0 0 ${3 + Math.random() * 3}px ${i % 2 === 0 ? '#FF6B00' : '#FFA500'}`,
            }}
            animate={{
              y: [0, -height * (0.6 + Math.random() * 0.6)],
              x: [(i - 4) * 3, (i - 4) * (10 + Math.random() * 12)],
              opacity: [1, 0.8, 0],
              scale: [1, 0.6, 0],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FireAnimation;
