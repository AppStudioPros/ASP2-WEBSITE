import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Users, Rocket, Clock, Star, TrendingUp, CheckCircle } from 'lucide-react';
import { HUDFrame } from './GlitchText';
import { LightCoordinator } from './animations/CornerBracketLight';

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

const AnimatedCounter = ({ value, suffix = '', duration = 2000, inView }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!inView) return;
    
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
  }, [value, duration, inView]);

  const displayValue = Number.isInteger(value) ? Math.floor(count) : count.toFixed(1);
  
  return <span>{displayValue}{suffix}</span>;
};

// 3D Rotating Icon Component
const Rotating3DIcon = ({ icon: Icon, color, isInView, delay = 0 }) => {
  return (
    <div className="relative" style={{ perspective: '600px' }}>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={isInView ? { rotateY: 360 } : { rotateY: 0 }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "linear",
          delay 
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 blur-xl rounded-full"
          style={{ backgroundColor: color }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay }}
        />
        
        {/* Icon */}
        <Icon 
          className="w-20 h-20 relative z-10" 
          style={{ color }}
          strokeWidth={1}
        />
      </motion.div>
    </div>
  );
};

export const ProofSection = ({ className = '' }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <div className={className} data-testid="proof-section" style={{ overflow: 'visible' }} ref={sectionRef}>
      {/* Stats Grid with Light Coordinator */}
      <LightCoordinator cardCount={stats.length}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12" style={{ overflow: 'visible' }}>
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                style={{ overflow: 'visible' }}
              >
                <HUDFrame 
                  className="h-full bg-black/40 backdrop-blur-sm border border-[hsl(var(--border))] overflow-hidden" 
                  animated={true}
                  cardIndex={i}
                  totalCards={stats.length}
                >
                  {/* 3D Rotating Background Icon */}
                  <div className="absolute -bottom-2 -right-2 opacity-15 pointer-events-none">
                    <Rotating3DIcon 
                      icon={Icon} 
                      color={stat.color} 
                      isInView={isInView}
                      delay={i * 0.2}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <motion.div 
                      className="text-3xl font-bold font-mono" 
                      style={{ color: stat.color }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={isInView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: i * 0.1 + 0.2, duration: 0.4, type: "spring" }}
                    >
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                    </motion.div>
                    <motion.div 
                      className="text-xs text-[hsl(var(--muted-foreground))] mt-1"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      {stat.label}
                    </motion.div>
                  </div>
                </HUDFrame>
              </motion.div>
            );
          })}
        </div>
      </LightCoordinator>

      {/* Testimonials with scroll-triggered animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ 
              delay: 0.4 + i * 0.15, 
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] relative group cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            {/* Quote mark with animation */}
            <motion.div 
              className="absolute -top-3 left-6 text-4xl text-[#00E5FF]/30 font-serif"
              initial={{ scale: 0, rotate: -20 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15, type: "spring", stiffness: 200 }}
            >
              "
            </motion.div>
            
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
              <motion.div 
                className="px-2 py-1 rounded bg-[#4CAF50]/20 text-[#4CAF50] text-xs font-bold"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.15, type: "spring" }}
              >
                {testimonial.metric}
              </motion.div>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ 
                background: 'radial-gradient(circle at center, rgba(0,229,255,0.05), transparent 70%)'
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Trust indicators with staggered animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-[hsl(var(--border))]"
      >
        {[
          { icon: Star, color: '#FF6A00', label: '4.9/5', sublabel: 'Average Rating' },
          { icon: CheckCircle, color: '#4CAF50', label: '100%', sublabel: 'Project Completion' },
          { icon: TrendingUp, color: '#00E5FF', label: '3.2x', sublabel: 'Avg. Client ROI' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.9 + i * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </motion.div>
            <span>
              <strong className="text-[hsl(var(--foreground))]">{item.label}</strong> {item.sublabel}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProofSection;
