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
  const [activeSlots, setActiveSlots] = useState([]);
  const [cardAnimating, setCardAnimating] = useState({});
  const pendingQueue = useRef([]);
  
  // Request to animate a card - returns true if allowed
  const requestAnimation = useCallback((cardId) => {
    // Check if already animating or if we have 2 active
    if (cardAnimating[cardId]) return false;
    if (activeSlots.length >= 2) {
      // Queue for later
      if (!pendingQueue.current.includes(cardId)) {
        pendingQueue.current.push(cardId);
      }
      return false;
    }
    
    setActiveSlots(prev => [...prev, cardId]);
    setCardAnimating(prev => ({ ...prev, [cardId]: true }));
    return true;
  }, [activeSlots, cardAnimating]);
  
  // Called when a card finishes animating
  const releaseAnimation = useCallback((cardId) => {
    setActiveSlots(prev => prev.filter(id => id !== cardId));
    setCardAnimating(prev => ({ ...prev, [cardId]: false }));
    
    // Process queue
    setTimeout(() => {
      if (pendingQueue.current.length > 0) {
        const nextCard = pendingQueue.current.shift();
        // Trigger will be handled by the card's useEffect
      }
    }, 300);
  }, []);
  
  return (
    <LightContext.Provider value={{ requestAnimation, releaseAnimation, activeSlots }}>
      {children}
    </LightContext.Provider>
  );
};

// Edge animation component
const EdgeTrail = ({ edge, onComplete, duration = 1.1 }) => {
  const isTop = edge === 'top';
  const isRight = edge === 'right';
  const isBottom = edge === 'bottom';
  const isLeft = edge === 'left';
  
  const isHorizontal = isTop || isBottom;
  
  // Determine animation direction (clockwise)
  // Top: left to right, Right: top to bottom, Bottom: right to left, Left: bottom to top
  const startPos = isTop ? '-10%' : isRight ? '-10%' : isBottom ? '110%' : isLeft ? '110%' : '0%';
  const endPos = isTop ? '110%' : isRight ? '110%' : isBottom ? '-10%' : isLeft ? '-10%' : '100%';
  
  // Trail gradient direction (tail faces opposite to movement)
  const gradientDir = isTop ? 'to right' : isRight ? 'to bottom' : isBottom ? 'to left' : 'to top';
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        // Position on edge
        ...(isTop && { top: -1, left: 0, right: 0, height: 3 }),
        ...(isBottom && { bottom: -1, left: 0, right: 0, height: 3 }),
        ...(isLeft && { left: -1, top: 0, bottom: 0, width: 3 }),
        ...(isRight && { right: -1, top: 0, bottom: 0, width: 3 }),
        zIndex: 30,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          ...(isHorizontal ? { 
            width: 50, 
            height: '100%',
            top: 0,
          } : { 
            height: 50, 
            width: '100%',
            left: 0,
          }),
          background: `linear-gradient(${gradientDir}, 
            transparent 0%,
            rgba(255,106,0,0.2) 30%,
            rgba(255,106,0,0.6) 60%,
            rgba(255,255,255,0.9) 90%,
            #FF6A00 100%
          )`,
          boxShadow: '0 0 12px 4px rgba(255,106,0,0.7), 0 0 20px 8px rgba(255,106,0,0.3)',
          borderRadius: 2,
        }}
        initial={{ 
          [isHorizontal ? 'left' : 'top']: startPos,
          opacity: 0 
        }}
        animate={{ 
          [isHorizontal ? 'left' : 'top']: endPos,
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
          duration: duration,
          ease: 'linear',
          opacity: { times: [0, 0.1, 0.5, 0.9, 1] }
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
  const [isInView, setIsInView] = useState(false);
  const context = useContext(LightContext);
  const componentRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  
  // Generate unique sequence for this card based on index
  const edges = ['top', 'right', 'bottom', 'left'];
  const sequenceRef = useRef(
    // Shuffle edges uniquely per card
    [...edges].sort(() => {
      const seed = (cardIndex + 1) * 7919; // Prime number for better distribution
      return Math.sin(seed) - 0.5;
    })
  );
  const edgeIndexRef = useRef(0);
  
  // Check if in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    
    if (componentRef.current) {
      observer.observe(componentRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Schedule animations
  useEffect(() => {
    if (!isInView) return;
    
    // Random initial delay per card (stagger them)
    const initialDelay = 500 + (cardIndex * 800) + (Math.random() * 1500);
    
    const scheduleNextAnimation = () => {
      // Try to get animation slot
      const canAnimate = context?.requestAnimation?.(cardIndex) ?? true;
      
      if (canAnimate && !activeEdge) {
        const edge = sequenceRef.current[edgeIndexRef.current % 4];
        edgeIndexRef.current++;
        setActiveEdge(edge);
      } else {
        // Retry after delay
        animationTimeoutRef.current = setTimeout(scheduleNextAnimation, 1000 + Math.random() * 1500);
      }
    };
    
    animationTimeoutRef.current = setTimeout(scheduleNextAnimation, initialDelay);
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isInView, cardIndex, context, activeEdge]);
  
  // Handle animation complete
  const handleComplete = useCallback(() => {
    setActiveEdge(null);
    context?.releaseAnimation?.(cardIndex);
    
    // Schedule next animation after a pause
    const nextDelay = 2500 + Math.random() * 3000;
    animationTimeoutRef.current = setTimeout(() => {
      if (isInView) {
        const canAnimate = context?.requestAnimation?.(cardIndex) ?? true;
        if (canAnimate) {
          const edge = sequenceRef.current[edgeIndexRef.current % 4];
          edgeIndexRef.current++;
          setActiveEdge(edge);
        }
      }
    }, nextDelay);
  }, [cardIndex, context, isInView]);
  
  return (
    <div 
      ref={componentRef}
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ zIndex: 25 }}
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

// Simple version without coordinator (for single cards)
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
    }, 2000 + Math.random() * 2000);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" style={{ zIndex: 25 }}>
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
