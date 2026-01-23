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
  const [activeSlots, setActiveSlots] = useState(new Set());
  const queueRef = useRef([]);
  
  // Request to animate a card - returns true if allowed
  const requestAnimation = useCallback((cardId) => {
    if (activeSlots.has(cardId)) return false;
    if (activeSlots.size >= 2) {
      // Add to queue if not already there
      if (!queueRef.current.includes(cardId)) {
        queueRef.current.push(cardId);
      }
      return false;
    }
    
    setActiveSlots(prev => new Set([...prev, cardId]));
    return true;
  }, [activeSlots]);
  
  // Called when a card finishes animating
  const releaseAnimation = useCallback((cardId) => {
    setActiveSlots(prev => {
      const next = new Set(prev);
      next.delete(cardId);
      return next;
    });
  }, []);
  
  // Get next card from queue
  const getNextFromQueue = useCallback(() => {
    if (queueRef.current.length > 0) {
      return queueRef.current.shift();
    }
    return null;
  }, []);
  
  return (
    <LightContext.Provider value={{ requestAnimation, releaseAnimation, getNextFromQueue, activeSlots }}>
      {children}
    </LightContext.Provider>
  );
};

// Hook to use light coordination
export const useLightCoordination = () => {
  return useContext(LightContext);
};

// Edge animation component - the actual light trail
const EdgeTrail = ({ edge, onComplete, duration = 1.1 }) => {
  const isTop = edge === 'top';
  const isRight = edge === 'right';
  const isBottom = edge === 'bottom';
  const isLeft = edge === 'left';
  
  const isHorizontal = isTop || isBottom;
  
  // Animation positions (clockwise movement)
  // Top: left→right, Right: top→bottom, Bottom: right→left, Left: bottom→top
  const startPercent = (isTop || isRight) ? -15 : 115;
  const endPercent = (isTop || isRight) ? 115 : -15;
  
  // Trail gradient direction (tail faces opposite to movement)
  const gradientDir = isTop ? 'to right' : isRight ? 'to bottom' : isBottom ? 'to left' : 'to top';
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        // Position on the actual border edge
        ...(isTop && { top: 0, left: 0, right: 0, height: 4 }),
        ...(isBottom && { bottom: 0, left: 0, right: 0, height: 4 }),
        ...(isLeft && { left: 0, top: 0, bottom: 0, width: 4 }),
        ...(isRight && { right: 0, top: 0, bottom: 0, width: 4 }),
        zIndex: 50,
        overflow: 'visible',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          ...(isHorizontal ? { 
            width: 60, 
            height: 4,
            top: -1,
          } : { 
            height: 60, 
            width: 4,
            left: -1,
          }),
          background: `linear-gradient(${gradientDir}, 
            transparent 0%,
            rgba(255,106,0,0.15) 20%,
            rgba(255,106,0,0.4) 45%,
            rgba(255,106,0,0.7) 65%,
            rgba(255,200,100,0.9) 85%,
            #FFFFFF 95%,
            #FF6A00 100%
          )`,
          boxShadow: '0 0 15px 5px rgba(255,106,0,0.8), 0 0 30px 10px rgba(255,106,0,0.4)',
          borderRadius: 3,
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
          opacity: { times: [0, 0.08, 0.5, 0.92, 1] }
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
  const animationStartedRef = useRef(false);
  
  // Generate unique edge sequence for this card
  const edges = ['top', 'right', 'bottom', 'left'];
  const edgeIndexRef = useRef(Math.floor(Math.random() * 4)); // Random starting edge
  
  // Start an animation on a random edge
  const startAnimation = useCallback(() => {
    // Check with coordinator (or allow if no coordinator)
    const canStart = context?.requestAnimation?.(cardIndex) ?? true;
    
    if (canStart) {
      const edge = edges[edgeIndexRef.current % 4];
      edgeIndexRef.current = (edgeIndexRef.current + 1) % 4;
      setActiveEdge(edge);
    } else {
      // Retry after a delay
      timeoutRef.current = setTimeout(startAnimation, 800 + Math.random() * 1200);
    }
  }, [cardIndex, context]);
  
  // Handle animation completion
  const handleComplete = useCallback(() => {
    setActiveEdge(null);
    context?.releaseAnimation?.(cardIndex);
    
    // Schedule next animation after a pause
    const nextDelay = 2000 + Math.random() * 3000;
    timeoutRef.current = setTimeout(startAnimation, nextDelay);
  }, [cardIndex, context, startAnimation]);
  
  // Start animations when component mounts
  useEffect(() => {
    if (animationStartedRef.current) return;
    animationStartedRef.current = true;
    
    // Staggered start based on card index
    const initialDelay = 300 + (cardIndex * 600) + (Math.random() * 1000);
    timeoutRef.current = setTimeout(startAnimation, initialDelay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [cardIndex, startAnimation]);
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 40, overflow: 'visible' }}
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

// Simple standalone version without coordinator
export const SimpleCornerLight = ({ delay = 0 }) => {
  const [activeEdge, setActiveEdge] = useState(null);
  const edges = ['top', 'right', 'bottom', 'left'];
  const edgeIndex = useRef(0);
  
  useEffect(() => {
    const runAnimation = () => {
      const edge = edges[edgeIndex.current % 4];
      edgeIndex.current++;
      setActiveEdge(edge);
    };
    
    const initialTimeout = setTimeout(runAnimation, delay * 1000);
    
    return () => clearTimeout(initialTimeout);
  }, [delay]);
  
  const handleComplete = useCallback(() => {
    setActiveEdge(null);
    setTimeout(() => {
      const edge = edges[edgeIndex.current % 4];
      edgeIndex.current++;
      setActiveEdge(edge);
    }, 1500 + Math.random() * 2000);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 40, overflow: 'visible' }}>
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
