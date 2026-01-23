import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Terminal, Zap, TrendingUp, Users, Shield, Sparkles } from 'lucide-react';

// The animation code we're "typing" - showing animation additions to an existing site
const animationCode = `// Adding micro-interactions
const cardHover = {
  scale: 1.02,
  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
};

// Staggered entrance animation
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Counter animation
const countUp = (target) => {
  animate(0, target, {
    duration: 2,
    ease: "easeOut"
  });
};

// Gradient text shimmer
@keyframes shimmer {
  0% { background-position: -200% }
  100% { background-position: 200% }
}`;

export const HeroMockup = () => {
  const [typedCode, setTypedCode] = useState('');
  const [animationPhase, setAnimationPhase] = useState(0);
  const [counterValue, setCounterValue] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const codeContainerRef = useRef(null);

  // Typing animation for code
  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;

    const startTyping = () => {
      currentIndex = 0;
      setTypedCode('');
      setAnimationPhase(0);
      setCounterValue(0);
      setShowSparkles(false);

      typingInterval = setInterval(() => {
        if (currentIndex < animationCode.length) {
          setTypedCode(animationCode.substring(0, currentIndex + 1));
          currentIndex++;

          const progress = currentIndex / animationCode.length;
          
          if (progress > 0.15) setAnimationPhase(1); // Cards appear
          if (progress > 0.35) setAnimationPhase(2); // Hover effects active
          if (progress > 0.55) setAnimationPhase(3); // Counter starts
          if (progress > 0.75) setAnimationPhase(4); // Sparkles appear
          if (progress > 0.9) setAnimationPhase(5);  // Full polish

          if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          setTimeout(() => startTyping(), 3000);
        }
      }, 40);
    };

    startTyping();
    return () => { if (typingInterval) clearInterval(typingInterval); };
  }, []);

  // Counter animation
  useEffect(() => {
    if (animationPhase >= 3) {
      const duration = 2000;
      const target = 7464;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCounterValue(Math.floor(target * eased));
        
        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    }
  }, [animationPhase]);

  // Sparkles effect
  useEffect(() => {
    if (animationPhase >= 4) setShowSparkles(true);
    else setShowSparkles(false);
  }, [animationPhase]);

  const codeLines = typedCode.split('\n');

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/30 backdrop-blur-md overflow-hidden shadow-2xl"
        style={{ height: '520px' }}
      >
        {/* Window Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[hsl(var(--border))]/50 bg-[hsl(var(--card))]/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 text-xs text-[hsl(var(--muted-foreground))] font-mono">
            <Zap className="w-3 h-3 text-[#FF6A00]" />
            <span>Adding Animations Live</span>
          </div>
        </div>

        {/* Main Content - Split View */}
        <div className="flex h-[calc(100%-45px)]">
          
          {/* LEFT SIDE - Mock High-End Website Preview */}
          <div className="w-[55%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-3 border-r border-[hsl(var(--border))]/30 overflow-hidden">
            {/* Mock Browser Bar */}
            <div className="flex items-center gap-2 mb-3 px-2 py-1.5 bg-slate-800/80 rounded-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <div className="w-2 h-2 rounded-full bg-slate-600" />
              </div>
              <div className="flex-1 text-[10px] text-slate-500 bg-slate-700/50 rounded px-2 py-0.5 font-mono">
                https://nexus-platform.io
              </div>
            </div>

            {/* Mock Website Content */}
            <div className="h-[calc(100%-36px)] overflow-hidden rounded-lg bg-gradient-to-b from-slate-950 to-slate-900 relative">
              
              {/* Navigation Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-700/50">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <span className="text-white text-[8px] font-bold">N</span>
                  </div>
                  <span className="text-white text-[10px] font-semibold">NEXUS</span>
                </div>
                <div className="flex gap-3 text-[8px] text-slate-400">
                  <span className="hover:text-white cursor-pointer">Products</span>
                  <span className="hover:text-white cursor-pointer">Solutions</span>
                  <span className="hover:text-white cursor-pointer">Pricing</span>
                </div>
                <motion.button 
                  className="px-2 py-0.5 bg-orange-500 text-white text-[8px] rounded font-medium"
                  animate={animationPhase >= 2 ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3, repeat: animationPhase >= 2 ? Infinity : 0, repeatDelay: 2 }}
                >
                  Get Started
                </motion.button>
              </div>

              {/* Hero Section of Mock Site */}
              <div className="px-3 py-4">
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: animationPhase >= 1 ? 1 : 0.5 }}
                  className="mb-3"
                >
                  <motion.h2 
                    className="text-white text-sm font-bold mb-1 bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text"
                    style={animationPhase >= 5 ? {
                      backgroundSize: '200% auto',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'shimmer 3s linear infinite'
                    } : {}}
                  >
                    Build Faster. Scale Smarter.
                  </motion.h2>
                  <p className="text-slate-400 text-[8px]">Enterprise-grade platform for modern teams</p>
                </motion.div>

                {/* Stats Cards Row */}
                <div className="flex gap-2 mb-3">
                  <AnimatePresence>
                    {animationPhase >= 1 && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          whileHover={animationPhase >= 2 ? { scale: 1.05, boxShadow: '0 8px 20px rgba(249,115,22,0.3)' } : {}}
                          className="flex-1 bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-lg p-2 border border-slate-700/50 relative overflow-hidden"
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <TrendingUp className="w-3 h-3 text-green-400" />
                            <span className="text-[7px] text-slate-400">Revenue</span>
                          </div>
                          <div className="text-white text-xs font-bold">
                            €{counterValue.toLocaleString()}
                          </div>
                          <span className="text-[7px] text-green-400">+19.9%</span>
                          {showSparkles && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute top-1 right-1"
                            >
                              <Sparkles className="w-2.5 h-2.5 text-orange-400" />
                            </motion.div>
                          )}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.1 }}
                          whileHover={animationPhase >= 2 ? { scale: 1.05, boxShadow: '0 8px 20px rgba(249,115,22,0.3)' } : {}}
                          className="flex-1 bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-lg p-2 border border-slate-700/50"
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <Users className="w-3 h-3 text-blue-400" />
                            <span className="text-[7px] text-slate-400">Users</span>
                          </div>
                          <div className="text-white text-xs font-bold">
                            {animationPhase >= 3 ? '2.4M' : '---'}
                          </div>
                          <span className="text-[7px] text-blue-400">Active</span>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ delay: 0.2 }}
                          whileHover={animationPhase >= 2 ? { scale: 1.05, boxShadow: '0 8px 20px rgba(249,115,22,0.3)' } : {}}
                          className="flex-1 bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-lg p-2 border border-slate-700/50"
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <Shield className="w-3 h-3 text-purple-400" />
                            <span className="text-[7px] text-slate-400">Uptime</span>
                          </div>
                          <div className="text-white text-xs font-bold">
                            {animationPhase >= 3 ? '99.99%' : '---'}
                          </div>
                          <span className="text-[7px] text-purple-400">SLA</span>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-2 gap-2">
                  <AnimatePresence>
                    {animationPhase >= 1 && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          whileHover={animationPhase >= 2 ? { 
                            scale: 1.03, 
                            borderColor: 'rgba(249,115,22,0.5)'
                          } : {}}
                          className="bg-gradient-to-br from-orange-500/10 to-transparent rounded-lg p-2 border border-orange-500/20"
                        >
                          <div className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center mb-1">
                            <Zap className="w-3 h-3 text-orange-400" />
                          </div>
                          <div className="text-white text-[9px] font-semibold">Lightning Fast</div>
                          <div className="text-slate-500 text-[7px]">Sub-ms response times</div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          whileHover={animationPhase >= 2 ? { 
                            scale: 1.03,
                            borderColor: 'rgba(59,130,246,0.5)'
                          } : {}}
                          className="bg-gradient-to-br from-blue-500/10 to-transparent rounded-lg p-2 border border-blue-500/20"
                        >
                          <div className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center mb-1">
                            <Shield className="w-3 h-3 text-blue-400" />
                          </div>
                          <div className="text-white text-[9px] font-semibold">Enterprise Security</div>
                          <div className="text-slate-500 text-[7px]">SOC2 & ISO certified</div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Mini Chart */}
                <motion.div 
                  className="mt-3 bg-slate-800/50 rounded-lg p-2 border border-slate-700/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: animationPhase >= 2 ? 1 : 0 }}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] text-slate-400">Performance</span>
                    <span className="text-[8px] text-green-400">+44.04%</span>
                  </div>
                  <div className="flex items-end gap-0.5 h-6">
                    {[40, 65, 45, 80, 60, 90, 70, 95, 75, 85, 100].map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-sm"
                        initial={{ height: 0 }}
                        animate={{ height: animationPhase >= 3 ? `${h}%` : 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Animated Pulse Overlay when animations are being added */}
              {animationPhase >= 4 && animationPhase < 5 && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{ background: 'radial-gradient(circle at center, rgba(249,115,22,0.3), transparent 70%)' }}
                />
              )}
            </div>
          </div>

          {/* RIGHT SIDE - Code Editor */}
          <div className="w-[45%] bg-[#0d1117] p-3 flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-800">
              <Terminal className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span className="text-[10px] text-gray-400 font-mono">animations.js</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[8px] text-green-400">LIVE</span>
              </div>
            </div>
            
            {/* Code Content */}
            <div 
              ref={codeContainerRef}
              className="flex-1 font-mono text-[10px] overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
              {codeLines.map((line, index) => (
                <div key={index} className="flex gap-2 min-h-[14px] leading-tight">
                  <span className="text-gray-600 select-none w-4 text-right flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="flex-1">
                    {line.includes('//') ? (
                      <span className="text-gray-500">{line}</span>
                    ) : line.includes('const') || line.includes('@keyframes') ? (
                      <span>
                        <span className="text-purple-400">{line.split(' ')[0]}</span>
                        <span className="text-blue-300">{' ' + line.split(' ').slice(1).join(' ')}</span>
                      </span>
                    ) : line.includes(':') ? (
                      <span>
                        <span className="text-cyan-300">{line.split(':')[0]}</span>
                        <span className="text-gray-400">:</span>
                        <span className="text-orange-300">{line.split(':').slice(1).join(':')}</span>
                      </span>
                    ) : line.includes('{') || line.includes('}') || line.includes('(') || line.includes(')') ? (
                      <span className="text-yellow-200">{line}</span>
                    ) : (
                      <span className="text-gray-300">{line}</span>
                    )}
                  </span>
                </div>
              ))}
              {/* Blinking cursor */}
              {typedCode.length < animationCode.length && (
                <motion.span
                  className="inline-block w-1.5 h-3 bg-[#FF6A00] ml-5"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </div>

            {/* Status Bar */}
            <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between text-[8px] text-gray-500">
              <div className="flex items-center gap-2">
                <span>JavaScript</span>
                <span>•</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-1">
                <Code2 className="w-2.5 h-2.5" />
                <span>Ln {codeLines.length}, Col {(codeLines[codeLines.length - 1] || '').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-900">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FF6A00] via-[#FF8C00] to-[#00E5FF]"
            style={{ width: `${(typedCode.length / animationCode.length) * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Shimmer keyframes style injection */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};
