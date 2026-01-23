import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

/**
 * Animated light trail that moves along the border edges
 * - Short line shape with tapering trail
 * - Clockwise movement only
 * - Appears to come from and disappear into corner brackets
 */

// Edge definitions with clockwise direction
const EDGES = {
  top: { axis: 'x', start: 0, end: 100, y: 0 },      // Left to right
  right: { axis: 'y', start: 0, end: 100, x: 100 },  // Top to bottom
  bottom: { axis: 'x', start: 100, end: 0, y: 100 }, // Right to left
  left: { axis: 'y', start: 100, end: 0, x: 0 },     // Bottom to top
};

const EDGE_ORDER = ['top', 'right', 'bottom', 'left'];

// Light trail component for a single edge
const EdgeLight = ({ edge, isActive, duration }) => {
  const config = EDGES[edge];
  const isHorizontal = config.axis === 'x';
  const movingForward = config.start < config.end;
  
  // Trail gradient direction based on movement
  const gradientAngle = isHorizontal 
    ? (movingForward ? '90deg' : '270deg')  // Left-to-right or right-to-left
    : (movingForward ? '180deg' : '0deg');   // Top-to-bottom or bottom-to-top

  if (!isActive) return null;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        // Position on the edge
        ...(isHorizontal ? {
          top: config.y === 0 ? -1 : 'auto',
          bottom: config.y === 100 ? -1 : 'auto',
          height: 3,
          width: 40,
        } : {
          left: config.x === 0 ? -1 : 'auto',
          right: config.x === 100 ? -1 : 'auto',
          width: 3,
          height: 40,
        }),
        // Gradient trail effect - bright at front, fading tail
        background: `linear-gradient(${gradientAngle}, 
          transparent 0%, 
          rgba(255,106,0,0.1) 20%,
          rgba(255,106,0,0.4) 50%,
          rgba(255,106,0,0.8) 80%,
          rgba(255,255,255,1) 95%,
          rgba(255,106,0,1) 100%
        )`,
        boxShadow: '0 0 8px 2px rgba(255,106,0,0.6)',
        borderRadius: 2,
        zIndex: 30,
      }}
      initial={{
        [isHorizontal ? 'left' : 'top']: `${config.start}%`,
        opacity: 0,
      }}
      animate={{
        [isHorizontal ? 'left' : 'top']: [`${config.start}%`, `${config.end}%`],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration: duration,
        ease: "linear",
        opacity: {
          times: [0, 0.05, 0.5, 0.95, 1],
          duration: duration,
        }
      }}
    />
  );
};

export const CornerBracketLight = ({ 
  delay = 0, 
  duration = 1.1,  // 10% slower (was ~1s effective, now 1.1s per edge)
  cardIndex = 0,   // Used for coordination
  totalCards = 1,  // Total cards in the group
  onAnimationComplete,
}) => {
  const [activeEdge, setActiveEdge] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate a unique sequence pattern based on card index
  const getSequencePattern = useCallback(() => {
    // Different starting edges and patterns per card
    const patterns = [
      ['top', 'right'],
      ['right', 'bottom'],
      ['bottom', 'left'],
      ['left', 'top'],
      ['top', 'bottom'],
      ['right', 'left'],
      ['bottom', 'top'],
      ['left', 'right'],
    ];
    return patterns[cardIndex % patterns.length];
  }, [cardIndex]);

  // Start animation for a specific edge
  const animateEdge = useCallback((edge) => {
    setActiveEdge(edge);
    setIsAnimating(true);
    
    // Clear after animation completes
    setTimeout(() => {
      setActiveEdge(null);
      setIsAnimating(false);
      onAnimationComplete?.(cardIndex);
    }, duration * 1000);
  }, [duration, cardIndex, onAnimationComplete]);

  // Expose method to trigger animation externally
  useEffect(() => {
    // Store the animate function on the window for coordinator access
    const key = `animateCard_${cardIndex}`;
    window[key] = animateEdge;
    
    return () => {
      delete window[key];
    };
  }, [animateEdge, cardIndex]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 25 }}>
      {EDGE_ORDER.map(edge => (
        <EdgeLight 
          key={edge}
          edge={edge}
          isActive={activeEdge === edge}
          duration={duration}
        />
      ))}
    </div>
  );
};

/**
 * Coordinator component that manages light animations across multiple cards
 * Ensures only 2 lights are active at any time, spread across different cards
 */
export const LightCoordinator = ({ children, cardCount = 4 }) => {
  const [activeAnimations, setActiveAnimations] = useState(new Set());
  const duration = 1.1; // Match the light duration
  
  // Generate random sequences for each card
  const [cardSequences] = useState(() => {
    const edges = ['top', 'right', 'bottom', 'left'];
    return Array.from({ length: cardCount }, (_, i) => {
      // Shuffle edges differently for each card
      const shuffled = [...edges].sort(() => Math.random() - 0.5);
      // Add random delays between sequences
      return {
        edges: shuffled,
        baseDelay: Math.random() * 2000, // 0-2s initial delay
        betweenDelay: 1500 + Math.random() * 2000, // 1.5-3.5s between animations
      };
    });
  });

  const [cardEdgeIndex, setCardEdgeIndex] = useState(() => 
    Array.from({ length: cardCount }, () => 0)
  );

  // Trigger next animation for a card
  const triggerAnimation = useCallback((cardIndex) => {
    if (activeAnimations.size >= 2) return false;
    if (activeAnimations.has(cardIndex)) return false;
    
    const sequence = cardSequences[cardIndex];
    const edgeIndex = cardEdgeIndex[cardIndex];
    const edge = sequence.edges[edgeIndex % sequence.edges.length];
    
    // Call the card's animate function
    const animateFn = window[`animateCard_${cardIndex}`];
    if (animateFn) {
      setActiveAnimations(prev => new Set([...prev, cardIndex]));
      animateFn(edge);
      
      // Update edge index for next animation
      setCardEdgeIndex(prev => {
        const next = [...prev];
        next[cardIndex] = (edgeIndex + 1) % 4;
        return next;
      });
      
      return true;
    }
    return false;
  }, [activeAnimations, cardSequences, cardEdgeIndex]);

  // Handle animation completion
  const handleComplete = useCallback((cardIndex) => {
    setActiveAnimations(prev => {
      const next = new Set(prev);
      next.delete(cardIndex);
      return next;
    });
  }, []);

  // Main animation loop
  useEffect(() => {
    let timeouts = [];
    
    const scheduleNextAnimation = () => {
      // Find cards that aren't currently animating
      const availableCards = Array.from({ length: cardCount }, (_, i) => i)
        .filter(i => !activeAnimations.has(i));
      
      if (availableCards.length === 0 || activeAnimations.size >= 2) {
        // Wait and try again
        const timeout = setTimeout(scheduleNextAnimation, 500);
        timeouts.push(timeout);
        return;
      }
      
      // Pick a random available card
      const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      triggerAnimation(randomCard);
      
      // Schedule next check
      const delay = 800 + Math.random() * 1200; // Stagger timing
      const timeout = setTimeout(scheduleNextAnimation, delay);
      timeouts.push(timeout);
    };

    // Initial staggered start
    cardSequences.forEach((seq, i) => {
      const timeout = setTimeout(() => {
        if (activeAnimations.size < 2) {
          triggerAnimation(i);
        }
      }, seq.baseDelay);
      timeouts.push(timeout);
    });

    // Start the main loop after initial animations
    const mainTimeout = setTimeout(scheduleNextAnimation, 3000);
    timeouts.push(mainTimeout);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
    };
  }, [cardCount, triggerAnimation, activeAnimations, cardSequences]);

  // Provide completion handler to children
  return (
    <>
      {typeof children === 'function' 
        ? children({ onAnimationComplete: handleComplete })
        : children
      }
    </>
  );
};
