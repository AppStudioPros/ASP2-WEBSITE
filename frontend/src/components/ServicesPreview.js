import { motion } from 'framer-motion';
import { Code2, Smartphone, MessageSquare, Brain, Palette, Sparkles, Cpu, TrendingUp, Users, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { GlitchText } from './GlitchText';

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
    icon: MessageSquare,
    title: 'Conversational AI',
    description: 'Custom chatbots and AI solutions for 24/7 support and engagement.',
    color: '#4CAF50'
  },
  {
    icon: Brain,
    title: 'AI Machine Learning',
    description: 'Unlock business potential with advanced machine learning techniques.',
    color: '#FF6A00'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Visually appealing and intuitive interfaces that users love.',
    color: '#9C27B0'
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
    color: '#FF6A00'
  },
  {
    icon: TrendingUp,
    title: 'GoHighLevel Programming',
    description: 'Streamline sales, marketing, and operations for optimal growth.',
    color: '#4CAF50'
  },
  {
    icon: Users,
    title: 'Marketing',
    description: 'Captivating ads, explainer videos, and stunning graphics for all platforms.',
    color: '#2196F3'
  },
  {
    icon: Globe,
    title: 'Web3 Development',
    description: 'Secure blockchain platforms, NFTs, and cryptocurrency exchanges.',
    color: '#00E5FF'
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-6 font-mono">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            <span className="text-sm text-[#00E5FF]">OUR_EXPERTISE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <GlitchText className="gradient-text-brand" pauseOnHover={true}>What We Offer</GlitchText>
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
                <div className="h-full p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm hover:border-[#00E5FF] transition-all duration-300">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: service.color }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[hsl(var(--foreground))]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {service.description}
                  </p>
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
          <Button 
            size="lg"
            variant="outline"
            className="border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-colors duration-200"
          >
            View All Services
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
