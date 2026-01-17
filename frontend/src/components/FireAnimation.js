import { motion } from 'framer-motion';

export const FireAnimation = ({ className = '' }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} data-testid="fire-animation">
      {/* Main fire container */}
      <div className="relative w-10 h-12">
        {/* Glow effect */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-600 via-orange-500 to-yellow-400 opacity-50 blur-lg animate-fire-glow"
          style={{ transform: 'scale(1.5)' }}
        />
        
        {/* Main flame */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          animate={{
            scaleY: [1, 1.1, 0.95, 1.05, 1],
            scaleX: [1, 0.95, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 40 50" className="w-10 h-12" fill="none">
            {/* Outer flame */}
            <motion.path
              d="M20 2C20 2 8 18 8 30C8 38 13 46 20 48C27 46 32 38 32 30C32 18 20 2 20 2Z"
              fill="url(#fireGradient1)"
              animate={{
                d: [
                  "M20 2C20 2 8 18 8 30C8 38 13 46 20 48C27 46 32 38 32 30C32 18 20 2 20 2Z",
                  "M20 4C20 4 6 16 6 28C6 36 12 44 20 46C28 44 34 36 34 28C34 16 20 4 20 4Z",
                  "M20 2C20 2 8 18 8 30C8 38 13 46 20 48C27 46 32 38 32 30C32 18 20 2 20 2Z",
                ]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Inner flame */}
            <motion.path
              d="M20 12C20 12 14 22 14 32C14 38 17 42 20 44C23 42 26 38 26 32C26 22 20 12 20 12Z"
              fill="url(#fireGradient2)"
              animate={{
                d: [
                  "M20 12C20 12 14 22 14 32C14 38 17 42 20 44C23 42 26 38 26 32C26 22 20 12 20 12Z",
                  "M20 14C20 14 12 24 12 34C12 40 16 44 20 46C24 44 28 40 28 34C28 24 20 14 20 14Z",
                  "M20 12C20 12 14 22 14 32C14 38 17 42 20 44C23 42 26 38 26 32C26 22 20 12 20 12Z",
                ]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
            />
            {/* Core flame */}
            <motion.path
              d="M20 22C20 22 17 28 17 34C17 38 18 40 20 42C22 40 23 38 23 34C23 28 20 22 20 22Z"
              fill="url(#fireGradient3)"
              animate={{
                opacity: [0.9, 1, 0.9],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="fireGradient1" x1="20" y1="2" x2="20" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="50%" stopColor="#FF4500" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
              <linearGradient id="fireGradient2" x1="20" y1="12" x2="20" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFA500" />
                <stop offset="50%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#FF4500" />
              </linearGradient>
              <linearGradient id="fireGradient3" x1="20" y1="22" x2="20" y2="42" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFEB3B" />
                <stop offset="50%" stopColor="#FFC107" />
                <stop offset="100%" stopColor="#FFA500" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
        
        {/* Sparks/embers */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-400"
            style={{
              left: `${40 + (i - 2) * 8}%`,
              bottom: '60%'
            }}
            animate={{
              y: [-5, -25],
              x: [(i - 2) * 3, (i - 2) * 8],
              opacity: [1, 0],
              scale: [1, 0.3]
            }}
            transition={{
              duration: 0.8 + i * 0.1,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FireAnimation;
