import { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Rocket, Building2, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { HUDFrame } from './GlitchText';

const budgetTiers = [
  {
    min: 5000,
    max: 24999,
    name: 'Starter',
    icon: Sparkles,
    color: '#00E5FF',
    timeline: '2-4 weeks',
    features: [
      'Landing page or simple app',
      'Core functionality',
      'Mobile responsive',
      'Basic integrations',
    ],
    perfect: 'MVPs, landing pages, simple tools'
  },
  {
    min: 25000,
    max: 74999,
    name: 'Growth',
    icon: Rocket,
    color: '#2196F3',
    timeline: '6-12 weeks',
    features: [
      'Full web application',
      'User authentication',
      'Database & API',
      'Admin dashboard',
      'Third-party integrations',
    ],
    perfect: 'SaaS apps, marketplaces, portals'
  },
  {
    min: 75000,
    max: 199999,
    name: 'Scale',
    icon: Building2,
    color: '#FF6A00',
    timeline: '3-6 months',
    features: [
      'Complex multi-feature platform',
      'AI/ML integrations',
      'Real-time features',
      'Advanced security',
      'Performance optimization',
      'Dedicated support',
    ],
    perfect: 'Enterprise apps, AI platforms, complex SaaS'
  },
  {
    min: 200000,
    max: 500000,
    name: 'Enterprise',
    icon: Building2,
    color: '#4CAF50',
    timeline: '6+ months',
    features: [
      'Full enterprise solution',
      'Custom AI agents',
      'Multi-tenant architecture',
      'Compliance & security audit',
      'Ongoing maintenance',
      'Dedicated engineering team',
      'White-label options',
    ],
    perfect: 'Large-scale platforms, enterprise transformation'
  },
];

export const BudgetCalculator = ({ className = '' }) => {
  // Define the exact marker values
  const markerValues = [5000, 25000, 75000, 200000, 500000];
  const [sliderPosition, setSliderPosition] = useState([1]); // Index into markerValues (0-4)
  
  // Get the actual budget value from the slider position
  const currentBudget = markerValues[sliderPosition[0]];
  const currentTier = budgetTiers.find(t => currentBudget >= t.min && currentBudget <= t.max) || budgetTiers[0];
  const TierIcon = currentTier.icon;

  const formatBudget = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className={`${className}`} data-testid="budget-calculator">
      <HUDFrame title="Budget Analysis" className="bg-black/20 border border-[hsl(var(--border))] rounded-xl">
        <div className="space-y-6">
          {/* Budget Display */}
          <div className="text-center">
            <div className="text-sm text-[hsl(var(--muted-foreground))] mb-2 font-mono">YOUR INVESTMENT</div>
            <motion.div
              key={currentBudget}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold font-mono"
              style={{ color: currentTier.color }}
            >
              {formatBudget(currentBudget)}
            </motion.div>
          </div>

          {/* Slider */}
          <div className="px-4">
            <Slider
              value={sliderPosition}
              onValueChange={setSliderPosition}
              min={0}
              max={4}
              step={1}
              className="[&_[role=slider]]:bg-[#00E5FF] [&_[role=slider]]:border-0 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5"
            />
            <div className="flex justify-between mt-2 text-xs text-[hsl(var(--muted-foreground))] font-mono">
              <span>$5K</span>
              <span>$25K</span>
              <span>$75K</span>
              <span>$200K</span>
              <span>$500K</span>
            </div>
          </div>

          {/* Current Tier Info */}
          <motion.div
            key={currentTier.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg border border-[hsl(var(--border))] bg-black/30"
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${currentTier.color}20` }}
              >
                <TierIcon className="w-6 h-6" style={{ color: currentTier.color }} />
              </div>
              <div>
                <h4 className="text-lg font-bold" style={{ color: currentTier.color }}>
                  {currentTier.name} Package
                </h4>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  Timeline: {currentTier.timeline}
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {currentTier.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]"
                >
                  <Check className="w-4 h-4" style={{ color: currentTier.color }} />
                  {feature}
                </motion.div>
              ))}
            </div>

            <div className="text-xs text-[hsl(var(--muted-foreground))] p-2 rounded bg-black/20">
              <strong>Perfect for:</strong> {currentTier.perfect}
            </div>
          </motion.div>

          {/* CTA */}
          <div className="text-center space-y-3">
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              No hidden costs. No surprise invoices. <strong className="text-[hsl(var(--foreground))]">Ever.</strong>
            </p>
            <Button 
              className="w-full h-12 bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black font-semibold"
            >
              Get Exact Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </HUDFrame>
    </div>
  );
};

export default BudgetCalculator;
