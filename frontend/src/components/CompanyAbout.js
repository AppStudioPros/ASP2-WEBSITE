import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { TerminalBadge } from './TerminalBadge';
import { GlitchText } from './GlitchText';

export const CompanyAbout = () => {
  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="about"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
      data-testid="company-about-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06),transparent_60%)] pointer-events-none" />
      
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TerminalBadge command="who_we_are" color="#00E5FF" variant="inverted" />
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              <GlitchText className="gradient-text-brand" pattern={3}>35+ Years</GlitchText> of Excellence
            </h2>
            
            <div className="space-y-4 text-[hsl(var(--muted-foreground))] leading-relaxed mb-6">
              <p>
                Welcome to <span className="text-[#00E5FF] font-semibold">App Studio Pro</span>, where innovative ideas meet exceptional execution. 
                We specialize in transforming visionary concepts into successful digital realities.
              </p>
              <p>
                Our dedicated team of experts is passionate about helping you bring your app ideas to life, 
                whether you're an aspiring entrepreneur or an established business. From building dynamic websites 
                and crafting intuitive UI/UX designs to creating custom AI integrations and secure hosting solutions.
              </p>
              <p>
                We pride ourselves on delivering high-quality solutions with a commitment to excellence and innovation 
                that drives us to provide the best possible outcomes for our clients.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 pt-4 mb-6">
              <div>
                <div className="text-3xl font-bold text-[#00E5FF] font-mono mb-1">2500+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Projects Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#FF6A00] font-mono mb-1">30+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Expert Engineers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#4CAF50] font-mono mb-1">35+</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Years Experience</div>
              </div>
            </div>

            <Link to="/about">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold transition-all duration-200"
              >
                Learn More About Us <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Content - 3D Rotating Card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
            style={{ perspective: '1000px' }}
          >
            {/* 3D Card that rotates on scroll */}
            <motion.div
              className="relative aspect-square rounded-2xl border border-[hsl(var(--border))] bg-[#0a0a0a] overflow-hidden"
              initial={{ rotateY: 0 }}
              animate={isCardInView ? {
                rotateY: [0, 15, 0, -15, 0],
                rotateX: [0, 5, 0, -5, 0],
              } : {}}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Grid Background */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}
              />
              
              {/* Corner Brackets */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00E5FF] rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00E5FF] rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00E5FF] rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00E5FF] rounded-br-sm" />
              
              {/* Side Chevrons */}
              <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-40">
                <div className="w-2 h-2 border-l border-t border-[#00E5FF] rotate-[-45deg]" />
                <div className="w-2 h-2 border-l border-t border-[#00E5FF] rotate-[-45deg]" />
              </div>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-40">
                <div className="w-2 h-2 border-r border-t border-[#00E5FF] rotate-[45deg]" />
                <div className="w-2 h-2 border-r border-t border-[#00E5FF] rotate-[45deg]" />
              </div>
              
              {/* Center content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Building2 className="w-24 h-24 text-[#00E5FF] mx-auto opacity-60" strokeWidth={1} />
                  <div className="text-xl font-medium text-white">
                    Building the Future
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
