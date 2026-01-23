import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Monitor } from 'lucide-react';

const codeLines = [
  '<div className="hero">',
  '  <h1>App Studio Pro</h1>',
  '  <p>Building Digital Excellence</p>',
  '  <button>Get Started</button>',
  '</div>',
  '',
  '.hero {',
  '  background: linear-gradient(...);',
  '  padding: 4rem 2rem;',
  '  text-align: center;',
  '}',
];

export const HeroMockup = () => {
  const [stage, setStage] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [browserContent, setBrowserContent] = useState('blank');

  useEffect(() => {
    const timeline = [
      { time: 0, action: () => setStage(0) },
      { time: 1000, action: () => setStage(1) },
      { time: 1500, action: () => setVisibleLines(1) },
      { time: 2000, action: () => setVisibleLines(2) },
      { time: 2500, action: () => setVisibleLines(3) },
      { time: 3000, action: () => setVisibleLines(4) },
      { time: 3500, action: () => setVisibleLines(5) },
      { time: 4000, action: () => setVisibleLines(6) },
      { time: 4500, action: () => setVisibleLines(7) },
      { time: 5000, action: () => setVisibleLines(8) },
      { time: 5500, action: () => setVisibleLines(9) },
      { time: 6000, action: () => setVisibleLines(10) },
      { time: 6000, action: () => { setStage(2); setBrowserContent('structure'); } },
      { time: 8000, action: () => { setStage(3); setBrowserContent('styled'); } },
      { time: 10000, action: () => { setStage(4); setBrowserContent('final'); } },
      { time: 13000, action: () => { 
        setStage(0); 
        setVisibleLines(0); 
        setBrowserContent('blank'); 
      } }
    ];

    const timeouts = timeline.map(({ time, action }) => 
      setTimeout(action, time)
    );

    const loopInterval = setInterval(() => {
      timeline.forEach(({ time, action }) => {
        setTimeout(action, time);
      });
    }, 15000);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(loopInterval);
    };
  }, []);

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/30 backdrop-blur-md overflow-hidden shadow-2xl"
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

        {/* VERTICAL STACK: Browser Preview on TOP */}
        <div className="p-3 bg-white border-b border-[hsl(var(--border))]/50 min-h-[240px]">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
            <Monitor className="w-4 h-4 text-gray-600" />
            <span className="text-xs text-gray-500">localhost:3000</span>
          </div>

          <AnimatePresence mode="wait">
            {browserContent === 'blank' && (
              <motion.div
                key="blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-[180px]"
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
                className="space-y-3 h-[180px]"
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-3 bg-gray-100 rounded w-full animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-24 animate-pulse" />
              </motion.div>
            )}

            {browserContent === 'styled' && (
              <motion.div
                key="styled"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3 h-[180px]"
              >
                <motion.h1 
                  className="text-2xl font-bold text-gray-800"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                >
                  App Studio Pro
                </motion.h1>
                <motion.p 
                  className="text-gray-600 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
                className="relative h-[180px]"
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
                  transition={{ delay: 0.5, type: 'spring' }}
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

        {/* Code Editor on BOTTOM */}
        <div className="p-3 bg-[#1e1e1e] min-h-[200px]">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
            <Code2 className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-xs text-gray-400 font-mono">index.html</span>
          </div>
          
          <div className="font-mono text-xs space-y-1">
            <AnimatePresence>
              {codeLines.slice(0, visibleLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-2"
                >
                  <span className="text-gray-600 select-none w-4 text-right text-xs">{index + 1}</span>
                  <span className="text-gray-300 text-xs">
                    {line.includes('className') && (
                      <span className="text-[#ce9178]">{line}</span>
                    )}
                    {line.includes('<') && !line.includes('className') && (
                      <span className="text-[#4ec9b0]">{line}</span>
                    )}
                    {line.includes('.') && line.includes('{') && (
                      <span className="text-[#d4d4d4]">{line}</span>
                    )}
                    {!line.includes('<') && !line.includes('.') && !line.includes('className') && (
                      <span className="text-gray-500">{line}</span>
                    )}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {stage === 1 && (
              <motion.div
                className="inline-block w-1.5 h-3 bg-white ml-2"
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
            initial={{ width: '0%' }}
            animate={{ 
              width: stage === 0 ? '0%' : 
                     stage === 1 ? '40%' : 
                     stage === 2 ? '60%' :
                     stage === 3 ? '80%' : '100%'
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </div>
  );
};