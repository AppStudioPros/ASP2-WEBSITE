import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Loader2, CheckCircle, AlertTriangle, TrendingUp, Globe, Zap, Eye, Shield,
  Smartphone, Monitor, Clock, Users, DollarSign, Rocket, Bot, Cloud, Lock, Sparkles,
  ArrowRight, ExternalLink, ChevronRight, Cpu, Wifi, Database, Code2, Gauge,
  AlertCircle, CheckCircle2, XCircle, Info, Star, TrendingDown, Activity, X,
  Brain, MessageSquare, Target, Lightbulb, HelpCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

// AI Thinking questions - what the AI "asks itself"
const aiThinkingQuestions = [
  { phase: 'init', questions: [
    "Initializing quantum analysis protocols...",
    "What's the real story behind this website?",
  ]},
  { phase: 'connect', questions: [
    "Establishing secure neural link...",
    "Let me bypass the marketing fluff...",
  ]},
  { phase: 'crawl', questions: [
    "Deploying intelligent crawlers...",
    "What are their competitors doing better?",
    "Searching industry leaders for comparison...",
  ]},
  { phase: 'capture', questions: [
    "Capturing visual fingerprint...",
    "How does this look on mobile? Let me check...",
    "What's the first impression a user gets?",
  ]},
  { phase: 'analyze', questions: [
    "Running deep structure analysis...",
    "What's actually converting visitors here?",
    "Where are users dropping off?",
  ]},
  { phase: 'security', questions: [
    "Probing security layers...",
    "Are they protecting customer data properly?",
    "What vulnerabilities exist?",
  ]},
  { phase: 'performance', questions: [
    "Measuring real-world performance...",
    "How fast does this REALLY load?",
    "What's eating up bandwidth?",
  ]},
  { phase: 'ai', questions: [
    "Neural network synthesizing insights...",
    "What would make this 10x better?",
    "What tech are they missing out on?",
  ]},
  { phase: 'recommend', questions: [
    "Generating actionable recommendations...",
    "What's the highest ROI fix?",
    "How can App Studio Pro transform this?",
  ]},
  { phase: 'complete', questions: [
    "Analysis complete! Here's the truth...",
  ]},
];

// Scanning phases with dramatic effects - 50% SLOWER for realism
const scanPhases = [
  { id: 'init', text: 'Initializing quantum scanners...', duration: 1800 },
  { id: 'connect', text: 'Establishing secure connection...', duration: 1500 },
  { id: 'crawl', text: 'Deploying web crawlers...', duration: 2250 },
  { id: 'capture', text: 'Capturing visual snapshots...', duration: 3000 },
  { id: 'analyze', text: 'AI analyzing page structure...', duration: 3000 },
  { id: 'security', text: 'Running security scan...', duration: 1800 },
  { id: 'performance', text: 'Measuring performance metrics...', duration: 2250 },
  { id: 'ai', text: 'Neural network processing...', duration: 3000 },
  { id: 'recommend', text: 'Generating recommendations...', duration: 1800 },
  { id: 'complete', text: 'Analysis complete!', duration: 750 },
];

// Generate REAL screenshot URLs using free screenshot API
const getScreenshotUrl = (url, width = 600, height = 400) => {
  // Using thum.io - free screenshot service, no API key needed
  const encodedUrl = encodeURIComponent(url);
  return `https://image.thum.io/get/width/${width}/crop/${height}/noanimate/${encodedUrl}`;
};

// Screenshot configurations for different views
const screenshotConfigs = [
  { id: 'hero', label: 'Homepage', position: 'desktop', width: 600, height: 400 },
  { id: 'mobile', label: 'Mobile', position: 'mobile', width: 375, height: 667 },
  { id: 'scroll', label: 'Full Page', position: 'desktop', width: 600, height: 400 },
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
  { severity: 'critical', text: 'No HTTPS redirect configured', impact: 'Security risk', detail: 'Your site allows HTTP connections which can be intercepted. All modern sites should force HTTPS to protect user data and improve SEO rankings.' },
  { severity: 'high', text: 'Images not optimized (2.3MB total)', impact: '-40% speed', detail: 'Large uncompressed images are slowing your page load. We recommend WebP format, lazy loading, and proper sizing for each breakpoint.' },
  { severity: 'high', text: 'Missing meta descriptions on 5 pages', impact: '-15% SEO', detail: 'Search engines use meta descriptions in results. Missing ones hurt click-through rates and search rankings.' },
  { severity: 'medium', text: 'No structured data markup', impact: 'Missing rich snippets', detail: 'JSON-LD schema helps Google understand your content and display rich results like ratings, prices, and FAQs.' },
  { severity: 'low', text: 'Console errors detected', impact: 'Poor UX', detail: 'JavaScript errors can break functionality and hurt user experience. Clean code = professional impression.' },
];

// Opportunities with detailed info
const opportunities = [
  { 
    icon: Bot, 
    title: 'AI Chat Integration', 
    description: 'GPT-powered support could handle 40% of inquiries automatically',
    impact: '+23% conversions',
    color: '#00E5FF',
    fullDetail: {
      problem: "Your visitors have questions but no immediate way to get answers. They leave.",
      solution: "We build custom AI chatbots that understand YOUR business, not generic templates. Our agents learn from your data, speak your brand voice, and actually solve problems.",
      howWeHelp: [
        "Custom-trained on your products/services",
        "Seamless handoff to human agents",
        "24/7 availability in any timezone",
        "Lead qualification on autopilot"
      ],
      techStack: "GPT-4 Turbo + Custom RAG Pipeline + Real-time WebSockets",
      timeline: "2-3 weeks to production"
    }
  },
  { 
    icon: Zap, 
    title: 'Edge Computing', 
    description: 'Move to Vercel/Cloudflare for global edge deployment',
    impact: '2x faster loads',
    color: '#FF6A00',
    fullDetail: {
      problem: "Your server is in one location. Users across the globe experience latency.",
      solution: "We migrate your app to edge networks, putting your code within 50ms of every user worldwide. Static assets cached globally, dynamic content rendered at the edge.",
      howWeHelp: [
        "Zero-downtime migration",
        "Global CDN configuration",
        "Edge-side rendering setup",
        "Automatic failover & scaling"
      ],
      techStack: "Cloudflare Workers + Vercel Edge + Smart Caching",
      timeline: "1-2 weeks to deploy"
    }
  },
  { 
    icon: Lock, 
    title: 'Zero-Trust Security', 
    description: 'Latest auth patterns with biometric & passkey support',
    impact: '99.9% secure',
    color: '#4CAF50',
    fullDetail: {
      problem: "Passwords are vulnerable. Your users deserve better protection.",
      solution: "We implement passwordless authentication with biometrics, passkeys, and magic links. Plus enterprise-grade security with rate limiting, bot protection, and anomaly detection.",
      howWeHelp: [
        "Passkey/WebAuthn implementation",
        "Multi-factor authentication",
        "Session management & device trust",
        "Security audit & penetration testing"
      ],
      techStack: "WebAuthn API + Hardware Security Keys + JWT Rotation",
      timeline: "2-4 weeks depending on scope"
    }
  },
  { 
    icon: Smartphone, 
    title: 'PWA Upgrade', 
    description: 'Make your site installable like a native app',
    impact: '+35% engagement',
    color: '#2196F3',
    fullDetail: {
      problem: "Users have to open a browser, type your URL, wait for load. Friction kills engagement.",
      solution: "We transform your website into a Progressive Web App. One-tap install, offline support, push notifications, and app-like experience without app store approval.",
      howWeHelp: [
        "Service worker implementation",
        "Offline-first architecture",
        "Push notification system",
        "App manifest & install prompts"
      ],
      techStack: "Service Workers + Cache API + Web Push Protocol",
      timeline: "1-2 weeks to launch"
    }
  },
];

// AI Generated Vision Samples
const visionSamples = [
  {
    id: 1,
    title: "Modern Dark Theme",
    description: "Sleek, professional dark mode with your brand colors",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&q=80",
    improvements: ["40% better readability", "Reduced eye strain", "Premium feel"]
  },
  {
    id: 2,
    title: "Conversion-Optimized Hero",
    description: "Clear value prop with strong CTA placement",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
    improvements: ["3x larger CTA button", "Social proof badges", "Trust indicators"]
  },
  {
    id: 3,
    title: "Mobile-First Redesign",
    description: "Thumb-friendly navigation, fast-loading components",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&q=80",
    improvements: ["50% faster mobile load", "Touch-optimized UI", "Sticky CTAs"]
  }
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

// AI Thinking Bubble
const AIThinkingBubble = ({ question }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: 0.9 }}
    className="flex items-start gap-2 bg-black/60 border border-[#00E5FF]/30 rounded-lg px-3 py-2 max-w-md"
  >
    <Brain className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
    <span className="text-sm text-[#00E5FF] italic">{question}</span>
  </motion.div>
);

// Score Card Component
const ScoreCard = ({ score, label, color, icon: Icon, description }) => {
  const getGrade = (score) => {
    if (score >= 90) return { grade: 'A', text: 'Excellent' };
    if (score >= 80) return { grade: 'B', text: 'Good' };
    if (score >= 70) return { grade: 'C', text: 'Average' };
    if (score >= 60) return { grade: 'D', text: 'Needs Work' };
    return { grade: 'F', text: 'Critical' };
  };
  
  const { grade, text } = getGrade(score);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-black/30 border border-[hsl(var(--border))] hover:border-[#00E5FF]/50 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" style={{ color }} />
          <span className="font-medium text-[hsl(var(--foreground))]">{label}</span>
        </div>
        <div 
          className="px-2 py-0.5 rounded text-xs font-bold"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {grade}
        </div>
      </div>
      
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-4xl font-bold font-mono" style={{ color }}>{score}</span>
        <span className="text-sm text-[hsl(var(--muted-foreground))]">/100</span>
      </div>
      
      <div className="h-2 rounded-full bg-[hsl(var(--border))] overflow-hidden mb-2">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>
      
      <p className="text-xs text-[hsl(var(--muted-foreground))]">{text} - {description}</p>
    </motion.div>
  );
};

// Screenshot Window Component - REAL SCREENSHOTS
const ScreenshotWindow = ({ config, url, isLoaded, delay = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Generate real screenshot URL
  const screenshotUrl = url ? getScreenshotUrl(url, config.width, config.height) : '';
  
  useEffect(() => {
    if (isLoaded && url) {
      const timer = setTimeout(() => {
        // Pre-load image
        const img = new Image();
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageError(true);
        img.src = screenshotUrl;
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, delay, screenshotUrl, url]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay / 1000 }}
      className={`relative rounded-lg overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] ${
        config.position === 'mobile' ? 'w-16 flex-shrink-0' : 'flex-1'
      }`}
    >
      {/* Window header */}
      <div className="flex items-center gap-1 px-2 py-1 bg-black/60 border-b border-[hsl(var(--border))]">
        <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
        <span className="text-[8px] text-[hsl(var(--muted-foreground))] ml-1 truncate">
          {config.label}
        </span>
      </div>
      
      {/* Content */}
      <div className={`relative bg-gray-900 ${config.position === 'mobile' ? 'h-28' : 'h-24'}`}>
        {!imageLoaded && !imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <motion.div
              className="w-5 h-5 border-2 border-[#00E5FF] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-[8px] text-[hsl(var(--muted-foreground))] mt-1">Loading...</span>
          </div>
        ) : imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="text-[8px] text-[hsl(var(--muted-foreground))]">Preview unavailable</span>
          </div>
        ) : (
          <>
            <img
              src={screenshotUrl}
              alt={config.label}
              className="w-full h-full object-cover object-top"
            />
            {/* Scan overlay animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-[#00E5FF]/30 to-transparent"
              initial={{ y: '-100%' }}
              animate={{ y: '200%' }}
              transition={{ duration: 1.5, repeat: 2 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-1 right-1 px-1 py-0.5 rounded bg-[#00E5FF] text-black text-[6px] font-bold"
            >
              LIVE ✓
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

// Opportunity Modal
const OpportunityModal = ({ opportunity, isOpen, onClose }) => {
  if (!opportunity) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[hsl(var(--card))] border-[hsl(var(--border))]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${opportunity.color}20` }}
            >
              <opportunity.icon className="w-6 h-6" style={{ color: opportunity.color }} />
            </div>
            <div>
              <DialogTitle className="text-xl">{opportunity.title}</DialogTitle>
              <DialogDescription className="text-sm" style={{ color: opportunity.color }}>
                Potential Impact: {opportunity.impact}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* Problem */}
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> The Problem
            </h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {opportunity.fullDetail.problem}
            </p>
          </div>
          
          {/* Solution */}
          <div className="p-4 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20">
            <h4 className="font-semibold text-[#00E5FF] mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" /> Our Solution
            </h4>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {opportunity.fullDetail.solution}
            </p>
          </div>
          
          {/* How We Help */}
          <div>
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-[#FF6A00]" /> How App Studio Pro Delivers
            </h4>
            <ul className="space-y-2">
              {opportunity.fullDetail.howWeHelp.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tech & Timeline */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))]">
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Tech Stack</div>
              <div className="text-sm font-mono text-[#00E5FF]">{opportunity.fullDetail.techStack}</div>
            </div>
            <div className="p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))]">
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-1">Timeline</div>
              <div className="text-sm font-mono text-[#FF6A00]">{opportunity.fullDetail.timeline}</div>
            </div>
          </div>
          
          {/* CTA */}
          <Button className="w-full h-12 bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black font-semibold">
            <Rocket className="w-4 h-4 mr-2" /> Get This Built
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Vision Modal
const VisionModal = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl bg-[hsl(var(--card))] border-[hsl(var(--border))] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#00E5FF]" />
          AI-Generated Vision Samples
        </DialogTitle>
        <DialogDescription>
          These are initial concepts generated by our AI. Our real engineers will fine-tune every detail to match your brand perfectly.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {visionSamples.map((sample, i) => (
          <motion.div
            key={sample.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-black/20 hover:border-[#00E5FF]/50 transition-all group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={sample.image}
                alt={sample.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <span className="px-2 py-0.5 rounded bg-[#00E5FF] text-black text-xs font-bold">
                  Sample {sample.id}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-[hsl(var(--foreground))] mb-1">{sample.title}</h4>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{sample.description}</p>
              <div className="space-y-1">
                {sample.improvements.map((imp, j) => (
                  <div key={j} className="flex items-center gap-2 text-xs text-[#4CAF50]">
                    <CheckCircle2 className="w-3 h-3" />
                    {imp}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-xl bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-center">
        <p className="text-sm text-[hsl(var(--foreground))] mb-3">
          <strong>Ready to see YOUR site transformed?</strong> Our engineers will create a custom vision based on your brand, goals, and users.
        </p>
        <Button className="bg-[#FF6A00] text-black hover:bg-[#FF8C00] font-semibold">
          <MessageSquare className="w-4 h-4 mr-2" /> Request Custom Vision - Free
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);

// Revenue Calculator with Range
const RevenueCalculator = ({ issues }) => {
  const lostPercentage = issues.reduce((acc, issue) => {
    if (issue.severity === 'critical') return acc + 15;
    if (issue.severity === 'high') return acc + 8;
    if (issue.severity === 'medium') return acc + 3;
    return acc + 1;
  }, 0);
  
  const lowEstimate = Math.round(30000 * (lostPercentage / 100) * 12);
  const highEstimate = Math.round(80000 * (lostPercentage / 100) * 12);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-xl bg-gradient-to-r from-[#00E5FF]/10 to-[#2196F3]/10 border border-[#00E5FF]/30"
    >
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-5 h-5 text-[#00E5FF]" />
        <span className="font-semibold text-[hsl(var(--foreground))]">Potential Revenue Impact</span>
      </div>
      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
        Based on industry benchmarks, fixing these issues could <em>potentially</em> recover:
      </p>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-2xl font-bold text-[#00E5FF] font-mono">
          ${lowEstimate.toLocaleString()}
        </span>
        <span className="text-lg text-[hsl(var(--muted-foreground))]">to</span>
        <span className="text-2xl font-bold text-[#4CAF50] font-mono">
          ${highEstimate.toLocaleString()}
        </span>
        <span className="text-sm text-[hsl(var(--muted-foreground))]">/year*</span>
      </div>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-2 italic">
        *Estimates vary based on your traffic, industry, and conversion rates. We'll provide precise projections during consultation.
      </p>
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
  const [screenshotsLoaded, setScreenshotsLoaded] = useState(false);
  const [currentThought, setCurrentThought] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showVisionModal, setShowVisionModal] = useState(false);
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
    setScreenshotsLoaded(false);
    setCurrentThought('');

    for (let i = 0; i < scanPhases.length; i++) {
      setCurrentPhase(i);
      const phase = scanPhases[i];
      
      // Add main log
      setLogs(prev => [...prev, {
        time: new Date().toLocaleTimeString(),
        text: phase.text,
        type: i === scanPhases.length - 1 ? 'success' : 'info'
      }]);

      // Show AI thinking questions for this phase
      const phaseQuestions = aiThinkingQuestions.find(q => q.phase === phase.id)?.questions || [];
      for (let q = 0; q < phaseQuestions.length; q++) {
        setCurrentThought(phaseQuestions[q]);
        await new Promise(r => setTimeout(r, phase.duration / (phaseQuestions.length + 1)));
        
        // Add some questions to the log
        if (q > 0 && phaseQuestions[q].includes('?')) {
          setLogs(prev => [...prev, {
            time: new Date().toLocaleTimeString(),
            text: `🧠 ${phaseQuestions[q]}`,
            type: 'thought'
          }]);
        }
      }

      // Update progress
      const targetProgress = ((i + 1) / scanPhases.length) * 100;
      setScanProgress(targetProgress);

      // Load screenshots during capture phase
      if (phase.id === 'capture') {
        await new Promise(r => setTimeout(r, 500));
        setScreenshotsLoaded(true);
        setLogs(prev => [...prev, {
          time: new Date().toLocaleTimeString(),
          text: '→ Captured 3 viewport snapshots',
          type: 'detail'
        }]);
      }

      await new Promise(r => setTimeout(r, 200));
    }

    setCurrentThought('');
    await new Promise(r => setTimeout(r, 500));
    setIsScanning(false);
    setShowResults(true);
  };

  const reset = () => {
    setUrl('');
    setShowResults(false);
    setScanProgress(0);
    setLogs([]);
    setScreenshotsLoaded(false);
  };

  return (
    <div className={`relative ${className}`} data-testid="seo-analyzer-epic">
      {/* Opportunity Modal */}
      <OpportunityModal 
        opportunity={selectedOpportunity} 
        isOpen={!!selectedOpportunity} 
        onClose={() => setSelectedOpportunity(null)} 
      />
      
      {/* Vision Modal */}
      <VisionModal isOpen={showVisionModal} onClose={() => setShowVisionModal(false)} />

      {/* Main Container */}
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[hsl(var(--border))] bg-black/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00E5FF] to-[#2196F3] flex items-center justify-center">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">AI Website Scanner</h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))]\">Neural network deep analysis</p>
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
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
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
              <div className="relative h-56 overflow-hidden bg-black/40">
                <NeuralNetwork active={currentPhase >= 7} />
                <MatrixRain active={currentPhase >= 3 && currentPhase < 8} />
                <RadarSweep active={currentPhase >= 1 && currentPhase < 5} />
                
                {/* Center Status */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
                  <motion.div
                    className="w-16 h-16 mb-3 rounded-full border-4 border-[#00E5FF]/30 flex items-center justify-center"
                    animate={{ 
                      borderColor: ['rgba(0,229,255,0.3)', 'rgba(0,229,255,0.8)', 'rgba(0,229,255,0.3)'],
                      boxShadow: ['0 0 20px rgba(0,229,255,0)', '0 0 40px rgba(0,229,255,0.5)', '0 0 20px rgba(0,229,255,0)']
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="text-xl font-bold text-[#00E5FF] font-mono">
                      {Math.round(scanProgress)}%
                    </span>
                  </motion.div>
                  
                  {/* AI Thinking Bubble */}
                  <AnimatePresence mode="wait">
                    {currentThought && (
                      <AIThinkingBubble key={currentThought} question={currentThought} />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Screenshots Row */}
              <div className="p-3 border-t border-[hsl(var(--border))] bg-black/20">
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Site Captures:</p>
                <div className="flex gap-2">
                  {screenshotConfigs.map((config, i) => (
                    <ScreenshotWindow
                      key={config.id}
                      config={config}
                      url={url}
                      isLoaded={screenshotsLoaded}
                      delay={i * 400}
                    />
                  ))}
                </div>
              </div>

              {/* Console Log */}
              <div
                ref={logRef}
                className="h-28 overflow-auto bg-black/60 p-3 font-mono text-[11px] border-t border-[hsl(var(--border))]"
              >
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 ${
                      log.type === 'success' ? 'text-[#4CAF50]' :
                      log.type === 'detail' ? 'text-[hsl(var(--muted-foreground))]' :
                      log.type === 'thought' ? 'text-[#FF6A00] italic' :
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
                  <Monitor className="w-4 h-4" /> Site Captures
                </h4>
                <div className="flex gap-2">
                  {screenshotConfigs.map((config, i) => (
                    <ScreenshotWindow
                      key={config.id}
                      config={config}
                      url={url}
                      isLoaded={true}
                      delay={0}
                    />
                  ))}
                </div>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <ScoreCard score={78} label="Overall" color="#00E5FF" icon={Gauge} description="Room for improvement" />
                <ScoreCard score={82} label="SEO" color="#4CAF50" icon={Search} description="Meta tags present" />
                <ScoreCard score={65} label="Speed" color="#FF6A00" icon={Zap} description="Needs optimization" />
                <ScoreCard score={91} label="Security" color="#2196F3" icon={Shield} description="SSL configured" />
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Detected:</span>
                {detectedTech.map((tech) => (
                  <div
                    key={tech.name}
                    className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                      tech.status === 'good' ? 'bg-[#4CAF50]/20 text-[#4CAF50]' :
                      'bg-[#FF6A00]/20 text-[#FF6A00]'
                    }`}
                  >
                    <span>{tech.icon}</span>
                    {tech.name}
                  </div>
                ))}
              </div>

              {/* REORDERED: Opportunities FIRST */}
              <div>
                <h4 className="text-sm font-medium text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-[#00E5FF]" /> Upgrade Opportunities
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">- Click for details</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {opportunities.map((opp, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => setSelectedOpportunity(opp)}
                      className="p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))] hover:border-[#00E5FF]/50 transition-all cursor-pointer group text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div 
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${opp.color}20` }}
                        >
                          <opp.icon className="w-4 h-4" style={{ color: opp.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <h5 className="font-medium text-sm text-[hsl(var(--foreground))]">{opp.title}</h5>
                            <span className="text-xs font-bold" style={{ color: opp.color }}>{opp.impact}</span>
                          </div>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2">{opp.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] group-hover:text-[#00E5FF] transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Issues Found - NOW SECOND */}
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
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="flex items-start justify-between p-3 rounded-lg bg-black/20 border border-[hsl(var(--border))] group hover:border-[hsl(var(--border))]/80"
                    >
                      <div className="flex items-start gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase flex-shrink-0 ${
                          issue.severity === 'critical' ? 'bg-red-500 text-white' :
                          issue.severity === 'high' ? 'bg-[#FF6A00] text-black' :
                          issue.severity === 'medium' ? 'bg-yellow-500 text-black' :
                          'bg-blue-500 text-white'
                        }`}>
                          {issue.severity}
                        </span>
                        <div>
                          <span className="text-sm text-[hsl(var(--foreground))]">{issue.text}</span>
                          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 hidden group-hover:block">{issue.detail}</p>
                        </div>
                      </div>
                      <span className="text-xs text-[hsl(var(--muted-foreground))] flex-shrink-0">{issue.impact}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Revenue Calculator */}
              <RevenueCalculator issues={issuesFound} />

              {/* Social Proof */}
              <div className="flex items-center justify-center gap-6 py-3 border-t border-[hsl(var(--border))]">
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <Activity className="w-3 h-3 text-[#00E5FF]" />
                  <span><strong className="text-[hsl(var(--foreground))]">847</strong> sites scanned this month</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                  <Star className="w-3 h-3 text-[#FF6A00]" />
                  <span><strong className="text-[hsl(var(--foreground))]">4.9/5</strong> avg rating</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  onClick={() => setShowVisionModal(true)}
                  className="h-11 bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold text-sm"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  See AI Vision Samples
                </Button>
                <Button 
                  variant="outline"
                  className="h-11 border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black font-semibold text-sm"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Get Quote in 24hrs
                </Button>
              </div>

              {/* Scarcity */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center p-3 rounded-lg bg-[#FF6A00]/10 border border-[#FF6A00]/30"
              >
                <p className="text-xs text-[hsl(var(--foreground))]">
                  <span className="text-[#FF6A00] font-bold">⚡ Limited:</span> We take only <strong>3 new clients</strong> per month
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
