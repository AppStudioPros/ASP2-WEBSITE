import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, Bell, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GlitchText } from '../components/GlitchText';
import { TerminalBadge } from '../components/TerminalBadge';
import { toast } from 'sonner';

const BlogPage = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setIsSubscribing(true);

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Successfully subscribed!', {
          description: data.message || "Check your email for a welcome message."
        });
        setNewsletterEmail('');
      } else {
        toast.error('Subscription failed', {
          description: data.detail || 'Please try again.'
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Connection error', {
        description: 'Please check your connection and try again.'
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <>
      {/* Hero Section - Coming Soon */}
      <section className="relative pt-32 pb-24 sm:pb-32 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(0,229,255,0.15),rgba(0,0,0,0)_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_60%,rgba(255,106,0,0.08),rgba(0,0,0,0)_70%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <TerminalBadge command="blog" color="#00E5FF" variant="inverted" />
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 mt-8">
              <GlitchText className="gradient-text-brand" pattern={0}>Coming Soon</GlitchText>
            </h1>
            
            <p className="text-xl sm:text-2xl text-[hsl(var(--muted-foreground))] mb-12 max-w-2xl mx-auto leading-relaxed">
              We're crafting compelling content about technology, design, and innovation. 
              Get notified when we launch!
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: Calendar,
                  title: 'Weekly Insights',
                  description: 'Fresh perspectives on web development, AI, and digital innovation',
                  color: '#00E5FF'
                },
                {
                  icon: Sparkles,
                  title: 'Expert Tips',
                  description: 'Practical advice from 35+ years of building digital solutions',
                  color: '#FF6A00'
                },
                {
                  icon: Bell,
                  title: 'Launch Updates',
                  description: 'Be the first to know when new content drops',
                  color: '#4CAF50'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="relative p-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm overflow-hidden group hover:border-[#00E5FF] transition-all duration-300"
                  >
                    {/* Background Icon */}
                    <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
                      <Icon 
                        className="w-32 h-32" 
                        style={{ color: feature.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold mb-2 text-[hsl(var(--foreground))]">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#FF6A00]/10 rounded-xl border border-[hsl(var(--border))] p-8 sm:p-12"
            >
              <Mail className="w-12 h-12 text-[#00E5FF] mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Get <GlitchText className="text-[#FF6A00]" pattern={1}>Notified</GlitchText>
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-xl mx-auto">
                Subscribe to be the first to know when we publish our insights on technology, 
                innovation, and digital transformation.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    disabled={isSubscribing}
                    className="flex-1 px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF]"
                  />
                  <Button 
                    type="submit"
                    disabled={isSubscribing}
                    className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold px-8"
                  >
                    {isSubscribing ? 'Subscribing...' : 'Notify Me'}
                  </Button>
                </div>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4">
                  Join our community. No spam, just quality insights.
                </p>
              </form>
            </motion.div>

            {/* Coming Soon Timeline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-16 text-center"
            >
              <p className="text-sm text-[hsl(var(--muted-foreground))] font-mono">
                <span className="text-[#4CAF50]">status:</span> building amazing content | 
                <span className="text-[#00E5FF]"> launch:</span> coming soon
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
