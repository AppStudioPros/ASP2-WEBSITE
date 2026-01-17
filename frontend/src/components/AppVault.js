import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, BarChart3, Users, MessageSquare, Calendar, FileText, Lock, ArrowRight, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { HUDFrame, GlitchText } from './GlitchText';

const vaultApps = [
  {
    id: 'crm',
    name: 'AI-Powered CRM',
    icon: Users,
    color: '#00E5FF',
    description: 'Full customer relationship management with AI insights',
    features: ['Contact management', 'Deal pipeline', 'AI lead scoring', 'Email automation'],
    basePrice: '$15K',
    timeline: '1-2 weeks',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&q=80'
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    icon: ShoppingCart,
    color: '#FF6A00',
    description: 'Complete online store with inventory and payments',
    features: ['Product catalog', 'Shopping cart', 'Stripe/PayPal', 'Order management'],
    basePrice: '$20K',
    timeline: '2-3 weeks',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&q=80'
  },
  {
    id: 'dashboard',
    name: 'Analytics Dashboard',
    icon: BarChart3,
    color: '#4CAF50',
    description: 'Real-time data visualization and reporting',
    features: ['Custom charts', 'Real-time updates', 'Export reports', 'Role-based access'],
    basePrice: '$12K',
    timeline: '1-2 weeks',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&q=80'
  },
  {
    id: 'booking',
    name: 'Booking System',
    icon: Calendar,
    color: '#2196F3',
    description: 'Appointment scheduling with calendar sync',
    features: ['Calendar integration', 'Automated reminders', 'Payment collection', 'Staff management'],
    basePrice: '$10K',
    timeline: '1 week',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop&q=80'
  },
  {
    id: 'helpdesk',
    name: 'AI Help Desk',
    icon: MessageSquare,
    color: '#9C27B0',
    description: 'Customer support with AI-powered responses',
    features: ['Ticket system', 'AI chatbot', 'Knowledge base', 'SLA tracking'],
    basePrice: '$18K',
    timeline: '2 weeks',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop&q=80'
  },
  {
    id: 'docs',
    name: 'Document Portal',
    icon: FileText,
    color: '#FF5722',
    description: 'Secure document management and sharing',
    features: ['File storage', 'Version control', 'E-signatures', 'Access controls'],
    basePrice: '$14K',
    timeline: '1-2 weeks',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&q=80'
  },
];

const AppCard = ({ app, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = app.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(app)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={app.image}
          alt={app.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        
        {/* Hover overlay */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <Button size="sm" className="bg-[#00E5FF] text-black font-semibold">
                <Eye className="w-4 h-4 mr-2" /> Preview
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon badge */}
        <div 
          className="absolute top-3 left-3 w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${app.color}20`, border: `1px solid ${app.color}40` }}
        >
          <Icon className="w-5 h-5" style={{ color: app.color }} />
        </div>

        {/* Price badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-bold font-mono">
          From {app.basePrice}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-[hsl(var(--foreground))] mb-1">{app.name}</h4>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">{app.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-[hsl(var(--muted-foreground))]">
            Ready in <strong style={{ color: app.color }}>{app.timeline}</strong>
          </span>
          <ArrowRight className="w-4 h-4 text-[hsl(var(--muted-foreground))] group-hover:text-[#00E5FF] transition-colors" />
        </div>
      </div>
    </motion.div>
  );
};

export const AppVault = ({ className = '' }) => {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <div className={className} data-testid="app-vault">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] mb-6">
          <Lock className="w-4 h-4 text-[#FF6A00]" />
          <span className="text-sm text-[hsl(var(--muted-foreground))] font-mono">WHITE-LABEL READY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          The <GlitchText className="text-[#FF6A00]">App Vault</GlitchText>
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
          Pre-built, battle-tested applications ready for your brand. 
          <strong className="text-[hsl(var(--foreground))]"> Enterprise-ready in days, not months.</strong>
        </p>
      </div>

      {/* App Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaultApps.map((app, i) => (
          <AppCard key={app.id} app={app} index={i} onSelect={setSelectedApp} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10 p-6 rounded-xl border border-[hsl(var(--border))] bg-black/20"
      >
        <p className="text-lg font-semibold text-[hsl(var(--foreground))] mb-2">
          Don't see what you need?
        </p>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          We build custom applications from scratch. Your imagination is the only limit.
        </p>
        <Button className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] text-black font-semibold">
          Request Custom Build
        </Button>
      </motion.div>
    </div>
  );
};

export default AppVault;
