import React, { useState } from 'react';
import './App.css';
import NeuralBackground from './components/NeuralBackground';
import AIAvatarRealistic from './components/AIAvatarRealistic';
import BattleArenaEpic from './components/BattleArenaEpic';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="App">
      <NeuralBackground />
      
      <div className="content-wrapper">
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
              Epic Battle
            </button>
          </div>
        </nav>

        {activeSection === 'hero' && (
          <section className="hero-section" data-testid="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">
                <span className="gradient-text">THE FUTURE OF AI</span>
                <br />
                <span className="sub-title">IS HERE</span>
              </h1>
              <p className="hero-description">
                Experience cutting-edge AI interactions with realistic avatars, voice control, and epic battles
              </p>
            </div>
            <AIAvatarRealistic />
          </section>
        )}

        {activeSection === 'battle' && (
          <section className="battle-section" data-testid="battle-section">
            <h2 className="section-title">
              <span className="gradient-text">EPIC AI BATTLE ARENA</span>
            </h2>
            <p className="section-description">
              Watch Claude, GPT, and Gemini fight in Street Fighter style battles!
            </p>
            <BattleArenaEpic />
          </section>
        )}

        <footer className="footer">
          <p>App Studio Pro - Kings of AI - EPIC Edition</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
