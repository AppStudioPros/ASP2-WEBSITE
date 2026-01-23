import { useState, useEffect, useMemo } from 'react';

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

// HUD Frame component
export const HUDFrame = ({ children, title, className = '' }) => (
  <div className={`relative ${className}`}>
    {/* Corner brackets */}
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00E5FF]/50" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00E5FF]/50" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00E5FF]/50" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00E5FF]/50" />
    
    {/* Title bar */}
    {title && (
      <div className="absolute -top-3 left-6 px-2 bg-[hsl(var(--background))]">
        <span className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider">{title}</span>
      </div>
    )}
    
    <div className="p-4">{children}</div>
  </div>
);

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

// HUD Frame Component with animated corner lights
import { CornerBracketLight } from './animations/CornerBracketLight';

export const HUDFrame = ({ children, className = '', animated = true, delay = 0 }) => {
  return (
    <div className={`relative p-6 ${className}`}>
      {/* Add animated corner bracket light */}
      {animated && <CornerBracketLight delay={delay} duration={2} />}
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#FF6A00]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#FF6A00]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#FF6A00]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#FF6A00]" />
      
      {children}
    </div>
  );
};

export default GlitchText;
