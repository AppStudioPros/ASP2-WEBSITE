import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, Building2, User, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GlitchText } from '../components/GlitchText';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    value: '720-276-0797',
    link: 'tel:720-276-0797',
    color: '#00E5FF'
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@appstudiopro.com',
    link: 'mailto:info@appstudiopro.com',
    color: '#FF6A00'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    value: 'Mon - Fri: 9AM - 6PM MST',
    link: null,
    color: '#4CAF50'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Denver, Colorado',
    link: null,
    color: '#9C27B0'
  }
];

const projectTypes = [
  'Website Development',
  'Mobile App Development',
  'UI/UX Design',
  'AI/ML Integration',
  'Custom Software',
  'Web3/Blockchain',
  'Other'
];

const budgetRanges = [
  'Under $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+'
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully!', {
      description: "We'll get back to you within 24 hours."
    });

    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      projectType: '',
      budget: '',
      timeline: '',
      message: ''
    });
    setIsSubmitting(false);
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 mb-6 font-mono">
              <MessageSquare className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm text-[#00E5FF]">CONTACT_US</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Let's Build Something <GlitchText className="gradient-text-brand">Amazing</GlitchText>
            </h1>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
              Have a project in mind? We'd love to hear about it. Drop us a message and 
              we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 hover:border-[#00E5FF] transition-colors h-full">
                  <Icon className="w-6 h-6 mb-3" style={{ color: info.color }} />
                  <div className="text-sm text-[hsl(var(--muted-foreground))] mb-1">{info.title}</div>
                  <div className="font-semibold text-[hsl(var(--foreground))]">{info.value}</div>
                </div>
              );

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {info.link ? (
                    <a href={info.link} className="block h-full">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[hsl(var(--foreground))]">
                Tell Us About Your Project
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF]"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      <Building2 className="w-4 h-4 inline mr-2" />
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF]"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF]"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Project Type & Budget Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] focus:outline-none focus:border-[#00E5FF]"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] focus:outline-none focus:border-[#00E5FF]"
                    >
                      <option value="">Select your budget</option>
                      {budgetRanges.map((range, index) => (
                        <option key={index} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Expected Timeline
                  </label>
                  <input
                    type="text"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF]"
                    placeholder="e.g., 3 months, Q1 2025"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[hsl(var(--foreground))] mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF] resize-none"
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold h-12 text-base"
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Right Side - Why Work With Us */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[hsl(var(--foreground))]">
                Why Work With Us?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: 'Fast Response Time',
                    description: 'We respond to all inquiries within 24 hours. Your project is important to us.',
                    color: '#00E5FF'
                  },
                  {
                    title: 'Free Consultation',
                    description: 'Get a complimentary 30-minute strategy session to discuss your project needs.',
                    color: '#FF6A00'
                  },
                  {
                    title: 'Transparent Pricing',
                    description: 'No hidden fees. We provide detailed quotes with clear breakdowns.',
                    color: '#4CAF50'
                  },
                  {
                    title: 'Proven Track Record',
                    description: '35+ years of experience and 2500+ successful projects delivered.',
                    color: '#9C27B0'
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50"
                  >
                    <div 
                      className="w-2 h-2 rounded-full mb-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8 p-6 rounded-lg border border-[hsl(var(--border))] bg-gradient-to-br from-[#00E5FF]/10 to-[#FF6A00]/10">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  {[
                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/appstudiopro' },
                    { name: 'X (Twitter)', url: 'https://x.com/AppStudioPro' },
                    { name: 'YouTube', url: 'https://youtube.com/@appstudioproofficial' },
                    { name: 'Instagram', url: 'https://www.instagram.com/appstudiopro' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded border border-[hsl(var(--border))] text-sm text-[hsl(var(--muted-foreground))] hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
