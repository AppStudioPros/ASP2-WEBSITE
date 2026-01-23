import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// 3D Card with rotating icon - inspired by modern tech card design
export const Card3DIcon = ({ 
  icon: Icon, 
  title, 
  description, 
  color = '#00E5FF',
  delay = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative group"
    >
      <div className="relative bg-[#0a0a0a] border border-slate-800 rounded-lg p-6 overflow-hidden h-full">
        
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 rounded-tl-sm" style={{ borderColor: color }} />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 rounded-tr-sm" style={{ borderColor: color }} />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 rounded-bl-sm" style={{ borderColor: color }} />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 rounded-br-sm" style={{ borderColor: color }} />
        
        {/* Side Chevrons */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-30">
          <div className="w-1.5 h-1.5 border-l border-t rotate-[-45deg]" style={{ borderColor: color }} />
          <div className="w-1.5 h-1.5 border-l border-t rotate-[-45deg]" style={{ borderColor: color }} />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 opacity-30">
          <div className="w-1.5 h-1.5 border-r border-t rotate-[45deg]" style={{ borderColor: color }} />
          <div className="w-1.5 h-1.5 border-r border-t rotate-[45deg]" style={{ borderColor: color }} />
        </div>
        
        {/* 3D Rotating Icon Container */}
        <div className="relative z-10 flex flex-col items-center text-center pt-4 pb-2">
          <motion.div
            className="relative mb-4 perspective-1000"
            style={{ perspective: '1000px' }}
          >
            {/* Icon with 3D rotation */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={isInView ? { 
                rotateY: [0, 360],
              } : {}}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "linear",
                delay: delay 
              }}
              style={{ 
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              {/* Glow effect behind icon */}
              <div 
                className="absolute inset-0 blur-xl opacity-30 rounded-full"
                style={{ backgroundColor: color }}
              />
              
              {/* Main Icon */}
              <div 
                className="relative w-16 h-16 flex items-center justify-center rounded-xl"
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                  border: `1px solid ${color}30`
                }}
              >
                <Icon 
                  className="w-8 h-8" 
                  style={{ color: color }}
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>
          </motion.div>
          
          {/* Title */}
          <motion.h3 
            className="text-white text-lg font-semibold mb-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.2, duration: 0.4 }}
          >
            {title}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="text-slate-500 text-sm leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.3, duration: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

// Scroll-triggered card with 3D icon hover effect
export const ScrollCard3D = ({ 
  icon: Icon, 
  title, 
  description, 
  color = '#00E5FF',
  index = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.7, 
        delay: index * 0.1, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className="relative bg-black/40 backdrop-blur-sm border border-slate-800 hover:border-slate-700 rounded-xl p-8 overflow-hidden transition-colors duration-300 h-full">
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Corner Brackets with glow on hover */}
        <motion.div 
          className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 rounded-tl-sm transition-all duration-300"
          style={{ borderColor: color }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div 
          className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 rounded-tr-sm"
          style={{ borderColor: color }}
        />
        <motion.div 
          className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 rounded-bl-sm"
          style={{ borderColor: color }}
        />
        <motion.div 
          className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 rounded-br-sm"
          style={{ borderColor: color }}
        />
        
        {/* 3D Icon with smooth rotation */}
        <div className="relative z-10 mb-6" style={{ perspective: '800px' }}>
          <motion.div
            className="w-20 h-20 mx-auto relative"
            initial={{ rotateY: 0, rotateX: 0 }}
            animate={isInView ? { 
              rotateY: [0, 15, 0, -15, 0],
              rotateX: [0, 5, 0, -5, 0],
            } : {}}
            whileHover={{ 
              rotateY: 180,
              scale: 1.1,
            }}
            transition={{ 
              rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.3 }
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Icon background glow */}
            <motion.div 
              className="absolute inset-0 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"
              style={{ backgroundColor: color }}
            />
            
            {/* Icon container */}
            <div 
              className="relative w-full h-full rounded-2xl flex items-center justify-center"
              style={{ 
                background: `linear-gradient(145deg, ${color}15, transparent)`,
                border: `1px solid ${color}25`,
                boxShadow: `0 4px 20px ${color}10`
              }}
            >
              <Icon 
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110" 
                style={{ color: color }}
                strokeWidth={1.5}
              />
            </div>
          </motion.div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center">
          <motion.h3 
            className="text-white text-xl font-semibold mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-slate-400 text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
        
        {/* Bottom accent line */}
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: '40%' } : {}}
          transition={{ delay: index * 0.1 + 0.5, duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

// Feature card with continuous 3D rotation
export const FeatureCard3D = ({ 
  icon: Icon, 
  title, 
  subtitle,
  color = '#FF6A00',
  index = 0 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15, 
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className="relative group"
      style={{ perspective: '1000px' }}
    >
      <motion.div 
        className="relative bg-gradient-to-br from-slate-900 to-black border border-slate-800 rounded-2xl p-6 overflow-hidden"
        whileHover={{ 
          rotateY: 5, 
          rotateX: -5,
          scale: 1.02,
          borderColor: color + '50'
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Background grid */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(${color}30 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        />
        
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-l border-t" style={{ borderColor: color + '60' }} />
        <div className="absolute top-2 right-2 w-3 h-3 border-r border-t" style={{ borderColor: color + '60' }} />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-l border-b" style={{ borderColor: color + '60' }} />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b" style={{ borderColor: color + '60' }} />
        
        {/* Continuously rotating 3D icon */}
        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            className="relative flex-shrink-0"
            style={{ perspective: '600px' }}
          >
            <motion.div
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center relative"
                style={{ 
                  background: `linear-gradient(135deg, ${color}20, ${color}05)`,
                  border: `1px solid ${color}30`,
                  boxShadow: `0 0 30px ${color}15`
                }}
              >
                <Icon 
                  className="w-7 h-7" 
                  style={{ color }}
                  strokeWidth={1.5}
                />
              </div>
            </motion.div>
          </motion.div>
          
          <div className="flex-1">
            <h4 className="text-white font-semibold text-base mb-1">{title}</h4>
            <p className="text-slate-500 text-xs">{subtitle}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ScrollCard3D;
