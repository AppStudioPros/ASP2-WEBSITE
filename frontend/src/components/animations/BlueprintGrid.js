import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const BlueprintGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.15 }}>
      {/* Blueprint Grid Pattern */}
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="blueprint-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern id="blueprint-grid-major" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="url(#blueprint-grid)" />
            <path
              d="M 200 0 L 0 0 0 200"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid-major)" />
      </svg>
    </div>
  );
};