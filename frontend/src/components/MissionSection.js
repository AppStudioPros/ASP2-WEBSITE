import { motion } from 'framer-motion';
import { Rocket, Heart } from 'lucide-react';
import { GlitchText } from './GlitchText';
import { YouTubeVideo } from './YouTubeVideo';
import { TerminalBadge } from './TerminalBadge';

export const MissionSection = () => {
  return (
    <section 
      id="mission"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
      data-testid="mission-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,229,255,0.06),transparent_60%)] pointer-events-none" />
      
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        {/* Video Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <YouTubeVideo />
          </div>
        </motion.div>

        {/* Mission Content */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalBadge command="our_mission" color="#00E5FF" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            We Envision with <GlitchText className="gradient-text-brand">Purpose</GlitchText>
          </h2>
        </motion.div>

        {/* Mission Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3">
              <Rocket className="w-6 h-6 text-[#00E5FF] mt-1 flex-shrink-0" />
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                We have a unique combination of talents motivated by ambitious goals and a can-do attitude. 
                Our drive to develop excellent products is built on teamwork, passion, and giving team members 
                full control over their work to succeed on their own.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-start gap-3">
              <Heart className="w-6 h-6 text-[#FF6A00] mt-1 flex-shrink-0" />
              <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
                We want to create an environment where ideas can flourish. We dream, design, develop, and dare 
                to challenge the status quo and make a difference. We strive to develop a rich culture by 
                expanding our horizons and bringing your ideas outside of the box.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[hsl(var(--border))]"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-[#00E5FF] font-mono mb-2">35+</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Years of Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#FF6A00] font-mono mb-2">2500+</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#4CAF50] font-mono mb-2">30+</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Talented People</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
