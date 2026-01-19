import { motion } from 'framer-motion';
import { XCircle, CheckCircle, Code2, Users, Zap, Shield, AlertTriangle, Sparkles } from 'lucide-react';

const myths = [
  { icon: AlertTriangle, text: '"Build an app in 5 minutes!"' },
  { icon: AlertTriangle, text: '"No coding required!"' },
  { icon: AlertTriangle, text: '"AI does everything automatically!"' },
  { icon: AlertTriangle, text: '"Scale to millions instantly!"' },
];

const realities = [
  { icon: Code2, text: 'Custom architecture for YOUR use case' },
  { icon: Users, text: 'Engineers who build WITH you' },
  { icon: Zap, text: 'Production-grade AI agents that ship' },
  { icon: Shield, text: 'Enterprise security & scalability' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const TruthBomb = () => {
  return (
    <section 
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden"
      data-testid="truth-bomb-section"
    >
      {/* Background accent - brand cyan glow */}
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
            The <span className="gradient-text-brand">Truth Bomb</span>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
            Everyone's selling the dream. Here's what actually works.
          </p>
        </motion.div>

        {/* Split Screen Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - What They Promise (Muted) */}
          <motion.div
            className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 sm:p-10 opacity-75 grayscale-[30%]"
            data-testid="truth-bomb-left-panel"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Crossed out overlay effect */}
            <div className="absolute top-4 right-4">
              <XCircle className="w-8 h-8 text-[hsl(var(--destructive))] opacity-60" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-semibold text-[hsl(var(--muted-foreground))] mb-6">
              What They Promise
            </h3>
            
            <ul className="space-y-4" data-testid="truth-bomb-left-claim-list">
              {myths.map((myth, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-3 text-[hsl(var(--muted-foreground))]"
                >
                  <myth.icon className="w-5 h-5 mt-0.5 text-[hsl(var(--muted-foreground))] opacity-50 flex-shrink-0" />
                  <span className="text-sm sm:text-base line-through decoration-[hsl(var(--destructive))]/50">
                    {myth.text}
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

          {/* Right Panel - What You Actually Need (Vibrant with brand colors) */}
          <motion.div
            className="relative rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-8 sm:p-10 ring-1 ring-[hsl(var(--asp-cyan))] cyan-glow"
            data-testid="truth-bomb-right-panel"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Checkmark */}
            <div className="absolute top-4 right-4">
              <CheckCircle className="w-8 h-8 text-[hsl(var(--success))]" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-semibold text-[hsl(var(--foreground))] mb-6 flex items-center gap-2">
              What You Actually Need
              <Sparkles className="w-5 h-5 text-[#00E5FF]" />
            </h3>
            
            <ul className="space-y-4" data-testid="truth-bomb-right-proof-list">
              {realities.map((reality, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TruthBomb;
