import { motion } from 'framer-motion';
import { FileText, Clock, User, ArrowRight, Tag, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GlitchText } from '../components/GlitchText';
import { TerminalBadge } from '../components/TerminalBadge';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI in Web Development',
    excerpt: 'Explore how artificial intelligence is revolutionizing the way we build and interact with websites, from intelligent code completion to automated testing.',
    author: 'Tim Kipp',
    date: 'December 15, 2024',
    readTime: '8 min read',
    category: 'AI & Technology',
    image: null,
    color: '#00E5FF'
  },
  {
    id: 2,
    title: 'Building Scalable Mobile Apps: Best Practices',
    excerpt: 'Learn the architectural patterns and development practices that ensure your mobile application can grow with your user base.',
    author: 'Jimmy Laramie',
    date: 'December 10, 2024',
    readTime: '12 min read',
    category: 'Mobile Development',
    image: null,
    color: '#FF6A00'
  },
  {
    id: 3,
    title: 'Web3 Explained: A Practical Guide for Businesses',
    excerpt: 'Demystifying blockchain technology and decentralized applications for business leaders looking to understand the next evolution of the web.',
    author: 'Tim Kipp',
    date: 'December 5, 2024',
    readTime: '10 min read',
    category: 'Web3 & Blockchain',
    image: null,
    color: '#9C27B0'
  },
  {
    id: 4,
    title: 'UI/UX Trends That Will Define 2025',
    excerpt: 'From glassmorphism to AI-powered personalization, discover the design trends that will shape user experiences in the coming year.',
    author: 'Jimmy Laramie',
    date: 'November 28, 2024',
    readTime: '6 min read',
    category: 'Design',
    image: null,
    color: '#4CAF50'
  },
  {
    id: 5,
    title: 'Securing Your Application: A Developer\'s Checklist',
    excerpt: 'Essential security practices every developer should implement to protect their applications and user data from common vulnerabilities.',
    author: 'Tim Kipp',
    date: 'November 20, 2024',
    readTime: '15 min read',
    category: 'Security',
    image: null,
    color: '#00E5FF'
  },
  {
    id: 6,
    title: 'The ROI of Custom Software vs. Off-the-Shelf Solutions',
    excerpt: 'A detailed analysis of when it makes sense to invest in custom development versus adopting existing solutions for your business needs.',
    author: 'Jimmy Laramie',
    date: 'November 15, 2024',
    readTime: '9 min read',
    category: 'Business Strategy',
    image: null,
    color: '#FF6A00'
  }
];

const categories = [
  'All Posts',
  'AI & Technology',
  'Mobile Development',
  'Web3 & Blockchain',
  'Design',
  'Security',
  'Business Strategy'
];

const BlogPage = () => {
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
            <TerminalBadge command="blog" color="#00E5FF" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 mt-6">
              Insights & <GlitchText className="gradient-text-brand">Ideas</GlitchText>
            </h1>
            <p className="text-lg text-[hsl(var(--muted-foreground))] mb-8">
              Thoughts on technology, design, and building great digital products. 
              Straight from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full sm:w-80 pl-10 pr-4 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.slice(0, 4).map((category, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    index === 0
                      ? 'bg-[#00E5FF] text-black'
                      : 'border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[#00E5FF] hover:text-[#00E5FF]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-xl border border-[hsl(var(--border))] bg-gradient-to-br from-[#00E5FF]/10 via-transparent to-[#FF6A00]/10 overflow-hidden"
          >
            <div className="p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] text-sm mb-4">
                <Tag className="w-3 h-3" />
                Featured
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[hsl(var(--foreground))]">
                {blogPosts[0].title}
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] mb-6 max-w-2xl">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] mb-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {blogPosts[0].readTime}
                </div>
                <div>{blogPosts[0].date}</div>
              </div>
              <Button
                className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold"
              >
                Read Article <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="h-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 hover:border-[#00E5FF] transition-all duration-300 overflow-hidden">
                  {/* Placeholder Image */}
                  <div 
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: `${post.color}15` }}
                  >
                    <FileText className="w-16 h-16 opacity-30" style={{ color: post.color }} />
                  </div>

                  <div className="p-6">
                    {/* Category Tag */}
                    <div 
                      className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-mono mb-3"
                      style={{ backgroundColor: `${post.color}20`, color: post.color }}
                    >
                      <Tag className="w-3 h-3" />
                      {post.category}
                    </div>

                    <h3 className="text-lg font-semibold mb-2 text-[hsl(var(--foreground))] group-hover:text-[#00E5FF] transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              variant="outline"
              size="lg"
              className="border-[hsl(var(--border))] text-[hsl(var(--foreground))] hover:border-[#00E5FF] hover:text-[#00E5FF]"
            >
              Load More Articles
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 sm:py-24 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Stay <GlitchText className="text-[#00E5FF]">Updated</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-8">
              Get the latest insights delivered to your inbox. No spam, just quality content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[#00E5FF] w-full sm:w-80"
              />
              <Button 
                className="bg-gradient-to-r from-[#00E5FF] to-[#2196F3] text-black hover:from-[#00B8D4] hover:to-[#1976D2] font-semibold px-8"
              >
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-4">
              By subscribing, you agree to our Privacy Policy
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
