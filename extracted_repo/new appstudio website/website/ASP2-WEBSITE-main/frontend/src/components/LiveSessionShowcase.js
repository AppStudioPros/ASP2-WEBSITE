import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Users, Calendar, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';

const sessions = [
  {
    id: 1,
    title: 'Building an AI Sales Agent',
    description: 'Watch us build a complete AI-powered sales assistant from scratch with our client.',
    duration: '47 min',
    date: 'Jan 12, 2025',
    viewers: '2.4k',
    thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop',
    tags: ['AI Agent', 'Python', 'OpenAI'],
    featured: true,
  },
  {
    id: 2,
    title: 'Real-time Dashboard Build',
    description: 'Creating a live analytics dashboard with WebSockets and React.',
    duration: '32 min',
    date: 'Jan 8, 2025',
    viewers: '1.8k',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop',
    tags: ['React', 'WebSocket', 'Charts'],
    featured: false,
  },
  {
    id: 3,
    title: 'Custom CRM Integration',
    description: 'Integrating HubSpot with a custom backend for automated lead scoring.',
    duration: '55 min',
    date: 'Jan 5, 2025',
    viewers: '1.2k',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=450&fit=crop',
    tags: ['Integration', 'API', 'CRM'],
    featured: false,
  },
];

const VideoCard = ({ session, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-xl overflow-hidden border border-[hsl(var(--border))] bg-[hsl(var(--card))] ${
        session.featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`session-card-${session.id}`}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${session.featured ? 'aspect-video' : 'aspect-video'}`}>
        <img
          src={session.thumbnail}
          alt={session.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Play Button */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className="w-16 h-16 rounded-full bg-[#00E5FF] flex items-center justify-center shadow-lg shadow-[#00E5FF]/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-7 h-7 text-black ml-1" fill="black" />
          </motion.button>
        </motion.div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {session.duration}
        </div>

        {/* Live Badge for featured */}
        {session.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded bg-[#FF6A00] text-black text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            FEATURED
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h4 className={`font-semibold text-[hsl(var(--foreground))] mb-2 ${
          session.featured ? 'text-xl' : 'text-base'
        }`}>
          {session.title}
        </h4>
        <p className={`text-[hsl(var(--muted-foreground))] mb-4 ${
          session.featured ? 'text-base' : 'text-sm line-clamp-2'
        }`}>
          {session.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {session.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-full text-xs bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {session.date}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {session.viewers} views
            </span>
          </div>
          {session.featured && (
            <Button variant="ghost" size="sm" className="text-[#00E5FF] hover:text-[#00E5FF] p-0 h-auto">
              Watch Now <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const LiveSessionShowcase = ({ className = '' }) => {
  return (
    <div className={className} data-testid="live-session-showcase">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session, index) => (
          <VideoCard key={session.id} session={session} index={index} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-10"
      >
        <p className="text-sm text-[hsl(var(--muted-foreground))] mb-4">
          Want to see how we'd build YOUR project?
        </p>
        <Button 
          variant="outline" 
          className="border-[#00E5FF] text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black"
        >
          Book a Live Co-Build Session
        </Button>
      </motion.div>
    </div>
  );
};

export default LiveSessionShowcase;
