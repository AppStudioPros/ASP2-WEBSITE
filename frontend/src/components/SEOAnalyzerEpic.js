import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Loader2, CheckCircle, AlertTriangle, TrendingUp, Globe, Zap, Eye, Shield,
  Smartphone, Monitor, Clock, Users, DollarSign, Rocket, Bot, Cloud, Lock, Sparkles,
  ArrowRight, ExternalLink, ChevronRight, Cpu, Wifi, Database, Code2, Gauge,
  AlertCircle, CheckCircle2, XCircle, Info, Star, TrendingDown, Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Scanning phases with dramatic effects
const scanPhases = [
  { id: 'init', text: 'Initializing quantum scanners...', duration: 800 },
  { id: 'connect', text: 'Establishing secure connection...', duration: 600 },
  { id: 'crawl', text: 'Deploying web crawlers...', duration: 1000 },
  { id: 'capture', text: 'Capturing visual snapshots...', duration: 1200 },
  { id: 'analyze', text: 'AI analyzing page structure...', duration: 1500 },
  { id: 'security', text: 'Running security scan...', duration: 800 },
  { id: 'performance', text: 'Measuring performance metrics...', duration: 1000 },
  { id: 'ai', text: 'Neural network processing...', duration: 1200 },
  { id: 'recommend', text: 'Generating recommendations...', duration: 800 },
  { id: 'complete', text: 'Analysis complete!', duration: 500 },
];

// Mock screenshots (in real app, these would be captured)
const mockScreenshots = [
  { id: 'hero', label: 'Homepage Hero', position: 'top' },
  { id: 'mid', label: 'Mid Section', position: 'middle' },
  { id: 'mobile', label: 'Mobile View', position: 'mobile' },
];

// Tech stack detection
const detectedTech = [
  { name: 'React', icon: '⚛️', status: 'good' },
  { name: 'Node.js', icon: '🟢', status: 'good' },
  { name: 'MongoDB', icon: '🍃', status: 'warning' },
  { name: 'AWS', icon: '☁️', status: 'good' },
];

// Issues found
const issuesFound = [
  { severity: 'critical', text: 'No HTTPS redirect configured', impact: 'Security risk' },
  { severity: 'high', text: 'Images not optimized (2.3MB total)', impact: '-40% speed' },
  { severity: 'high', text: 'Missing meta descriptions on 5 pages', impact: '-15% SEO' },
  { severity: 'medium', text: 'No structured data markup', impact: 'Missing rich snippets' },
  { severity: 'low', text: 'Console errors detected', impact: 'Poor UX' },
];

// Opportunities / Latest Tech
const opportunities = [
  { 
    icon: Bot, 
    title: 'AI Chat Integration', 
    description: 'GPT-powered support could handle 40% of inquiries automatically',
    impact: '+23% conversions',
    color: '#00E5FF'
  },
  { 
    icon: Zap, 
    title: 'Edge Computing', 
    description: 'Move to Vercel/Cloudflare for global edge deployment',
    impact: '2x faster loads',
    color: '#FF6A00'
  },
  { 
    icon: Lock, 
    title: 'Zero-Trust Security', 
    description: 'Latest auth patterns with biometric & passkey support',
    impact: '99.9% secure',
    color: '#4CAF50'
  },
  { 
    icon: Smartphone, 
    title: 'PWA Upgrade', 
    description: 'Make your site installable like a native app',
    impact: '+35% engagement',
    color: '#2196F3'
  },
];

// Neural Network Animation
const NeuralNetwork = ({ active }) => {
  const nodes = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: 10 + (i % 5) * 20 + Math.random() * 10,
    y: 15 + Math.floor(i / 5) * 30 + Math.random() * 10,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
      {/* Connections */}
      {nodes.map((node, i) => 
        nodes.slice(i + 1).map((target, j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={node.x}
            y1={node.y}
            x2={target.x}
            y2={target.y}
            stroke="#00E5FF"
            strokeWidth="0.3"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: active ? [0, 0.5, 0] : 0,
            }}
            transition={{ 
              duration: 1 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))
      )}
      {/* Nodes */}
      {nodes.map((node) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r="1.5"
          fill="#00E5FF"
          initial={{ opacity: 0.3 }}
          animate={{ 
            opacity: active ? [0.3, 1, 0.3] : 0.3,
            scale: active ? [1, 1.5, 1] : 1,
          }}
          transition={{ 
            duration: 0.5 + Math.random(),
            repeat: Infinity,
            delay: Math.random()
          }}
        />
      ))}
    </svg>
  );
};

// Radar Sweep Animation
const RadarSweep = ({ active }) => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <motion.div
      className="absolute w-64 h-64 rounded-full border border-[#00E5FF]/20"
      animate={{ scale: active ? [1, 2, 1] : 1, opacity: active ? [0.5, 0, 0.5] : 0 }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.div
      className="absolute w-48 h-48 rounded-full border border-[#00E5FF]/30"
      animate={{ scale: active ? [1, 1.8, 1] : 1, opacity: active ? [0.6, 0, 0.6] : 0 }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />
    <motion.div
      className="absolute w-32 h-32 rounded-full border border-[#00E5FF]/40"
      animate={{ scale: active ? [1, 1.6, 1] : 1, opacity: active ? [0.7, 0, 0.7] : 0 }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
    />
    {/* Sweep line */}
    <motion.div
      className="absolute w-32 h-0.5 bg-gradient-to-r from-[#00E5FF] to-transparent origin-left"
      animate={{ rotate: active ? 360 : 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

// Matrix Rain Effect
const MatrixRain = ({ active }) => {
  const columns = 20;
  const chars = '01アイウエオカキクケコサシスセソタチツテト';
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#00E5FF] text-xs font-mono whitespace-pre leading-tight"
          style={{ left: `${(i / columns) * 100}%` }}
          initial={{ y: '-100%' }}
          animate={{ y: active ? '100%' : '-100%' }}
          transition={{ 
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear'
          }}
        >
          {Array.from({ length: 20 }).map(() => 
            chars[Math.floor(Math.random() * chars.length)]
          ).join('\n')}
        </motion.div>
      ))}
    </div>
  );
};

// Holographic Scan Line
const ScanLine = ({ active, progress }) => (
  <motion.div
    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
    style={{ 
      top: `${progress}%`,
      boxShadow: '0 0 20px #00E5FF, 0 0 40px #00E5FF',
    }}
    animate={{ 
      opacity: active ? [0.8, 1, 0.8] : 0,
    }}
    transition={{ duration: 0.5, repeat: Infinity }}
  />
);

// Speedometer Component
const Speedometer = ({ value, max = 100, label, color = '#00E5FF' }) => {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90;
  
  return (
    <div className="relative w-24 h-14">
      {/* Arc background */}
      <svg className="w-full h-full" viewBox="0 0 100 60">
        <path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke="hsl(210 10% 20%)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.path
          d="M 10 55 A 40 40 0 0 1 90 55"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage / 100 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      {/* Needle */}
      <motion.div
        className="absolute bottom-1 left-1/2 w-0.5 h-8 origin-bottom"
        style={{ backgroundColor: color }}
        initial={{ rotate: -90 }}
        animate={{ rotate: rotation }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      {/* Value */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
        <div className="text-lg font-bold font-mono" style={{ color }}>{value}</div>
        <div className="text-[10px] text-[hsl(var(--muted-foreground))]">{label}</div>
      </div>
    </div>
  );
};

// Screenshot Window Component
const ScreenshotWindow = ({ screenshot, url, isScanning, delay = 0 }) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    if (isScanning) {
      const timer = setTimeout(() => setLoaded(true), delay);
      return () => clearTimeout(timer);
    }
  }, [isScanning, delay]);

  // Generate a placeholder based on the URL
  const getPlaceholderImage = () => {
    if (screenshot.position === 'mobile') {
      return 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=500&fit=crop';
    }
    return `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay / 1000 }}
      className={`relative rounded-lg overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] ${
        screenshot.position === 'mobile' ? 'w-20' : 'flex-1'
      }`}
    >
      {/* Window header */}
      <div className="flex items-center gap-1.5 px-2 py-1.5 bg-black/40 border-b border-[hsl(var(--border))]">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="text-[9px] text-[hsl(var(--muted-foreground))] ml-2 truncate">
          {screenshot.label}
        </span>
      </div>
      
      {/* Content */}
      <div className={`relative bg-gray-900 ${screenshot.position === 'mobile' ? 'h-36' : 'h-28'}`}>
        {!loaded ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-6 h-6 border-2 border-[#00E5FF] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : (
          <>
            <img
              src={getPlaceholderImage()}
              alt={screenshot.label}
              className="w-full h-full object-cover opacity-80"
            />
            {/* Scan overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/20 to-transparent"
              initial={{ y: '-100%' }}
              animate={{ y: '100%' }}
              transition={{ duration: 1.5, repeat: 2 }}
            />
            {/* Captured badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#00E5FF] text-black text-[8px] font-bold"
            >
              CAPTURED
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Revenue Calculator
const RevenueCalculator = ({ issues }) => {
  const baseRevenue = 50000; // Monthly
  const lostPercentage = issues.reduce((acc, issue) => {
    if (issue.severity === 'critical') return acc + 15;
    if (issue.severity === 'high') return acc + 8;
    if (issue.severity === 'medium') return acc + 3;
    return acc + 1;
  }, 0);
  
  const potentialGain = Math.round(baseRevenue * (lostPercentage / 100) * 12);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-lg bg-gradient-to-r from-[#00E5FF]/10 to-[#2196F3]/10 border border-[#00E5FF]/30"
    >
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-5 h-5 text-[#00E5FF]" />
        <span className="font-semibold text-[hsl(var(--foreground))]">Revenue Impact Calculator</span>
      </div>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
        Based on our analysis, fixing these issues could recover:
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-[#00E5FF] font-mono">
          ${potentialGain.toLocaleString()}
        </span>
        <span className="text-sm text-[hsl(var(--muted-foreground))]">/year in lost revenue</span>
      </div>
    </motion.div>
  );
};

export const SEOAnalyzerEpic = ({ className = '' }) => {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [capturedScreenshots, setCapturedScreenshots] = useState([]);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const runScan = async () => {
    if (!url) return;
    
    setIsScanning(true);
    setShowResults(false);
    setCurrentPhase(0);
    setScanProgress(0);
    setLogs([]);
    setCapturedScreenshots([]);

    for (let i = 0; i < scanPhases.length; i++) {
      setCurrentPhase(i);
      const phase = scanPhases[i];
      
      // Add log
      setLogs(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        text: phase.text,
        type: i === scanPhases.length - 1 ? 'success' : 'info'
      }]);

      // Update progress
      const targetProgress = ((i + 1) / scanPhases.length) * 100;
      const steps = 10;
      for (let j = 0; j < steps; j++) {
        await new Promise(r => setTimeout(r, phase.duration / steps));
        setScanProgress(prev => Math.min(targetProgress, prev + (targetProgress - prev) / (steps - j)));
      }

      // Capture screenshots during capture phase
      if (phase.id === 'capture') {
        for (let s = 0; s < mockScreenshots.length; s++) {
          await new Promise(r => setTimeout(r, 300));
          setCapturedScreenshots(prev => [...prev, mockScreenshots[s]]);
          setLogs(prev => [...prev, {
            time: new Date().toLocaleTimeString(),
            text: `→ Captured: ${mockScreenshots[s].label}`,
            type: 'detail'
          }]);
        }
      }

      // Add sub-logs for certain phases
      if (phase.id === 'security') {
        await new Promise(r => setTimeout(r, 200));
        setLogs(prev => [...prev, {
          time: new Date().toLocaleTimeString(),
          text: '→ SSL Certificate: Valid until 2026',
          type: 'success'
        }]);
      }
      if (phase.id === 'ai') {
        await new Promise(r => setTimeout(r, 200));
        setLogs(prev => [...prev, {
          time: new Date().toLocaleTimeString(),
          text: '→ Processing 847 data points...',
          type: 'detail'
        }]);
      }
    }

    await new Promise(r => setTimeout(r, 500));
    setIsScanning(false);
    setShowResults(true);
  };

  const reset = () => {
    setUrl('');
    setShowResults(false);
    setScanProgress(0);
    setLogs([]);
    setCapturedScreenshots([]);
  };

  return (
    <div className={`relative ${className}`} data-testid="seo-analyzer-epic">
      {/* Main Container */}
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[hsl(var(--border))] bg-black/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#2196F3] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">AI Website Scanner</h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Powered by neural network analysis</p>
              </div>
            </div>
            {showResults && (
              <Button variant="ghost" size="sm" onClick={reset} className="text-[#00E5FF]">
                Scan Another
              </Button>
            )}
          </div>

          {/* Input */}
          {!showResults && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="pl-10 h-11 bg-black/30 border-[hsl(var(--border))] text-sm"
                  disabled={isScanning}
                  data-testid="epic-url-input"
                />
              </div>
              <Button
                onClick={runScan}
                disabled={!url || isScanning}
                className="h-11 px-6 bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold"
                data-testid="epic-scan-button"
              >
                {isScanning ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scanning...</>
                ) : (
                  <><Search className="w-4 h-4 mr-2" /> Deep Scan</>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Scanning State */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative"
            >
              {/* Animations Container */}
              <div className="relative h-64 overflow-hidden bg-black/40">
                <NeuralNetwork active={currentPhase >= 7} />
                <MatrixRain active={currentPhase >= 3 && currentPhase < 8} />
                <RadarSweep active={currentPhase >= 1 && currentPhase < 5} />
                <ScanLine active={currentPhase >= 2} progress={scanProgress} />
                
                {/* Center Status */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-center">
                    <motion.div
                      className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[#00E5FF]/30 flex items-center justify-center"
                      animate={{ 
                        borderColor: ['rgba(0,229,255,0.3)', 'rgba(0,229,255,0.8)', 'rgba(0,229,255,0.3)'],
                        boxShadow: ['0 0 20px rgba(0,229,255,0)', '0 0 40px rgba(0,229,255,0.5)', '0 0 20px rgba(0,229,255,0)']
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span className="text-2xl font-bold text-[#00E5FF] font-mono">
                        {Math.round(scanProgress)}%
                      </span>
                    </motion.div>
                    <motion.p
                      key={currentPhase}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-[#00E5FF]"
                    >
                      {scanPhases[currentPhase]?.text}
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Screenshots being captured */}
              {capturedScreenshots.length > 0 && (
                <div className="p-4 border-t border-[hsl(var(--border))] bg-black/20">
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">Captured Screenshots:</p>
                  <div className="flex gap-3">
                    {capturedScreenshots.map((ss, i) => (
                      <ScreenshotWindow
                        key={ss.id}
                        screenshot={ss}
                        url={url}
                        isScanning={true}
                        delay={i * 300}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Console Log */}
              <div
                ref={logRef}
                className="h-32 overflow-auto bg-black/60 p-3 font-mono text-xs border-t border-[hsl(var(--border))]"
              >
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 ${
                      log.type === 'success' ? 'text-[#4CAF50]' :
                      log.type === 'detail' ? 'text-[hsl(var(--muted-foreground))]' :
                      'text-[#00E5FF]'
                    }`}
                  >
                    <span className="opacity-50">[{log.time}]</span>
                    <span>{log.text}</span>
                  </motion.div>
                ))}
                <motion.span
                  className="inline-block w-2 h-3 bg-[#00E5FF] ml-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 sm:p-6 space-y-6"
            >
              {/* Screenshots Row */}
              <div>
                <h4 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3 flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Site Snapshots
                </h4>
                <div className="flex gap-3">
                  {mockScreenshots.map((ss, i) => (
                    <ScreenshotWindow
                      key={ss.id}
                      screenshot={ss}
                      url={url}
                      isScanning={false}
                      delay={0}
                    />
                  ))}
                </div>
              </div>

              {/* Scores Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))] text-center">
                  <Speedometer value={78} label="Overall" color="#00E5FF" />
                </div>
                <div className="p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))] text-center">
                  <Speedometer value={82} label="SEO" color="#4CAF50" />
                </div>
                <div className="p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))] text-center">
                  <Speedometer value={65} label="Speed" color="#FF6A00" />
                </div>
                <div className="p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))] text-center">
                  <Speedometer value={91} label="Security" color="#2196F3" />
                </div>
              </div>

              {/* Tech Stack Detected */}
              <div>
                <h4 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Technology Detected
                </h4>
                <div className="flex flex-wrap gap-2">
                  {detectedTech.map((tech) => (
                    <div
                      key={tech.name}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 ${
                        tech.status === 'good' ? 'bg-[#4CAF50]/20 text-[#4CAF50] border border-[#4CAF50]/30' :
                        'bg-[#FF6A00]/20 text-[#FF6A00] border border-[#FF6A00]/30'
                      }`}
                    >
                      <span>{tech.icon}</span>
                      {tech.name}
                      {tech.status === 'good' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Issues Found */}
              <div>
                <h4 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF6A00]" /> Issues Found ({issuesFound.length})
                </h4>
                <div className="space-y-2">
                  {issuesFound.map((issue, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))]"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          issue.severity === 'critical' ? 'bg-red-500 text-white' :
                          issue.severity === 'high' ? 'bg-[#FF6A00] text-black' :
                          issue.severity === 'medium' ? 'bg-yellow-500 text-black' :
                          'bg-blue-500 text-white'
                        }`}>
                          {issue.severity}
                        </span>
                        <span className="text-sm text-[hsl(var(--foreground))]">{issue.text}</span>
                      </div>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{issue.impact}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Opportunities - Latest Tech */}
              <div>
                <h4 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-[#00E5FF]" /> Upgrade Opportunities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {opportunities.map((opp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="p-4 rounded-lg bg-black/20 border border-[hsl(var(--border))] hover:border-[#00E5FF]/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${opp.color}20` }}
                        >
                          <opp.icon className="w-5 h-5" style={{ color: opp.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="font-medium text-sm text-[hsl(var(--foreground))]">{opp.title}</h5>
                            <span className="text-xs font-bold" style={{ color: opp.color }}>{opp.impact}</span>
                          </div>
                          <p className="text-xs text-[hsl(var(--muted-foreground))]">{opp.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Revenue Calculator */}
              <RevenueCalculator issues={issuesFound} />

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-6 py-4 border-t border-[hsl(var(--border))]">
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <Activity className="w-4 h-4 text-[#00E5FF]" />
                  <span><strong className="text-[hsl(var(--foreground))]">847</strong> sites scanned this month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <Star className="w-4 h-4 text-[#FF6A00]" />
                  <span><strong className="text-[hsl(var(--foreground))]">4.9/5</strong> avg rating</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  className="h-12 bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  See Our Redesign Vision
                </Button>
                <Button 
                  variant="outline"
                  className="h-12 border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black font-semibold"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Get Quote in 24hrs
                </Button>
              </div>

              {/* Scarcity CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center p-4 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/30"
              >
                <p className="text-sm text-[hsl(var(--foreground))]">
                  <span className="text-[#FF6A00] font-bold">⚡ Limited Availability:</span> We only take <strong>3 new clients</strong> per month.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SEOAnalyzerEpic;
