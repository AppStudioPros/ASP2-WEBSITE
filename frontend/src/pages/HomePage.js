import { motion } from 'framer-motion';
import { Code2, Flame, Shield, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HeroParticles } from '../components/HeroParticles';
import { TruthBomb } from '../components/TruthBomb';
import { LiveBuildCounter } from '../components/AnimatedCounter';
import { ActivityHeatmap } from '../components/ActivityHeatmap';
import { CodePoetry } from '../components/CodePoetry';
import { SEOAnalyzerEpic } from '../components/SEOAnalyzerEpic';
import { LiveSessionShowcase } from '../components/LiveSessionShowcase';
import { BudgetCalculator } from '../components/BudgetCalculator';
import { AppVault } from '../components/AppVault';
import { ProofSection } from '../components/ProofSection';
import { AntiPitch } from '../components/AntiPitch';
import { GlitchText } from '../components/GlitchText';
import { MissionSection } from '../components/MissionSection';
import { ServicesPreview } from '../components/ServicesPreview';
import { WorkSection } from '../components/WorkSection';
import { CompanyAbout } from '../components/CompanyAbout';
import { TerminalBadge } from '../components/TerminalBadge';
import { HeroMockup } from '../components/animations/HeroMockup';

const HomePage = () => {
  return (
    <>
      {/* HERO Section - 2 Column Layout */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
        data-testid="hero-section"
      >
        {/* Android Working on HUD Background Scene */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient overlay to show grid through */}
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--background))]/70 via-[hsl(var(--background))]/50 to-[hsl(var(--background))]/70 z-10" />
          
          {/* Android/Robot working on futuristic interface */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[80%] opacity-25">
            <svg viewBox="0 0 800 800" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Large HUD/Interface Screen */}
              <rect x="100" y="150" width="500" height="400" fill="none" stroke="#00E5FF" strokeWidth="2" opacity="0.6" />
              <rect x="110" y="160" width="480" height="380" fill="#00E5FF" opacity="0.05" />
              
              {/* Screen sections */}
              <line x1="100" y1="200" x2="600" y2="200" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
              <line x1="350" y1="200" x2="350" y2="550" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
              
              {/* Code lines on screen */}
              <line x1="120" y1="220" x2="320" y2="220" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
              <line x1="120" y1="250" x2="300" y2="250" stroke="#00E5FF" strokeWidth="2" opacity="0.4" />
              <line x1="120" y1="280" x2="310" y2="280" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
              <line x1="120" y1="310" x2="280" y2="310" stroke="#00E5FF" strokeWidth="2" opacity="0.4" />
              <line x1="120" y1="340" x2="320" y2="340" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
              
              {/* Charts/graphs on right side */}
              <polyline points="380,250 420,230 460,260 500,220 540,240" fill="none" stroke="#FF6A00" strokeWidth="2" opacity="0.5" />
              <rect x="380" y="300" width="40" height="80" fill="#00E5FF" opacity="0.3" />
              <rect x="430" y="320" width="40" height="60" fill="#00E5FF" opacity="0.4" />
              <rect x="480" y="280" width="40" height="100" fill="#00E5FF" opacity="0.3" />
              <rect x="530" y="310" width="40" height="70" fill="#00E5FF" opacity="0.4" />
              
              {/* Android/Robot figure - simplified humanoid shape */}
              {/* Head */}
              <circle cx="700" cy="300" r="40" fill="none" stroke="#00E5FF" strokeWidth="3" opacity="0.6" />
              <circle cx="690" cy="295" r="5" fill="#00E5FF" opacity="0.8" />
              <circle cx="710" cy="295" r="5" fill="#00E5FF" opacity="0.8" />
              <path d="M 685 315 Q 700 320 715 315" fill="none" stroke="#00E5FF" strokeWidth="2" opacity="0.6" />
              
              {/* Body */}
              <rect x="670" y="340" width="60" height="120" rx="10" fill="none" stroke="#00E5FF" strokeWidth="3" opacity="0.6" />
              <line x1="700" y1="360" x2="700" y2="440" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
              <line x1="675" y1="380" x2="725" y2="380" stroke="#00E5FF" strokeWidth="1" opacity="0.4" />
              
              {/* Arms - one extended toward screen */}
              <line x1="670" y1="360" x2="620" y2="320" stroke="#00E5FF" strokeWidth="4" opacity="0.6" />
              <circle cx="620" cy="320" r="8" fill="#00E5FF" opacity="0.5" />
              
              <line x1="730" y1="360" x2="760" y2="400" stroke="#00E5FF" strokeWidth="4" opacity="0.6" />
              <circle cx="760" cy="400" r="8" fill="#00E5FF" opacity="0.5" />
              
              {/* Legs */}
              <line x1="680" y1="460" x2="680" y2="550" stroke="#00E5FF" strokeWidth="4" opacity="0.6" />
              <line x1="720" y1="460" x2="720" y2="550" stroke="#00E5FF" strokeWidth="4" opacity="0.6" />
              
              {/* Holographic particles around hand */}
              <circle cx="615" cy="315" r="3" fill="#FF6A00" opacity="0.8">
                <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="625" cy="310" r="2" fill="#00E5FF" opacity="0.8">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="610" cy="325" r="2" fill="#FF6A00" opacity="0.8">
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
              </circle>
              
              {/* Connection line from hand to screen */}
              <line x1="620" y1="320" x2="600" y2="280" stroke="#00E5FF" strokeWidth="1" opacity="0.3" strokeDasharray="5,5">
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </line>
              
              {/* HUD elements floating around */}
              <circle cx="200" cy="100" r="20" fill="none" stroke="#FF6A00" strokeWidth="1" opacity="0.4" />
              <line x1="190" y1="100" x2="210" y2="100" stroke="#FF6A00" strokeWidth="1" opacity="0.4" />
              <line x1="200" y1="90" x2="200" y2="110" stroke="#FF6A00" strokeWidth="1" opacity="0.4" />
              
              <rect x="500" y="80" width="60" height="40" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />
              <line x1="510" y1="95" x2="550" y2="95" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />
              <line x1="510" y1="105" x2="540" y2="105" stroke="#00E5FF" strokeWidth="1" opacity="0.3" />
              
              {/* Glowing tech circles */}
              <circle cx="150" cy="600" r="15" fill="#00E5FF" opacity="0.1">
                <animate attributeName="r" values="15;20;15" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="650" cy="100" r="12" fill="#FF6A00" opacity="0.1">
                <animate attributeName="r" values="12;18;12" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.25;0.1" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(0,229,255,0.12),rgba(0,0,0,0)_60%)] pointer-events-none z-20" />
        <div className="absolute inset-0 bg-[conic-gradient(from_200deg_at_70%_30%,rgba(255,106,0,0.08),rgba(0,0,0,0)_40%)] pointer-events-none z-20" />
        
        {/* Particles */}
        <HeroParticles />
        
        {/* 2-COLUMN CONTENT */}
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-30">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT COLUMN - Text Content */}
            <div className="max-w-2xl">
              {/* Terminal Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
                data-testid="hero-badge"
              >
                <TerminalBadge command="engineering_excellence" color="#00E5FF" />
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
                <GlitchText className="gradient-text-brand" pattern={0}>We're building it now.</GlitchText>
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
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold px-8 h-12 text-base transition-all duration-200"
                    data-testid="hero-primary-cta"
                  >
                    <Flame className="w-5 h-5 mr-2" /> Start Your Project
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] px-8 h-12 text-base transition-colors duration-200"
                  data-testid="hero-secondary-cta"
                  onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
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
            
            {/* RIGHT COLUMN - Animated Mockup */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              <HeroMockup />
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

      {/* AI Website Scanner Section */}
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
            <TerminalBadge command="free_tool" color="#00E5FF" variant="inverted" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <GlitchText className="gradient-text-brand" pattern={1}>AI Website Scanner</GlitchText>
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
            <TerminalBadge command="live_dashboard" color="#FF6A00" variant="inverted" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              The <GlitchText className="text-[#FF6A00]" pattern={2}>Tech Theater</GlitchText>
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

      {/* Mission & Video Section */}
      <MissionSection />

      {/* Services Preview Section */}
      <ServicesPreview />

      {/* Work/Portfolio Section */}
      <WorkSection />

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
              <TerminalBadge command="transparent_pricing" color="#FF6A00" variant="inverted" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Your Budget <GlitchText className="text-[#FF6A00]" pattern={3}>Works</GlitchText>
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
        className="py-16 sm:py-24 lg:py-32 relative border-t border-[hsl(var(--border))]"
        data-testid="proof-section"
        style={{ overflow: 'visible' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(76,175,80,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10" style={{ overflow: 'visible' }}>
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TerminalBadge command="verified_results" color="#FF6A00" variant="inverted" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Proof, Not <GlitchText className="text-[#FF6A00]" pattern={0}>Promises</GlitchText>
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
            <TerminalBadge command="live_sessions" color="#FF6A00" variant="inverted" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Built <GlitchText className="text-[#FF6A00]" pattern={1}>WITH</GlitchText> You
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
              The <GlitchText className="gradient-text-brand" pattern={2}>Honest</GlitchText> Truth
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
              We're not going to tell you what you want to hear. 
              We're going to tell you what you need to know.
            </p>
          </motion.div>

          <AntiPitch />
        </div>
      </section>

      {/* Company About Section */}
      <CompanyAbout />

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
              The only limit is your <GlitchText className="gradient-text-brand" pattern={3}>imagination</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-xl mx-auto">
              Everything else? We've got it covered.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] text-black hover:from-[#FF8C00] hover:to-[#FFA500] font-semibold px-12 h-14 text-lg"
              >
                <Flame className="w-6 h-6 mr-2" /> Let's Build Something Epic
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
