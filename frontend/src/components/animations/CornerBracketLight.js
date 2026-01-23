import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef } from 'react';

/**
 * Light trail that travels along card borders
 * - Short line with tapering trail
 * - Clockwise movement only
 * - Max 2 lights active across all cards
 */

// Context for coordination
const LightContext = createContext(null);

export const LightCoordinator = ({ children }) => {
  const [activeCards, setActiveCards] = useState(new Set());
  
  const requestSlot = (cardId) => {
    if (activeCards.has(cardId) || activeCards.size >= 2) return false;
    setActiveCards(prev => new Set([...prev, cardId]));
    return true;
  };
  
  const releaseSlot = (cardId) => {
    setActiveCards(prev => {
      const next = new Set(prev);
      next.delete(cardId);
      return next;
    });
  };
  
  return (
    <LightContext.Provider value={{ requestSlot, releaseSlot }}>
      {children}
    </LightContext.Provider>
  );
};

// The animated light trail
const LightTrail = ({ edge, onDone, speed = 1.1 }) => {
  const isHoriz = edge === 'top' || edge === 'bottom';
  const goForward = edge === 'top' || edge === 'right';
  
  const from = goForward ? '-30%' : '130%';
  const to = goForward ? '130%' : '-30%';
  
  const grad = edge === 'top' ? 'to right' 
             : edge === 'right' ? 'to bottom'
             : edge === 'bottom' ? 'to left' 
             : 'to top';

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...(edge === 'top' && { top: -3, left: 0, right: 0, height: 6 }),
        ...(edge === 'bottom' && { bottom: -3, left: 0, right: 0, height: 6 }),
        ...(edge === 'left' && { left: -3, top: 0, bottom: 0, width: 6 }),
        ...(edge === 'right' && { right: -3, top: 0, bottom: 0, width: 6 }),
        zIndex: 9999,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          ...(isHoriz ? { width: 80, height: 6, top: 0 } : { height: 80, width: 6, left: 0 }),
          background: `linear-gradient(${grad}, 
            transparent 0%,
            rgba(255,106,0,0.15) 20%,
            rgba(255,106,0,0.4) 45%,
            rgba(255,106,0,0.7) 70%,
            rgba(255,220,180,0.95) 90%,
            #FFFFFF 100%
          )`,
          boxShadow: `
            0 0 20px 8px rgba(255,106,0,0.9),
            0 0 40px 15px rgba(255,106,0,0.6),
            0 0 60px 25px rgba(255,106,0,0.3)
          `,
          borderRadius: 4,
        }}
        initial={{ [isHoriz ? 'left' : 'top']: from, opacity: 0 }}
        animate={{ 
          [isHoriz ? 'left' : 'top']: to,
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          opacity: { times: [0, 0.05, 0.5, 0.95, 1] }
        }}
        onAnimationComplete={onDone}
      />
    </motion.div>
  );
};

// Main component for each card
export const CornerBracketLight = ({ cardIndex = 0 }) => {
  const [edge, setEdge] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const ctx = useContext(LightContext);
  const timerRef = useRef(null);
  const edgeIdx = useRef(cardIndex % 4);
  const edges = ['top', 'right', 'bottom', 'left'];
  
  // Attempt to start animation
  const tryStart = () => {
    if (isRunning) return;
    
    const canStart = ctx?.requestSlot?.(cardIndex) ?? true;
    if (canStart) {
      setIsRunning(true);
      const nextEdge = edges[edgeIdx.current];
      edgeIdx.current = (edgeIdx.current + 1) % 4;
      setEdge(nextEdge);
    } else {
      // Retry
      timerRef.current = setTimeout(tryStart, 500 + Math.random() * 700);
    }
  };
  
  // Handle animation done
  const onDone = () => {
    setEdge(null);
    setIsRunning(false);
    ctx?.releaseSlot?.(cardIndex);
    
    // Schedule next
    const delay = 2000 + Math.random() * 3500;
    timerRef.current = setTimeout(tryStart, delay);
  };
  
  // Start on mount with staggered timing
  useEffect(() => {
    const delay = 200 + cardIndex * 500 + Math.random() * 600;
    timerRef.current = setTimeout(tryStart, delay);
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      pointerEvents: 'none',
      zIndex: 100,
      overflow: 'visible'
    }}>
      <AnimatePresence mode="wait">
        {edge && <LightTrail key={`${cardIndex}-${edge}`} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};

// Simple version for standalone use
export const SimpleCornerLight = ({ delay = 0 }) => {
  const [edge, setEdge] = useState(null);
  const edgeIdx = useRef(0);
  const edges = ['top', 'right', 'bottom', 'left'];
  const timerRef = useRef(null);
  
  const start = () => {
    setEdge(edges[edgeIdx.current % 4]);
    edgeIdx.current++;
  };
  
  useEffect(() => {
    timerRef.current = setTimeout(start, delay * 1000);
    return () => clearTimeout(timerRef.current);
  }, [delay]);
  
  const onDone = () => {
    setEdge(null);
    timerRef.current = setTimeout(start, 1500 + Math.random() * 2000);
  };
  
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100, overflow: 'visible' }}>
      <AnimatePresence mode="wait">
        {edge && <LightTrail key={edge} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};
