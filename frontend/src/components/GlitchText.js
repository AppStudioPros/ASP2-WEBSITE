import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const GlitchText = ({ children, className = '', intensity = 'medium', pauseOnHover = false }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  
  const intensityConfig = {
    low: { duration: 100, interval: 5000 },
    medium: { duration: 150, interval: 3000 },
    high: { duration: 200, interval: 2000 },
  };
  
  const config = intensityConfig[intensity];
  
  useEffect(() => {
    // If pauseOnHover is true and we're hovered, don't run animation
    if (pauseOnHover && isHovered) return;
    
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), config.duration);
    }, config.interval);
    
    return () => clearInterval(interval);
  }, [config, pauseOnHover, isHovered]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovered(true);
      setIsGlitching(false);
    } else {
      // Original behavior - trigger glitch on hover
      setIsGlitching(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsHovered(false);
    } else {
      // Original behavior
      setTimeout(() => setIsGlitching(false), 100);
    }
  };

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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

export default GlitchText;
