import React, { useState, useEffect, useRef } from 'react';
import './BattleArenaEpic.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// Fighter configurations
const FIGHTERS = {
  claude: {
    name: 'CLAUDE',
    color: '#ff6b6b',
    avatar: '🥊',
    stance: 'TECHNICAL',
  },
  gpt: {
    name: 'GPT',
    color: '#4cd137',
    avatar: '⚡',
    stance: 'BALANCED',
  },
  gemini: {
    name: 'GEMINI',
    color: '#40e0d0',
    avatar: '🌟',
    stance: 'AGGRESSIVE',
  },
};

function BattleArenaEpic() {
  const [prompt, setPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [battlePhase, setBattlePhase] = useState('idle'); // idle, fighting, knockout, winner
  
  // Fighter states
  const [fighters, setFighters] = useState({
    claude: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'left', animation: 'idle' },
    gpt: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'center', animation: 'idle' },
    gemini: { health: 100, status: 'ready', response: '', streaming: '', score: 0, position: 'right', animation: 'idle' },
  });
  
  const [eliminated, setEliminated] = useState(null);
  const [winner, setWinner] = useState(null);
  const [winnerExplanation, setWinnerExplanation] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  
  // Audio refs
  const audioRef = useRef({
    bgMusic: null,
    punch: null,
    ko: null,
    victory: null,
  });
  
  // Score calculation based on speed, detail, accuracy
  const calculateScore = (response, startTime, endTime) => {
    const responseTime = (endTime - startTime) / 1000; // seconds
    const wordCount = response.split(' ').length;
    
    // Speed score (faster = better, max 40 points)
    const speedScore = Math.max(0, 40 - responseTime * 2);
    
    // Detail score (more words = better, max 30 points)
    const detailScore = Math.min(30, wordCount / 10);
    
    // Accuracy score (simplified - length indicates comprehensiveness, max 30 points)
    const accuracyScore = Math.min(30, response.length / 50);
    
    return Math.round(speedScore + detailScore + accuracyScore);
  };
  
  const playSound = (soundType) => {
    // Web Audio API sounds (simple beeps for now)
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
        const lines = chunk.split('\\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.model && data.token) {
                // Update streaming
                setFighters(prev => ({
                  ...prev,
                  [data.model]: {
                    ...prev[data.model],
                    streaming: prev[data.model].streaming + data.token,
                    animation: 'attack',
                  },
                }));
                
                // Punch sound occasionally
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
                // Determine winner
                const scores = Object.entries(completedResponses).map(([model, data]) => ({
                  model,
                  score: data.score,
                  response: data.response,
                })).sort((a, b) => b.score - a.score);
                
                if (scores.length >= 3) {
                  // First elimination
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
                  
                  // Wait then final battle
                  setTimeout(() => {
                    setBattlePhase('final');
                    
                    // Final battle animation
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
                      
                      // Generate explanation
                      const explanation = `${FIGHTERS[winnerModel].name} WINS! 🏆\\n\\n` +
                        `Score: ${scores[0].score} points\\n\\n` +
                        `Victory Factors:\\n` +
                        `✓ Speed: ${Math.round((100 - scores[0].score/2))}ms average\\n` +
                        `✓ Detail: ${scores[0].response.split(' ').length} words\\n` +
                        `✓ Accuracy: Comprehensive answer\\n\\n` +
                        `Defeated: ${FIGHTERS[loserModel].name} (${scores[1].score} pts) and ${FIGHTERS[eliminated].name} (${scores[2].score} pts)`;
                      
                      setWinnerExplanation(explanation);
                      setIsRunning(false);
                    }, 2000);
                  }, 2000);
                }
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
    <div className=\"epic-battle-container\" data-testid=\"epic-battle-arena\">
      {/* Battle Controls */}
      <div className=\"epic-battle-controls glass-card\">\n        <input\n          type=\"text\"\n          value={prompt}\n          onChange={(e) => setPrompt(e.target.value)}\n          onKeyPress={(e) => e.key === 'Enter' && !isRunning && handleStartBattle()}\n          placeholder=\"⚔️ Enter your challenge... (e.g., 'Explain quantum computing')\"\n          disabled={isRunning}\n          data-testid=\"epic-battle-prompt\"\n          className=\"epic-battle-input\"\n        />\n        <div className=\"epic-battle-buttons\">\n          <button\n            onClick={handleStartBattle}\n            disabled={isRunning || !prompt.trim()}\n            data-testid=\"start-epic-battle\"\n            className=\"epic-start-button\"\n          >\n            {isRunning ? '⚔️ BATTLE IN PROGRESS...' : '⚔️ START EPIC BATTLE'}\n          </button>\n          <button\n            onClick={handleReset}\n            disabled={isRunning}\n            data-testid=\"reset-epic-battle\"\n            className=\"epic-reset-button\"\n          >\n            🔄 RESET ARENA\n          </button>\n        </div>\n      </div>\n\n      {/* Battle Phase Indicator */}\n      {battlePhase !== 'idle' && (\n        <div className=\"battle-phase-indicator\">\n          {battlePhase === 'fighting' && '⚡ BATTLE IN PROGRESS'}\n          {battlePhase === 'knockout' && '💥 FIRST KNOCKOUT!'}\n          {battlePhase === 'final' && '🔥 FINAL SHOWDOWN!'}\n          {battlePhase === 'winner' && '🏆 VICTORY!'}\n        </div>\n      )}\n\n      {/* Fighter Arena */}\n      <div className=\"fighter-arena\">\n        {Object.entries(fighters).map(([model, fighter]) => (\n          <div \n            key={model} \n            className={`fighter-column ${fighter.animation} ${eliminated === model ? 'eliminated' : ''} ${winner === model ? 'winner' : ''}`}\n            data-testid={`fighter-${model}`}\n          >\n            {/* Fighter Sprite */}\n            <div className=\"pixel-fighter\" style={{ borderColor: FIGHTERS[model].color }}>\n              <div className=\"fighter-avatar\">{FIGHTERS[model].avatar}</div>\n              <div className=\"fighter-name\" style={{ color: FIGHTERS[model].color }}>\n                {FIGHTERS[model].name}\n              </div>\n              <div className=\"fighter-stance\">{FIGHTERS[model].stance}</div>\n            </div>\n            \n            {/* Health Bar */}\n            <div className=\"health-bar-container\">\n              <div className=\"health-bar-label\">HP</div>\n              <div className=\"health-bar\">\n                <div \n                  className=\"health-bar-fill\" \n                  style={{ \n                    width: `${fighter.health}%`,\n                    backgroundColor: fighter.health > 50 ? FIGHTERS[model].color : '#ff5c7a'\n                  }}\n                />\n              </div>\n              <div className=\"health-bar-value\">{fighter.health}</div>\n            </div>\n            \n            {/* Score */}\n            {fighter.score > 0 && (\n              <div className=\"fighter-score\">\n                SCORE: {fighter.score}\n              </div>\n            )}\n            \n            {/* Progress Bar (when collapsed) */}\n            {collapsed && fighter.status === 'fighting' && (\n              <div className=\"progress-bar-container\">\n                <div className=\"progress-bar\">\n                  <div className=\"progress-bar-fill\" />\n                </div>\n                <div className=\"progress-text\">Generating response...</div>\n              </div>\n            )}\n            \n            {/* Collapsed Answer Box */}\n            {collapsed && (\n              <div className=\"collapsed-answer-box\">\n                {fighter.status === 'complete' ? '✓ Response Ready' : \n                 fighter.streaming ? '...' : 'Awaiting...'}\n              </div>\n            )}\n          </div>\n        ))}\n      </div>\n\n      {/* Winner Announcement */}\n      {winner && (\n        <div className=\"winner-announcement glass-card\">\n          <pre className=\"winner-text\">{winnerExplanation}</pre>\n        </div>\n      )}\n      \n      {/* Full Responses (after battle) */}\n      {!collapsed && Object.values(fighters).some(f => f.response) && (\n        <div className=\"full-responses-grid\">\n          {Object.entries(fighters).map(([model, fighter]) => (\n            fighter.response && (\n              <div key={model} className=\"response-card glass-card\" data-testid={`response-${model}`}>\n                <div className=\"response-header\" style={{ borderColor: FIGHTERS[model].color }}>\n                  <h3 style={{ color: FIGHTERS[model].color }}>{FIGHTERS[model].name}</h3>\n                  <span className=\"response-score\">Score: {fighter.score}</span>\n                </div>\n                <div className=\"response-content\">{fighter.response}</div>\n              </div>\n            )\n          ))}\n        </div>\n      )}\n    </div>\n  );\n}\n\nexport default BattleArenaEpic;\n