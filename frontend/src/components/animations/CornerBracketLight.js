import { motion } from 'framer-motion';

/**
 * Animated orange light that travels along corner brackets
 * Creates a tech effect with light moving from corner to corner
 */
export const CornerBracketLight = ({ delay = 0, duration = 2 }) => {
  // Define the path for light to travel (clockwise around card)
  // Top-left → Top-right → Bottom-right → Bottom-left → Top-left
  const corners = [
    { start: { x: 0, y: 0 }, end: { x: 100, y: 0 } }, // Top edge
    { start: { x: 100, y: 0 }, end: { x: 100, y: 100 } }, // Right edge
    { start: { x: 100, y: 100 }, end: { x: 0, y: 100 } }, // Bottom edge
    { start: { x: 0, y: 100 }, end: { x: 0, y: 0 } } // Left edge
  ];

  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none" 
      style={{ zIndex: 10 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradient for light tail effect */}
        <linearGradient id="lightTail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6A00" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF6A00" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6A00" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Animated light traveling around corners */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
      >
        {/* Top edge light */}
        <motion.line
          x1="0%"
          y1="0"
          x2="0%"
          y2="0"
          stroke="url(#lightTail)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ x1: "0%", x2: "0%" }}
          animate={{
            x1: ["0%", "15%", "100%", "100%", "100%", "100%"],
            x2: ["0%", "0%", "85%", "100%", "100%", "100%"]
          }}
          transition={{
            duration: duration * 4,
            times: [0, 0.05, 0.2, 0.25, 0.25, 1],
            repeat: Infinity,
            ease: "linear",
            delay
          }}
        />

        {/* Right edge light */}
        <motion.line
          x1="100%"
          y1="0%"
          x2="100%"
          y2="0%"
          stroke="url(#lightTail)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: 'right top' }}
          initial={{ y1: "0%", y2: "0%" }}
          animate={{
            y1: ["0%", "0%", "0%", "15%", "100%", "100%", "100%"],
            y2: ["0%", "0%", "0%", "0%", "85%", "100%", "100%"]
          }}
          transition={{
            duration: duration * 4,
            times: [0, 0.25, 0.3, 0.35, 0.5, 0.5, 1],
            repeat: Infinity,
            ease: "linear",
            delay
          }}
        />

        {/* Bottom edge light */}
        <motion.line
          x1="100%"
          y1="100%"
          x2="100%"
          y2="100%"
          stroke="url(#lightTail)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: 'right bottom' }}
          initial={{ x1: "100%", x2: "100%" }}
          animate={{
            x1: ["100%", "100%", "100%", "100%", "85%", "0%", "0%", "0%"],
            x2: ["100%", "100%", "100%", "100%", "100%", "15%", "0%", "0%"]
          }}
          transition={{
            duration: duration * 4,
            times: [0, 0.5, 0.55, 0.6, 0.65, 0.75, 0.75, 1],
            repeat: Infinity,
            ease: "linear",
            delay
          }}
        />

        {/* Left edge light */}
        <motion.line
          x1="0"
          y1="100%"
          x2="0"
          y2="100%"
          stroke="url(#lightTail)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ transformOrigin: 'left bottom' }}
          initial={{ y1: "100%", y2: "100%" }}
          animate={{
            y1: ["100%", "100%", "100%", "100%", "100%", "100%", "85%", "0%", "0%"],
            y2: ["100%", "100%", "100%", "100%", "100%", "100%", "100%", "15%", "0%"]
          }}
          transition={{
            duration: duration * 4,
            times: [0, 0.75, 0.8, 0.85, 0.9, 0.95, 0.975, 0.99, 1],
            repeat: Infinity,
            ease: "linear",
            delay
          }}
        />
      </motion.g>
    </svg>
  );
};