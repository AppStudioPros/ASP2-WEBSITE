import React, { useState } from 'react';
import './AnalyzerForm.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function AnalyzerForm({ onAnalysisComplete, onAnalysisStart }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a website URL');
      return;
    }

    onAnalysisStart();

    try {
      const response = await fetch(`${BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      onAnalysisComplete(data);
    } catch (err) {
      setError('Failed to analyze website. Please try again.');
      onAnalysisComplete(null);
    }
  };

  return (
    <form className="analyzer-form" onSubmit={handleSubmit} data-testid="analyzer-form">
      <div className="form-group">
        <input
          type="text"
          className="url-input"
          placeholder="Enter website URL (e.g., example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          data-testid="url-input"
        />
        <button type="submit" className="analyze-button" data-testid="analyze-button">
          Analyze Website
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default AnalyzerForm;
