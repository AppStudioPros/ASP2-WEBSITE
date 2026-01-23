import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlitchText } from '../components/GlitchText';
import { TerminalBadge } from '../components/TerminalBadge';
import { projects } from '../data/projects';

const AllProjectsPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-16 sm:pb-24 overflow-hidden"
        data-testid="all-projects-hero"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.08),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TerminalBadge command="portfolio" color="#FF6A00" variant="inverted" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <GlitchText className="text-[#FF6A00]" pattern={1}>Our Work</GlitchText>
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
              Explore our diverse portfolio — highlighting our expertise in website and app design. 
              Each project represents our commitment to excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section 
        className="py-8 sm:py-16 relative overflow-hidden border-t border-[hsl(var(--border))]"
        data-testid="all-projects-grid"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,106,0,0.04),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
                data-testid={`project-card-${project.id}`}
              >
                <Link to={`/projects/${project.id}`}>
                  <div className="relative h-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm hover:border-[#FF6A00] transition-all duration-300 overflow-hidden cursor-pointer">
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#FF6A00]/20 to-[#00E5FF]/20">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-[#FF6A00] flex items-center justify-center">
                          <ExternalLink className="w-6 h-6 text-black" />
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 text-xs rounded bg-[#FF6A00] text-black font-semibold">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-1 text-[hsl(var(--foreground))]">
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
              Ready to Build <GlitchText className="text-[#FF6A00]" pattern={2}>Something Great?</GlitchText>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] mb-8 max-w-xl mx-auto">
              Let's discuss your project and turn your vision into reality.
            </p>
            <Link to="/contact">
              <button className="bg-gradient-to-r from-[#FF6A00] to-[#FF8C00] text-black hover:from-[#FF8C00] hover:to-[#FFA500] font-semibold px-12 py-4 rounded-lg text-lg transition-all duration-200">
                Start Your Project
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AllProjectsPage;
