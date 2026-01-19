import React from 'react';
import './ScoreCard.css';

function ScoreCard({ title, score }) {
  const getColor = (score) => {
    if (score >= 70) return '#48BB78';
    if (score >= 40) return '#ECC94B';
    return '#F56565';
  };

  const percentage = Math.min(100, Math.max(0, score));

  return (
    <div className="score-card card" data-testid="score-card">
      <h4 className="score-title">{title}</h4>
      <div className="score-display">
        <svg className="progress-ring" width="120" height="120">
          <circle
            className="progress-ring-bg"
            cx="60"
            cy="60"
            r="50"
          />
          <circle
            className="progress-ring-fill"
            cx="60"
            cy="60"
            r="50"
            stroke={getColor(score)}
            strokeDasharray={`${(percentage / 100) * 314} 314`}
          />
        </svg>
        <div className="score-value" style={{ color: getColor(score) }}>
          {score}
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
