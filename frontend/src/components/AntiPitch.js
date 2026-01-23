import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, Check, X, ArrowRight, Shield, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const honestTruths = [
  {
    myth: "We can build anything in a week",
    truth: "Some things take time to do right. We'll tell you the real timeline.",
    icon: Clock,
    color: '#FF6A00'
  },
  {
    myth: "It will cost exactly what we quoted",
    truth: "Scope changes happen. We'll flag them BEFORE they cost you extra.",
    icon: DollarSign,
    color: '#4CAF50'
  },
  {
    myth: "AI can replace your entire team",
    truth: "AI augments humans. We'll show you where it helps and where it doesn't.",
    icon: Shield,
    color: '#2196F3'
  },
];

const guarantees = [
  "Transparent pricing from day one",
  "Weekly progress updates with demos",
  "Full code ownership - it's YOUR software",
  "Post-launch support included",
  "No vendor lock-in, ever",
];

export const AntiPitch = ({ className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className={className} data-testid="anti-pitch" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - The Honest Truths */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="p-6 sm:p-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] relative overflow-hidden"
        >
          {/* Background grid */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,106,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,106,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FF6A00]/20">
                <AlertTriangle className="w-5 h-5 text-[#FF6A00]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">
                  The <span className="text-[#FF6A00]">Anti-Pitch</span>
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  What we WON'T tell you
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {honestTruths.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    delay: 0.2 + i * 0.15, 
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="p-4 rounded-lg bg-black/20 border border-[hsl(var(--border))] relative overflow-hidden group cursor-pointer"
                >
                  {/* Static icon in background - NOT rotating */}
                  <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                    <item.icon className="w-20 h-20" style={{ color: item.color }} />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-3 mb-2">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                      >
                        <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-sm text-red-400 line-through">"{item.myth}"</span>
                    </div>
                    <div className="flex items-start gap-3 ml-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.4 + i * 0.15, type: "spring" }}
                      >
                        <Check className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-sm text-[hsl(var(--foreground))]">{item.truth}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right - What We Guarantee */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="p-6 sm:p-8 rounded-xl border border-[#00E5FF]/30 bg-[hsl(var(--card))] ring-1 ring-[#00E5FF]/20 relative overflow-hidden"
        >
          {/* Background grid */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#00E5FF]/20">
                <Shield className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">
                  What We <span className="text-[#00E5FF]">Guarantee</span>
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  In writing. Every project.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {guarantees.map((guarantee, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    delay: 0.3 + i * 0.08, 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <motion.div 
                    className="w-6 h-6 rounded-full bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00E5FF]/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Check className="w-4 h-4 text-[#00E5FF]" />
                  </motion.div>
                  <span className="text-sm text-[hsl(var(--foreground))] group-hover:text-[#00E5FF] transition-colors">
                    {guarantee}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="p-4 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <p className="text-sm text-[hsl(var(--foreground))] mb-3">
                <strong>Bottom line:</strong> We're not going to tell you what you want to hear. 
                We're going to tell you what you need to know.
              </p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                And then we'll <strong className="text-[#00E5FF]">deliver</strong>.
              </p>
            </motion.div>

            <Link to="/contact">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Button 
                  className="w-full mt-6 h-12 bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black font-semibold group"
                >
                  Start the Conversation 
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AntiPitch;
