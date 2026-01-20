import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const YouTubeVideo = ({ videoId = 'CmXJPPKc3T8', title = 'App Studio Pro Video' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full aspect-video rounded-lg overflow-hidden border border-[hsl(var(--border))] bg-black/40 group"
    >
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      
      {/* Decorative frame corners */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00E5FF] pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00E5FF] pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00E5FF] pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00E5FF] pointer-events-none" />
    </motion.div>
  );
};
