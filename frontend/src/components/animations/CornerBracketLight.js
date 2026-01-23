import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef } from 'react';

/**
 * Light trail that travels along card borders
 */

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

// The light trail using CSS animation for maximum reliability
const LightTrail = ({ edge, onDone, speed = 1.1 }) => {
  const isHoriz = edge === 'top' || edge === 'bottom';
  const goForward = edge === 'top' || edge === 'right';
  
  const grad = edge === 'top' ? 'to right' 
             : edge === 'right' ? 'to bottom'
             : edge === 'bottom' ? 'to left' 
             : 'to top';

  // Use CSS animation for reliability
  const keyframes = isHoriz 
    ? (goForward 
        ? { left: ['-30%', '130%'] }
        : { left: ['130%', '-30%'] })
    : (goForward
        ? { top: ['-30%', '130%'] }
        : { top: ['130%', '-30%'] });

  return (
    <motion.div
      style={{
        position: 'absolute',
        // Position INSIDE the border so it's not clipped
        ...(edge === 'top' && { top: 2, left: 0, right: 0, height: 8 }),
        ...(edge === 'bottom' && { bottom: 2, left: 0, right: 0, height: 8 }),
        ...(edge === 'left' && { left: 2, top: 0, bottom: 0, width: 8 }),
        ...(edge === 'right' && { right: 2, top: 0, bottom: 0, width: 8 }),
        zIndex: 9999,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          ...(isHoriz ? { width: 100, height: 8, top: 0 } : { height: 100, width: 8, left: 0 }),
          background: `linear-gradient(${grad}, 
            transparent 0%,
            rgba(255,106,0,0.3) 25%,
            rgba(255,106,0,0.6) 50%,
            rgba(255,180,100,0.9) 80%,
            #FFFFFF 95%,
            #FF6A00 100%
          )`,
          boxShadow: `
            0 0 25px 10px rgba(255,106,0,1),
            0 0 50px 20px rgba(255,106,0,0.7),
            0 0 80px 40px rgba(255,106,0,0.4)
          `,
          borderRadius: 5,
        }}
        animate={keyframes}
        transition={{
          duration: speed,
          ease: 'linear',
        }}
        onAnimationComplete={onDone}
      />
    </motion.div>
  );
};

// Main component
export const CornerBracketLight = ({ cardIndex = 0 }) => {
  const [edge, setEdge] = useState(null);
  const [running, setRunning] = useState(false);
  const ctx = useContext(LightContext);
  const timerRef = useRef(null);
  const edgeIdx = useRef(cardIndex % 4);
  const edges = ['top', 'right', 'bottom', 'left'];

  const tryStart = () => {
    if (running) return;
    
    const canStart = ctx?.requestSlot?.(cardIndex) ?? true;
    console.log(`Card ${cardIndex} tryStart, canStart: ${canStart}`);
    if (canStart) {
      setRunning(true);
      const nextEdge = edges[edgeIdx.current];
      edgeIdx.current = (edgeIdx.current + 1) % 4;
      console.log(`Card ${cardIndex} starting edge: ${nextEdge}`);
      setEdge(nextEdge);
    } else {
      timerRef.current = setTimeout(tryStart, 400 + Math.random() * 600);
    }
  };

  const onDone = () => {
    console.log(`Card ${cardIndex} animation done`);
    setEdge(null);
    setRunning(false);
    ctx?.releaseSlot?.(cardIndex);
    timerRef.current = setTimeout(tryStart, 1800 + Math.random() * 3200);
  };

  useEffect(() => {
    console.log(`CornerBracketLight mounted for card ${cardIndex}`);
    // Start immediately with staggered delay
    const delay = 100 + cardIndex * 400 + Math.random() * 500;
    timerRef.current = setTimeout(tryStart, delay);
    return () => clearTimeout(timerRef.current);
  }, []); // eslint-disable-line

  return (
    <div style={{ 
      position: 'absolute', 
      inset: 0, 
      pointerEvents: 'none',
      zIndex: 100,
      overflow: 'visible'
    }}>
      <AnimatePresence>
        {edge && <LightTrail key={`${cardIndex}-${edge}-${Date.now()}`} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};

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
      <AnimatePresence>
        {edge && <LightTrail key={edge} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};
