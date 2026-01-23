import { motion } from 'framer-motion';

/**
 * Animated orange light orb that travels along corner brackets
 * The light moves from corner to corner in a clockwise pattern
 */
export const CornerBracketLight = ({ delay = 0, duration = 3 }) => {
  // Bracket size in pixels (matches the corner bracket divs)
  const bracketSize = 16;
  
  // Define the path: travels along each corner bracket in sequence
  // Path: TL corner → TR corner → BR corner → BL corner → back to TL
  const pathVariants = {
    animate: {
      // The light travels as keyframes through each corner bracket
      offsetDistance: ['0%', '100%'],
    }
  };

  return (
    <>
      {/* SVG path that traces all four corner brackets */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" 
        style={{ zIndex: 15 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradient for glowing orb effect */}
          <radialGradient id={`lightOrb-${delay}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="30%" stopColor="#FF6A00" stopOpacity="1" />
            <stop offset="70%" stopColor="#FF6A00" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
          </radialGradient>
          
          {/* Filter for glow effect */}
          <filter id={`glow-${delay}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Animated light orb using CSS motion path */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFFFFF 0%, #FF6A00 40%, rgba(255,106,0,0.4) 70%, transparent 100%)',
          boxShadow: '0 0 10px 4px rgba(255,106,0,0.8), 0 0 20px 8px rgba(255,106,0,0.4)',
          zIndex: 20,
          // Position starts at top-left bracket
          top: 0,
          left: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 1, 1, 1, 1, 0],
          // Animate through corner bracket positions
          // TL: down then right on bracket
          // TR: down then left on bracket  
          // BR: up then left on bracket
          // BL: up then right on bracket
          x: [
            // Top-left corner: L-shape (down, then right)
            0, 0, bracketSize,
            // Move to top-right corner
            'calc(100% - 16px)', 'calc(100% - 16px)', 'calc(100% - 8px)',
            // Top-right corner: L-shape (left, then down)
            'calc(100% - 8px)', 'calc(100% - 16px)', 'calc(100% - 8px)',
            // Move to bottom-right corner
            'calc(100% - 8px)', 'calc(100% - 8px)', 'calc(100% - 16px)',
            // Bottom-right corner: L-shape (up, then left)
            'calc(100% - 16px)', 'calc(100% - 8px)', 'calc(100% - 16px)',
            // Move to bottom-left corner
            bracketSize, 0, 0,
            // Bottom-left corner: L-shape (right, then up)
            0, bracketSize, 0,
            // Return to start
            0
          ],
          y: [
            // Top-left corner
            0, bracketSize, 0,
            // Move to top-right
            0, bracketSize, 0,
            // Top-right corner
            0, 0, bracketSize,
            // Move to bottom-right
            'calc(100% - 16px)', 'calc(100% - 8px)', 'calc(100% - 8px)',
            // Bottom-right corner  
            'calc(100% - 16px)', 'calc(100% - 8px)', 'calc(100% - 16px)',
            // Move to bottom-left
            'calc(100% - 8px)', 'calc(100% - 16px)', 'calc(100% - 8px)',
            // Bottom-left corner
            'calc(100% - 16px)', 'calc(100% - 8px)', bracketSize,
            // Return to start
            0
          ]
        }}
        transition={{
          duration: duration * 4,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
          times: [
            0, 0.02, 0.04,
            0.08, 0.1, 0.12,
            0.16, 0.18, 0.2,
            0.24, 0.26, 0.28,
            0.32, 0.34, 0.36,
            0.4, 0.42, 0.44,
            0.48, 0.5, 0.52,
            1
          ]
        }}
      />
    </>
  );
};