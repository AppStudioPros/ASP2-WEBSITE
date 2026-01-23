import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Smartphone, Palette, Cloud, Brain,
  Code2, Layout, Database, Cpu, MessageSquare,
  Check, Zap, Shield, Rocket, Server, User
} from 'lucide-react';

// Service data
const services = [
  {
    id: 'web',
    title: 'Website Development',
    tag: 'Full-Stack',
    tagColor: '#00E5FF',
    description: 'Custom websites that combine stunning design with powerful functionality. From landing pages to complex web applications, we build digital experiences that convert visitors into customers.',
    features: [
      'Responsive Design',
      'SEO Optimized',
      'Fast Load Times',
      'CMS Integration'
    ],
    icon: Globe
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    tag: 'iOS & Android',
    tagColor: '#FF6A00',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences. We build apps that users love to use and keep coming back to.',
    features: [
      'Native Performance',
      'Offline Capability',
      'Push Notifications',
      'App Store Ready'
    ],
    icon: Smartphone
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    tag: 'User-Centered',
    tagColor: '#9C27B0',
    description: 'Research-driven design that puts users first. We create intuitive interfaces and seamless experiences that delight users and achieve business goals.',
    features: [
      'User Research',
      'Wireframing',
      'Prototyping',
      'Design Systems'
    ],
    icon: Palette
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    tag: 'Scalable',
    tagColor: '#4CAF50',
    description: 'Enterprise-grade cloud infrastructure that scales with your business. We architect, deploy, and manage cloud solutions for maximum reliability and performance.',
    features: [
      'Auto-Scaling',
      '99.9% Uptime',
      'Cost Optimization',
      'Security First'
    ],
    icon: Cloud
  },
  {
    id: 'ai',
    title: 'AI Integration',
    tag: 'Intelligent',
    tagColor: '#2196F3',
    description: 'Harness the power of artificial intelligence to automate processes, gain insights, and create intelligent applications that learn and adapt.',
    features: [
      'Custom AI Models',
      'NLP & Chat',
      'Predictive Analytics',
      'Process Automation'
    ],
    icon: Brain
  }
];

// Website Development Visual - Enhanced
const WebDevVisual = () => {
  const [codeLines, setCodeLines] = useState([]);
  const [buildProgress, setBuildProgress] = useState(0);
  const mountedRef = useRef(true);
  const lineIndexRef = useRef(0);
  
  const codeSnippets = [
    { num: 1, code: '<section class="hero">', color: '#FF6A00' },
    { num: 2, code: '  <nav class="navbar">', color: '#00E5FF' },
    { num: 3, code: '    <a href="/">Home</a>', color: '#4CAF50' },
    { num: 4, code: '  </nav>', color: '#00E5FF' },
    { num: 5, code: '  <h1>Welcome</h1>', color: '#9C27B0' },
    { num: 6, code: '  <button>Get Started</button>', color: '#FF6A00' },
    { num: 7, code: '</section>', color: '#FF6A00' },
  ];

  useEffect(() => {
    mountedRef.current = true;
    lineIndexRef.current = 0;
    setCodeLines([]);
    setBuildProgress(0);
    
    const addLine = () => {
      if (!mountedRef.current) return;
      
      const currentIndex = lineIndexRef.current;
      if (currentIndex < codeSnippets.length) {
        const snippet = codeSnippets[currentIndex];
        setCodeLines(prev => [...prev, snippet]);
        setBuildProgress(((currentIndex + 1) / codeSnippets.length) * 100);
        lineIndexRef.current = currentIndex + 1;
        setTimeout(addLine, 900);
      }
    };
    
    const timeout = setTimeout(addLine, 500);
    
    return () => {
      mountedRef.current = false;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Website Preview */}
      <div className="flex-1 bg-[#1a1a2e] rounded-lg border border-[hsl(var(--border))] overflow-hidden">
        <div className="h-7 bg-[#0d0d1a] flex items-center px-3 gap-2 border-b border-gray-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27ca3f]" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-[#2a2a3e] rounded px-3 py-0.5 text-xs text-gray-400 font-mono">
              https://your-website.com
            </div>
          </div>
        </div>
        <div className="p-4">
          {/* Navbar */}
          <motion.div
            className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: buildProgress > 15 ? 1 : 0 }}
          >
            <div className="w-20 h-5 bg-[#FF6A00]/30 rounded" />
            <div className="flex gap-3">
              <div className="w-12 h-3 bg-gray-700 rounded" />
              <div className="w-12 h-3 bg-gray-700 rounded" />
              <div className="w-12 h-3 bg-gray-700 rounded" />
            </div>
          </motion.div>
          
          {/* Hero Content */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: buildProgress > 40 ? 1 : 0 }}
          >
            <motion.div 
              className="h-8 bg-gradient-to-r from-[#00E5FF]/30 to-transparent rounded"
              initial={{ width: 0 }}
              animate={{ width: buildProgress > 50 ? '70%' : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div 
              className="h-4 bg-gray-700/50 rounded"
              initial={{ width: 0 }}
              animate={{ width: buildProgress > 60 ? '90%' : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div 
              className="h-4 bg-gray-700/30 rounded"
              initial={{ width: 0 }}
              animate={{ width: buildProgress > 70 ? '60%' : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.div 
              className="h-10 w-32 bg-[#FF6A00]/40 rounded mt-4 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: buildProgress > 80 ? 1 : 0, scale: buildProgress > 80 ? 1 : 0.8 }}
            >
              <span className="text-xs text-gray-300">Get Started</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Code Editor */}
      <div className="h-36 bg-[#0d0d1a] rounded-lg border border-[hsl(var(--border))] overflow-hidden">
        <div className="h-6 bg-[#1a1a2e] flex items-center px-3 gap-2 border-b border-gray-800">
          <div className="w-3 h-3 rounded-sm bg-[#00E5FF]/30" />
          <span className="text-xs text-[#00E5FF] font-mono">index.html</span>
          <span className="text-xs text-gray-600 ml-auto">UTF-8</span>
        </div>
        <div className="p-3 font-mono text-xs overflow-hidden">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex"
            >
              <span className="text-gray-600 w-6 text-right mr-4">{line.num}</span>
              <span style={{ color: line.color }}>{line.code}</span>
            </motion.div>
          ))}
          <div className="flex">
            <span className="text-gray-600 w-6 text-right mr-4">{codeLines.length + 1}</span>
            <motion.span 
              className="inline-block w-2 h-4 bg-[#00E5FF]"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile App Development Visual - Enhanced
const MobileDevVisual = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const mountedRef = useRef(true);
  
  useEffect(() => {
    mountedRef.current = true;
    const interval = setInterval(() => {
      if (mountedRef.current) {
        setCurrentScreen(prev => (prev + 1) % 3);
      }
    }, 2500);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-52 h-[380px] bg-gradient-to-b from-gray-800 to-gray-900 rounded-[40px] p-2 shadow-2xl border border-gray-700">
          {/* Inner Screen */}
          <div className="w-full h-full bg-[#0d0d1a] rounded-[32px] overflow-hidden relative">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-800" />
              <div className="w-8 h-3 rounded-full bg-gray-800" />
            </div>
            
            {/* Screen Content */}
            <div className="h-full pt-10 pb-6 px-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="h-full"
                >
                  {currentScreen === 0 && (
                    <div className="space-y-3 p-2">
                      <div className="flex items-center justify-between">
                        <div className="h-5 w-20 bg-[#FF6A00]/40 rounded" />
                        <div className="w-8 h-8 rounded-full bg-[#00E5FF]/30" />
                      </div>
                      <div className="h-28 bg-gradient-to-br from-[#FF6A00]/20 to-[#00E5FF]/20 rounded-xl" />
                      <div className="text-xs text-gray-500 font-medium">Quick Actions</div>
                      <div className="grid grid-cols-4 gap-2">
                        {['#FF6A00', '#00E5FF', '#4CAF50', '#9C27B0'].map((c, i) => (
                          <div key={i} className="aspect-square rounded-lg" style={{ backgroundColor: `${c}20` }} />
                        ))}
                      </div>
                      <div className="h-16 bg-gray-800/50 rounded-xl mt-2" />
                    </div>
                  )}
                  {currentScreen === 1 && (
                    <div className="space-y-3 p-2 text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00E5FF]/40 to-[#FF6A00]/40 rounded-full" />
                      <div className="h-4 w-24 mx-auto bg-gray-700 rounded" />
                      <div className="h-3 w-32 mx-auto bg-gray-800 rounded" />
                      <div className="mt-4 space-y-2">
                        {['Profile', 'Settings', 'Notifications'].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                            <div className="w-8 h-8 rounded-lg bg-[#FF6A00]/20" />
                            <span className="text-xs text-gray-400">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {currentScreen === 2 && (
                    <div className="space-y-2 p-2">
                      <div className="h-5 w-16 bg-gray-700 rounded mb-3" />
                      {['General', 'Privacy', 'Security', 'Help'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-[#2196F3]/30" />
                            <span className="text-xs text-gray-400">{item}</span>
                          </div>
                          <div className="w-4 h-4 text-gray-600">›</div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
        
        {/* Tap Indicator */}
        <motion.div
          className="absolute w-10 h-10 border-2 border-[#FF6A00] rounded-full"
          style={{ top: '35%', right: '-5%' }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

// UI/UX Design Visual - Enhanced
const DesignVisual = () => {
  const [step, setStep] = useState(0);
  const mountedRef = useRef(true);
  
  useEffect(() => {
    mountedRef.current = true;
    const interval = setInterval(() => {
      if (mountedRef.current) {
        setStep(prev => (prev + 1) % 5);
      }
    }, 1400);
    return () => {
      mountedRef.current = false;
      clearInterval(interval);
    };
  }, []);

  const colors = ['#FF6A00', '#00E5FF', '#4CAF50', '#9C27B0', '#2196F3'];

  return (
    <div className="h-full bg-[#1a1a2e] rounded-lg border border-[hsl(var(--border))] overflow-hidden">
      {/* Toolbar */}
      <div className="h-9 bg-[#0d0d1a] flex items-center px-3 gap-3 border-b border-gray-800">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27ca3f]" />
        </div>
        <div className="h-5 w-px bg-gray-700" />
        <Layout className="w-4 h-4 text-gray-500" />
        <div className="flex gap-1 ml-auto">
          {colors.map((c, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-sm cursor-pointer"
              style={{ backgroundColor: c }}
              animate={{ 
                scale: step >= i ? 1 : 0.6,
                opacity: step >= i ? 1 : 0.3
              }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>
      
      {/* Canvas */}
      <div className="p-4 relative h-[calc(100%-36px)]">
        {/* Grid Background */}
        <div className="absolute inset-4 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Design Elements */}
        <div className="relative space-y-3">
          {/* Header */}
          <motion.div
            className="h-12 rounded-lg flex items-center px-4 justify-between"
            style={{ backgroundColor: `${colors[0]}20`, borderLeft: `3px solid ${colors[0]}` }}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: step >= 0 ? 0 : -50, opacity: step >= 0 ? 1 : 0 }}
          >
            <div className="w-16 h-4 bg-white/20 rounded" />
            <div className="flex gap-2">
              <div className="w-8 h-4 bg-white/10 rounded" />
              <div className="w-8 h-4 bg-white/10 rounded" />
            </div>
          </motion.div>
          
          {/* Two Column Layout */}
          <div className="flex gap-3">
            <motion.div
              className="flex-1 h-28 rounded-lg"
              style={{ backgroundColor: `${colors[1]}15`, border: `1px dashed ${colors[1]}50` }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: step >= 1 ? 0 : 30, opacity: step >= 1 ? 1 : 0 }}
            >
              <div className="p-3 space-y-2">
                <div className="w-20 h-3 bg-white/20 rounded" />
                <div className="w-full h-2 bg-white/10 rounded" />
                <div className="w-3/4 h-2 bg-white/10 rounded" />
              </div>
            </motion.div>
            <motion.div
              className="w-28 h-28 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${colors[3]}20` }}
              initial={{ scale: 0 }}
              animate={{ scale: step >= 2 ? 1 : 0 }}
            >
              <div className="w-16 h-16 rounded-full bg-white/10" />
            </motion.div>
          </div>
          
          {/* Cards Row */}
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 3 ? 1 : 0 }}
          >
            {[colors[2], colors[4], colors[0]].map((c, i) => (
              <motion.div 
                key={i} 
                className="flex-1 h-16 rounded-lg p-2"
                style={{ backgroundColor: `${c}15` }}
                initial={{ y: 20 }}
                animate={{ y: step >= 3 ? 0 : 20 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-6 h-6 rounded" style={{ backgroundColor: `${c}40` }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Alignment Guides */}
        {step >= 2 && (
          <>
            <motion.div
              className="absolute left-4 right-4 h-px"
              style={{ top: '45%', backgroundColor: '#FF6A00' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.6 }}
            />
            <motion.div
              className="absolute top-4 bottom-4 w-px"
              style={{ left: '50%', backgroundColor: '#00E5FF' }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.6 }}
              transition={{ delay: 0.1 }}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Cloud Solutions Visual - Fixed and Enhanced
const CloudVisual = () => {
  const [activeNode, setActiveNode] = useState(0);
  const [uptimeValue, setUptimeValue] = useState(95);
  const [packets, setPackets] = useState([]);
  const mountedRef = useRef(true);
  
  const nodes = [
    { id: 'us-east', x: 15, y: 25, label: 'US-East' },
    { id: 'eu-west', x: 85, y: 25, label: 'EU-West' },
    { id: 'primary', x: 50, y: 50, label: 'Primary', isPrimary: true },
    { id: 'us-west', x: 15, y: 75, label: 'US-West' },
    { id: 'apac', x: 85, y: 75, label: 'APAC' },
  ];

  useEffect(() => {
    mountedRef.current = true;
    
    // Rotate active node
    const nodeInterval = setInterval(() => {
      if (mountedRef.current) {
        setActiveNode(prev => (prev + 1) % 4);
      }
    }, 1500);
    
    // Animate uptime
    const uptimeInterval = setInterval(() => {
      if (mountedRef.current) {
        setUptimeValue(prev => {
          const next = prev + 0.1;
          return next > 99.9 ? 99.9 : next;
        });
      }
    }, 100);
    
    // Add packets
    const packetInterval = setInterval(() => {
      if (mountedRef.current) {
        const sourceIdx = Math.floor(Math.random() * 4);
        const source = [0, 1, 3, 4][sourceIdx];
        setPackets(prev => [...prev.slice(-3), { id: Date.now(), source }]);
      }
    }, 800);
    
    return () => {
      mountedRef.current = false;
      clearInterval(nodeInterval);
      clearInterval(uptimeInterval);
      clearInterval(packetInterval);
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Network Diagram */}
      <div className="flex-1 bg-[#1a1a2e] rounded-lg border border-[hsl(var(--border))] relative overflow-hidden">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {[0, 1, 3, 4].map((nodeIdx) => {
            const node = nodes[nodeIdx];
            const isActive = [0, 1, 3, 4].indexOf(nodeIdx) === activeNode;
            return (
              <line
                key={nodeIdx}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2="50%"
                y2="50%"
                stroke={isActive ? '#00E5FF' : '#333'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? 'none' : '4,4'}
              />
            );
          })}
        </svg>
        
        {/* Animated Packets */}
        {packets.map(packet => {
          const source = nodes[packet.source];
          return (
            <motion.div
              key={packet.id}
              className="absolute w-2 h-2 bg-[#00E5FF] rounded-full shadow-lg shadow-[#00E5FF]/50"
              style={{ left: `${source.x}%`, top: `${source.y}%` }}
              animate={{ 
                left: '50%', 
                top: '50%',
                opacity: [1, 1, 0]
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          );
        })}
        
        {/* Server Nodes */}
        {nodes.map((node, i) => (
          <div
            key={node.id}
            className="absolute flex flex-col items-center"
            style={{ 
              left: `${node.x}%`, 
              top: `${node.y}%`, 
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              node.isPrimary 
                ? 'bg-[#FF6A00]/30 border-2 border-[#FF6A00]' 
                : [0, 1, 3, 4].indexOf(i) === activeNode
                  ? 'bg-[#00E5FF]/30 border-2 border-[#00E5FF]'
                  : 'bg-gray-800 border border-gray-700'
            }`}>
              {node.isPrimary ? (
                <Server className="w-5 h-5 text-[#FF6A00]" />
              ) : (
                <Database className="w-4 h-4 text-gray-400" />
              )}
            </div>
            <span className="text-[10px] text-gray-500 mt-1 font-mono">{node.label}</span>
          </div>
        ))}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-[#4CAF50]/20 px-2 py-1 rounded-full">
          <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
          <span className="text-xs text-[#4CAF50] font-mono">ONLINE</span>
        </div>
      </div>
      
      {/* Uptime Graph */}
      <div className="h-24 bg-[#0d0d1a] rounded-lg border border-[hsl(var(--border))] p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">System Uptime</span>
          <span className="text-sm font-mono text-[#4CAF50] font-bold">{uptimeValue.toFixed(1)}%</span>
        </div>
        <div className="h-10 flex items-end gap-[2px]">
          {Array.from({ length: 30 }).map((_, i) => {
            const height = 40 + Math.sin(i * 0.3) * 20 + Math.random() * 20;
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-t"
                style={{ backgroundColor: height > 50 ? '#4CAF50' : '#4CAF5080' }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.min(height, 100)}%` }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// AI Integration Visual - Fixed with realistic conversation
const AIVisual = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const mountedRef = useRef(true);
  const processedRef = useRef(new Set());
  
  const conversation = [
    { id: 1, role: 'user', text: 'Can you add automation to handle form submissions?' },
    { id: 2, role: 'ai', text: 'I can set up automated email responses, data validation, and CRM integration for your forms.' },
    { id: 3, role: 'user', text: 'Great! What about scheduling follow-ups?' },
    { id: 4, role: 'ai', text: 'I\'ll implement automated follow-up sequences with customizable timing and personalized messages.' },
  ];

  useEffect(() => {
    mountedRef.current = true;
    processedRef.current = new Set();
    setMessages([]);
    setIsTyping(false);
    
    let timeoutId;
    
    const addNextMessage = (index) => {
      if (!mountedRef.current || index >= conversation.length) return;
      
      const msg = conversation[index];
      
      // Skip if already processed
      if (processedRef.current.has(msg.id)) return;
      processedRef.current.add(msg.id);
      
      if (msg.role === 'ai') {
        setIsTyping(true);
        timeoutId = setTimeout(() => {
          if (!mountedRef.current) return;
          setIsTyping(false);
          setMessages(prev => {
            // Prevent duplicates
            if (prev.some(m => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
          timeoutId = setTimeout(() => addNextMessage(index + 1), 1500);
        }, 1500);
      } else {
        setMessages(prev => {
          // Prevent duplicates
          if (prev.some(m => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
        timeoutId = setTimeout(() => addNextMessage(index + 1), 1200);
      }
    };
    
    timeoutId = setTimeout(() => addNextMessage(0), 800);
    
    return () => {
      mountedRef.current = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="h-full bg-[#1a1a2e] rounded-lg border border-[hsl(var(--border))] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="h-12 bg-[#0d0d1a] flex items-center px-4 gap-3 border-b border-gray-800">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2196F3] to-[#00E5FF] flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-medium text-white">AI Assistant</div>
          <div className="text-xs text-gray-500">Automation Expert</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
          <span className="text-xs text-[#4CAF50]">Online</span>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'ai' && (
              <div className="w-6 h-6 rounded-full bg-[#2196F3]/30 flex items-center justify-center mr-2 flex-shrink-0">
                <Brain className="w-3 h-3 text-[#2196F3]" />
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-[#FF6A00] text-white rounded-br-md' 
                : 'bg-gray-800 text-gray-200 rounded-bl-md'
            }`}>
              {msg.text}
            </div>
            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-[#FF6A00]/30 flex items-center justify-center ml-2 flex-shrink-0">
                <User className="w-3 h-3 text-[#FF6A00]" />
              </div>
            )}
          </motion.div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 rounded-full bg-[#2196F3]/30 flex items-center justify-center">
              <Brain className="w-3 h-3 text-[#2196F3]" />
            </div>
            <div className="bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-md flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#2196F3] rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Input Bar */}
      <div className="h-14 bg-[#0d0d1a] flex items-center px-4 gap-3 border-t border-gray-800">
        <div className="flex-1 h-9 bg-gray-800 rounded-full px-4 flex items-center">
          <span className="text-sm text-gray-500">Ask about automation...</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#2196F3] flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};

// Visual components map
const visualComponents = {
  web: WebDevVisual,
  mobile: MobileDevVisual,
  design: DesignVisual,
  cloud: CloudVisual,
  ai: AIVisual
};

// Main Showcase Component
export const ServicesShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const VisualComponent = visualComponents[activeService.id];

  // Auto-rotation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % services.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* Service Selector Pills - NO ICONS */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {services.map((service, index) => (
          <button
            key={service.id}
            onClick={() => setActiveIndex(index)}
            className={`px-4 py-2 rounded-full border transition-all text-sm font-medium ${
              activeIndex === index
                ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-white'
                : 'border-[hsl(var(--border))] text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {service.title}
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Service Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Tag Badge */}
            <div 
              className="inline-block px-3 py-1 rounded-full text-xs font-mono border"
              style={{ 
                borderColor: activeService.tagColor,
                color: activeService.tagColor,
                backgroundColor: `${activeService.tagColor}15`
              }}
            >
              {activeService.tag}
            </div>
            
            {/* Title */}
            <h3 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--foreground))]">
              {activeService.title}
            </h3>
            
            {/* Description */}
            <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed">
              {activeService.description}
            </p>
            
            {/* Features List */}
            <ul className="space-y-3">
              {activeService.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-[hsl(var(--foreground))]"
                >
                  <div 
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${activeService.tagColor}20` }}
                  >
                    <Check className="w-3 h-3" style={{ color: activeService.tagColor }} />
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>
            
            {/* Progress Indicator */}
            <div className="pt-4">
              <div className="flex gap-2">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full overflow-hidden bg-gray-800"
                  >
                    {i === activeIndex && (
                      <motion.div
                        className="h-full bg-[#FF6A00]"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 8, ease: 'linear' }}
                        key={`progress-${activeIndex}`}
                      />
                    )}
                    {i < activeIndex && (
                      <div className="h-full w-full bg-[#FF6A00]/50" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Right Column - Animated Visual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="h-80 lg:h-[420px]"
          >
            <VisualComponent key={`visual-${activeService.id}-${activeIndex}`} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesShowcase;
