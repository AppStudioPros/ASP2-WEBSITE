import { motion } from 'framer-motion';
import { Users, Target, Rocket, Heart, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { GlitchText } from '../components/GlitchText';
import { TerminalBadge } from '../components/TerminalBadge';

const teamMembers = [
  {
    name: 'Tim Kipp',
    role: 'Co-Founder & Tech Entrepreneur',
    bio: 'With over 35 years of combined experience, Tim co-leads ASP with a vision to democratize cutting-edge technology. His background spans from bootstrapping startups to advising Fortune 500 companies on digital transformation.',
    color: '#00E5FF'
  },
  {
    name: 'Jimmy Laramie',
    role: 'Co-Founder & Creative Technologist',
    bio: 'Jimmy brings a unique blend of artistic vision and technical prowess to every project. His expertise in UI/UX design and emerging technologies has helped shape digital products used by millions worldwide.',
    color: '#FF6A00'
  }
];

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'We don\'t settle for "good enough." Every line of code, every design decision, every client interaction reflects our commitment to excellence.',
    color: '#00E5FF'
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'We\'re not just building software—we\'re crafting digital experiences that transform businesses and delight users.',
    color: '#FF6A00'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Great products are built together. We work alongside our clients, not just for them, ensuring their vision drives every decision.',
    color: '#4CAF50'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We stay ahead of the curve, embracing emerging technologies like AI and blockchain to give our clients a competitive edge.',
    color: '#9C27B0'
  }
];

const milestones = [
  { year: '1989', title: 'The Beginning', description: 'Started as a small web development shop with a big vision.' },
  { year: '2005', title: 'Mobile Revolution', description: 'Expanded into mobile app development as smartphones emerged.' },
  { year: '2015', title: 'AI Integration', description: 'Pioneered AI/ML solutions for enterprise clients.' },
  { year: '2020', title: 'Web3 Era', description: 'Launched blockchain and decentralized application services.' },
  { year: '2024', title: '2500+ Projects', description: 'Reached milestone of 2500+ successfully delivered projects.' },
  { year: '2025', title: 'The Future', description: 'Continuing to push boundaries with cutting-edge technology.' }
];

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(0,229,255,0.12),rgba(0,0,0,0)_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <TerminalBadge command="about_us" color="#00E5FF" variant="inverted" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <GlitchText className="gradient-text-brand">35+ Years</GlitchText> of
              <br />Digital Excellence
            </h1>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
              We're not just developers—we're dreamers, problem-solvers, and partners in your digital journey. 
              From ambitious startups to established enterprises, we've helped thousands of clients turn their 
              visions into reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '35+', label: 'Years Experience', color: '#00E5FF' },
              { value: '2500+', label: 'Projects Delivered', color: '#FF6A00' },
              { value: '30+', label: 'Expert Engineers', color: '#4CAF50' },
              { value: '99.9%', label: 'Client Satisfaction', color: '#9C27B0' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold font-mono mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <TerminalBadge command="our_story" color="#FF6A00" variant="inverted" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                From Garage to <GlitchText className="text-[#00E5FF]">Global</GlitchText>
              </h2>
              <div className="space-y-4 text-[hsl(var(--muted-foreground))]">
                <p>
                  App Studio Pro began in 1989 as a small web development company with a simple mission: 
                  help businesses harness the power of emerging digital technologies.
                </p>
                <p>
                  Over three decades, we've evolved alongside the technology landscape—from static HTML 
                  sites to dynamic web applications, from basic mobile apps to AI-powered platforms, 
                  from traditional databases to blockchain solutions.
                </p>
                <p>
                  Today, we're a full-service digital agency with expertise spanning web development, 
                  mobile applications, AI/ML integration, UI/UX design, and emerging technologies. 
                  But our mission remains the same: transforming visionary concepts into successful 
                  digital realities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square rounded-2xl border border-[hsl(var(--border))] bg-gradient-to-br from-[#00E5FF]/10 via-[#2196F3]/10 to-[#4CAF50]/10 overflow-hidden p-8">
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00E5FF]" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#00E5FF]" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#00E5FF]" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00E5FF]" />
                
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <Rocket className="w-20 h-20 text-[#00E5FF] mb-6 opacity-60" />
                  <div className="text-2xl font-bold text-[hsl(var(--foreground))] mb-2">Our Mission</div>
                  <p className="text-[hsl(var(--muted-foreground))] max-w-xs">
                    "Empowering businesses to thrive in the digital age through innovative, 
                    high-quality technology solutions."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Our <GlitchText className="text-[#FF6A00]">Journey</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              Key milestones that shaped who we are today
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[hsl(var(--border))]" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-12 md:pl-0`}>
                  <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50">
                    <div className="text-[#00E5FF] font-mono text-sm mb-1">{milestone.year}</div>
                    <div className="font-semibold text-[hsl(var(--foreground))] mb-1">{milestone.title}</div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">{milestone.description}</div>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-[#00E5FF] transform -translate-x-1/2 border-2 border-[hsl(var(--background))]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,106,0,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TerminalBadge command="core_values" color="#4CAF50" variant="inverted" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              What Drives <GlitchText className="gradient-text-brand">Us</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              Our values aren't just words on a wall—they're the principles that guide every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 hover:border-[#00E5FF] transition-colors"
                >
                  <Icon className="w-10 h-10 mb-4" style={{ color: value.color }} />
                  <h3 className="text-xl font-semibold mb-2 text-[hsl(var(--foreground))]">{value.title}</h3>
                  <p className="text-[hsl(var(--muted-foreground))]">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TerminalBadge command="leadership" color="#00E5FF" variant="inverted" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Meet the <GlitchText className="text-[#FF6A00]">Founders</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              The visionaries behind App Studio Pro
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50"
              >
                <div 
                  className="w-20 h-20 rounded-full mb-6 flex items-center justify-center text-3xl font-bold"
                  style={{ backgroundColor: `${member.color}20`, color: member.color }}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-1">{member.name}</h3>
                <div className="text-sm font-mono mb-4" style={{ color: member.color }}>{member.role}</div>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Ready to <GlitchText className="gradient-text-brand">Work Together?</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-xl mx-auto">
              Let's discuss how we can help bring your vision to life.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold px-8"
              >
                Get In Touch <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
