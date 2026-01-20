import { motion } from 'framer-motion';
import { AlertTriangle, Check, X, ArrowRight, Shield, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { GlitchText } from './GlitchText';

const honestTruths = [
  {
    myth: "We can build anything in a week",
    truth: "Some things take time to do right. We'll tell you the real timeline.",
    icon: Clock
  },
  {
    myth: "It will cost exactly what we quoted",
    truth: "Scope changes happen. We'll flag them BEFORE they cost you extra.",
    icon: DollarSign
  },
  {
    myth: "AI can replace your entire team",
    truth: "AI augments humans. We'll show you where it helps and where it doesn't.",
    icon: Shield
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
  return (
    <div className={className} data-testid="anti-pitch">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left - The Honest Truths */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#FF6A00]/20 flex items-center justify-center">
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
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-lg bg-black/20 border border-[hsl(var(--border))]"
              >
                <div className="flex items-start gap-3 mb-2">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-red-400 line-through">"{item.myth}"</span>
                </div>
                <div className="flex items-start gap-3 ml-8">
                  <Check className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[hsl(var(--foreground))]">{item.truth}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - What We Guarantee */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-xl border border-[#00E5FF]/30 bg-[hsl(var(--card))] ring-1 ring-[#00E5FF]/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/20 flex items-center justify-center">
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
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#00E5FF]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-[#00E5FF]" />
                </div>
                <span className="text-sm text-[hsl(var(--foreground))]">{guarantee}</span>
              </motion.div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20">
            <p className="text-sm text-[hsl(var(--foreground))] mb-3">
              <strong>Bottom line:</strong> We're not going to tell you what you want to hear. 
              We're going to tell you what you need to know.
            </p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              And then we'll <strong className="text-[#00E5FF]">deliver</strong>.
            </p>
          </div>

          <Button 
            className="w-full mt-6 h-12 bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black font-semibold"
          >
            Start the Conversation <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AntiPitch;
