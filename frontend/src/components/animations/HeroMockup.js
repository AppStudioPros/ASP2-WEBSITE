import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Bot } from 'lucide-react';

// Animation code being "typed"
const animationCode = `// Text reveal animation
const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Staggered children
staggerChildren: 0.15,

// Badge pulse effect
const badgePulse = {
  scale: [1, 1.02, 1],
  opacity: [0.8, 1, 0.8]
};

// Chat message slide
const messageSlide = {
  initial: { x: 30, opacity: 0 },
  animate: { x: 0, opacity: 1 }
};

// Typing indicator
const typingDots = {
  y: [0, -4, 0],
  transition: { repeat: Infinity }
};

// Corner accent animation
const cornerGlow = {
  opacity: [0.3, 1, 0.3],
  scale: [1, 1.2, 1]
};`;

export const HeroMockup = () => {
  const [typedCode, setTypedCode] = useState('');
  const [animationPhase, setAnimationPhase] = useState(0);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const codeContainerRef = useRef(null);

  // Typing animation for code
  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;

    const startTyping = () => {
      currentIndex = 0;
      setTypedCode('');
      setAnimationPhase(0);
      setShowTypingIndicator(false);

      typingInterval = setInterval(() => {
        if (currentIndex < animationCode.length) {
          setTypedCode(animationCode.substring(0, currentIndex + 1));
          currentIndex++;

          const progress = currentIndex / animationCode.length;
          
          if (progress > 0.08) setAnimationPhase(1);  // Badge animates
          if (progress > 0.18) setAnimationPhase(2);  // Headline reveals
          if (progress > 0.28) setAnimationPhase(3);  // Description appears
          if (progress > 0.40) setAnimationPhase(4);  // First chat message
          if (progress > 0.52) setAnimationPhase(5);  // Typing indicator
          if (progress > 0.65) {
            setAnimationPhase(6);  // Bot responds
            setShowTypingIndicator(false);
          }
          if (progress > 0.75) setAnimationPhase(7);  // Second user message
          if (progress > 0.85) setShowTypingIndicator(true);
          if (progress > 0.92) {
            setAnimationPhase(8);  // Final response + corners glow
            setShowTypingIndicator(false);
          }

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

  const codeLines = typedCode.split('\n');

  // Typing indicator component
  const TypingIndicator = () => (
    <motion.div 
      className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-700 rounded-2xl rounded-bl-sm w-fit"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
          animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </motion.div>
  );

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/30 backdrop-blur-md overflow-hidden shadow-2xl"
        style={{ height: '520px' }}
      >
        {/* TOP - Mock Website Preview */}
        <div className="h-[320px] bg-[#0a0a0a] relative overflow-hidden">
          
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px'
            }}
          />
          
          {/* Animated Corner Crosses */}
          <motion.div 
            className="absolute top-4 left-4 text-red-500 text-sm font-light"
            animate={animationPhase >= 8 ? { 
              opacity: [0.4, 1, 0.4], 
              scale: [1, 1.3, 1],
              textShadow: ['0 0 0px #ef4444', '0 0 8px #ef4444', '0 0 0px #ef4444']
            } : { opacity: 0.4 }}
            transition={{ duration: 1.5, repeat: animationPhase >= 8 ? Infinity : 0 }}
          >+</motion.div>
          <motion.div 
            className="absolute top-4 right-4 text-red-500 text-sm font-light"
            animate={animationPhase >= 8 ? { 
              opacity: [0.4, 1, 0.4], 
              scale: [1, 1.3, 1] 
            } : { opacity: 0.4 }}
            transition={{ duration: 1.5, repeat: animationPhase >= 8 ? Infinity : 0, delay: 0.2 }}
          >+</motion.div>
          <motion.div 
            className="absolute bottom-4 left-4 text-red-500 text-sm font-light"
            animate={animationPhase >= 8 ? { 
              opacity: [0.4, 1, 0.4], 
              scale: [1, 1.3, 1] 
            } : { opacity: 0.4 }}
            transition={{ duration: 1.5, repeat: animationPhase >= 8 ? Infinity : 0, delay: 0.4 }}
          >+</motion.div>
          <motion.div 
            className="absolute bottom-4 right-4 text-red-500 text-sm font-light"
            animate={animationPhase >= 8 ? { 
              opacity: [0.4, 1, 0.4], 
              scale: [1, 1.3, 1] 
            } : { opacity: 0.4 }}
            transition={{ duration: 1.5, repeat: animationPhase >= 8 ? Infinity : 0, delay: 0.6 }}
          >+</motion.div>
          
          {/* Content Layout - Side by Side */}
          <div className="relative z-10 flex h-full px-8 py-6">
            
            {/* Left Text Content */}
            <div className="flex-1 flex flex-col justify-center pr-6">
              {/* Badge */}
              <AnimatePresence>
                {animationPhase >= 1 && (
                  <motion.div 
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.span 
                      className="text-[11px] text-slate-400 tracking-[0.2em] font-medium"
                      animate={animationPhase >= 2 ? { 
                        opacity: [0.7, 1, 0.7]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      COMPLEX MADE SIMPLE
                    </motion.span>
                    <motion.span 
                      className="text-red-500 text-xs"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >_</motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Headline */}
              <AnimatePresence>
                {animationPhase >= 2 && (
                  <motion.div className="mb-4 overflow-hidden">
                    <motion.h2 
                      className="text-white text-2xl font-semibold leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <motion.span
                        className="block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        AI-powered
                      </motion.span>
                      <motion.span
                        className="block bg-gradient-to-r from-white via-slate-300 to-white bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        style={animationPhase >= 8 ? {
                          backgroundSize: '200% auto',
                          animation: 'shimmer 3s linear infinite'
                        } : {}}
                      >
                        simplicity
                      </motion.span>
                    </motion.h2>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Description */}
              <AnimatePresence>
                {animationPhase >= 3 && (
                  <motion.p 
                    className="text-slate-500 text-xs leading-relaxed max-w-[240px]"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    A chat-based interface backed by a custom-trained LLM simplifies even the most complex tasks.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Animated Stats Row */}
              <AnimatePresence>
                {animationPhase >= 3 && (
                  <motion.div 
                    className="flex gap-6 mt-5"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div 
                        className="text-white text-lg font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {animationPhase >= 4 ? '99.9%' : '—'}
                      </motion.div>
                      <div className="text-slate-600 text-[9px]">Accuracy</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div className="text-white text-lg font-bold">
                        {animationPhase >= 5 ? '<1s' : '—'}
                      </motion.div>
                      <div className="text-slate-600 text-[9px]">Response</div>
                    </motion.div>
                    <motion.div 
                      className="text-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div className="text-white text-lg font-bold">
                        {animationPhase >= 6 ? '24/7' : '—'}
                      </motion.div>
                      <div className="text-slate-600 text-[9px]">Available</div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Right - Phone Mockup */}
            <div className="flex items-center justify-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Phone Frame */}
                <div 
                  className="w-[140px] h-[260px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[22px] border-2 border-slate-700 shadow-2xl overflow-hidden relative"
                  style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
                >
                  {/* Phone Notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-full z-20" />
                  
                  {/* Phone Screen */}
                  <div className="absolute inset-1.5 rounded-[18px] overflow-hidden">
                    {/* Scenic gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-700">
                      <svg className="absolute bottom-0 left-0 right-0 h-20 opacity-40" viewBox="0 0 200 100" preserveAspectRatio="none">
                        <path d="M0,100 L0,60 L30,40 L60,70 L90,30 L120,60 L150,45 L180,65 L200,50 L200,100 Z" fill="#1e293b"/>
                        <path d="M0,100 L0,80 L40,60 L80,85 L120,55 L160,75 L200,65 L200,100 Z" fill="#0f172a"/>
                      </svg>
                    </div>
                    
                    {/* Chat Interface */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Chat Header */}
                      <div className="flex items-center justify-between px-2.5 pt-5 pb-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                            <Bot className="w-2.5 h-2.5 text-slate-800" />
                          </div>
                          <span className="text-white text-[9px] font-medium">Exchange</span>
                        </div>
                        <div className="text-white text-[10px]">•••</div>
                      </div>
                      
                      {/* Chat Messages */}
                      <div className="flex-1 px-2 py-1.5 space-y-1.5 overflow-hidden">
                        
                        {/* User Message 1 */}
                        <AnimatePresence>
                          {animationPhase >= 4 && (
                            <motion.div 
                              className="flex justify-end"
                              initial={{ opacity: 0, x: 15, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              transition={{ duration: 0.4 }}
                            >
                              <div className="flex items-end gap-1">
                                <div className="bg-slate-800/90 text-white text-[7px] px-2 py-1 rounded-xl rounded-br-sm max-w-[95px]">
                                  Hey Elsa 👋<br/>
                                  <span className="text-slate-300">exchange 0.001 ETH to SOL</span>
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex-shrink-0 flex items-center justify-center text-[5px] font-bold text-white">U</div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Bot Typing / Response 1 */}
                        <AnimatePresence mode="wait">
                          {animationPhase === 5 && (
                            <motion.div 
                              className="flex justify-start"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <div className="flex items-end gap-1">
                                <div className="w-4 h-4 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                                  <Bot className="w-2.5 h-2.5 text-slate-800" />
                                </div>
                                <TypingIndicator />
                              </div>
                            </motion.div>
                          )}
                          
                          {animationPhase >= 6 && (
                            <motion.div 
                              className="flex justify-start"
                              initial={{ opacity: 0, x: -15, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              transition={{ duration: 0.4 }}
                            >
                              <div className="flex items-end gap-1">
                                <div className="w-4 h-4 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                                  <Bot className="w-2.5 h-2.5 text-slate-800" />
                                </div>
                                <div className="bg-slate-700/90 text-white text-[7px] px-2 py-1 rounded-xl rounded-bl-sm">
                                  Yeah! Sure 👍
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* User Message 2 */}
                        <AnimatePresence>
                          {animationPhase >= 7 && (
                            <motion.div 
                              className="flex justify-end"
                              initial={{ opacity: 0, x: 15, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              transition={{ duration: 0.4 }}
                            >
                              <div className="flex items-end gap-1">
                                <div className="bg-slate-800/90 text-white text-[7px] px-2 py-1 rounded-xl rounded-br-sm">
                                  Perfect, thanks!
                                </div>
                                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex-shrink-0 flex items-center justify-center text-[5px] font-bold text-white">U</div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        {/* Bot Typing / Response 2 */}
                        <AnimatePresence mode="wait">
                          {showTypingIndicator && animationPhase < 8 && (
                            <motion.div 
                              className="flex justify-start"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <div className="flex items-end gap-1">
                                <div className="w-4 h-4 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                                  <Bot className="w-2.5 h-2.5 text-slate-800" />
                                </div>
                                <TypingIndicator />
                              </div>
                            </motion.div>
                          )}
                          
                          {animationPhase >= 8 && (
                            <motion.div 
                              className="flex justify-start"
                              initial={{ opacity: 0, x: -15, scale: 0.9 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              transition={{ duration: 0.4 }}
                            >
                              <div className="flex items-end gap-1">
                                <div className="w-4 h-4 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                                  <Bot className="w-2.5 h-2.5 text-slate-800" />
                                </div>
                                <div className="bg-slate-700/90 text-white text-[7px] px-2 py-1 rounded-xl rounded-bl-sm">
                                  Done! ✅ Sent
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating particles around phone */}
                <motion.div 
                  className="absolute -top-2 -right-2 w-2 h-2 bg-orange-500/60 rounded-full"
                  animate={{ 
                    y: [0, -8, 0], 
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -bottom-1 -left-3 w-1.5 h-1.5 bg-cyan-500/60 rounded-full"
                  animate={{ 
                    y: [0, -6, 0], 
                    opacity: [0.3, 0.7, 0.3] 
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div 
                  className="absolute top-1/2 -right-4 w-1 h-1 bg-red-500/60 rounded-full"
                  animate={{ 
                    x: [0, 4, 0], 
                    opacity: [0.3, 0.6, 0.3] 
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* BOTTOM - Code Editor */}
        <div className="h-[200px] bg-[#0d1117] p-3 border-t border-slate-800 flex flex-col">
          {/* Editor Header */}
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-800">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <Terminal className="w-3.5 h-3.5 text-[#FF6A00] ml-2" />
            <span className="text-[10px] text-gray-400 font-mono">animations.config.js</span>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] text-green-400 font-mono">LIVE</span>
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
                  ) : line.includes('const') || line.includes('await') ? (
                    <span>
                      <span className="text-purple-400">{line.split(' ')[0]}</span>
                      <span className="text-blue-300">{' ' + line.split(' ').slice(1).join(' ')}</span>
                    </span>
                  ) : line.includes(':') && !line.includes('//') ? (
                    <span>
                      <span className="text-cyan-300">{line.split(':')[0]}</span>
                      <span className="text-gray-400">:</span>
                      <span className="text-orange-300">{line.split(':').slice(1).join(':')}</span>
                    </span>
                  ) : line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']') ? (
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
        </div>
      </motion.div>

      {/* Shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};
