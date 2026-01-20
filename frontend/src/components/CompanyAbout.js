import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export const CompanyAbout = () => {
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
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-4 font-mono">
              <Building2 className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm text-[#00E5FF]">WHO_WE_ARE</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="gradient-text-brand">35+ Years</span> of Excellence
            </h2>
            
            <div className="space-y-4 text-[hsl(var(--muted-foreground))] leading-relaxed">
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

            <div className="flex flex-wrap gap-8 pt-4">
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

          {/* Right Content - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-br from-[#00E5FF]/10 via-[#2196F3]/10 to-[#4CAF50]/10 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full p-8">
                  {/* Code brackets decoration */}
                  <div className="absolute top-8 left-8 text-6xl text-[#00E5FF] opacity-20 font-mono">{'<'}</div>
                  <div className="absolute bottom-8 right-8 text-6xl text-[#00E5FF] opacity-20 font-mono">{'>'}</div>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Building2 className="w-24 h-24 text-[#00E5FF] mx-auto opacity-40" />
                      <div className="text-xl font-mono text-[hsl(var(--muted-foreground))]">
                        Building the Future
                      </div>
                    </div>
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00E5FF]" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00E5FF]" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00E5FF]" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00E5FF]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
