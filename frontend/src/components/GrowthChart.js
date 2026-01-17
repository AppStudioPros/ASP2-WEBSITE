import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './GrowthChart.css';

function GrowthChart({ currentScore }) {
  const generateProjections = (current) => {
    const improvement = (100 - current) * 0.6;
    return [
      { month: 'Current', traffic: 100, conversions: 100 },
      { month: '3 Months', traffic: 100 + improvement * 0.3, conversions: 100 + improvement * 0.25 },
      { month: '6 Months', traffic: 100 + improvement * 0.6, conversions: 100 + improvement * 0.5 },
      { month: '12 Months', traffic: 100 + improvement, conversions: 100 + improvement * 0.8 },
    ];
  };

  const data = generateProjections(currentScore);

  return (
    <div className="growth-chart-section card" data-testid="growth-chart">
      <h3>Projected Growth with App Studio Pro</h3>
      <p className="chart-description">
        Based on industry benchmarks and your current score, here's how we can help improve your metrics:
      </p>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="month" stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="traffic" 
              stroke="#667eea" 
              strokeWidth={3}
              name="Traffic Increase %"
            />
            <Line 
              type="monotone" 
              dataKey="conversions" 
              stroke="#48BB78" 
              strokeWidth={3}
              name="Conversion Increase %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GrowthChart;
