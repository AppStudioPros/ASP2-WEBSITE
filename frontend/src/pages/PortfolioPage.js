import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { GlitchText } from '../components/GlitchText';
import { TerminalBadge } from '../components/TerminalBadge';
import Layout from '../components/Layout';
import { projects, getAllTags, getAllIndustries } from '../data/projects';

const PortfolioPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const tags = useMemo(() => getAllTags(), []);
  const industries = useMemo(() => getAllIndustries(), []);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      if (selectedTag && !project.tags.includes(selectedTag)) return false;
      if (selectedIndustry && project.industry !== selectedIndustry) return false;
      return true;
    });
  }, [selectedTag, selectedIndustry]);

  const clearFilters = () => {
    setSelectedTag(null);
    setSelectedIndustry(null);
  };

  const hasFilters = selectedTag || selectedIndustry;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,106,0,0.1),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TerminalBadge command="portfolio --all" color="#FF6A00" variant="inverted" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Our <GlitchText className="text-[#FF6A00]">Portfolio</GlitchText>
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
              Explore our diverse portfolio — {projects.length} projects showcasing our expertise in web, mobile, blockchain, and AI development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="flex flex-col gap-6">
            {/* Industry Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Filter by Industry:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(selectedIndustry === industry ? null : industry)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors duration-200 ${
                      selectedIndustry === industry
                        ? 'bg-[#FF6A00] border-[#FF6A00] text-black'
                        : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[#FF6A00] hover:text-[#FF6A00]'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Filter by Technology:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-colors duration-200 ${
                      selectedTag === tag
                        ? 'bg-[#00E5FF] border-[#00E5FF] text-black'
                        : 'border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[#00E5FF] hover:text-[#00E5FF]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {hasFilters && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-[hsl(var(--foreground))]">
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-[#FF6A00] hover:underline"
                >
                  <X className="w-3 h-3" />
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link to={`/portfolio/${project.id}`}>
                  <div className="relative h-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm hover:border-[#FF6A00] transition-all duration-300 overflow-hidden cursor-pointer">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#FF6A00]/20 to-[#00E5FF]/20">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-[#FF6A00] text-black text-xs font-bold rounded">
                          Featured
                        </div>
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-[#FF6A00] flex items-center justify-center">
                          <ExternalLink className="w-6 h-6 text-black" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-1 text-[hsl(var(--foreground))] group-hover:text-[#FF6A00] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                        {project.category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 text-xs rounded border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* No results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[hsl(var(--muted-foreground))] mb-4">
                No projects match your current filters.
              </p>
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-6 max-w-xl mx-auto">
              Let's discuss how we can bring your vision to life with the same quality and attention to detail you've seen in our portfolio.
            </p>
            <Link to="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] text-black hover:from-[#FF5500] hover:to-[#FF7700] font-semibold"
              >
                Start a Conversation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioPage;
