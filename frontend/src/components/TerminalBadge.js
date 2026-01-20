import { Terminal } from 'lucide-react';

// Default variant: path is colored, command is grey (for hero section)
// Inverted variant: path is grey, command is colored (for all other sections)
export const TerminalBadge = ({ command, color = '#00E5FF', variant = 'default' }) => {
  const isInverted = variant === 'inverted';
  
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 font-mono">
      <Terminal className="w-4 h-4" style={{ color }} />
      <span 
        className="text-sm" 
        style={{ color: isInverted ? 'hsl(var(--muted-foreground))' : color }}
      >
        ~/app-studio-pro
      </span>
      <span 
        className="text-sm" 
        style={{ color: isInverted ? color : 'hsl(var(--muted-foreground))' }}
      >
        $ {command}
      </span>
    </div>
  );
};
