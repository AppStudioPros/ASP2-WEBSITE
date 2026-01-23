import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Smartphone, Palette, Cloud, Brain,
  Code2, Layout, Database, Cpu, MessageSquare,
  Check, Zap, Shield, Rocket
} from 'lucide-react';

// Service data with features and visuals config
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

// Website Development Visual
const WebDevVisual = () => {
  const [codeLines, setCodeLines] = useState([]);
  const [buildProgress, setBuildProgress] = useState(0);
  
  const codeSnippets = [
    '<div class="hero">',
    '  <h1>Welcome</h1>',
    '  <p>Building...</p>',
    '</div>',
    '<style>',
    '  .hero { padding: 2rem; }',
    '</style>'
  ];

  useEffect(() => {
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < codeSnippets.length) {
        setCodeLines(prev => [...prev, codeSnippets[lineIndex]]);
        lineIndex++;
        setBuildProgress((lineIndex / codeSnippets.length) * 100);
      }
    }, 800);
    
    return () => {
      clearInterval(interval);
      setCodeLines([]);
      setBuildProgress(0);
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Website Preview */}
      <div className="flex-1 bg-[#1a1a2e] rounded-lg border border-[hsl(var(--border))] overflow-hidden">
        <div className="h-6 bg-[#0d0d1a] flex items-center px-3 gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="text-xs text-gray-500 ml-2 font-mono">preview.localhost</span>
        </div>
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-3"
          >
            <motion.div 
              className="h-8 bg-gradient-to-r from-[#00E5FF]/20 to-transparent rounded"
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            <motion.div 
              className="h-4 bg-[#FF6A00]/20 rounded"
              initial={{ width: 0 }}
              animate={{ width: '80%' }}
              transition={{ duration: 1, delay: 1.2 }}
            />
            <motion.div 
              className="h-4 bg-[#FF6A00]/10 rounded"
              initial={{ width: 0 }}
              animate={{ width: '65%' }}
              transition={{ duration: 1, delay: 1.5 }}
            />
            <motion.div 
              className="h-20 bg-gradient-to-br from-[#4CAF50]/20 to-[#00E5FF]/20 rounded mt-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 2 }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Code Editor */}
      <div className="h-32 bg-[#0d0d1a] rounded-lg border border-[hsl(var(--border))] overflow-hidden">
        <div className="h-5 bg-[#1a1a2e] flex items-center px-3">
          <span className="text-xs text-[#00E5FF] font-mono">index.html</span>
        </div>
        <div className="p-2 font-mono text-xs overflow-hidden">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-gray-400"
            >
              <span className="text-gray-600 mr-2">{i + 1}</span>
              <span className="text-[#00E5FF]">{line}</span>
            </motion.div>
          ))}
          <motion.span 
            className="inline-block w-2 h-4 bg-[#FF6A00]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

// Mobile App Development Visual
const MobileDevVisual = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const screens = ['home', 'profile', 'settings'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen(prev => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex items-center justify-center">
      {/* Phone Mockup */}
      <div className="relative">
        <div className="w-48 h-80 bg-[#1a1a2e] rounded-3xl border-4 border-gray-700 overflow-hidden shadow-2xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-b-xl z-10" />
          
          {/* Screen Content */}
          <div className="h-full pt-6 pb-2 px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="h-full bg-[#0d0d1a] rounded-xl p-3"
              >
                {currentScreen === 0 && (
                  <div className="space-y-3">
                    <div className="h-6 w-24 bg-[#FF6A00]/30 rounded" />
                    <div className="h-20 bg-gradient-to-br from-[#00E5FF]/20 to-[#FF6A00]/20 rounded-lg" />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="h-12 bg-[#4CAF50]/20 rounded" />
                      <div className="h-12 bg-[#9C27B0]/20 rounded" />
                    </div>
                  </div>
                )}
                {currentScreen === 1 && (
                  <div className="space-y-3 text-center">
                    <div className="w-12 h-12 mx-auto bg-[#00E5FF]/30 rounded-full" />
                    <div className="h-4 w-20 mx-auto bg-gray-700 rounded" />
                    <div className="h-3 w-28 mx-auto bg-gray-800 rounded" />
                    <div className="mt-4 space-y-2">
                      <div className="h-8 bg-[#FF6A00]/20 rounded" />
                      <div className="h-8 bg-[#4CAF50]/20 rounded" />
                    </div>
                  </div>
                )}
                {currentScreen === 2 && (
                  <div className="space-y-2">
                    <div className="h-5 w-16 bg-gray-700 rounded" />
                    {[1,2,3,4].map(i => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-gray-800/50 rounded">
                        <div className="w-6 h-6 bg-[#2196F3]/30 rounded" />
                        <div className="flex-1 h-3 bg-gray-700 rounded" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-600 rounded-full" />
        </div>
        
        {/* Tap Indicator */}
        <motion.div
          className="absolute w-8 h-8 border-2 border-[#FF6A00] rounded-full"
          style={{ top: '40%', left: '60%' }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
};

// UI/UX Design Visual
const DesignVisual = () => {
  const [elementsPlaced, setElementsPlaced] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setElementsPlaced(prev => (prev + 1) % 6);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const colors = ['#FF6A00', '#00E5FF', '#4CAF50', '#9C27B0', '#2196F3'];

  return (
    <div className="h-full bg-[#1a1a2e] rounded-lg border border-[hsl(var(--border))] overflow-hidden">
      {/* Figma-style toolbar */}
      <div className="h-8 bg-[#0d0d1a] flex items-center px-3 gap-4">
        <Layout className="w-4 h-4 text-gray-500" />
        <div className="flex gap-1">
          {colors.map((c, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded"
              style={{ backgroundColor: c }}
              initial={{ scale: 0 }}
              animate={{ scale: elementsPlaced > i ? 1 : 0 }}
              transition={{ delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
      
      {/* Artboard */}
      <div className="p-4 relative">
        {/* Grid */}
        <div className="absolute inset-4 grid grid-cols-8 grid-rows-6 gap-px opacity-20">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-gray-700" />
          ))}
        </div>
        
        {/* Design Elements */}
        <div className="relative space-y-3">
          <motion.div
            className="h-10 bg-[#FF6A00]/30 rounded"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: elementsPlaced >= 1 ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          />
          <div className="flex gap-3">
            <motion.div
              className="flex-1 h-24 bg-[#00E5FF]/20 rounded"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: elementsPlaced >= 2 ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
            <motion.div
              className="w-24 h-24 bg-[#9C27B0]/20 rounded"
              initial={{ scale: 0 }}
              animate={{ scale: elementsPlaced >= 3 ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: elementsPlaced >= 4 ? 1 : 0 }}
          >
            {[1,2,3].map(i => (
              <div key={i} className="flex-1 h-16 bg-[#4CAF50]/20 rounded" />
            ))}
          </motion.div>
        </div>
        
        {/* Alignment Guides */}
        {elementsPlaced >= 3 && (
          <>
            <motion.div
              className="absolute left-4 right-4 h-px bg-[#FF6A00]"
              style={{ top: '50%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute top-4 bottom-4 w-px bg-[#00E5FF]"
              style={{ left: '50%' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Cloud Solutions Visual
const CloudVisual = () => {
  const [activeConnections, setActiveConnections] = useState([]);
  const [uptimeValue, setUptimeValue] = useState(0);
  
  useEffect(() => {
    // Animate connections
    const connInterval = setInterval(() => {
      const conn = Math.floor(Math.random() * 6);
      setActiveConnections(prev => {
        const newConns = [...prev, conn];
        return newConns.slice(-3);
      });
    }, 800);
    
    // Animate uptime graph
    const uptimeInterval = setInterval(() => {
      setUptimeValue(prev => Math.min(prev + 5, 99.9));
    }, 200);
    
    return () => {
      clearInterval(connInterval);
      clearInterval(uptimeInterval);
    };
  }, []);

  const nodes = [
    { x: 20, y: 20, label: 'US-East' },
    { x: 80, y: 20, label: 'EU-West' },
    { x: 50, y: 50, label: 'Primary' },
    { x: 20, y: 80, label: 'US-West' },
    { x: 80, y: 80, label: 'APAC' },
  ];

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Network Diagram */}
      <div className="flex-1 bg-[#1a1a2e] rounded-lg border border-[hsl(var(--border))] relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {/* Connection lines */}
          {nodes.slice(0, -1).map((node, i) => (
            <motion.line
              key={i}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2="50%"
              y2="50%"
              stroke={activeConnections.includes(i) ? '#00E5FF' : '#333'}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          ))}
        </svg>
        
        {/* Server Nodes */}
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              i === 2 ? 'bg-[#FF6A00]/30 border border-[#FF6A00]' : 'bg-[#00E5FF]/20 border border-[#00E5FF]/50'
            }`}>
              <Database className="w-4 h-4 text-gray-400" />
            </div>
            <span className="text-[10px] text-gray-500 mt-1">{node.label}</span>
            
            {/* Data packet animation */}
            {activeConnections.includes(i) && (
              <motion.div
                className="absolute w-2 h-2 bg-[#00E5FF] rounded-full"
                initial={{ x: 0, y: 0 }}
                animate={{ 
                  x: (50 - node.x) * 2,
                  y: (50 - node.y) * 2
                }}
                transition={{ duration: 0.5 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Uptime Graph */}
      <div className="h-20 bg-[#0d0d1a] rounded-lg border border-[hsl(var(--border))] p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">Uptime</span>
          <span className="text-sm font-mono text-[#4CAF50]">{uptimeValue.toFixed(1)}%</span>
        </div>
        <div className="h-6 flex items-end gap-px">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-[#4CAF50]/60 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${Math.min(100, uptimeValue + Math.random() * 10)}%` }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// AI Integration Visual
const AIVisual = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const conversation = [
    { type: 'user', text: 'Analyze sales data' },
    { type: 'ai', text: 'Processing 10,000 records...' },
    { type: 'ai', text: 'Found 3 key insights!' },
  ];

  useEffect(() => {
    let msgIndex = 0;
    const addMessage = () => {
      if (msgIndex < conversation.length) {
        if (conversation[msgIndex].type === 'ai') {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, conversation[msgIndex]]);
            msgIndex++;
            setTimeout(addMessage, 1500);
          }, 1200);
        } else {
          setMessages(prev => [...prev, conversation[msgIndex]]);
          msgIndex++;
          setTimeout(addMessage, 1000);
        }
      }
    };
    
    setTimeout(addMessage, 500);
    
    return () => setMessages([]);
  }, []);

  return (
    <div className="h-full bg-[#1a1a2e] rounded-lg border border-[hsl(var(--border))] overflow-hidden flex flex-col">
      {/* Chat Header */}
      <div className="h-10 bg-[#0d0d1a] flex items-center px-4 gap-2">
        <Brain className="w-5 h-5 text-[#2196F3]" />
        <span className="text-sm font-medium">AI Assistant</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 bg-[#4CAF50] rounded-full animate-pulse" />
          <span className="text-xs text-gray-500">Online</span>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                msg.type === 'user' 
                  ? 'bg-[#FF6A00]/30 text-white' 
                  : 'bg-[#2196F3]/20 text-gray-300'
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="bg-[#2196F3]/20 px-3 py-2 rounded-lg flex items-center gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#2196F3] rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Processing Indicator */}
      <div className="h-12 bg-[#0d0d1a] flex items-center px-4">
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#2196F3] to-[#00E5FF]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 6, ease: 'linear' }}
          />
        </div>
        <Cpu className="w-4 h-4 text-[#2196F3] ml-3 animate-pulse" />
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
      {/* Service Selector Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <button
              key={service.id}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                activeIndex === index
                  ? 'border-[#FF6A00] bg-[#FF6A00]/10 text-white'
                  : 'border-[hsl(var(--border))] text-gray-400 hover:border-gray-500'
              }`}
            >
              <Icon className="w-4 h-4" style={{ color: activeIndex === index ? service.tagColor : undefined }} />
              <span className="text-sm font-medium hidden sm:inline">{service.title}</span>
            </button>
          );
        })}
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
            className="h-80 lg:h-96"
          >
            <VisualComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesShowcase;
