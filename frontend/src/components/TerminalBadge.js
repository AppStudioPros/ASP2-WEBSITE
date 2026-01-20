import { Terminal } from 'lucide-react';

export const TerminalBadge = ({ command, color = '#00E5FF' }) => {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[hsl(var(--border))] bg-black/40 font-mono">
      <Terminal className="w-4 h-4" style={{ color }} />
      <span className="text-sm" style={{ color }}>~/app-studio-pro</span>
      <span className="text-sm text-[hsl(var(--muted-foreground))]">$ {command}</span>
    </div>
  );
};
