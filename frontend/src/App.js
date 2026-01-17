import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import NeuralBackground from './components/NeuralBackground';
import AIAvatar from './components/AIAvatar';
import BattleArena from './components/BattleArena';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="App">
      <NeuralBackground />
      
      <div className="content-wrapper">
        {/* Navigation */}
        <nav className="nav-bar">
          <div className="nav-logo">APP STUDIO PRO</div>
          <div className="nav-links">
            <button 
              className={activeSection === 'hero' ? 'active' : ''}
              onClick={() => setActiveSection('hero')}
              data-testid="nav-hero"
            >
              AI Avatar
            </button>
            <button 
              className={activeSection === 'battle' ? 'active' : ''}
              onClick={() => setActiveSection('battle')}
              data-testid="nav-battle"
            >
              Battle Arena
            </button>
          </div>
        </nav>

        {/* Hero Section - AI Avatar */}
        {activeSection === 'hero' && (
          <section className="hero-section" data-testid="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="gradient-text">THE FUTURE OF AI</span>
                <br />
                <span className="sub-title">IS HERE</span>
              </h1>
              <p className="hero-description">
                Experience cutting-edge AI interactions with voice, streaming, and real-time generation
              </p>
            </div>
            <AIAvatarRealistic />
          </section>
        )}

        {/* Battle Arena Section */}
        {activeSection === 'battle' && (
          <section className="battle-section" data-testid="battle-section">
            <h2 className="section-title">
              <span className="gradient-text">AI BATTLE ARENA</span>
            </h2>
            <p className="section-description">
              Watch Claude, GPT, and Gemini compete in real-time
            </p>
            <BattleArenaEpic />
          </section>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>App Studio Pro - Kings of AI | POC Phase 1</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
