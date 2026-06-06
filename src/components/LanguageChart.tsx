import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { LanguageStats } from '../types';
import { getLanguageColor } from '../utils/api';

interface LanguageChartProps {
  languages: LanguageStats;
}

export const LanguageChart = ({ languages }: LanguageChartProps) => {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  const data = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, bytes]) => ({
      name,
      value: bytes,
      percent: Math.round((bytes / total) * 100),
    }));

  return (
    <>
    <div className="chart-card">
      <h3 className="card-title">LANGUAGES</h3>
      <div className="lang-chart-inner">
        <ResponsiveContainer width="50%" height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80}
              dataKey="value" stroke="none">
              {data.map((entry) => (
                <Cell key={entry.name} fill={getLanguageColor(entry.name)} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: 8, fontFamily: 'Space Mono' }}
              formatter={(value: number) => [`${Math.round((value / total) * 100)}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="lang-legend">
          {data.map((entry) => (
            <div key={entry.name} className="lang-item">
              <span className="lang-dot" style={{ background: getLanguageColor(entry.name) }} />
              <span className="lang-name">{entry.name}</span>
              <span className="lang-percent">{entry.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
    
  );
};
