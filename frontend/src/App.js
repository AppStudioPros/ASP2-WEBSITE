import { motion } from 'framer-motion';
import { ArrowRight, Code2, Zap, Terminal, Video, Search, Flame, Shield, Target, Cpu } from 'lucide-react';
import { Button } from './components/ui/button';
import { HeroParticles } from './components/HeroParticles';
import { TruthBomb } from './components/TruthBomb';
import { FireAnimation } from './components/FireAnimation';
import { LiveBuildCounter } from './components/AnimatedCounter';
import { ActivityHeatmap } from './components/ActivityHeatmap';
import { CodePoetry } from './components/CodePoetry';
import { SEOAnalyzerEpic } from './components/SEOAnalyzerEpic';
import { LiveSessionShowcase } from './components/LiveSessionShowcase';
import { BudgetCalculator } from './components/BudgetCalculator';
import { AppVault } from './components/AppVault';
import { ProofSection } from './components/ProofSection';
import { AntiPitch } from './components/AntiPitch';
import { GlitchText, HUDFrame, ScanlineOverlay } from './components/GlitchText';
import { Toaster } from './components/ui/sonner';
import './App.css';

// ASP Logo Component
const ASPLogo = ({ className = '' }) => (
  <img 
    src="https://customer-assets.emergentagent.com/job_truthbomb/artifacts/s6r33gbn_AppStudioPro.png" 
    alt="App Studio Pro"
    className={`h-8 w-auto ${className}`}
    data-testid="asp-logo"
  />
);

function App() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] relative" data-testid="app-container">
      <Toaster position="top-right" />
      
      {/* Subtle scanline effect */}
      <ScanlineOverlay />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-md">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2" data-testid="nav-logo">
              <ASPLogo />
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-xs text-[hsl(var(--muted-foreground))] font-mono">
                <span className="text-[#4CAF50]">●</span> Systems Online
              </span>
              <Button 
                variant="outline" 
                size="sm"
                className="border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-colors duration-200 font-mono"
                data-testid="nav-cta-button"
              >
                Initialize Build
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO Section - The Confident Opener */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
        data-testid="hero-section"
      >
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(0,229,255,0.12),rgba(0,0,0,0)_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[conic-gradient(from_200deg_at_70%_30%,rgba(255,106,0,0.08),rgba(0,0,0,0)_40%)] pointer-events-none" />
        
        {/* Particles */}
        <HeroParticles />
        
        {/* Content */}
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <div className="max-w-4xl">
            {/* Terminal Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-6 font-mono"
              data-testid="hero-badge"
            >
              <Terminal className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm text-[#00E5FF]">~/app-studio-pro</span>
              <span className="text-sm text-[hsl(var(--muted-foreground))]">$ init_reality_check</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
              data-testid="hero-headline"
            >
              <span className="text-[hsl(var(--muted-foreground))]">The future was yesterday.</span>
              <br />
              <GlitchText className="gradient-text-brand">Where were you?</GlitchText>
            </motion.h1>

            {/* Sub-taglines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2 mb-8"
            >
              <p className="text-lg sm:text-xl text-[hsl(var(--foreground))]">
                We don't do <span className="text-[hsl(var(--muted-foreground))] line-through">magic</span>. 
                <span className="text-[#00E5FF]"> We do engineering.</span>
              </p>
              <p className="text-base text-[hsl(var(--muted-foreground))] max-w-2xl">
                The only limit is your imagination. Everything else—the code, the scale, 
                the complexity—<strong className="text-[#FF6A00]">we handle.</strong>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold px-8 h-12 text-base transition-all duration-200"
                data-testid="hero-primary-cta"
              >
                <Flame className="w-5 h-5 mr-2" /> Start Building
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] px-8 h-12 text-base transition-colors duration-200 font-mono"
                data-testid="hero-secondary-cta"
              >
                <Code2 className="w-5 h-5 mr-2" /> View Source
              </Button>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-[hsl(var(--border))]"
              data-testid="hero-stats"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-[#00E5FF] font-mono">247+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Apps<br/>Shipped</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-[#FF6A00] font-mono">0</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">No-Code<br/>Excuses</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-[#4CAF50] font-mono">100%</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Code<br/>Ownership</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-[hsl(var(--muted-foreground))] font-mono">scroll_down()</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-[hsl(var(--border))] flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* AI Website Scanner Section - Prominently placed under hero */}
      <section 
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
        data-testid="seo-analyzer-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,229,255,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-6 font-mono">
              <Search className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm text-[#00E5FF]">FREE_TOOL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <GlitchText className="gradient-text-brand">AI Website Scanner</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
              See what our AI sees. Watch the analysis happen in real-time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <SEOAnalyzerEpic />
          </motion.div>
        </div>
      </section>

      {/* Truth Bomb Section */}
      <TruthBomb />

      {/* Budget Calculator Section */}
      <section 
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
        data-testid="budget-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,229,255,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Message */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] mb-6">
                <Target className="w-4 h-4 text-[#FF6A00]" />
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Transparent Pricing</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Your Budget <GlitchText className="text-[#4CAF50]">Works</GlitchText>
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] mb-6">
                From MVP to enterprise. From $5K to $500K+. We flex to fit your reality, 
                not the other way around.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-[#00E5FF]" />
                  <span className="text-[hsl(var(--foreground))]">No hidden costs. No surprise invoices.</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Cpu className="w-5 h-5 text-[#FF6A00]" />
                  <span className="text-[hsl(var(--foreground))]">Same quality engineering at every level.</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Calculator */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <BudgetCalculator />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Theater Section */}
      <section 
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
        data-testid="tech-theater-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(33,150,243,0.08),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-6 font-mono">
              <Terminal className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm text-[#00E5FF]">LIVE_DASHBOARD</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <GlitchText className="gradient-text-brand">Tech Theater</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
              Real engineering. Real-time. No smoke, no mirrors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <LiveBuildCounter baseValue={247} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <ActivityHeatmap weeks={12} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <CodePoetry />
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Vault Section */}
      <section 
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
        data-testid="app-vault-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.04),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <AppVault />
        </div>
      </section>

      {/* Proof Section */}
      <section 
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
        data-testid="proof-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,175,80,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-6 font-mono">
              <Shield className="w-4 h-4 text-[#4CAF50]" />
              <span className="text-sm text-[#4CAF50]">VERIFIED_RESULTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Proof, Not <GlitchText className="text-[#FF6A00]">Promises</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
              Real numbers. Real clients. Real results.
            </p>
          </motion.div>

          <ProofSection />
        </div>
      </section>

      {/* Live Sessions Section */}
      <section 
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
        data-testid="live-sessions-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.04),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-6 font-mono">
              <Video className="w-4 h-4 text-[#FF6A00]" />
              <span className="text-sm text-[#FF6A00]">LIVE_SESSIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Built <GlitchText className="text-[#FF6A00]">WITH</GlitchText> You
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
              Watch us build real projects with real clients. No scripts, no edits.
            </p>
          </motion.div>

          <LiveSessionShowcase />
        </div>
      </section>

      {/* Anti-Pitch Section */}
      <section 
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
        data-testid="anti-pitch-section"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,229,255,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              The <GlitchText className="text-[#FF6A00]">Honest</GlitchText> Truth
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
              We're not going to tell you what you want to hear. 
              We're going to tell you what you need to know.
            </p>
          </motion.div>

          <AntiPitch />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The only limit is your <GlitchText className="gradient-text-brand">imagination</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-xl mx-auto">
              Everything else? We've got it covered.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] text-black hover:from-[#FF8C00] hover:to-[#FFA500] font-semibold px-12 h-14 text-lg"
            >
              <Flame className="w-6 h-6 mr-2" /> Let's Build Something Epic
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ASPLogo className="h-6" />
              <span className="text-sm text-[hsl(var(--muted-foreground))] font-mono">
                © 2025
              </span>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
              <span className="text-[#4CAF50]">status:</span> operational | 
              <span className="text-[#00E5FF]"> uptime:</span> 99.9%
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
