import React, { useState } from 'react';
import './App.css';
import AnalyzerForm from './components/AnalyzerForm';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (analysisResults) => {
    setResults(analysisResults);
    setLoading(false);
  };

  const handleAnalysisStart = () => {
    setLoading(true);
  };

  const handleReset = () => {
    setResults(null);
    setLoading(false);
  };

  return (
    <div className="App">
      <nav className="nav-bar">
        <div className="container">
          <div className="nav-content">
            <h1 className="logo">App Studio Pro</h1>
            <div className="nav-subtitle">AI Website Analyzer</div>
          </div>
        </div>
      </nav>

      {!results && !loading && (
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Discover Your Website's
                <span className="gradient-text"> True Potential</span>
              </h1>
              <p className="hero-description">
                Get a comprehensive AI-powered analysis of your website's design, UX, SEO, and growth opportunities.
                Receive actionable insights and a professional redesign mockup in minutes.
              </p>
              <AnalyzerForm 
                onAnalysisComplete={handleAnalysisComplete}
                onAnalysisStart={handleAnalysisStart}
              />
            </div>
          </div>
        </section>
      )}

      {loading && (
        <section className="loading-section">
          <div className="container">
            <div className="loading-content">
              <div className="loader"></div>
              <h2>Analyzing Your Website...</h2>
              <p>Our AI is examining design, UX, SEO, and generating recommendations.</p>
              <p className="loading-subtext">This usually takes 30-60 seconds</p>
            </div>
          </div>
        </section>
      )}

      {results && (
        <ResultsDashboard results={results} onReset={handleReset} />
      )}

      <footer className="footer">
        <div className="container">
          <p>Powered by App Studio Pro | AI-Driven Website Analysis</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
