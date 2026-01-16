import React, { useState } from 'react';
import './BattleArena.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function BattleArena() {
  const [prompt, setPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState({
    claude: { status: 'idle', response: '', streaming: '' },
    gpt: { status: 'idle', response: '', streaming: '' },
    gemini: { status: 'idle', response: '', streaming: '' },
  });

  const handleStartBattle = async () => {
    if (!prompt.trim()) return;

    setIsRunning(true);
    setResults({
      claude: { status: 'running', response: '', streaming: '' },
      gpt: { status: 'running', response: '', streaming: '' },
      gemini: { status: 'running', response: '', streaming: '' },
    });

    try {
      const response = await fetch(`${BACKEND_URL}/api/ai/battle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          session_id: 'battle-' + Date.now(),
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.model && data.token) {
                // Update streaming text
                setResults(prev => ({
                  ...prev,
                  [data.model]: {
                    ...prev[data.model],
                    streaming: prev[data.model].streaming + data.token,
                  },
                }));
              }

              if (data.model && data.response) {
                // Model completed
                setResults(prev => ({
                  ...prev,
                  [data.model]: {
                    status: 'complete',
                    response: data.response,
                    streaming: '',
                  },
                }));
              }

              if (data.done) {
                setIsRunning(false);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Battle error:', error);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setResults({
      claude: { status: 'idle', response: '', streaming: '' },
      gpt: { status: 'idle', response: '', streaming: '' },
      gemini: { status: 'idle', response: '', streaming: '' },
    });
    setPrompt('');
  };

  return (
    <div className="battle-arena-container" data-testid="battle-arena">
      {/* Control Panel */}
      <div className="battle-controls glass-card">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isRunning && handleStartBattle()}
          placeholder="Enter your challenge... (e.g., 'Explain quantum computing in simple terms')"
          disabled={isRunning}
          data-testid="battle-prompt"
          className="battle-input"
        />
        <div className="battle-buttons">
          <button
            onClick={handleStartBattle}
            disabled={isRunning || !prompt.trim()}
            data-testid="start-battle"
            className="start-button"
          >
            {isRunning ? '⚔️ Battle Running...' : '⚔️ Start Battle'}
          </button>
          <button
            onClick={handleReset}
            disabled={isRunning}
            data-testid="reset-battle"
            className="reset-button"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Battle Results Grid */}
      <div className="battle-grid">
        {/* Claude */}
        <div className="battle-card glass-card" data-testid="battle-claude">
          <div className="card-header claude">
            <h3>Claude</h3>
            <span className={`status ${results.claude.status}`}>
              {results.claude.status === 'running' ? '⚡' : 
               results.claude.status === 'complete' ? '✅' : '⏸️'}
            </span>
          </div>
          <div className="card-content">
            {results.claude.status === 'idle' && (
              <p className="idle-text">Awaiting battle...</p>
            )}
            {results.claude.status === 'running' && (
              <div className="streaming-response">
                {results.claude.streaming || 'Thinking...'}
                <span className="cursor">▊</span>
              </div>
            )}
            {results.claude.status === 'complete' && (
              <div className="final-response">{results.claude.response}</div>
            )}
          </div>
        </div>

        {/* GPT */}
        <div className="battle-card glass-card" data-testid="battle-gpt">
          <div className="card-header gpt">
            <h3>GPT</h3>
            <span className={`status ${results.gpt.status}`}>
              {results.gpt.status === 'running' ? '⚡' : 
               results.gpt.status === 'complete' ? '✅' : '⏸️'}
            </span>
          </div>
          <div className="card-content">
            {results.gpt.status === 'idle' && (
              <p className="idle-text">Awaiting battle...</p>
            )}
            {results.gpt.status === 'running' && (
              <div className="streaming-response">
                {results.gpt.streaming || 'Thinking...'}
                <span className="cursor">▊</span>
              </div>
            )}
            {results.gpt.status === 'complete' && (
              <div className="final-response">{results.gpt.response}</div>
            )}
          </div>
        </div>

        {/* Gemini */}
        <div className="battle-card glass-card" data-testid="battle-gemini">
          <div className="card-header gemini">
            <h3>Gemini</h3>
            <span className={`status ${results.gemini.status}`}>
              {results.gemini.status === 'running' ? '⚡' : 
               results.gemini.status === 'complete' ? '✅' : '⏸️'}
            </span>
          </div>
          <div className="card-content">
            {results.gemini.status === 'idle' && (
              <p className="idle-text">Awaiting battle...</p>
            )}
            {results.gemini.status === 'running' && (
              <div className="streaming-response">
                {results.gemini.streaming || 'Thinking...'}
                <span className="cursor">▊</span>
              </div>
            )}
            {results.gemini.status === 'complete' && (
              <div className="final-response">{results.gemini.response}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleArena;
