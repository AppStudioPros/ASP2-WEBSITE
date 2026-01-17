import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Generate mock activity data for the last N weeks
const generateMockData = (weeks = 12) => {
  const data = [];
  const today = new Date();
  const days = weeks * 7;

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    
    // Generate realistic activity patterns
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // Lower activity on weekends, higher mid-week
    let baseActivity = isWeekend ? 2 : 8;
    // Add some randomness
    const activity = Math.max(0, Math.floor(baseActivity + (Math.random() - 0.3) * 10));
    
    data.push({ date: dateStr, count: activity });
  }
  
  return data;
};

export const ActivityHeatmap = ({ 
  weeks = 12, 
  data: providedData = null,
  className = '' 
}) => {
  const data = useMemo(() => providedData || generateMockData(weeks), [providedData, weeks]);
  
  const maxValue = useMemo(() => Math.max(...data.map(d => d.count), 1), [data]);

  // Color scale based on intensity - using brand colors
  const getColor = (count) => {
    if (count === 0) return 'hsl(210 10% 12%)';
    const intensity = count / maxValue;
    if (intensity < 0.25) return 'hsl(187 60% 20%)';
    if (intensity < 0.5) return 'hsl(187 80% 30%)';
    if (intensity < 0.75) return 'hsl(187 90% 40%)';
    return 'hsl(187 100% 50%)';
  };

  // Organize data into weeks (columns) and days (rows)
  const grid = useMemo(() => {
    const result = [];
    for (let i = 0; i < data.length; i += 7) {
      result.push(data.slice(i, i + 7));
    }
    return result;
  }, [data]);

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const totalCommits = useMemo(() => data.reduce((sum, d) => sum + d.count, 0), [data]);

  return (
    <div 
      className={`p-6 sm:p-8 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] ${className}`}
      data-testid="github-heatmap"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
            Developer Activity
          </h3>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
            {totalCommits.toLocaleString()} contributions in the last {weeks} weeks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#00E5FF]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Active</span>
        </div>
      </div>

      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-2 pt-0">
          {dayLabels.map((day, i) => (
            <div 
              key={day} 
              className="h-3 text-[10px] text-[hsl(var(--muted-foreground))] flex items-center"
              style={{ visibility: i % 2 === 1 ? 'visible' : 'hidden' }}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-1 overflow-x-auto">
          {grid.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: (weekIndex * 7 + dayIndex) * 0.005,
                    duration: 0.2
                  }}
                  className="w-3 h-3 rounded-sm cursor-pointer transition-transform duration-150 hover:scale-125"
                  style={{ backgroundColor: getColor(day.count) }}
                  title={`${day.date}: ${day.count} contributions`}
                  data-testid="github-heatmap-cell"
                  aria-label={`${day.date}: ${day.count} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-xs text-[hsl(var(--muted-foreground))]">Less</span>
        <div className="flex gap-1">
          {[0, 0.25, 0.5, 0.75, 1].map((intensity, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: getColor(intensity * maxValue) }}
            />
          ))}
        </div>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">More</span>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
