import { motion } from 'framer-motion';
import { 
  Code2, Smartphone, Brain, Palette, Sparkles, Cpu, 
  Globe, Shield, Database, Cloud, ArrowRight,
  Check, Server
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { GlitchText } from '../components/GlitchText';
import { TerminalBadge } from '../components/TerminalBadge';

const allServices = [
  {
    icon: Code2,
    title: 'Website Development',
    description: 'User-friendly websites tailored to your needs with robust back-end development. From simple landing pages to complex web applications.',
    features: ['Custom CMS Integration', 'E-commerce Solutions', 'API Development', 'Performance Optimization'],
    color: '#00E5FF'
  },
  {
    icon: Smartphone,
    title: 'Application Development',
    description: 'High-performance apps for iOS, Android, and cross-platform devices. Native and hybrid solutions that deliver exceptional user experiences.',
    features: ['iOS & Android Native', 'Cross-Platform (React Native)', 'App Store Optimization', 'Push Notifications'],
    color: '#2196F3'
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Visually appealing and intuitive interfaces that users love. We blend aesthetics with functionality to create memorable digital experiences.',
    features: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Usability Testing'],
    color: '#9C27B0'
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Unlock business potential with advanced machine learning techniques. Predictive analytics, automation, and intelligent insights.',
    features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision', 'Recommendation Systems'],
    color: '#FF6A00'
  },
  {
    icon: Sparkles,
    title: 'Custom AI Solutions',
    description: 'Intelligent chatbots, virtual assistants, and custom AI programs tailored to your specific business needs.',
    features: ['Chatbot Development', 'Voice Assistants', 'AI Integration', 'Custom Training Models'],
    color: '#00E5FF'
  },
  {
    icon: Cpu,
    title: 'Deep Learning',
    description: 'Harness deep learning to unlock insights and automate complex tasks. Neural networks that learn and improve over time.',
    features: ['Neural Network Design', 'Image Recognition', 'Speech Processing', 'Anomaly Detection'],
    color: '#4CAF50'
  },
  {
    icon: Globe,
    title: 'Web3 & Blockchain',
    description: 'Decentralized applications, smart contracts, and blockchain solutions for the next generation of the internet.',
    features: ['Smart Contracts', 'DeFi Applications', 'NFT Platforms', 'Wallet Integration'],
    color: '#FF6A00'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and DevOps services. AWS, Azure, and Google Cloud expertise for modern applications.',
    features: ['Cloud Migration', 'Serverless Architecture', 'CI/CD Pipelines', 'Auto-scaling Setup'],
    color: '#2196F3'
  },
  {
    icon: Database,
    title: 'Database Engineering',
    description: 'Robust database design, optimization, and management. From SQL to NoSQL, we architect data solutions that scale.',
    features: ['Schema Design', 'Query Optimization', 'Data Migration', 'Backup & Recovery'],
    color: '#9C27B0'
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Protect your digital assets with comprehensive security audits, penetration testing, and secure development practices.',
    features: ['Security Audits', 'Penetration Testing', 'Compliance (SOC2, HIPAA)', 'Incident Response'],
    color: '#4CAF50'
  },
  {
    icon: Server,
    title: 'Hosting & Maintenance',
    description: 'Reliable hosting solutions with 99.9% uptime guarantee. Ongoing maintenance and support to keep your systems running smoothly.',
    features: ['Managed Hosting', '24/7 Monitoring', 'Regular Updates', 'Performance Tuning'],
    color: '#00E5FF'
  }
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We dive deep into your business needs, goals, and challenges to understand what success looks like for you.'
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Our team crafts a tailored roadmap with clear milestones, timelines, and deliverables.'
  },
  {
    step: '03',
    title: 'Design & Development',
    description: 'We build your solution iteratively, with regular check-ins and demos to ensure we\'re on track.'
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'After rigorous testing, we launch your product and provide ongoing support and optimization.'
  }
];

const ServicesPage = () => {
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
            <TerminalBadge command="our_services" color="#00E5FF" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 mt-6">
              Full-Stack <GlitchText className="gradient-text-brand">Solutions</GlitchText>
              <br />for Modern Business
            </h1>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
              From concept to deployment, we provide end-to-end digital services that help 
              businesses transform, scale, and succeed in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="h-full p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm hover:border-[#00E5FF] transition-all duration-300">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 text-[hsl(var(--foreground))]">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                      {service.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-[#4CAF50]" />
                          <span className="text-[hsl(var(--muted-foreground))]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.06),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TerminalBadge command="our_process" color="#FF6A00" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 mt-6">
              How We <GlitchText className="text-[#FF6A00]">Work</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
              A proven methodology that delivers results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 h-full">
                  <div className="text-4xl font-bold text-[#00E5FF] opacity-30 mb-2 font-mono">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-[hsl(var(--foreground))]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow connector */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-[hsl(var(--border))]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <TerminalBadge command="why_us" color="#4CAF50" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 mt-6">
                Why Choose <GlitchText className="gradient-text-brand">App Studio Pro?</GlitchText>
              </h2>
              <div className="space-y-4">
                {[
                  { title: '35+ Years of Experience', desc: 'Decades of expertise across every major technology shift.' },
                  { title: '2500+ Successful Projects', desc: 'A proven track record of delivering results for clients worldwide.' },
                  { title: 'End-to-End Solutions', desc: 'From design to deployment to support—we handle it all.' },
                  { title: 'Transparent Pricing', desc: 'No hidden costs, no surprise invoices. Ever.' },
                  { title: 'Dedicated Support', desc: '24/7 support and maintenance to keep your systems running.' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#4CAF50] mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-[hsl(var(--foreground))]">{item.title}</div>
                      <div className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '99.9%', label: 'Uptime SLA', color: '#00E5FF' },
                  { value: '24/7', label: 'Support', color: '#FF6A00' },
                  { value: '<2hr', label: 'Response Time', color: '#4CAF50' },
                  { value: '100%', label: 'Satisfaction', color: '#9C27B0' }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 text-center"
                  >
                    <div className="text-3xl font-bold font-mono mb-1" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
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
              Ready to <GlitchText className="text-[#FF6A00]">Get Started?</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-xl mx-auto">
              Tell us about your project and we'll show you what's possible.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] text-black hover:from-[#FF8C00] hover:to-[#FFA500] font-semibold px-12"
              >
                Start Your Project <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
