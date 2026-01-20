import { motion } from 'framer-motion';
import { Users, Award } from 'lucide-react';
import { GlitchText } from './GlitchText';

const teamMembers = [
  {
    name: 'Corey Strange',
    role: 'Founder & CEO',
    image: 'https://via.placeholder.com/300x300?text=Corey+Strange',
    description: '26 years of owning and operating the highest independently rated IT company in Denver'
  },
  {
    name: 'William Mocas',
    role: 'Partner & Financial Consultant',
    image: 'https://via.placeholder.com/300x300?text=William+Mocas',
    description: 'CFO with extensive expertise in financial business consulting and lending'
  },
  {
    name: 'Tonya Mocas',
    role: 'Project Management Director',
    image: 'https://via.placeholder.com/300x300?text=Tonya+Mocas',
    description: 'Expert project manager across diverse industries including oil and gas, architecture'
  },
  {
    name: 'Abid Ali',
    role: 'Managing Director',
    image: 'https://via.placeholder.com/300x300?text=Abid+Ali',
    description: 'Team leader overseeing 25+ programmers. Won 2024 AI Hackathon EU in Dubai'
  },
  {
    name: 'Majid Ali',
    role: 'Co-Founder & Design Lead',
    image: 'https://via.placeholder.com/300x300?text=Majid+Ali',
    description: '7+ years in design and technology, leading user experience and product innovation'
  },
  {
    name: 'Sajid Ali',
    role: 'Chief Product Officer',
    image: 'https://via.placeholder.com/300x300?text=Sajid+Ali',
    description: 'Expert in UI/UX and application design with 20+ years of experience'
  },
  {
    name: 'Oleksii Onop',
    role: 'Web Design & Development',
    image: 'https://via.placeholder.com/300x300?text=Oleksii+Onop',
    description: '15 years of experience in web design, SEO, and integration'
  },
  {
    name: 'Kelsi Strange',
    role: 'Graphic Arts & Marketing',
    image: 'https://via.placeholder.com/300x300?text=Kelsi+Strange',
    description: 'Specialist in UI/UX design and marketing strategies'
  },
  {
    name: 'Trina Strange',
    role: 'Video Editor & Marketing',
    image: 'https://via.placeholder.com/300x300?text=Trina+Strange',
    description: 'Video editor and marketing expert, successful artist and music producer'
  }
];

export const TeamSection = () => {
  return (
    <section 
      id="team"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
      data-testid="team-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(76,175,80,0.06),transparent_60%)] pointer-events-none" />
      
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-6 font-mono">
            <Users className="w-4 h-4 text-[#4CAF50]" />
            <span className="text-sm text-[#4CAF50]">OUR_TEAM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <GlitchText className="text-[#4CAF50]" pauseOnHover={true}>Meet Our Team</GlitchText>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
            World-class developers, designers, and problem solvers from around the globe
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-16 pb-12 border-b border-[hsl(var(--border))]"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-[#00E5FF] font-mono mb-2">1500+</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Projects Together</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-[#4CAF50] font-mono mb-2">20+</div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">Years Collaboration</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-6 h-6 text-[#FF6A00]" />
              <div className="text-4xl font-bold text-[#FF6A00] font-mono">2024</div>
            </div>
            <div className="text-sm text-[hsl(var(--muted-foreground))]">AI Hackathon Winners</div>
          </div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm hover:border-[#4CAF50] transition-all duration-300">
                <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-[#00E5FF]/20 to-[#4CAF50]/20 border border-[hsl(var(--border))]">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-[hsl(var(--foreground))]">
                  {member.name}
                </h3>
                <p className="text-sm text-[#00E5FF] mb-3 font-mono">
                  {member.role}
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
