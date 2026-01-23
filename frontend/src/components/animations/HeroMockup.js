import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Monitor } from 'lucide-react';

const fullCode = `<div className="hero">
  <h1>App Studio Pro</h1>
  <p>Building Digital Excellence</p>
  <button>Get Started</button>
</div>

.hero {
  background: linear-gradient(...);
  padding: 4rem 2rem;
  text-align: center;
}`;

export const HeroMockup = () => {
  const [typedCode, setTypedCode] = useState('');
  const [browserContent, setBrowserContent] = useState('blank');
  const codeContainerRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;

    const startTyping = () => {
      currentIndex = 0;
      setTypedCode('');
      setBrowserContent('blank');

      typingInterval = setInterval(() => {
        if (currentIndex < fullCode.length) {
          setTypedCode(fullCode.substring(0, currentIndex + 1));
          currentIndex++;

          // Update browser preview based on how much code is typed
          const progress = currentIndex / fullCode.length;
          
          if (progress < 0.3) {
            setBrowserContent('blank');
          } else if (progress < 0.5) {
            setBrowserContent('structure');
          } else if (progress < 0.8) {
            setBrowserContent('styled');
          } else if (progress >= 0.95) {
            setBrowserContent('final');
          }

          // Auto-scroll code container to bottom
          if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          // Wait 2 seconds at completion, then restart
          setTimeout(() => {
            startTyping();
          }, 2000);
        }
      }, 50); // Type speed: 50ms per character
    };

    startTyping();

    return () => {
      if (typingInterval) clearInterval(typingInterval);
    };
  }, []);

  // Split typed code into lines for display
  const codeLines = typedCode.split('\n');

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/30 backdrop-blur-md overflow-hidden shadow-2xl"
        style={{ height: '500px' }} // FIXED HEIGHT
      >
        {/* Window Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[hsl(var(--border))]/50 bg-[hsl(var(--card))]/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center text-xs text-[hsl(var(--muted-foreground))] font-mono">
            Building Your Vision
          </div>
        </div>

        {/* Browser Preview on TOP - FIXED HEIGHT */}
        <div className="p-3 bg-white border-b border-[hsl(var(--border))]/50" style={{ height: '240px' }}>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
            <Monitor className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-500">localhost:3000</span>
          </div>

          <div className="h-[180px] overflow-hidden">
            <AnimatePresence mode="wait">
              {browserContent === 'blank' && (
                <motion.div
                  key="blank"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center h-full"
                >
                  <div className="w-10 h-10 border-2 border-gray-300 rounded-full animate-pulse" />
                </motion.div>
              )}

              {browserContent === 'structure' && (
                <motion.div
                  key="structure"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <motion.div 
                    className="h-6 bg-gray-200 rounded w-3/4"
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="h-3 bg-gray-100 rounded w-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                  <motion.div 
                    className="h-8 bg-gray-200 rounded w-24"
                    initial={{ width: 0 }}
                    animate={{ width: '96px' }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                </motion.div>
              )}

              {browserContent === 'styled' && (
                <motion.div
                  key="styled"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <motion.h1 
                    className="text-2xl font-bold text-gray-800"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    App Studio Pro
                  </motion.h1>
                  <motion.p 
                    className="text-gray-600 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Building Digital Excellence
                  </motion.p>
                  <motion.button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              )}

              {browserContent === 'final' && (
                <motion.div
                  key="final"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.05, opacity: 0 }}
                  className="relative h-full"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center h-full flex flex-col justify-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      App Studio Pro
                    </h1>
                    <p className="text-gray-700 text-sm mb-3">
                      Building Digital Excellence
                    </p>
                    <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg text-sm mx-auto">
                      Get Started
                    </button>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Code Editor on BOTTOM - FIXED HEIGHT with SCROLL */}
        <div className="p-3 bg-[#1e1e1e]" style={{ height: 'calc(500px - 240px - 45px)' }}>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
            <Code2 className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-xs text-gray-400 font-mono">index.html</span>
          </div>
          
          {/* Scrollable code container */}
          <div 
            ref={codeContainerRef}
            className="font-mono text-xs overflow-y-auto overflow-x-hidden pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
            style={{ height: 'calc(100% - 35px)' }}
          >
            {codeLines.map((line, index) => (
              <div key={index} className="flex gap-2 min-h-[16px]">
                <span className="text-gray-600 select-none w-4 text-right flex-shrink-0 text-xs">
                  {index + 1}
                </span>
                <span className="text-gray-300 text-xs flex-1">
                  {line.includes('className') && (
                    <span className="text-[#ce9178]">{line}</span>
                  )}
                  {line.includes('<') && !line.includes('className') && (
                    <span className="text-[#4ec9b0]">{line}</span>
                  )}
                  {line.includes('.') && line.includes('{') && (
                    <span className="text-[#d4d4d4]">{line}</span>
                  )}
                  {!line.includes('<') && !line.includes('.') && !line.includes('className') && line.trim() !== '' && (
                    <span className="text-gray-500">{line}</span>
                  )}
                  {line.trim() === '' && <span>&nbsp;</span>}
                </span>
              </div>
            ))}
            {/* Blinking cursor at the end */}
            {typedCode.length < fullCode.length && (
              <motion.span
                className="inline-block w-1.5 h-3 bg-white ml-1 align-middle"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00E5FF] to-[#FF6A00]"
            style={{ width: `${(typedCode.length / fullCode.length) * 100}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
};