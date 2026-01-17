import { motion } from 'framer-motion';
import { ArrowRight, Code2, Rocket, Zap } from 'lucide-react';
import { Button } from './components/ui/button';
import { HeroParticles } from './components/HeroParticles';
import { TruthBomb } from './components/TruthBomb';
import { FireAnimation } from './components/FireAnimation';
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
    <div className="min-h-screen bg-[hsl(var(--background))]" data-testid="app-container">
      <Toaster position="top-right" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 backdrop-blur-md">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2" data-testid="nav-logo">
              <ASPLogo />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-colors duration-200"
              data-testid="nav-cta-button"
            >
              Let's Build
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden pt-16"
        data-testid="hero-section"
      >
        {/* Gradient Overlays - Brand cyan/blue */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(0,229,255,0.12),rgba(0,0,0,0)_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[conic-gradient(from_200deg_at_70%_30%,rgba(33,150,243,0.08),rgba(0,0,0,0)_40%)] pointer-events-none" />
        
        {/* Particles */}
        <HeroParticles />
        
        {/* Content */}
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] mb-6"
              data-testid="hero-badge"
            >
              <Zap className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm text-[hsl(var(--muted-foreground))]">Custom AI Engineering</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6"
              data-testid="hero-headline"
            >
              We Don't Do <span className="text-[hsl(var(--muted-foreground))] line-through">Templates</span>
              <br />
              <span className="inline-flex items-center gap-1">
                <span className="gradient-text-brand">We Build</span>
                <span className="text-[#FF6A00]">Fire</span>
                <FireAnimation size="md" className="-ml-1 -mb-1" />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mb-8"
              data-testid="hero-subheadline"
            >
              While others promise "AI magic," we write real code. Custom agents, 
              production-grade systems, and enterprise solutions — built WITH you, not for you.
            </motion.p>

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
                Start Building <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] px-8 h-12 text-base transition-colors duration-200"
                data-testid="hero-secondary-cta"
              >
                <Code2 className="w-5 h-5 mr-2" /> See Our Work
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
                <div className="text-3xl font-bold text-[#00E5FF] font-mono">47+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">AI Apps<br/>Shipped</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-[#2196F3] font-mono">3x</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Faster<br/>Than In-House</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-[hsl(var(--success))] font-mono">100%</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Custom<br/>Code</div>
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
            <span className="text-xs text-[hsl(var(--muted-foreground))]">Scroll to see the truth</span>
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

      {/* Truth Bomb Section */}
      <TruthBomb />

      {/* Placeholder for more sections */}
      <section className="py-16 sm:py-24 lg:py-32 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))]">
            <Rocket className="w-4 h-4 text-[#2196F3]" />
            <span className="text-sm text-[hsl(var(--muted-foreground))]">More Tech Theater coming soon...</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ASPLogo className="h-6" />
              <span className="text-sm text-[hsl(var(--muted-foreground))]">
                © 2025
              </span>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              Built with <span className="text-[#FF6A00]">fire</span>. Shipped with love.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
