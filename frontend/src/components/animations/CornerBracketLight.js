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

// Light trail component - positioned to draw on the border itself
const LightTrail = ({ edge, onDone, speed = 1.1 }) => {
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

  // Position along the border
  const positionStyles = {
    position: 'absolute' as const,
    zIndex: 9999,
    pointerEvents: 'none' as const,
    ...(isTop && { top: 0, left: 0, right: 0, height: 2, transform: 'translateY(-50%)' }),
    ...(isBottom && { bottom: 0, left: 0, right: 0, height: 2, transform: 'translateY(50%)' }),
    ...(isLeft && { left: 0, top: 0, bottom: 0, width: 2, transform: 'translateX(-50%)' }),
    ...(isRight && { right: 0, top: 0, bottom: 0, width: 2, transform: 'translateX(50%)' }),
  };

  const trailStyles = {
    position: 'absolute' as const,
    ...(isHoriz 
      ? { width: 80, height: 8, top: '50%', transform: 'translateY(-50%)' }
      : { height: 80, width: 8, left: '50%', transform: 'translateX(-50%)' }
    ),
    background: `linear-gradient(${gradDir}, 
      transparent 0%,
      rgba(255,106,0,0.15) 20%,
      rgba(255,106,0,0.4) 45%,
      rgba(255,106,0,0.7) 70%,
      rgba(255,200,120,0.95) 90%,
      #FFFFFF 100%
    )`,
    boxShadow: `
      0 0 20px 8px rgba(255,106,0,0.95),
      0 0 40px 15px rgba(255,106,0,0.6),
      0 0 60px 25px rgba(255,106,0,0.3)
    `,
    borderRadius: 6,
    filter: 'blur(0.5px)',
  };

  return (
    <div style={positionStyles}>
      <motion.div
        style={trailStyles}
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
      inset: -4, // Extend slightly beyond card bounds
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
    <div style={{ position: 'absolute', inset: -4, pointerEvents: 'none', zIndex: 100, overflow: 'visible' }}>
      <AnimatePresence>
        {edge && <LightTrail key={edge} edge={edge} onDone={onDone} speed={1.1} />}
      </AnimatePresence>
    </div>
  );
};
