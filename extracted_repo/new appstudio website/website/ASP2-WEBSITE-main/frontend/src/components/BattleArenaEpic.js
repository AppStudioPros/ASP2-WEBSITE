import React, { useState, useRef } from 'react';
import './BattleArenaEpic.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

const FIGHTERS = {
  claude: {
    name: 'CLAUDE',
    color: '#ff6b6b',
    avatar: 'C',
    stance: 'TECHNICAL',
  },
  gpt: {
    name: 'GPT',
    color: '#4cd137',
    avatar: 'G',
    stance: 'BALANCED',
  },
  gemini: {
    name: 'GEMINI',
    color: '#40e0d0',
    avatar: 'M',
    stance: 'AGGRESSIVE',
  },
};

function BattleArenaEpic() {
  const [prompt, setPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [battlePhase, setBattlePhase] = useState('idle');
  
  const [fighters, setFighters] = useState({
    claude: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'left', animation: 'idle' },
    gpt: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'center', animation: 'idle' },
    gemini: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'right', animation: 'idle' },
  });
  
  const [eliminated, setEliminated] = useState(null);
  const [winner, setWinner] = useState(null);
  const [winnerExplanation, setWinnerExplanation] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  
  const calculateScore = (response, startTime, endTime) => {
    const responseTime = (endTime - startTime) / 1000;
    const wordCount = response.split(' ').length;
    
    const speedScore = Math.max(0, 40 - responseTime * 2);
    const detailScore = Math.min(30, wordCount / 10);
    const accuracyScore = Math.min(30, response.length / 50);
    
    return Math.round(speedScore + detailScore + accuracyScore);
  };
  
  const playSound = (soundType) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (soundType === 'punch') {
      oscillator.frequency.value = 100;
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } else if (soundType === 'ko') {
      oscillator.frequency.value = 50;
      gainNode.gain.value = 0.15;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (soundType === 'victory') {
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    }
  };
  
  const handleStartBattle = async () => {
    if (!prompt.trim()) return;

    setIsRunning(true);
    setCollapsed(true);
    setBattlePhase('fighting');
    setEliminated(null);
    setWinner(null);
    
    const startTimes = {
      claude: Date.now(),
      gpt: Date.now(),
      gemini: Date.now(),
    };
    
    setFighters({
      claude: { health: 100, status: 'fighting', response: '', streaming: '', score: 0, position: 'left', animation: 'attack' },
      gpt: { health: 100, status: 'fighting', response: '', streaming: '', score: 0, position: 'center', animation: 'attack' },
      gemini: { health: 100, status: 'fighting', response: '', streaming: '', score: 0, position: 'right', animation: 'attack' },
    });

    try {
      const response = await fetch(`${BACKEND_URL}/api/ai/battle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          session_id: 'epic-battle-' + Date.now(),
        }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const completedResponses = {};

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
                setFighters(prev => ({
                  ...prev,
                  [data.model]: {
                    ...prev[data.model],
                    streaming: prev[data.model].streaming + data.token,
                    animation: 'attack',
                  },
                }));
                
                if (Math.random() > 0.95) playSound('punch');
              }

              if (data.model && data.response) {
                const endTime = Date.now();
                const score = calculateScore(data.response, startTimes[data.model], endTime);
                
                completedResponses[data.model] = {
                  response: data.response,
                  score: score,
                };
                
                setFighters(prev => ({
                  ...prev,
                  [data.model]: {
                    ...prev[data.model],
                    status: 'complete',
                    response: data.response,
                    streaming: '',
                    score: score,
                    animation: 'idle',
                  },
                }));
              }

              if (data.done) {
                const scores = Object.entries(completedResponses).map(([model, data]) => ({
                  model,
                  score: data.score,
                  response: data.response,
                })).sort((a, b) => b.score - a.score);
                
                if (scores.length >= 3) {
                  const eliminated = scores[2].model;
                  setEliminated(eliminated);
                  setBattlePhase('knockout');
                  
                  setFighters(prev => ({
                    ...prev,
                    [eliminated]: {
                      ...prev[eliminated],
                      health: 0,
                      animation: 'ko',
                    },
                  }));
                  
                  playSound('ko');
                  
                  setTimeout(() => {
                    setBattlePhase('final');
                    
                    const finalTwo = scores.slice(0, 2);
                    const winnerModel = finalTwo[0].model;
                    const loserModel = finalTwo[1].model;
                    
                    setFighters(prev => ({
                      ...prev,
                      [winnerModel]: { ...prev[winnerModel], animation: 'victory' },
                      [loserModel]: { ...prev[loserModel], health: 30, animation: 'hit' },
                    }));
                    
                    setTimeout(() => {
                      setWinner(winnerModel);
                      setBattlePhase('winner');
                      playSound('victory');
                      
                      const explanation = `${FIGHTERS[winnerModel].name} WINS!\n\n` +
                        `Score: ${scores[0].score} points\n\n` +
                        `Victory Factors:\n` +
                        `- Speed: ${Math.round((100 - scores[0].score/2))}ms average\n` +
                        `- Detail: ${scores[0].response.split(' ').length} words\n` +
                        `- Accuracy: Comprehensive answer\n\n` +
                        `Defeated: ${FIGHTERS[loserModel].name} (${scores[1].score} pts) and ${FIGHTERS[eliminated].name} (${scores[2].score} pts)`;
                      
                      setWinnerExplanation(explanation);
                      setIsRunning(false);
                    }, 2000);
                  }, 2000);
                }
              }
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.error('Battle error:', error);
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setFighters({
      claude: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'left', animation: 'idle' },
      gpt: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'center', animation: 'idle' },
      gemini: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'right', animation: 'idle' },
    });
    setPrompt('');
    setCollapsed(false);
    setBattlePhase('idle');
    setEliminated(null);
    setWinner(null);
    setWinnerExplanation('');
  };

  return (
    <div className="epic-battle-container" data-testid="epic-battle-arena">
      <div className="epic-battle-controls glass-card">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isRunning && handleStartBattle()}
          placeholder="Enter your challenge (e.g. Explain quantum computing)"
          disabled={isRunning}
          data-testid="epic-battle-prompt"
          className="epic-battle-input"
        />
        <div className="epic-battle-buttons">
          <button
            onClick={handleStartBattle}
            disabled={isRunning || !prompt.trim()}
            data-testid="start-epic-battle"
            className="epic-start-button"
          >
            {isRunning ? 'BATTLE IN PROGRESS...' : 'START EPIC BATTLE'}
          </button>
          <button
            onClick={handleReset}
            disabled={isRunning}
            data-testid="reset-epic-battle"
            className="epic-reset-button"
          >
            RESET ARENA
          </button>
        </div>
      </div>

      {battlePhase !== 'idle' && (
        <div className="battle-phase-indicator">
          {battlePhase === 'fighting' && 'BATTLE IN PROGRESS'}
          {battlePhase === 'knockout' && 'FIRST KNOCKOUT!'}
          {battlePhase === 'final' && 'FINAL SHOWDOWN!'}
          {battlePhase === 'winner' && 'VICTORY!'}
        </div>
      )}

      <div className="fighter-arena">
        {Object.entries(fighters).map(([model, fighter]) => (
          <div 
            key={model} 
            className={`fighter-column ${fighter.animation} ${eliminated === model ? 'eliminated' : ''} ${winner === model ? 'winner' : ''}`}
            data-testid={`fighter-${model}`}
          >
            <div className="pixel-fighter" style={{ borderColor: FIGHTERS[model].color }}>
              <div className="fighter-avatar">{FIGHTERS[model].avatar}</div>
              <div className="fighter-name" style={{ color: FIGHTERS[model].color }}>
                {FIGHTERS[model].name}
              </div>
              <div className="fighter-stance">{FIGHTERS[model].stance}</div>
            </div>
            
            <div className="health-bar-container">
              <div className="health-bar-label">HP</div>
              <div className="health-bar">
                <div 
                  className="health-bar-fill" 
                  style={{ 
                    width: `${fighter.health}%`,
                    backgroundColor: fighter.health > 50 ? FIGHTERS[model].color : '#ff5c7a'
                  }}
                />
              </div>
              <div className="health-bar-value">{fighter.health}</div>
            </div>
            
            {fighter.score > 0 && (
              <div className="fighter-score">
                SCORE: {fighter.score}
              </div>
            )}
            
            {collapsed && fighter.status === 'fighting' && (
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div className="progress-bar-fill" />
                </div>
                <div className="progress-text">Generating response...</div>
              </div>
            )}
            
            {collapsed && (
              <div className="collapsed-answer-box">
                {fighter.status === 'complete' ? 'Response Ready' : 
                 fighter.streaming ? '...' : 'Awaiting...'}
              </div>
            )}
          </div>
        ))}
      </div>

      {winner && (
        <div className="winner-announcement glass-card">
          <pre className="winner-text">{winnerExplanation}</pre>
        </div>
      )}
      
      {!collapsed && Object.values(fighters).some(f => f.response) && (
        <div className="full-responses-grid">
          {Object.entries(fighters).map(([model, fighter]) => (
            fighter.response && (
              <div key={model} className="response-card glass-card" data-testid={`response-${model}`}>
                <div className="response-header" style={{ borderColor: FIGHTERS[model].color }}>
                  <h3 style={{ color: FIGHTERS[model].color }}>{FIGHTERS[model].name}</h3>
                  <span className="response-score">Score: {fighter.score}</span>
                </div>
                <div className="response-content">{fighter.response}</div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}

export default BattleArenaEpic;
