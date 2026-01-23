import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, MessageCircle, Bot } from 'lucide-react';

// Animation code being "typed"
const animationCode = `// Chat message animation
const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

// Typing indicator pulse
const typingDots = {
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      repeat: Infinity,
      duration: 0.6
    }
  }
};

// Message slide in
const slideIn = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 }
};

// Bot response delay
await delay(800);
sendBotMessage(response);`;

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
          
          if (progress > 0.1) setAnimationPhase(1);  // First user message appears
          if (progress > 0.25) setAnimationPhase(2); // Typing indicator shows
          if (progress > 0.4) {
            setAnimationPhase(3); // Bot responds
            setShowTypingIndicator(false);
          }
          if (progress > 0.55) setAnimationPhase(4); // Second user message
          if (progress > 0.7) setShowTypingIndicator(true);
          if (progress > 0.85) {
            setAnimationPhase(5); // Final bot response
            setShowTypingIndicator(false);
          }

          if (codeContainerRef.current) {
            codeContainerRef.current.scrollTop = codeContainerRef.current.scrollHeight;
          }
        } else {
          clearInterval(typingInterval);
          setTimeout(() => startTyping(), 3500);
        }
      }, 45);
    };

    startTyping();
    return () => { if (typingInterval) clearInterval(typingInterval); };
  }, []);

  const codeLines = typedCode.split('\n');

  // Typing indicator component
  const TypingIndicator = () => (
    <motion.div 
      className="flex items-center gap-1 px-3 py-2 bg-slate-700 rounded-2xl rounded-bl-sm w-fit"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-slate-400 rounded-full"
          animate={{ 
            y: [0, -3, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{ 
            duration: 0.6, 
            repeat: Infinity,
            delay: i * 0.15
          }}
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
        style={{ height: '500px' }}
      >
        {/* Main Content - Split View */}
        <div className="flex h-full">
          
          {/* LEFT SIDE - Mock Website with Phone */}
          <div className="w-[55%] bg-[#0a0a0a] relative overflow-hidden">
            
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />
            
            {/* Decorative corner crosses */}
            <div className="absolute top-8 left-8 text-red-500 text-lg">+</div>
            <div className="absolute top-8 right-8 text-red-500 text-lg">+</div>
            <div className="absolute bottom-8 left-8 text-red-500 text-lg">+</div>
            <div className="absolute bottom-8 right-8 text-red-500 text-lg">+</div>
            
            {/* Content Layout */}
            <div className="relative z-10 flex h-full">
              
              {/* Left Text Content */}
              <div className="flex-1 flex flex-col justify-center px-6 py-8">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] text-slate-400 tracking-[0.2em] font-medium">COMPLEX MADE SIMPLE</span>
                  <span className="text-red-500 text-xs">_</span>
                </div>
                
                {/* Headline */}
                <h2 className="text-white text-xl font-semibold mb-3 leading-tight" style={{ fontFamily: 'system-ui' }}>
                  AI-powered<br />simplicity
                </h2>
                
                {/* Description */}
                <p className="text-slate-500 text-[11px] leading-relaxed max-w-[200px]">
                  A chat-based interface backed by a custom-trained LLM simplifies even the most complex tasks.
                </p>
              </div>
              
              {/* Right - Phone Mockup */}
              <div className="flex-1 flex items-center justify-center pr-4">
                <div className="relative">
                  {/* Phone Frame */}
                  <div 
                    className="w-[160px] h-[300px] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[24px] border-2 border-slate-700 shadow-2xl overflow-hidden"
                    style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }}
                  >
                    {/* Phone Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-black rounded-full z-20" />
                    
                    {/* Phone Screen Background - Scenic Image Placeholder */}
                    <div className="absolute inset-2 rounded-[20px] overflow-hidden">
                      {/* Scenic gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-b from-slate-600 via-slate-500 to-slate-700">
                        {/* Mountains silhouette */}
                        <svg className="absolute bottom-0 left-0 right-0 h-24 opacity-40" viewBox="0 0 200 100" preserveAspectRatio="none">
                          <path d="M0,100 L0,60 L30,40 L60,70 L90,30 L120,60 L150,45 L180,65 L200,50 L200,100 Z" fill="#1e293b"/>
                          <path d="M0,100 L0,80 L40,60 L80,85 L120,55 L160,75 L200,65 L200,100 Z" fill="#0f172a"/>
                        </svg>
                        {/* Tree silhouettes */}
                        <div className="absolute bottom-4 left-4 w-3 h-8 bg-slate-900/60 rounded-t-full" />
                        <div className="absolute bottom-4 left-8 w-2 h-6 bg-slate-900/50 rounded-t-full" />
                      </div>
                      
                      {/* Chat Interface Overlay */}
                      <div className="absolute inset-0 flex flex-col">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between px-3 pt-6 pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-slate-800" />
                            </div>
                            <span className="text-white text-[10px] font-medium">Exchange</span>
                          </div>
                          <div className="text-white text-xs">•••</div>
                        </div>
                        
                        {/* Chat Messages Area */}
                        <div className="flex-1 px-2 py-2 space-y-2 overflow-hidden">
                          
                          {/* User Message 1 */}
                          <AnimatePresence>
                            {animationPhase >= 1 && (
                              <motion.div 
                                className="flex justify-end"
                                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                              >
                                <div className="flex items-end gap-1">
                                  <div className="bg-slate-800/90 backdrop-blur-sm text-white text-[8px] px-2.5 py-1.5 rounded-xl rounded-br-sm max-w-[110px]">
                                    Hey Elsa 👋<br/>
                                    <span className="text-slate-300">exchange 0.001 ETH to SOL</span>
                                  </div>
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex-shrink-0 overflow-hidden border border-white/20">
                                    <div className="w-full h-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center text-[6px] font-bold text-white">
                                      U
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* Bot Typing / Response 1 */}
                          <AnimatePresence mode="wait">
                            {animationPhase === 2 && showTypingIndicator === false && (
                              <motion.div 
                                className="flex justify-start"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <div className="flex items-end gap-1">
                                  <div className="w-5 h-5 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                                    <Bot className="w-3 h-3 text-slate-800" />
                                  </div>
                                  <TypingIndicator />
                                </div>
                              </motion.div>
                            )}
                            
                            {animationPhase >= 3 && (
                              <motion.div 
                                className="flex justify-start"
                                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                              >
                                <div className="flex items-end gap-1">
                                  <div className="w-5 h-5 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                                    <Bot className="w-3 h-3 text-slate-800" />
                                  </div>
                                  <div className="bg-slate-700/90 backdrop-blur-sm text-white text-[8px] px-2.5 py-1.5 rounded-xl rounded-bl-sm">
                                    Yeah! Sure 👍
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* User Message 2 */}
                          <AnimatePresence>
                            {animationPhase >= 4 && (
                              <motion.div 
                                className="flex justify-end"
                                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                              >
                                <div className="flex items-end gap-1">
                                  <div className="bg-slate-800/90 backdrop-blur-sm text-white text-[8px] px-2.5 py-1.5 rounded-xl rounded-br-sm">
                                    Perfect, thanks!
                                  </div>
                                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex-shrink-0 flex items-center justify-center text-[6px] font-bold text-white border border-white/20">
                                    U
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* Bot Typing / Response 2 */}
                          <AnimatePresence mode="wait">
                            {showTypingIndicator && animationPhase < 5 && (
                              <motion.div 
                                className="flex justify-start"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <div className="flex items-end gap-1">
                                  <div className="w-5 h-5 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                                    <Bot className="w-3 h-3 text-slate-800" />
                                  </div>
                                  <TypingIndicator />
                                </div>
                              </motion.div>
                            )}
                            
                            {animationPhase >= 5 && (
                              <motion.div 
                                className="flex justify-start"
                                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                              >
                                <div className="flex items-end gap-1">
                                  <div className="w-5 h-5 rounded-full bg-white flex-shrink-0 flex items-center justify-center">
                                    <Bot className="w-3 h-3 text-slate-800" />
                                  </div>
                                  <div className="bg-slate-700/90 backdrop-blur-sm text-white text-[8px] px-2.5 py-1.5 rounded-xl rounded-bl-sm">
                                    Done! ✅ Sent to wallet
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements around phone */}
                  <motion.div 
                    className="absolute -top-4 -right-4 text-slate-600"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
              
            </div>
          </div>

          {/* RIGHT SIDE - Code Editor */}
          <div className="w-[45%] bg-[#0d1117] p-4 flex flex-col border-l border-slate-800">
            {/* Editor Header */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
              <Terminal className="w-3.5 h-3.5 text-[#FF6A00]" />
              <span className="text-[10px] text-gray-400 font-mono">chat-animations.js</span>
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
            <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between text-[8px] text-gray-500 font-mono">
              <div className="flex items-center gap-2">
                <span>JavaScript</span>
                <span>•</span>
                <span>UTF-8</span>
              </div>
              <span>Ln {codeLines.length}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
