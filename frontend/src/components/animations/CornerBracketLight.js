import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Animated orange light orb that travels along corner brackets
 * Simple approach: light moves to each corner in sequence
 */
export const CornerBracketLight = ({ delay = 0, duration = 4 }) => {
  const [currentCorner, setCurrentCorner] = useState(0);
  
  // Cycle through corners: TL -> TR -> BR -> BL -> TL
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentCorner(prev => (prev + 1) % 4);
      }, (duration * 1000) / 4);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(initialTimeout);
  }, [delay, duration]);

  // Corner positions (accounting for the orb size and bracket positioning)
  const corners = [
    { top: 2, left: 2 },      // Top-left
    { top: 2, right: 2 },     // Top-right  
    { bottom: 2, right: 2 },  // Bottom-right
    { bottom: 2, left: 2 },   // Bottom-left
  ];

  const position = corners[currentCorner];

  return (
    <>
      {/* Glowing orb that moves between corners */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFFFFF 0%, #FF6A00 50%, rgba(255,106,0,0) 100%)',
          boxShadow: '0 0 12px 6px rgba(255,106,0,0.9), 0 0 24px 12px rgba(255,106,0,0.5), 0 0 36px 18px rgba(255,106,0,0.2)',
          zIndex: 25,
          ...position,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: [1, 1.2, 1],
          ...position 
        }}
        transition={{
          duration: duration / 4,
          ease: "easeInOut",
          scale: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      />
      
      {/* Light trail effect on the brackets */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 20,
        }}
      >
        {/* Top-left bracket glow */}
        <motion.div
          className="absolute top-0 left-0 w-4 h-4"
          style={{
            boxShadow: currentCorner === 0 
              ? '0 0 8px 2px rgba(255,106,0,0.8), inset 0 0 4px rgba(255,106,0,0.4)'
              : 'none',
            borderLeft: currentCorner === 0 ? '2px solid rgba(255,106,0,1)' : '2px solid transparent',
            borderTop: currentCorner === 0 ? '2px solid rgba(255,106,0,1)' : '2px solid transparent',
          }}
          animate={{
            opacity: currentCorner === 0 ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Top-right bracket glow */}
        <motion.div
          className="absolute top-0 right-0 w-4 h-4"
          style={{
            boxShadow: currentCorner === 1 
              ? '0 0 8px 2px rgba(255,106,0,0.8), inset 0 0 4px rgba(255,106,0,0.4)'
              : 'none',
            borderRight: currentCorner === 1 ? '2px solid rgba(255,106,0,1)' : '2px solid transparent',
            borderTop: currentCorner === 1 ? '2px solid rgba(255,106,0,1)' : '2px solid transparent',
          }}
          animate={{
            opacity: currentCorner === 1 ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Bottom-right bracket glow */}
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-4"
          style={{
            boxShadow: currentCorner === 2 
              ? '0 0 8px 2px rgba(255,106,0,0.8), inset 0 0 4px rgba(255,106,0,0.4)'
              : 'none',
            borderRight: currentCorner === 2 ? '2px solid rgba(255,106,0,1)' : '2px solid transparent',
            borderBottom: currentCorner === 2 ? '2px solid rgba(255,106,0,1)' : '2px solid transparent',
          }}
          animate={{
            opacity: currentCorner === 2 ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Bottom-left bracket glow */}
        <motion.div
          className="absolute bottom-0 left-0 w-4 h-4"
          style={{
            boxShadow: currentCorner === 3 
              ? '0 0 8px 2px rgba(255,106,0,0.8), inset 0 0 4px rgba(255,106,0,0.4)'
              : 'none',
            borderLeft: currentCorner === 3 ? '2px solid rgba(255,106,0,1)' : '2px solid transparent',
            borderBottom: currentCorner === 3 ? '2px solid rgba(255,106,0,1)' : '2px solid transparent',
          }}
          animate={{
            opacity: currentCorner === 3 ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
};
