import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimatedCounter = ({ 
  value = 0, 
  label = '', 
  prefix = '', 
  suffix = '',
  duration = 2000,
  className = '' 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [digits, setDigits] = useState([]);
  const previousValue = useRef(0);

  useEffect(() => {
    const startValue = previousValue.current;
    const endValue = value;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    previousValue.current = value;
  }, [value, duration]);

  useEffect(() => {
    setDigits(String(displayValue).split(''));
  }, [displayValue]);

  return (
    <div className={`flex flex-col ${className}`} data-testid="build-counter">
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="text-2xl sm:text-3xl font-bold text-[hsl(var(--muted-foreground))]">
            {prefix}
          </span>
        )}
        <div className="flex overflow-hidden">
          <AnimatePresence mode="popLayout">
            {digits.map((digit, index) => (
              <motion.span
                key={`${index}-${digit}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.02,
                  ease: 'easeOut'
                }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-mono tabular-nums text-[#00E5FF]"
                style={{ fontFamily: '"Source Code Pro", monospace' }}
              >
                {digit}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        {suffix && (
          <span className="text-2xl sm:text-3xl font-bold text-[#00E5FF]">
            {suffix}
          </span>
        )}
      </div>
      {label && (
        <span className="text-sm sm:text-base text-[hsl(var(--muted-foreground))] mt-2">
          {label}
        </span>
      )}
    </div>
  );
};

// Live counter that increments over time
export const LiveBuildCounter = ({ baseValue = 247, className = '' }) => {
  const [count, setCount] = useState(baseValue);

  useEffect(() => {
    // Simulate real-time builds - random increment every few seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setCount(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-6 sm:p-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
          Live Builds
        </h3>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-[hsl(var(--success))]"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Real-time</span>
        </div>
      </div>
      <AnimatedCounter 
        value={count} 
        label="AI Apps Shipped This Year"
        suffix="+"
      />
    </div>
  );
};

export default AnimatedCounter;
