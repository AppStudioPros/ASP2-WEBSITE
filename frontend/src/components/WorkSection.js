import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { GlitchText } from './GlitchText';
import { TerminalBadge } from './TerminalBadge';

const projects = [
  {
    id: 'pocketfiler',
    title: 'PocketFiler',
    category: 'Document Management System (DMS)',
    image: 'https://customer-assets.emergentagent.com/job_frontend-wow/artifacts/u74mjn3m_PocketFiler1.png',
    tags: ['Web App', 'Enterprise']
  },
  {
    id: 'pk-page',
    title: 'PK.Page',
    category: 'Digital Marketing Agency',
    image: 'https://customer-assets.emergentagent.com/job_frontend-wow/artifacts/evnt6e9r__pk.page.png',
    tags: ['Marketing', 'Website']
  },
  {
    id: 'gaya-blockchain',
    title: 'Gaya Blockchain',
    category: 'Layer 1 Blockchain',
    image: 'https://customer-assets.emergentagent.com/job_frontend-wow/artifacts/1xs2a3t4_gaya%20blockchain.png',
    tags: ['Web3', 'Blockchain']
  },
  {
    id: 'evox-network',
    title: 'Evox Network',
    category: 'RWA Tokenization Platform',
    image: 'https://customer-assets.emergentagent.com/job_frontend-wow/artifacts/0wlud7wf__evox.png',
    tags: ['Web3', 'Tokenization']
  },
  {
    id: 'atherix',
    title: 'Atherix',
    category: 'Healthcare Technology Platform',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    tags: ['Healthcare', 'Platform']
  },
  {
    id: 'appstudiopro',
    title: 'App Studio Pro',
    category: 'Company Website',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    tags: ['Website', 'Agency']
  }
];

export const WorkSection = () => {
  return (
    <section 
      id="work"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden border-t border-[hsl(var(--border))]"
      data-testid="work-section"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,106,0,0.06),transparent_60%)] pointer-events-none" />
      
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TerminalBadge command="portfolio" color="#FF6A00" variant="inverted" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <GlitchText className="text-[#FF6A00]">Our Latest Work</GlitchText>
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mx-auto">
            Explore our diverse portfolio — highlighting our expertise in website and app design
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Link to={`/projects/${project.id}`} data-testid={`home-project-${project.id}`}>
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
                      {project.tags.map((tag, tagIndex) => (
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/projects">
            <Button 
              size="lg"
              variant="outline"
              className="border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black transition-colors duration-200"
              data-testid="explore-all-projects-btn"
            >
              Explore All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
