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
import { MissionSection } from './components/MissionSection';
import { ServicesPreview } from './components/ServicesPreview';
import { WorkSection } from './components/WorkSection';
import { CompanyAbout } from './components/CompanyAbout';
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
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                <a href="#home" className="text-[hsl(var(--foreground))] hover:text-[#00E5FF] transition-colors">
                  Home
                </a>
                <a href="#about" className="text-[hsl(var(--foreground))] hover:text-[#00E5FF] transition-colors">
                  About
                </a>
                <a href="#services" className="text-[hsl(var(--foreground))] hover:text-[#00E5FF] transition-colors">
                  Services
                </a>
                <a href="#blog" className="text-[hsl(var(--foreground))] hover:text-[#00E5FF] transition-colors">
                  Blog
                </a>
              </div>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold transition-all duration-200"
                data-testid="nav-cta-button"
              >
                Contact Us
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
              <span className="text-sm text-[hsl(var(--muted-foreground))]">$ engineering_excellence</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
              data-testid="hero-headline"
            >
              <span className="text-[hsl(var(--muted-foreground))]">The future isn't coming.</span>
              <br />
              <GlitchText className="gradient-text-brand">We're building it now.</GlitchText>
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
                the complexity—<strong className="text-[#FF6A00]">we got that.</strong>
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
                <Flame className="w-5 h-5 mr-2" /> Start Your Project
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] px-8 h-12 text-base transition-colors duration-200"
                data-testid="hero-secondary-cta"
              >
                <Code2 className="w-5 h-5 mr-2" /> View Portfolio
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
                <div className="text-3xl font-bold text-[#00E5FF] font-mono">35+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Years<br/>Experience</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-[#FF6A00] font-mono">2500+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Projects<br/>Delivered</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-[#4CAF50] font-mono">30+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Expert<br/>Engineers</div>
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

      {/* Mission & Video Section */}
      <MissionSection />

      {/* Services Preview Section */}
      <ServicesPreview />

      {/* Work/Portfolio Section */}
      <WorkSection />

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

      {/* Team Section */}
      <TeamSection />

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
      <footer className="py-12 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]/30">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <ASPLogo className="h-8 mb-4" />
              <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 max-w-sm">
                Transforming ideas into digital solutions. 35+ years of excellence in web development, 
                app creation, and AI innovation.
              </p>
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.linkedin.com/in/appstudiopro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a 
                  href="https://www.instagram.com/appstudiopro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=100090446731786" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a 
                  href="https://x.com/AppStudioPro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a 
                  href="https://youtube.com/@appstudioproofficial" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--muted-foreground))] hover:text-[#00E5FF] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4 text-[hsl(var(--foreground))]">Quick Links</h3>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><a href="#home" className="hover:text-[#00E5FF] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#00E5FF] transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-[#00E5FF] transition-colors">Services</a></li>
                <li><a href="#work" className="hover:text-[#00E5FF] transition-colors">Our Work</a></li>
                <li><a href="#blog" className="hover:text-[#00E5FF] transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4 text-[hsl(var(--foreground))]">Contact</h3>
              <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
                <li><a href="tel:720-276-0797" className="hover:text-[#00E5FF] transition-colors">720-276-0797</a></li>
                <li><a href="mailto:info@appstudiopro.com" className="hover:text-[#00E5FF] transition-colors">info@appstudiopro.com</a></li>
                <li><a href="/privacy" className="hover:text-[#00E5FF] transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-[#00E5FF] transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-[hsl(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">
              © 2025 App Studio Pro. All rights reserved.
            </p>
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
