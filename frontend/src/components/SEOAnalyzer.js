import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, CheckCircle, AlertTriangle, TrendingUp, Globe, Zap, Eye, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

const analysisSteps = [
  { text: 'Initializing crawler...', icon: Globe },
  { text: 'Fetching page content...', icon: Search },
  { text: 'Analyzing SEO metadata...', icon: Eye },
  { text: 'Checking performance metrics...', icon: Zap },
  { text: 'Evaluating security headers...', icon: Shield },
  { text: 'Calculating scores...', icon: TrendingUp },
  { text: 'Generating recommendations...', icon: CheckCircle },
];

const mockResults = {
  overall: 78,
  scores: [
    { label: 'SEO', score: 82, color: '#00E5FF' },
    { label: 'Performance', score: 71, color: '#2196F3' },
    { label: 'Accessibility', score: 85, color: '#4CAF50' },
    { label: 'Security', score: 74, color: '#FF6A00' },
  ],
  issues: [
    { severity: 'high', text: 'Missing meta description on 3 pages' },
    { severity: 'medium', text: 'Images without alt text detected' },
    { severity: 'low', text: 'Consider adding structured data' },
  ],
  recommendations: [
    'Add unique meta descriptions to all pages',
    'Optimize images with lazy loading',
    'Implement Open Graph tags for social sharing',
    'Add JSON-LD structured data for rich snippets',
  ]
};

const CircularProgress = ({ value, size = 120, strokeWidth = 8, color = '#00E5FF' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(210 10% 16%)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-3xl font-bold font-mono"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {value}
        </motion.span>
      </div>
    </div>
  );
};

export const SEOAnalyzer = ({ className = '' }) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runAnalysis = async () => {
    if (!url) return;
    
    setIsAnalyzing(true);
    setProgress(0);
    setCurrentStep(0);
    setLogs([]);
    setResults(null);

    // Simulate analysis with dramatic effect
    for (let i = 0; i < analysisSteps.length; i++) {
      setCurrentStep(i);
      setLogs(prev => [...prev, { 
        time: new Date().toLocaleTimeString(), 
        text: analysisSteps[i].text,
        type: 'info'
      }]);
      
      // Simulate progress
      const targetProgress = ((i + 1) / analysisSteps.length) * 100;
      const steps = 10;
      for (let j = 0; j < steps; j++) {
        await new Promise(r => setTimeout(r, 80));
        setProgress(prev => Math.min(targetProgress, prev + (targetProgress - prev) / (steps - j)));
      }
      
      // Add some random sub-logs
      if (i === 1) {
        await new Promise(r => setTimeout(r, 200));
        setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: `→ Found ${Math.floor(Math.random() * 20 + 10)} pages to analyze`, type: 'detail' }]);
      }
      if (i === 2) {
        await new Promise(r => setTimeout(r, 200));
        setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: `→ Checking title tags, meta descriptions...`, type: 'detail' }]);
      }
      if (i === 4) {
        await new Promise(r => setTimeout(r, 200));
        setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: `→ SSL: Valid, HSTS: Enabled`, type: 'success' }]);
      }
      
      await new Promise(r => setTimeout(r, 300));
    }

    setLogs(prev => [...prev, { 
      time: new Date().toLocaleTimeString(), 
      text: '✓ Analysis complete!',
      type: 'success'
    }]);
    
    await new Promise(r => setTimeout(r, 500));
    setIsAnalyzing(false);
    setResults(mockResults);
  };

  const reset = () => {
    setUrl('');
    setResults(null);
    setProgress(0);
    setLogs([]);
  };

  return (
    <div className={`p-6 sm:p-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] ${className}`} data-testid="seo-analyzer">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-[hsl(var(--foreground))]">
            AI Website Analyzer
          </h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            Deep-dive analysis powered by our AI engine
          </p>
        </div>
        {results && (
          <Button variant="ghost" size="sm" onClick={reset}>
            Analyze Another
          </Button>
        )}
      </div>

      {!results ? (
        <>
          {/* Input Form */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="pl-10 h-12 bg-[hsl(var(--input))] border-[hsl(var(--border))] text-base"
                disabled={isAnalyzing}
                data-testid="seo-url-input"
              />
            </div>
            <Button
              onClick={runAnalysis}
              disabled={!url || isAnalyzing}
              className="h-12 px-6 bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold"
              data-testid="seo-run-button"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Loading State */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[hsl(var(--muted-foreground))]">
                      {analysisSteps[currentStep]?.text}
                    </span>
                    <span className="text-[#00E5FF] font-mono">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" data-testid="seo-progress" />
                </div>

                {/* Animated Dials */}
                <div className="flex items-center justify-center gap-8 py-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-16 h-16 rounded-full border-4 border-[hsl(var(--border))] flex items-center justify-center"
                      animate={{ 
                        borderColor: currentStep > i * 2 ? '#00E5FF' : 'hsl(210 10% 16%)',
                        scale: currentStep === i * 2 ? [1, 1.1, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {React.createElement(analysisSteps[Math.min(i * 2, analysisSteps.length - 1)].icon, {
                        className: `w-6 h-6 ${currentStep > i * 2 ? 'text-[#00E5FF]' : 'text-[hsl(var(--muted-foreground))]'}`
                      })}
                    </motion.div>
                  ))}
                </div>

                {/* Console Log */}
                <div
                  ref={logContainerRef}
                  className="h-40 overflow-auto bg-black/40 border border-[hsl(var(--border))] rounded-lg p-4 font-mono text-sm"
                  data-testid="seo-log-stream"
                >
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-2 ${
                        log.type === 'success' ? 'text-[hsl(var(--success))]' :
                        log.type === 'detail' ? 'text-[hsl(var(--muted-foreground))]' :
                        'text-[hsl(var(--foreground))]'
                      }`}
                    >
                      <span className="text-[hsl(var(--muted-foreground))] opacity-50">[{log.time}]</span>
                      <span>{log.text}</span>
                    </motion.div>
                  ))}
                  {isAnalyzing && (
                    <motion.span
                      className="inline-block w-2 h-4 bg-[#00E5FF] ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        /* Results */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overall Score */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-lg bg-black/20 border border-[hsl(var(--border))]">
            <CircularProgress value={results.overall} size={140} strokeWidth={10} />
            <div className="text-center sm:text-left">
              <h4 className="text-2xl font-bold text-[hsl(var(--foreground))]">Overall Score</h4>
              <p className="text-[hsl(var(--muted-foreground))] mt-1">
                Your website is performing above average. Here's how to improve.
              </p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {results.scores.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg border border-[hsl(var(--border))] bg-black/20"
              >
                <div className="text-sm text-[hsl(var(--muted-foreground))] mb-2">{item.label}</div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold font-mono" style={{ color: item.color }}>
                    {item.score}
                  </span>
                  <span className="text-[hsl(var(--muted-foreground))] text-sm mb-1">/100</span>
                </div>
                <div className="mt-2 h-1 rounded-full bg-[hsl(var(--border))] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Issues */}
          <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-black/20">
            <h4 className="font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#FF6A00]" />
              Issues Found
            </h4>
            <div className="space-y-2">
              {results.issues.map((issue, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    issue.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    issue.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {issue.severity}
                  </span>
                  <span className="text-[hsl(var(--foreground))]">{issue.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
              Want us to fix these issues and boost your score?
            </p>
            <Button className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold">
              Get a Free Consultation
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SEOAnalyzer;
