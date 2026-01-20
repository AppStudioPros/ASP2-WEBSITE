import { motion } from 'framer-motion';
import { Code2, Smartphone, Brain, Palette, Sparkles, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { GlitchText } from './GlitchText';
import { TerminalBadge } from './TerminalBadge';

const services = [
  {
    icon: Code2,
    title: 'Website Development',
    description: 'User-friendly websites tailored to your needs with robust back-end development.',
    color: '#00E5FF'
  },
  {
    icon: Smartphone,
    title: 'Application Development',
    description: 'High-performance apps for iOS, Android, and cross-platform devices.',
    color: '#2196F3'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Visually appealing and intuitive interfaces that users love.',
    color: '#9C27B0'
  },
  {
    icon: Brain,
    title: 'AI Machine Learning',
    description: 'Unlock business potential with advanced machine learning techniques.',
    color: '#FF6A00'
  },
  {
    icon: Sparkles,
    title: 'Custom AI Solutions',
    description: 'Intelligent chatbots, predictive analytics, and custom AI programs.',
    color: '#00E5FF'
  },
  {
    icon: Cpu,
    title: 'Deep Learning',
    description: 'Harness deep learning to unlock insights and automate complex tasks.',
    color: '#4CAF50'
  }
];

export const ServicesPreview = () => {
  return (
    <section 
      id="services"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
      data-testid="services-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.06),transparent_60%)] pointer-events-none" />
      
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalBadge command="our_expertise" color="#00E5FF" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <GlitchText className="gradient-text-brand">What We Offer</GlitchText>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto mb-6">
            Comprehensive services that help businesses improve their visibility and reputation
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                <div className="relative h-full p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm hover:border-[#00E5FF] transition-all duration-300 overflow-hidden">
                  {/* Background Icon - Large, faded, positioned in lower right */}
                  <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
                    <Icon 
                      className="w-32 h-32" 
                      style={{ color: service.color }}
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-semibold mb-2 text-[hsl(var(--foreground))]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/services">
            <Button 
              size="lg"
              variant="outline"
              className="border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-colors duration-200"
            >
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
