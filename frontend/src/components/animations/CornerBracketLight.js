import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, createContext, useContext, useRef } from 'react';

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

// Light trail component
const LightTrail = ({ edge, onDone, speed = 2 }) => {  // Slower: 2s instead of 1.1s
  const isTop = edge === 'top';
  const isRight = edge === 'right';
  const isBottom = edge === 'bottom';
  const isLeft = edge === 'left';
  const isHoriz = isTop || isBottom;
  
  // Clockwise direction
  const fromPct = (isTop || isRight) ? -30 : 130;
  const toPct = (isTop || isRight) ? 130 : -30;
  
  // Gradient direction for trail effect
  const gradDir = isTop ? '90deg' : isRight ? '180deg' : isBottom ? '270deg' : '0deg';

  // DEBUG: Make it super visible
  return (
    <div 
      style={{
        position: 'absolute',
        zIndex: 99999,
        pointerEvents: 'none',
        overflow: 'visible',
        // Position EXACTLY on the border
        ...(isTop && { top: 0, left: 0, right: 0, height: 20 }),
        ...(isBottom && { bottom: 0, left: 0, right: 0, height: 20 }),
        ...(isLeft && { left: 0, top: 0, bottom: 0, width: 20 }),
        ...(isRight && { right: 0, top: 0, bottom: 0, width: 20 }),
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          ...(isHoriz 
            ? { width: 120, height: 20, top: 0 }
            : { height: 120, width: 20, left: 0 }
          ),
          background: `linear-gradient(${gradDir}, 
            transparent 0%,
            rgba(255,50,0,0.3) 20%,
            rgba(255,100,0,0.6) 45%,
            rgba(255,150,50,0.85) 70%,
            rgba(255,220,180,1) 90%,
            #FFFFFF 100%
          )`,
          boxShadow: `
            0 0 40px 20px rgba(255,106,0,1),
            0 0 80px 40px rgba(255,106,0,0.8),
            0 0 120px 60px rgba(255,106,0,0.5)
          `,
          borderRadius: 12,
        }}
        initial={{ [isHoriz ? 'left' : 'top']: `${fromPct}%`, opacity: 0 }}
        animate={{ 
          [isHoriz ? 'left' : 'top']: `${toPct}%`,
          opacity: [0, 1, 1, 1, 0]
        }}
        transition={{
          duration: speed,
          ease: 'linear',
          opacity: { times: [0, 0.05, 0.5, 0.95, 1] }
        }}
        onAnimationComplete={onDone}
      />
    </div>
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
    if (canStart) {
      setRunning(true);
      const nextEdge = edges[edgeIdx.current];
      edgeIdx.current = (edgeIdx.current + 1) % 4;
      setEdge(nextEdge);
    } else {
      timerRef.current = setTimeout(tryStart, 400 + Math.random() * 600);
    }
  };

  const onDone = () => {
    setEdge(null);
    setRunning(false);
    ctx?.releaseSlot?.(cardIndex);
    timerRef.current = setTimeout(tryStart, 1800 + Math.random() * 3200);
  };

  useEffect(() => {
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
        {edge && <LightTrail key={`${cardIndex}-${edge}`} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};

export const SimpleCornerLight = ({ delay = 0 }) => {
  const [edge, setEdge] = useState(null);
  const edgeIdx = useRef(0);
  const edges = ['top', 'right', 'bottom', 'left'];
  const timerRef = useRef(null);
  
  useEffect(() => {
    const start = () => {
      setEdge(edges[edgeIdx.current % 4]);
      edgeIdx.current++;
    };
    timerRef.current = setTimeout(start, delay * 1000);
    return () => clearTimeout(timerRef.current);
  }, [delay]);
  
  const onDone = () => {
    setEdge(null);
    timerRef.current = setTimeout(() => {
      setEdge(edges[edgeIdx.current % 4]);
      edgeIdx.current++;
    }, 1500 + Math.random() * 2000);
  };
  
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100, overflow: 'visible' }}>
      <AnimatePresence>
        {edge && <LightTrail key={edge} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};
