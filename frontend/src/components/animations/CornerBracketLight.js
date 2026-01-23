import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

/**
 * Corner Bracket Light Animation
 * - Thin orange line with bright head and fading tail
 * - Moves clockwise along card borders
 * - Single cards: minimal downtime (always moving)
 * - Multiple cards: staggered with more downtime
 */

// The actual light trail - simple orange dash that fades to transparent
const LightBeam = ({ edge, duration, onComplete }) => {
  const isTop = edge === 'top';
  const isRight = edge === 'right';
  const isBottom = edge === 'bottom';
  const isLeft = edge === 'left';
  const horizontal = isTop || isBottom;
  
  // Stay fully within card borders (account for line length)
  // Line is 25px, so end at 100% minus line length
  const startPct = (isTop || isRight) ? 0 : 100;
  const endPct = (isTop || isRight) ? 100 : 0;
  
  // Gradient direction for fade (tail fades to transparent)
  const gradientAngle = isTop ? '90deg' : isRight ? '180deg' : isBottom ? '270deg' : '0deg';
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        // Position on the border line - use overflow hidden to clip
        ...(isTop && { top: 0, left: 0, width: '100%', height: 2 }),
        ...(isBottom && { bottom: 0, left: 0, width: '100%', height: 2 }),
        ...(isLeft && { left: 0, top: 0, width: 2, height: '100%' }),
        ...(isRight && { right: 0, top: 0, width: 2, height: '100%' }),
        overflow: 'hidden',  // CLIP the line at card borders
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {/* Simple orange dash with fading tail - NO glow, contained within card */}
      <motion.div
        style={{
          position: 'absolute',
          // 2px thickness (same as brackets), 25px length
          ...(horizontal 
            ? { height: 2, width: 25, top: 0 }
            : { width: 2, height: 25, left: 0 }
          ),
          // Simple gradient: transparent → orange (no glow, just fade)
          background: `linear-gradient(${gradientAngle}, 
            transparent 0%,
            rgba(255,106,0,0.3) 40%,
            rgba(255,106,0,0.7) 70%,
            #FF6A00 100%
          )`,
          // NO box-shadow - clean line only
        }}
        initial={{ 
          [horizontal ? 'left' : 'top']: `${startPct}%`,
          opacity: 0 
        }}
        animate={{ 
          [horizontal ? 'left' : 'top']: `calc(${endPct}% - ${endPct === 100 ? '25px' : '0px'})`,
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
          duration: duration,
          ease: 'linear',
          opacity: { times: [0, 0.02, 0.5, 0.98, 1], duration: duration }
        }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  );
};

/**
 * Main component for single card usage (minimal downtime)
 */
export const CornerBracketLight = ({ 
  cardIndex = 0, 
  singleCard = false,  // If true, minimal downtime
  totalCards = 1 
}) => {
  const [currentEdge, setCurrentEdge] = useState(null);
  const edgeIndexRef = useRef((cardIndex * 7) % 4); // Different starting edge per card
  const timeoutRef = useRef(null);
  const mountedRef = useRef(true);
  const edges = ['top', 'right', 'bottom', 'left'];
  
  // Duration for the light to traverse one edge (10% slower than default ~1.2s)
  const edgeDuration = 1.32;
  
  // Start next animation
  const startNextEdge = () => {
    if (!mountedRef.current) return;
    
    const edge = edges[edgeIndexRef.current % 4];
    edgeIndexRef.current = (edgeIndexRef.current + 1) % 4;
    setCurrentEdge(edge);
  };
  
  // Handle animation complete
  const handleComplete = () => {
    if (!mountedRef.current) return;
    setCurrentEdge(null);
    
    // Determine rest time based on card type
    let restTime;
    if (singleCard || totalCards === 1) {
      // Single card: very little downtime (200-400ms)
      restTime = 200 + Math.random() * 200;
    } else {
      // Multiple cards: more downtime, varied per card (1.5-4s)
      restTime = 1500 + (cardIndex * 500) + Math.random() * 2000;
    }
    
    timeoutRef.current = setTimeout(startNextEdge, restTime);
  };
  
  // Initial start with stagger
  useEffect(() => {
    mountedRef.current = true;
    
    // Stagger start times so cards don't all animate at once
    let initialDelay;
    if (singleCard || totalCards === 1) {
      initialDelay = 100 + Math.random() * 300;
    } else {
      // Spread out initial starts across cards
      initialDelay = 200 + (cardIndex * 800) + Math.random() * 600;
    }
    
    timeoutRef.current = setTimeout(startNextEdge, initialDelay);
    
    return () => {
      mountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []); // eslint-disable-line
  
  return (
    <div 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 40
      }}
    >
      {currentEdge && (
        <LightBeam 
          key={`${cardIndex}-${currentEdge}-${Date.now()}`}
          edge={currentEdge} 
          duration={edgeDuration}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

// Export coordinator as a no-op for backwards compatibility
export const LightCoordinator = ({ children }) => children;

// Simple version for standalone cards
export const SimpleCornerLight = ({ delay = 0 }) => {
  return <CornerBracketLight cardIndex={0} singleCard={true} totalCards={1} />;
};
