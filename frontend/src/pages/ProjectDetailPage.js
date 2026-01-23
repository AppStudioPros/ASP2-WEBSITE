import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Layers, Building2, Wrench } from 'lucide-react';
import { GlitchText } from '../components/GlitchText';
import { TerminalBadge } from '../components/TerminalBadge';
import { getProjectById, projects } from '../data/projects';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(slug);

  // If project not found, show error state
  if (!project) {
    return (
      <section className="relative pt-32 pb-24 min-h-screen" data-testid="project-not-found">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-[hsl(var(--foreground))]">
              Project Not Found
            </h1>
            <p className="text-[hsl(var(--muted-foreground))] mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/projects"
              className="inline-flex items-center gap-2 text-[#FF6A00] hover:text-[#FF8C00] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Get related projects (same industry or tags)
  const relatedProjects = projects
    .filter(p => p.id !== project.id && (
      p.industry === project.industry || 
      p.tags.some(tag => project.tags.includes(tag))
    ))
    .slice(0, 3);

  return (
    <>
      {/* Hero Section with Project Image */}
      <section 
        className="relative pt-24 pb-12 sm:pb-16 overflow-hidden"
        data-testid="project-detail-hero"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,106,0,0.08),transparent_60%)] pointer-events-none" />
        
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <button 
              onClick={() => navigate('/projects')}
              className="inline-flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[#FF6A00] transition-colors group"
              data-testid="back-to-projects"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to All Projects
            </button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Project Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TerminalBadge command="case_study" color="#FF6A00" variant="inverted" />
              
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 mt-4">
                <GlitchText className="text-[hsl(var(--foreground))]" pattern={0}>
                  {project.title}
                </GlitchText>
              </h1>
              
              <p className="text-xl text-[#FF6A00] font-medium mb-6">
                {project.category}
              </p>
              
              <p className="text-[hsl(var(--muted-foreground))] text-lg mb-8 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 text-sm rounded-full border border-[#FF6A00]/30 text-[#FF6A00] font-mono bg-[#FF6A00]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Project Meta */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50">
                  <div className="flex items-center gap-2 text-[#00E5FF] mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase">Year</span>
                  </div>
                  <p className="text-[hsl(var(--foreground))] font-semibold">{project.year}</p>
                </div>
                <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50">
                  <div className="flex items-center gap-2 text-[#00E5FF] mb-2">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase">Platform</span>
                  </div>
                  <p className="text-[hsl(var(--foreground))] font-semibold">{project.platform}</p>
                </div>
                <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50">
                  <div className="flex items-center gap-2 text-[#FF6A00] mb-2">
                    <Building2 className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase">Industry</span>
                  </div>
                  <p className="text-[hsl(var(--foreground))] font-semibold">{project.industry}</p>
                </div>
                <div className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50">
                  <div className="flex items-center gap-2 text-[#FF6A00] mb-2">
                    <Wrench className="w-4 h-4" />
                    <span className="text-xs font-mono uppercase">Services</span>
                  </div>
                  <p className="text-[hsl(var(--foreground))] font-semibold text-sm">
                    {project.services.slice(0, 2).join(', ')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - Project Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden border border-[hsl(var(--border))] shadow-2xl shadow-[#FF6A00]/10">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full aspect-video object-cover"
                  data-testid="project-hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#FF6A00]/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#00E5FF]/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Full Description Section */}
      <section 
        className="py-16 sm:py-24 border-t border-[hsl(var(--border))]"
        data-testid="project-detail-content"
      >
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px]">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[hsl(var(--foreground))]">
                Project <GlitchText className="text-[#FF6A00]" pattern={1}>Overview</GlitchText>
              </h2>
              <div className="prose prose-invert max-w-none">
                {project.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="sticky top-24 space-y-6">
                {/* Services Used */}
                <div className="p-6 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50">
                  <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--foreground))]">
                    Services Provided
                  </h3>
                  <ul className="space-y-3">
                    {project.services.map((service, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FF6A00]" />
                        <span className="text-[hsl(var(--muted-foreground))]">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Card */}
                <div className="p-6 rounded-xl border border-[#FF6A00]/30 bg-gradient-to-br from-[#FF6A00]/5 to-transparent">
                  <h3 className="text-lg font-semibold mb-2 text-[hsl(var(--foreground))]">
                    Want Something Similar?
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                    Let's discuss how we can build your next project.
                  </p>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 w-full justify-center px-4 py-3 rounded-lg bg-[#FF6A00] text-black font-semibold hover:bg-[#FF8C00] transition-colors"
                    data-testid="project-cta"
                  >
                    Start a Project
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section 
          className="py-16 sm:py-24 border-t border-[hsl(var(--border))]"
          data-testid="related-projects"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,106,0,0.04),transparent_60%)] pointer-events-none" />
          
          <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-[1200px] relative z-10">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Related <GlitchText className="text-[#FF6A00]" pattern={2}>Projects</GlitchText>
              </h2>
              <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
                Explore more of our work in similar industries and technologies.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link to={`/projects/${relatedProject.id}`}>
                    <div className="relative h-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]/50 backdrop-blur-sm hover:border-[#FF6A00] transition-all duration-300 overflow-hidden cursor-pointer">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#FF6A00]/20 to-[#00E5FF]/20">
                        <img 
                          src={relatedProject.image} 
                          alt={relatedProject.title}
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
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
                          {relatedProject.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {relatedProject.tags.slice(0, 2).map((tag, tagIndex) => (
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

            {/* View All CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link 
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black transition-colors duration-200 font-semibold"
              >
                View All Projects
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProjectDetailPage;
