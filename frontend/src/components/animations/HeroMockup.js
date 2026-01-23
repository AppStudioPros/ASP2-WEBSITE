import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
          
          // Phase transitions for all elements
          if (progress > 0.05) setAnimationPhase(1);   // Badge
          if (progress > 0.12) setAnimationPhase(2);   // Headline line 1
          if (progress > 0.18) setAnimationPhase(3);   // Headline line 2
          if (progress > 0.24) setAnimationPhase(4);   // Description
          if (progress > 0.30) setAnimationPhase(5);   // Stats appear
          if (progress > 0.36) setAnimationPhase(6);   // Chat msg 1
          if (progress > 0.44) setAnimationPhase(7);   // Chat msg 2
          if (progress > 0.52) setAnimationPhase(8);   // Chat msg 3
          if (progress > 0.60) setAnimationPhase(9);   // Chat msg 4
          if (progress > 0.68) setAnimationPhase(10);  // Chat msg 5
          if (progress > 0.76) setAnimationPhase(11);  // Chat msg 6
          if (progress > 0.84) setAnimationPhase(12);  // Chat msg 7
          if (progress > 0.92) setAnimationPhase(13);  // Chat msg 8

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

  // Chat messages data
  const chatMessages = [
    { type: 'user', text: "Hey! 👋 Can you help?", phase: 6 },
    { type: 'bot', text: "Of course! What do you need?", phase: 7 },
    { type: 'user', text: "Convert 0.5 ETH to USDC", phase: 8 },
    { type: 'bot', text: "Sure! Processing now...", phase: 9 },
    { type: 'user', text: "How long will it take?", phase: 10 },
    { type: 'bot', text: "About 30 seconds ⚡", phase: 11 },
    { type: 'user', text: "Perfect, thanks!", phase: 12 },
    { type: 'bot', text: "Done! ✅ 892 USDC sent", phase: 13 },
  ];

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
        <div className="h-[340px] bg-[#0a0a0a] relative overflow-hidden">
          
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
            animate={animationPhase >= 13 ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >+</motion.div>
          <motion.div 
            className="absolute top-4 right-4 text-red-500/50 text-xs select-none"
            animate={animationPhase >= 13 ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >+</motion.div>
          <motion.div 
            className="absolute bottom-4 left-4 text-red-500/50 text-xs select-none"
            animate={animationPhase >= 13 ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >+</motion.div>
          <motion.div 
            className="absolute bottom-4 right-4 text-red-500/50 text-xs select-none"
            animate={animationPhase >= 13 ? { opacity: [0.3, 0.8, 0.3] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          >+</motion.div>
          
          {/* Content Layout */}
          <div className="relative z-10 flex h-full px-8 py-6">
            
            {/* Left Text Content */}
            <div className="flex-1 flex flex-col justify-center pr-8">
              {/* Badge */}
              {animationPhase >= 1 && (
                <motion.div 
                  className="flex items-center gap-2 mb-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
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
              
              {/* Headline */}
              <div className="mb-4 overflow-hidden">
                {animationPhase >= 2 && (
                  <motion.span
                    className="block text-white text-2xl font-semibold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    AI-powered
                  </motion.span>
                )}
                {animationPhase >= 3 && (
                  <motion.span
                    className="block text-white text-2xl font-semibold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={animationPhase >= 13 ? {
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
              </div>
              
              {/* Description */}
              {animationPhase >= 4 && (
                <motion.p 
                  className="text-slate-500 text-[11px] leading-relaxed max-w-[220px]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  A chat-based interface backed by a custom-trained LLM simplifies even the most complex tasks.
                </motion.p>
              )}

              {/* Stats Row */}
              {animationPhase >= 5 && (
                <motion.div 
                  className="flex gap-6 mt-5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  <div className="text-center">
                    <div className="text-white text-base font-bold tabular-nums">99.9%</div>
                    <div className="text-slate-600 text-[8px]">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white text-base font-bold">&lt;1s</div>
                    <div className="text-slate-600 text-[8px]">Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white text-base font-bold">24/7</div>
                    <div className="text-slate-600 text-[8px]">Available</div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Right - Phone Mockup */}
            <div className="flex items-center justify-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0.5, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Phone Frame */}
                <div 
                  className="w-[155px] h-[310px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[24px] border border-slate-700 shadow-2xl overflow-hidden relative"
                  style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                >
                  {/* Phone Notch */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-black rounded-full z-20" />
                  
                  {/* Phone Screen */}
                  <div className="absolute inset-1.5 rounded-[20px] overflow-hidden bg-slate-900">
                    
                    {/* Chat Interface */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between px-2.5 pt-5 pb-2 border-b border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-white text-[10px] font-semibold">Assistant</span>
                        </div>
                        <div className="text-slate-500 text-[10px]">•••</div>
                      </div>
                      
                      {/* Messages Container */}
                      <div className="flex-1 px-2 py-2 space-y-2 overflow-hidden">
                        {chatMessages.map((msg, index) => {
                          if (animationPhase < msg.phase) return null;
                          
                          const isUser = msg.type === 'user';
                          
                          return (
                            <motion.div 
                              key={index}
                              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                              initial={{ opacity: 0, y: 8, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                              <div className={`flex items-end gap-1 ${isUser ? 'flex-row-reverse' : ''}`}>
                                {!isUser && (
                                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0 flex items-center justify-center">
                                    <Bot className="w-2.5 h-2.5 text-white" />
                                  </div>
                                )}
                                <div 
                                  className={`text-[8px] px-2.5 py-1.5 max-w-[95px] leading-relaxed ${
                                    isUser 
                                      ? 'bg-blue-600 text-white rounded-2xl rounded-br-md' 
                                      : 'bg-slate-800 text-slate-200 rounded-2xl rounded-bl-md'
                                  }`}
                                >
                                  {msg.text}
                                </div>
                                {isUser && (
                                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex-shrink-0 flex items-center justify-center text-[6px] font-bold text-white">
                                    U
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                      
                      {/* Input Area */}
                      <div className="px-2 pb-2">
                        <div className="flex items-center gap-1.5 bg-slate-800 rounded-full px-3 py-1.5">
                          <span className="text-slate-500 text-[8px]">Type a message...</span>
                        </div>
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
        <div className="h-[180px] bg-[#0d1117] p-3 border-t border-slate-800/50 flex flex-col">
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
