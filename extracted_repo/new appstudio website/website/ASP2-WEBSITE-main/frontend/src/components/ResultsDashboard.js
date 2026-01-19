import React from 'react';
import './ResultsDashboard.css';
import ScoreCard from './ScoreCard';
import GrowthChart from './GrowthChart';
import ConsultationForm from './ConsultationForm';

function ResultsDashboard({ results, onReset }) {
  if (!results) return null;

  const { analysis, overall_score, mockup_image, url } = results;

  return (
    <div className="results-dashboard" data-testid="results-dashboard">
      <div className="container">
        <div className="results-header">
          <div>
            <h2 className="results-title">Analysis Complete</h2>
            <p className="analyzed-url">{url}</p>
          </div>
          <button onClick={onReset} className="reset-button" data-testid="reset-button">
            Analyze Another Site
          </button>
        </div>

        <div className="overall-score-card card">
          <h3>Overall Score</h3>
          <div className="overall-score">
            <span className="score-number" style={{ color: getScoreColor(overall_score) }}>
              {overall_score}
            </span>
            <span className="score-label">/100</span>
          </div>
          <p className="score-grade">{getScoreGrade(overall_score)}</p>
        </div>

        <div className="scores-grid">
          <ScoreCard title="Visual Appeal" score={analysis.visual_score} />
          <ScoreCard title="UI/UX Quality" score={analysis.ux_score} />
          <ScoreCard title="SEO Performance" score={analysis.seo_score} />
          <ScoreCard title="Traffic Exposure" score={analysis.exposure_score} />
        </div>

        <div className="business-insights card">
          <h3>Business Insights</h3>
          <div className="insight-badge">
            <strong>Business Type:</strong> {analysis.business_type}
          </div>
          {analysis.business_category && (
            <div className="insight-badge">
              <strong>Category:</strong> {analysis.business_category}
            </div>
          )}
        </div>

        <div className="recommendations-section">
          <div className="card">
            <h3>AI Assistant Recommendations</h3>
            <ul className="recommendation-list">
              {analysis.ai_assistants?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>Funnel Optimization</h3>
            <ul className="recommendation-list">
              {analysis.funnel_recommendations?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="improvements-section">
          <div className="card">
            <h3>Design Improvements</h3>
            <ul className="recommendation-list">
              {analysis.design_improvements?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>SEO Improvements</h3>
            <ul className="recommendation-list">
              {analysis.seo_improvements?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {mockup_image && (
          <div className="mockup-section card">
            <h3>AI-Generated Redesign Mockup</h3>
            <p className="mockup-description">{analysis.redesign_description}</p>
            <div className="mockup-container">
              <img 
                src={`data:image/png;base64,${mockup_image}`} 
                alt="Redesigned website mockup" 
                className="mockup-image"
                data-testid="mockup-image"
              />
            </div>
          </div>
        )}

        <GrowthChart currentScore={overall_score} />

        <ConsultationForm url={url} />
      </div>
    </div>
  );
}

function getScoreColor(score) {
  if (score >= 70) return '#48BB78';
  if (score >= 40) return '#ECC94B';
  return '#F56565';
}

function getScoreGrade(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Fair';
  if (score >= 30) return 'Needs Improvement';
  return 'Poor';
}

export default ResultsDashboard;
