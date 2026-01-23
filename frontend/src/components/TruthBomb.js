import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Users, Zap, Shield } from 'lucide-react';
import { GlitchText } from './GlitchText';

const myths = [
  { text: '"Build an app in 5 minutes!"' },
  { text: '"No coding required!"' },
  { text: '"AI does everything automatically!"' },
  { text: '"Scale to millions instantly!"' },
];

const realities = [
  { icon: Code2, text: 'Custom architecture for YOUR use case' },
  { icon: Users, text: 'Engineers who build WITH you' },
  { icon: Zap, text: 'Production-grade AI agents that ship' },
  { icon: Shield, text: 'Enterprise security & scalability' },
];

// Animated strikethrough line
const AnimatedStrikethrough = ({ delay, isInView }) => {
  return (
    <motion.div
      className="absolute left-0 top-1/2 h-[3px] bg-red-500 rounded-full"
      style={{ transform: 'translateY(-50%)' }}
      initial={{ width: 0 }}
      animate={isInView ? { width: '100%' } : { width: 0 }}
      transition={{ 
        delay, 
        duration: 0.4, 
        ease: "easeOut" 
      }}
    />
  );
};

export const TruthBomb = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const isLeftInView = useInView(leftRef, { once: true, margin: "-100px" });
  const isRightInView = useInView(rightRef, { once: true, margin: "-100px" });

  return (
    <section 
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden"
      data-testid="truth-bomb-section"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06),transparent_70%)] pointer-events-none" />
      
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            The <GlitchText className="gradient-text-brand" pattern={2}>Truth Bomb</GlitchText>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
            Everyone's selling the dream. Here's what actually works.
          </p>
        </motion.div>

        {/* Split Screen Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - What They Promise */}
          <motion.div
            ref={leftRef}
            className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 sm:p-10 opacity-80"
            data-testid="truth-bomb-left-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 0.8, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-[hsl(var(--muted-foreground))] mb-6">
              What They Promise
            </h3>
            
            <ul className="space-y-5" data-testid="truth-bomb-left-claim-list">
              {myths.map((myth, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-[hsl(var(--muted-foreground))]"
                >
                  <span className="text-sm sm:text-base relative inline-block">
                    {myth.text}
                    {/* Animated red strikethrough */}
                    <AnimatedStrikethrough 
                      delay={0.5 + index * 0.3} 
                      isInView={isLeftInView} 
                    />
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[hsl(var(--border))]">
              <p className="text-sm text-[hsl(var(--muted-foreground))] italic">
                Templates. Limitations. Technical debt.
              </p>
            </div>
          </motion.div>

          {/* Right Panel - What You Actually Need (with pulsing glow) */}
          <motion.div
            ref={rightRef}
            className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 sm:p-10 ring-1 ring-[hsl(var(--asp-cyan))]"
            data-testid="truth-bomb-right-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Pulsing glow behind the card */}
            <motion.div
              className="absolute -inset-1 rounded-xl pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.15), transparent 70%)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-semibold text-[hsl(var(--foreground))] mb-6">
                What You Actually Need
              </h3>
              
              <ul className="space-y-4" data-testid="truth-bomb-right-proof-list">
                {realities.map((reality, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3 text-[hsl(var(--foreground))]"
                  >
                    <reality.icon className="w-5 h-5 mt-0.5 text-[#00E5FF] flex-shrink-0" />
                    <span className="text-sm sm:text-base">
                      {reality.text}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-[hsl(var(--border))]">
                <p className="text-sm text-[#2196F3] font-medium">
                  Real engineering. Real results. Real fast.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TruthBomb;
