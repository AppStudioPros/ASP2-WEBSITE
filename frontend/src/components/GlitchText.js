import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { CornerBracketLight } from './animations/CornerBracketLight';

// Different animation patterns for variety
const animationPatterns = [
  // Pattern 1: Single blink, long pause, double blink
  [
    { glitch: true, duration: 150 },
    { glitch: false, duration: 2500 },
    { glitch: true, duration: 100 },
    { glitch: false, duration: 200 },
    { glitch: true, duration: 100 },
    { glitch: false, duration: 3000 },
  ],
  // Pattern 2: Quick triple blink, long pause
  [
    { glitch: true, duration: 80 },
    { glitch: false, duration: 150 },
    { glitch: true, duration: 80 },
    { glitch: false, duration: 150 },
    { glitch: true, duration: 80 },
    { glitch: false, duration: 4000 },
  ],
  // Pattern 3: Single blink, pause, single blink, longer pause
  [
    { glitch: true, duration: 120 },
    { glitch: false, duration: 1800 },
    { glitch: true, duration: 150 },
    { glitch: false, duration: 3500 },
  ],
  // Pattern 4: Long glitch, pause, quick double
  [
    { glitch: true, duration: 200 },
    { glitch: false, duration: 2800 },
    { glitch: true, duration: 60 },
    { glitch: false, duration: 100 },
    { glitch: true, duration: 60 },
    { glitch: false, duration: 3200 },
  ],
];

export const GlitchText = ({ children, className = '', pattern = 0 }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  // Use pattern prop to select animation, with fallback to random based on children hash
  const selectedPattern = useMemo(() => {
    if (pattern >= 0 && pattern < animationPatterns.length) {
      return animationPatterns[pattern];
    }
    // Generate a consistent pattern based on the text content
    const hash = String(children).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return animationPatterns[hash % animationPatterns.length];
  }, [pattern, children]);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId;
    
    // Add random initial delay (0-2 seconds) to desync animations
    const initialDelay = Math.random() * 2000;
    
    const runPattern = () => {
      const step = selectedPattern[currentIndex];
      setIsGlitching(step.glitch);
      
      timeoutId = setTimeout(() => {
        currentIndex = (currentIndex + 1) % selectedPattern.length;
        runPattern();
      }, step.duration);
    };
    
    // Start after initial random delay
    timeoutId = setTimeout(runPattern, initialDelay);
    
    return () => clearTimeout(timeoutId);
  }, [selectedPattern]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={isGlitching ? 'opacity-0' : 'opacity-100'}>{children}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 text-[#00E5FF] opacity-70"
            style={{ transform: 'translate(-2px, -1px)', clipPath: 'inset(10% 0 60% 0)' }}
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-[#FF6A00] opacity-70"
            style={{ transform: 'translate(2px, 1px)', clipPath: 'inset(40% 0 20% 0)' }}
          >
            {children}
          </span>
          <span className="absolute inset-0">{children}</span>
        </>
      )}
    </span>
  );
};

// Terminal typing effect
export const TerminalText = ({ text, speed = 50, className = '', onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={`font-mono ${className}`}>
      {displayText}
      <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} text-[#00E5FF]`}>▌</span>
    </span>
  );
};

// Scanline overlay
export const ScanlineOverlay = ({ className = '' }) => (
  <div 
    className={`pointer-events-none fixed inset-0 z-50 ${className}`}
    style={{
      background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)',
      opacity: 0.1
    }}
  />
);

// HUD Frame Component with animated corner lights (ORANGE BRACKETS)
export const HUDFrame = ({ 
  children, 
  className = '', 
  animated = true, 
  cardIndex = 0,
  totalCards = 1,
  singleCard = false,  // For standalone cards with minimal downtime
}) => {
  return (
    // Outer wrapper to allow light overflow
    <div style={{ position: 'relative', overflow: 'visible' }}>
      {/* Light animation positioned OUTSIDE the clipped card */}
      {animated && (
        <CornerBracketLight 
          cardIndex={cardIndex}
          totalCards={totalCards}
          singleCard={singleCard || totalCards === 1}
        />
      )}
      
      {/* Main card with potential rounded corners and borders */}
      <div className={`relative p-6 ${className}`}>
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#FF6A00]" style={{ zIndex: 10 }} />
        <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#FF6A00]" style={{ zIndex: 10 }} />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#FF6A00]" style={{ zIndex: 10 }} />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#FF6A00]" style={{ zIndex: 10 }} />
        
        {children}
      </div>
    </div>
  );
};

export default GlitchText;
