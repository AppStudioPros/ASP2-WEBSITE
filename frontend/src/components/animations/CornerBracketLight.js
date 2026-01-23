import { motion } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useCallback, useRef } from 'react';

/**
 * Light trail that travels along card borders
 * - Short line with tapering trail
 * - Clockwise movement only  
 * - Appears from and disappears into corner brackets
 */

// Context for coordinating lights across multiple cards
const LightContext = createContext(null);

// Provider that manages which cards can show lights (max 2 at a time)
export const LightCoordinator = ({ children, cardCount = 4 }) => {
  const [activeCards, setActiveCards] = useState(new Set());
  
  const requestAnimation = useCallback((cardId) => {
    if (activeCards.has(cardId)) return false;
    if (activeCards.size >= 2) return false;
    setActiveCards(prev => new Set([...prev, cardId]));
    return true;
  }, [activeCards]);
  
  const releaseAnimation = useCallback((cardId) => {
    setActiveCards(prev => {
      const next = new Set(prev);
      next.delete(cardId);
      return next;
    });
  }, []);
  
  return (
    <LightContext.Provider value={{ requestAnimation, releaseAnimation, activeCards }}>
      {children}
    </LightContext.Provider>
  );
};

// Edge animation component - the actual light trail
const EdgeTrail = ({ edge, onComplete, duration = 1.1 }) => {
  const isTop = edge === 'top';
  const isRight = edge === 'right';
  const isBottom = edge === 'bottom';
  const isLeft = edge === 'left';
  
  const isHorizontal = isTop || isBottom;
  
  // Animation direction (clockwise)
  const startPercent = (isTop || isRight) ? -20 : 120;
  const endPercent = (isTop || isRight) ? 120 : -20;
  
  // Trail gradient (tail faces opposite to movement)
  const gradientDir = isTop ? 'to right' : isRight ? 'to bottom' : isBottom ? 'to left' : 'to top';
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        ...(isTop && { top: -2, left: 0, right: 0, height: 6 }),
        ...(isBottom && { bottom: -2, left: 0, right: 0, height: 6 }),
        ...(isLeft && { left: -2, top: 0, bottom: 0, width: 6 }),
        ...(isRight && { right: -2, top: 0, bottom: 0, width: 6 }),
        zIndex: 100,
        overflow: 'visible',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          ...(isHorizontal ? { 
            width: 80, 
            height: 6,
            top: 0,
          } : { 
            height: 80, 
            width: 6,
            left: 0,
          }),
          background: `linear-gradient(${gradientDir}, 
            transparent 0%,
            rgba(255,106,0,0.1) 15%,
            rgba(255,106,0,0.3) 35%,
            rgba(255,106,0,0.6) 55%,
            rgba(255,180,100,0.9) 80%,
            #FFFFFF 100%
          )`,
          boxShadow: '0 0 20px 8px rgba(255,106,0,0.9), 0 0 40px 16px rgba(255,106,0,0.5), 0 0 60px 24px rgba(255,106,0,0.2)',
          borderRadius: 4,
        }}
        initial={{ 
          [isHorizontal ? 'left' : 'top']: `${startPercent}%`,
          opacity: 0 
        }}
        animate={{ 
          [isHorizontal ? 'left' : 'top']: `${endPercent}%`,
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
          duration: duration,
          ease: 'linear',
          opacity: { times: [0, 0.05, 0.5, 0.95, 1] }
        }}
        onAnimationComplete={onComplete}
      />
    </motion.div>
  );
};

// Main corner bracket light component
export const CornerBracketLight = ({ 
  cardIndex = 0,
  totalCards = 4,
}) => {
  const [activeEdge, setActiveEdge] = useState(null);
  const context = useContext(LightContext);
  const timeoutRef = useRef(null);
  const edgeIndexRef = useRef(cardIndex % 4); // Different starting edge per card
  const edges = ['top', 'right', 'bottom', 'left'];
  
  // Start animation
  const startAnimation = useCallback(() => {
    const canStart = context?.requestAnimation?.(cardIndex) ?? true;
    
    if (canStart && !activeEdge) {
      const edge = edges[edgeIndexRef.current];
      edgeIndexRef.current = (edgeIndexRef.current + 1) % 4;
      setActiveEdge(edge);
    } else if (!canStart) {
      // Retry after delay
      timeoutRef.current = setTimeout(startAnimation, 500 + Math.random() * 1000);
    }
  }, [cardIndex, context, activeEdge]);
  
  // Handle completion
  const handleComplete = useCallback(() => {
    setActiveEdge(null);
    context?.releaseAnimation?.(cardIndex);
    
    // Schedule next animation
    const delay = 2500 + Math.random() * 3500;
    timeoutRef.current = setTimeout(startAnimation, delay);
  }, [cardIndex, context, startAnimation]);
  
  // Initial trigger with staggered timing
  useEffect(() => {
    // Stagger based on card index
    const initialDelay = 500 + (cardIndex * 700) + (Math.random() * 800);
    timeoutRef.current = setTimeout(startAnimation, initialDelay);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []); // Run once on mount
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 50, overflow: 'visible' }}
    >
      {activeEdge && (
        <EdgeTrail 
          edge={activeEdge} 
          onComplete={handleComplete}
          duration={1.1}
        />
      )}
    </div>
  );
};

// Simple standalone version
export const SimpleCornerLight = ({ delay = 0 }) => {
  const [activeEdge, setActiveEdge] = useState(null);
  const edges = ['top', 'right', 'bottom', 'left'];
  const edgeIndexRef = useRef(0);
  
  useEffect(() => {
    const start = () => {
      const edge = edges[edgeIndexRef.current % 4];
      edgeIndexRef.current++;
      setActiveEdge(edge);
    };
    
    const timeout = setTimeout(start, delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);
  
  const handleComplete = useCallback(() => {
    setActiveEdge(null);
    setTimeout(() => {
      const edge = edges[edgeIndexRef.current % 4];
      edgeIndexRef.current++;
      setActiveEdge(edge);
    }, 2000 + Math.random() * 2000);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50, overflow: 'visible' }}>
      {activeEdge && (
        <EdgeTrail 
          edge={activeEdge} 
          onComplete={handleComplete}
          duration={1.1}
        />
      )}
    </div>
  );
};
