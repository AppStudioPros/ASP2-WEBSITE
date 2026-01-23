import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef } from 'react';

/**
 * Light trail that travels along card borders
 * - Short line with tapering trail (tail faces opposite to movement)
 * - Clockwise movement only
 * - Max 2 lights active across all cards at once
 */

// Context for coordinating lights across multiple cards
const LightContext = createContext(null);

// Provider that limits active animations
export const LightCoordinator = ({ children, cardCount = 4 }) => {
  const [activeCards, setActiveCards] = useState(new Set());
  
  const requestSlot = (cardId) => {
    if (activeCards.has(cardId)) return false;
    if (activeCards.size >= 2) return false;
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

// The light trail element
const LightTrail = ({ edge, onDone, speed = 1.1 }) => {
  const isHoriz = edge === 'top' || edge === 'bottom';
  const goForward = edge === 'top' || edge === 'right';
  
  // Start/end positions for clockwise movement
  const from = goForward ? '-25%' : '125%';
  const to = goForward ? '125%' : '-25%';
  
  // Gradient direction (tail behind, bright front)
  const grad = edge === 'top' ? 'to right' 
             : edge === 'right' ? 'to bottom'
             : edge === 'bottom' ? 'to left' 
             : 'to top';

  return (
    <motion.div
      style={{
        position: 'absolute',
        ...(edge === 'top' && { top: -2, left: 0, right: 0, height: 5 }),
        ...(edge === 'bottom' && { bottom: -2, left: 0, right: 0, height: 5 }),
        ...(edge === 'left' && { left: -2, top: 0, bottom: 0, width: 5 }),
        ...(edge === 'right' && { right: -2, top: 0, bottom: 0, width: 5 }),
        zIndex: 999,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          ...(isHoriz ? { width: 70, height: 5, top: 0 } : { height: 70, width: 5, left: 0 }),
          background: `linear-gradient(${grad}, 
            transparent 0%,
            rgba(255,106,0,0.1) 15%,
            rgba(255,106,0,0.35) 40%,
            rgba(255,106,0,0.65) 65%,
            rgba(255,200,150,0.9) 85%,
            #FFFFFF 100%
          )`,
          boxShadow: `
            0 0 15px 6px rgba(255,106,0,0.85),
            0 0 35px 12px rgba(255,106,0,0.5),
            0 0 50px 20px rgba(255,106,0,0.25)
          `,
          borderRadius: 3,
        }}
        initial={{ [isHoriz ? 'left' : 'top']: from, opacity: 0 }}
        animate={{ 
          [isHoriz ? 'left' : 'top']: to,
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          opacity: { times: [0, 0.06, 0.5, 0.94, 1] }
        }}
        onAnimationComplete={onDone}
      />
    </motion.div>
  );
};

// Main component attached to each card
export const CornerBracketLight = ({ cardIndex = 0 }) => {
  const [edge, setEdge] = useState(null);
  const ctx = useContext(LightContext);
  const timer = useRef(null);
  const edgeIdx = useRef(cardIndex % 4);
  const edges = ['top', 'right', 'bottom', 'left'];
  const mounted = useRef(true);
  
  const tryStart = () => {
    if (!mounted.current) return;
    
    // Try to get a slot
    const gotSlot = ctx?.requestSlot?.(cardIndex) ?? true;
    
    if (gotSlot) {
      const nextEdge = edges[edgeIdx.current];
      edgeIdx.current = (edgeIdx.current + 1) % 4;
      setEdge(nextEdge);
    } else {
      // Retry soon
      timer.current = setTimeout(tryStart, 600 + Math.random() * 800);
    }
  };
  
  const onDone = () => {
    if (!mounted.current) return;
    setEdge(null);
    ctx?.releaseSlot?.(cardIndex);
    // Schedule next after pause
    timer.current = setTimeout(tryStart, 2200 + Math.random() * 3000);
  };
  
  useEffect(() => {
    mounted.current = true;
    // Stagger start times per card
    const delay = 400 + cardIndex * 650 + Math.random() * 700;
    timer.current = setTimeout(tryStart, delay);
    
    return () => {
      mounted.current = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 50, overflow: 'visible' }}
    >
      <AnimatePresence>
        {edge && <LightTrail key={edge} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};

// Simple standalone version
export const SimpleCornerLight = ({ delay = 0 }) => {
  const [edge, setEdge] = useState(null);
  const edgeIdx = useRef(0);
  const edges = ['top', 'right', 'bottom', 'left'];
  
  useEffect(() => {
    const start = () => {
      setEdge(edges[edgeIdx.current % 4]);
      edgeIdx.current++;
    };
    const t = setTimeout(start, delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);
  
  const onDone = () => {
    setEdge(null);
    setTimeout(() => {
      setEdge(edges[edgeIdx.current % 4]);
      edgeIdx.current++;
    }, 1800 + Math.random() * 2000);
  };
  
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 50, overflow: 'visible' }}>
      <AnimatePresence>
        {edge && <LightTrail key={edge} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};
