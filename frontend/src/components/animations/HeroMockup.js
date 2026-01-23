import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Bot } from 'lucide-react';

// Animation code being "typed"
const animationCode = `// Smooth text reveal
const textReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

// Staggered children animation
const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

// Chat message variants
const messageSlide = {
  hidden: { x: 20, opacity: 0, scale: 0.95 },
  visible: { 
    x: 0, 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring",
      damping: 20,
      stiffness: 300
    }
  }
};

// Typing indicator
const typingPulse = {
  y: [0, -3, 0],
  opacity: [0.4, 1, 0.4]
};

// Stats counter
animateValue(0, 99.9, 1200);`;

export const HeroMockup = () => {
  const [typedCode, setTypedCode] = useState('');
  const [animationPhase, setAnimationPhase] = useState(0);
  const codeContainerRef = useRef(null);

  // Typing animation for code
  useEffect(() => {
    let currentIndex = 0;
    let typingInterval;

    const startTyping = () => {
      currentIndex = 0;
      setTypedCode('');
      setAnimationPhase(0);

      typingInterval = setInterval(() => {
        if (currentIndex < animationCode.length) {
          setTypedCode(animationCode.substring(0, currentIndex + 1));
          currentIndex++;

          const progress = currentIndex / animationCode.length;
          
          // Smoother phase transitions
          if (progress > 0.05) setAnimationPhase(1);   // Badge
          if (progress > 0.12) setAnimationPhase(2);   // Headline line 1
          if (progress > 0.18) setAnimationPhase(3);   // Headline line 2
          if (progress > 0.24) setAnimationPhase(4);   // Description
          if (progress > 0.30) setAnimationPhase(5);   // Stats appear
          if (progress > 0.36) setAnimationPhase(6);   // Chat msg 1 (user)
          if (progress > 0.42) setAnimationPhase(7);   // Chat msg 2 (bot typing)
          if (progress > 0.48) setAnimationPhase(8);   // Chat msg 2 (bot responds)
          if (progress > 0.54) setAnimationPhase(9);   // Chat msg 3 (user)
          if (progress > 0.60) setAnimationPhase(10);  // Chat msg 4 (bot typing)
          if (progress > 0.66) setAnimationPhase(11);  // Chat msg 4 (bot responds)
          if (progress > 0.72) setAnimationPhase(12);  // Chat msg 5 (user)
          if (progress > 0.78) setAnimationPhase(13);  // Chat msg 6 (bot typing)
          if (progress > 0.84) setAnimationPhase(14);  // Chat msg 6 (bot responds)
          if (progress > 0.90) setAnimationPhase(15);  // Chat msg 7 (user)
          if (progress > 0.95) setAnimationPhase(16);  // Chat msg 8 (bot final)

          if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          setTimeout(() => startTyping(), 3500);
        }
      }, 35);
    };

    startTyping();
    return () => { if (typingInterval) clearInterval(typingInterval); };
  }, []);

  const codeLines = typedCode.split('\n');

  // Smooth spring transition
  const smoothSpring = { type: "spring", damping: 25, stiffness: 200 };
  const smoothTween = { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] };

  // Typing indicator component
  const TypingIndicator = () => (
    <motion.div 
      className="flex items-center gap-0.5 px-2 py-1 bg-slate-700 rounded-xl rounded-bl-sm w-fit"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={smoothSpring}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1 h-1 bg-slate-400 rounded-full"
          animate={{ y: [0, -2, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );

  // Chat message component for cleaner code
  const UserMessage = ({ children, delay = 0 }) => (
    <motion.div 
      className="flex justify-end"
      initial={{ opacity: 0, x: 12, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ ...smoothSpring, delay }}
    >
      <div className="flex items-end gap-0.5">
        <div className="bg-slate-800/90 text-white text-[6px] px-1.5 py-1 rounded-lg rounded-br-sm max-w-[85px] leading-relaxed">
          {children}
        </div>
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex-shrink-0 flex items-center justify-center text-[4px] font-bold text-white">U</div>
      </div>
    </motion.div>
  );

  const BotMessage = ({ children, delay = 0 }) => (
    <motion.div 
      className="flex justify-start"
      initial={{ opacity: 0, x: -12, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ ...smoothSpring, delay }}
    >
      <div className="flex items-end gap-0.5">
        <div className="w-3 h-3 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
          <Bot className="w-2 h-2 text-slate-800" />
        </div>
        <div className="bg-slate-700/90 text-white text-[6px] px-1.5 py-1 rounded-lg rounded-bl-sm max-w-[85px] leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );

  const BotTyping = () => (
    <motion.div 
      className="flex justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-end gap-0.5">
        <div className="w-3 h-3 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
          <Bot className="w-2 h-2 text-slate-800" />
        </div>
        <TypingIndicator />
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/30 backdrop-blur-md overflow-hidden shadow-2xl"
        style={{ height: '520px' }}
      >
        {/* TOP - Mock Website Preview */}
        <div className="h-[330px] bg-[#0a0a0a] relative overflow-hidden">
          
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '28px 28px'
            }}
          />
          
          {/* Corner Markers */}
          <motion.div 
            className="absolute top-4 left-4 text-red-500/50 text-xs select-none"
            animate={animationPhase >= 16 ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >+</motion.div>
          <motion.div 
            className="absolute top-4 right-4 text-red-500/50 text-xs select-none"
            animate={animationPhase >= 16 ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >+</motion.div>
          <motion.div 
            className="absolute bottom-4 left-4 text-red-500/50 text-xs select-none"
            animate={animationPhase >= 16 ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >+</motion.div>
          <motion.div 
            className="absolute bottom-4 right-4 text-red-500/50 text-xs select-none"
            animate={animationPhase >= 16 ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          >+</motion.div>
          
          {/* Content Layout */}
          <div className="relative z-10 flex h-full px-8 py-6">
            
            {/* Left Text Content */}
            <div className="flex-1 flex flex-col justify-center pr-8">
              {/* Badge */}
              <AnimatePresence>
                {animationPhase >= 1 && (
                  <motion.div 
                    className="flex items-center gap-2 mb-4"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={smoothTween}
                  >
                    <span className="text-[10px] text-slate-400 tracking-[0.2em] font-medium">
                      COMPLEX MADE SIMPLE
                    </span>
                    <motion.span 
                      className="text-red-500 text-xs"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    >_</motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Headline */}
              <div className="mb-4 overflow-hidden">
                <AnimatePresence>
                  {animationPhase >= 2 && (
                    <motion.span
                      className="block text-white text-2xl font-semibold leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...smoothTween, duration: 0.6 }}
                    >
                      AI-powered
                    </motion.span>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {animationPhase >= 3 && (
                    <motion.span
                      className="block text-white text-2xl font-semibold leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...smoothTween, duration: 0.6 }}
                      style={animationPhase >= 16 ? {
                        background: 'linear-gradient(90deg, #fff, #94a3b8, #fff)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'shimmer 3s linear infinite'
                      } : {}}
                    >
                      simplicity
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Description */}
              <AnimatePresence>
                {animationPhase >= 4 && (
                  <motion.p 
                    className="text-slate-500 text-[11px] leading-relaxed max-w-[220px]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...smoothTween, duration: 0.5 }}
                  >
                    A chat-based interface backed by a custom-trained LLM simplifies even the most complex tasks.
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Stats Row */}
              <AnimatePresence>
                {animationPhase >= 5 && (
                  <motion.div 
                    className="flex gap-6 mt-5"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...smoothTween, delay: 0.1 }}
                  >
                    <div className="text-center">
                      <motion.div 
                        className="text-white text-base font-bold tabular-nums"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        99.9%
                      </motion.div>
                      <div className="text-slate-600 text-[8px]">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <motion.div 
                        className="text-white text-base font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                      >
                        &lt;1s
                      </motion.div>
                      <div className="text-slate-600 text-[8px]">Response</div>
                    </div>
                    <div className="text-center">
                      <motion.div 
                        className="text-white text-base font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        24/7
                      </motion.div>
                      <div className="text-slate-600 text-[8px]">Available</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Right - Phone Mockup */}
            <div className="flex items-center justify-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0.5, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Phone Frame */}
                <div 
                  className="w-[130px] h-[270px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[20px] border border-slate-700 shadow-2xl overflow-hidden relative"
                  style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                >
                  {/* Phone Notch */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-2.5 bg-black rounded-full z-20" />
                  
                  {/* Phone Screen */}
                  <div className="absolute inset-1 rounded-[16px] overflow-hidden">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-700">
                      <svg className="absolute bottom-0 left-0 right-0 h-16 opacity-30" viewBox="0 0 200 100" preserveAspectRatio="none">
                        <path d="M0,100 L0,60 L30,40 L60,70 L90,30 L120,60 L150,45 L180,65 L200,50 L200,100 Z" fill="#1e293b"/>
                        <path d="M0,100 L0,80 L40,60 L80,85 L120,55 L160,75 L200,65 L200,100 Z" fill="#0f172a"/>
                      </svg>
                    </div>
                    
                    {/* Chat Interface */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between px-2 pt-4 pb-1">
                        <div className="flex items-center gap-1">
                          <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
                            <Bot className="w-2 h-2 text-slate-800" />
                          </div>
                          <span className="text-white text-[8px] font-medium">Assistant</span>
                        </div>
                        <div className="text-white/60 text-[8px]">•••</div>
                      </div>
                      
                      {/* Messages Container */}
                      <div className="flex-1 px-1.5 py-1 space-y-1 overflow-hidden">
                        
                        {/* Message 1: User */}
                        <AnimatePresence>
                          {animationPhase >= 6 && (
                            <UserMessage>Hey! 👋 Can you help me?</UserMessage>
                          )}
                        </AnimatePresence>
                        
                        {/* Message 2: Bot typing then response */}
                        <AnimatePresence mode="wait">
                          {animationPhase === 7 && <BotTyping />}
                          {animationPhase >= 8 && (
                            <BotMessage>Of course! What do you need?</BotMessage>
                          )}
                        </AnimatePresence>
                        
                        {/* Message 3: User */}
                        <AnimatePresence>
                          {animationPhase >= 9 && (
                            <UserMessage>Convert 0.5 ETH to USDC</UserMessage>
                          )}
                        </AnimatePresence>
                        
                        {/* Message 4: Bot typing then response */}
                        <AnimatePresence mode="wait">
                          {animationPhase === 10 && <BotTyping />}
                          {animationPhase >= 11 && (
                            <BotMessage>Sure! Processing now...</BotMessage>
                          )}
                        </AnimatePresence>
                        
                        {/* Message 5: User */}
                        <AnimatePresence>
                          {animationPhase >= 12 && (
                            <UserMessage>How long will it take?</UserMessage>
                          )}
                        </AnimatePresence>
                        
                        {/* Message 6: Bot typing then response */}
                        <AnimatePresence mode="wait">
                          {animationPhase === 13 && <BotTyping />}
                          {animationPhase >= 14 && (
                            <BotMessage>About 30 seconds ⚡</BotMessage>
                          )}
                        </AnimatePresence>
                        
                        {/* Message 7: User */}
                        <AnimatePresence>
                          {animationPhase >= 15 && (
                            <UserMessage>Perfect, thanks!</UserMessage>
                          )}
                        </AnimatePresence>
                        
                        {/* Message 8: Bot final */}
                        <AnimatePresence>
                          {animationPhase >= 16 && (
                            <BotMessage>Done! ✅ 892 USDC sent</BotMessage>
                          )}
                        </AnimatePresence>
                        
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating accents */}
                <motion.div 
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-orange-500/50 rounded-full"
                  animate={{ y: [0, -5, 0], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute -bottom-1 -left-2 w-1 h-1 bg-cyan-500/50 rounded-full"
                  animate={{ y: [0, -4, 0], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* BOTTOM - Code Editor */}
        <div className="h-[190px] bg-[#0d1117] p-3 border-t border-slate-800/50 flex flex-col">
          {/* Editor Header */}
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-800/50">
            <Terminal className="w-3 h-3 text-[#FF6A00]" />
            <span className="text-[10px] text-gray-500 font-mono">animations.config.js</span>
            <div className="ml-auto flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 animate-pulse" />
              <span className="text-[8px] text-green-500/80 font-mono">LIVE</span>
            </div>
          </div>
          
          {/* Code Content */}
          <div 
            ref={codeContainerRef}
            className="flex-1 font-mono text-[9px] overflow-y-auto overflow-x-hidden pr-1 scrollbar-thin scrollbar-thumb-gray-700/50 scrollbar-track-transparent leading-relaxed"
          >
            {codeLines.map((line, index) => (
              <div key={index} className="flex gap-2 min-h-[13px]">
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
                      <span className="text-gray-500">:</span>
                      <span className="text-orange-300">{line.split(':').slice(1).join(':')}</span>
                    </span>
                  ) : line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']') ? (
                    <span className="text-yellow-200/80">{line}</span>
                  ) : (
                    <span className="text-gray-400">{line}</span>
                  )}
                </span>
              </div>
            ))}
            {typedCode.length < animationCode.length && (
              <motion.span
                className="inline-block w-1.5 h-2.5 bg-[#FF6A00] ml-5"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};
