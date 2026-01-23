import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Users, Rocket, Clock, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { HUDFrame } from './GlitchText';

const stats = [
  { label: 'Apps Shipped', value: 247, suffix: '+', icon: Rocket, color: '#00E5FF' },
  { label: 'Lines of Code', value: 2.4, suffix: 'M+', icon: Code2, color: '#FF6A00' },
  { label: 'Happy Clients', value: 156, suffix: '+', icon: Users, color: '#4CAF50' },
  { label: 'Avg. Delivery', value: 3.2, suffix: ' weeks', icon: Clock, color: '#2196F3' },
];

const testimonials = [
  {
    quote: "They built our entire SaaS platform in 6 weeks. Our previous agency quoted 6 months.",
    author: "Sarah Chen",
    role: "CEO, DataFlow Inc",
    metric: "10x faster delivery"
  },
  {
    quote: "The live build sessions changed everything. We could see our vision becoming reality in real-time.",
    author: "Marcus Johnson",
    role: "Founder, TechStart",
    metric: "$2M raised post-launch"
  },
  {
    quote: "No BS, no hidden costs. They told us exactly what was possible with our budget and delivered.",
    author: "Emily Rodriguez",
    role: "CTO, HealthTech Co",
    metric: "40% under budget"
  },
];

const AnimatedCounter = ({ value, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, duration]);

  const displayValue = Number.isInteger(value) ? Math.floor(count) : count.toFixed(1);
  
  return <span>{displayValue}{suffix}</span>;
};

export const ProofSection = ({ className = '' }) => {
  return (
    <div className={className} data-testid="proof-section">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <HUDFrame 
              className="h-full bg-black/20 border border-[hsl(var(--border))] rounded-lg" 
              animated={true}
              delay={i * 0.3}
            >
              <div className="text-center">
                <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />
                <div className="text-3xl font-bold font-mono" style={{ color: stat.color }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{stat.label}</div>
              </div>
            </HUDFrame>
            </HUDFrame>
          </motion.div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] relative"
          >
            {/* Quote mark */}
            <div className="absolute -top-3 left-6 text-4xl text-[#00E5FF]/30 font-serif">"</div>
            
            <p className="text-sm text-[hsl(var(--foreground))] mb-4 italic">
              "{testimonial.quote}"
            </p>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-[hsl(var(--foreground))]">
                  {testimonial.author}
                </div>
                <div className="text-xs text-[hsl(var(--muted-foreground))]">
                  {testimonial.role}
                </div>
              </div>
              <div className="px-2 py-1 rounded bg-[#4CAF50]/20 text-[#4CAF50] text-xs font-bold">
                {testimonial.metric}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-[hsl(var(--border))]"
      >
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <Star className="w-4 h-4 text-[#FF6A00]" />
          <span><strong className="text-[hsl(var(--foreground))]">4.9/5</strong> Average Rating</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
          <span><strong className="text-[hsl(var(--foreground))]">100%</strong> Project Completion</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
          <TrendingUp className="w-4 h-4 text-[#00E5FF]" />
          <span><strong className="text-[hsl(var(--foreground))]">3.2x</strong> Avg. Client ROI</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProofSection;
