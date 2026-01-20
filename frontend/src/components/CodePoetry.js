import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const codeSnippets = [
  {
    language: 'python',
    title: 'AI Agent Core',
    code: `class AIAgent:
    def __init__(self, model="gpt-4"):
        self.model = model
        self.memory = VectorStore()
        
    async def think(self, context):
        """Process context through reasoning chain"""
        thoughts = await self.reason(context)
        actions = self.plan(thoughts)
        return await self.execute(actions)
        
    async def execute(self, actions):
        results = []
        for action in actions:
            result = await action.run()
            self.memory.store(result)
            results.append(result)
        return results`
  },
  {
    language: 'javascript',
    title: 'Real-time Sync Engine',
    code: `const syncEngine = {
  async broadcast(event, data) {
    const clients = await this.getActiveClients();
    const payload = encrypt(JSON.stringify(data));
    
    return Promise.all(
      clients.map(client => 
        client.send({
          type: event,
          payload,
          timestamp: Date.now()
        })
      )
    );
  },
  
  subscribe(channel, handler) {
    this.handlers.set(channel, handler);
    return () => this.handlers.delete(channel);
  }
};`
  },
  {
    language: 'typescript',
    title: 'Type-Safe API Layer',
    code: `interface APIResponse<T> {
  data: T;
  meta: { timestamp: number };
  errors?: APIError[];
}

async function fetchWithRetry<T>(
  endpoint: string,
  options: RequestOptions
): Promise<APIResponse<T>> {
  const maxRetries = 3;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(endpoint, options);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(Math.pow(2, i) * 1000);
    }
  }
}`
  }
];

export const CodePoetry = ({ className = '' }) => {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef(null);

  const snippet = codeSnippets[currentSnippet];
  const lines = snippet.code.split('\n');

  useEffect(() => {
    // Reset when snippet changes
    setVisibleLines(0);
    setIsTyping(true);

    // Type out lines one by one
    intervalRef.current = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= lines.length) {
          clearInterval(intervalRef.current);
          setIsTyping(false);
          
          // Move to next snippet after a delay
          setTimeout(() => {
            setCurrentSnippet(prev => (prev + 1) % codeSnippets.length);
          }, 3000);
          
          return prev;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(intervalRef.current);
  }, [currentSnippet, lines.length]);

  const visibleCode = lines.slice(0, visibleLines).join('\n');

  const customStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: 0,
      fontSize: '13px',
      lineHeight: '1.6',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'transparent',
      fontFamily: '"Source Code Pro", monospace',
    }
  };

  return (
    <div 
      className={`p-6 sm:p-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden ${className}`}
      data-testid="code-poetry"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Window controls */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">
            {snippet.title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isTyping && (
            <motion.div
              className="w-2 h-2 rounded-full bg-[#00E5FF]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
          <span className="text-xs text-[hsl(var(--muted-foreground))] uppercase">
            {snippet.language}
          </span>
        </div>
      </div>

      {/* Code display - FIXED HEIGHT */}
      <div 
        className="relative h-[320px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.02) 100%)'
        }}
      >
        {/* Line numbers */}
        <div className="absolute left-0 top-0 text-right pr-4 select-none">
          {lines.slice(0, visibleLines).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="text-xs text-[hsl(var(--muted-foreground))] leading-[1.6] h-[20.8px]"
              style={{ fontFamily: '"Source Code Pro", monospace' }}
              data-testid="code-poetry-line"
            >
              {i + 1}
            </motion.div>
          ))}
        </div>

        {/* Code content */}
        <div className="pl-10">
          <SyntaxHighlighter
            language={snippet.language}
            style={customStyle}
            showLineNumbers={false}
            wrapLines={true}
            lineProps={(lineNumber) => ({
              style: {
                opacity: lineNumber <= visibleLines ? 1 : 0,
                transition: 'opacity 0.2s ease-in'
              }
            })}
          >
            {visibleCode || ' '}
          </SyntaxHighlighter>
        </div>

        {/* Typing cursor */}
        {isTyping && visibleLines > 0 && (
          <motion.div
            className="absolute w-2 h-5 bg-[#00E5FF]"
            style={{
              left: `calc(2.5rem + ${(lines[visibleLines - 1]?.length || 0) * 7.8}px)`,
              top: `${(visibleLines - 1) * 20.8}px`
            }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[hsl(var(--card))] to-transparent pointer-events-none" />
      </div>

      {/* Snippet navigation dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {codeSnippets.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSnippet(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === currentSnippet 
                ? 'bg-[#00E5FF] w-4' 
                : 'bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted-foreground))]'
            }`}
            aria-label={`View snippet ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CodePoetry;
