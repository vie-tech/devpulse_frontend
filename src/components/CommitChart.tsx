import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CommitActivity } from '../types';

interface CommitChartProps {
  activity: CommitActivity[];
}

export const CommitChart = ({ activity }: CommitChartProps) => {
  const data = activity.slice(-26).map((week, i) => ({
    week: `W${i + 1}`,
    commits: week.total,
  }));

  const max = Math.max(...data.map((d) => d.commits));

    return (
    <div className="chart-card">
      <h3 className="card-title">COMMIT ACTIVITY <span className="subtitle">last 26 weeks</span></h3>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} barCategoryGap="20%">
          <XAxis dataKey="week" tick={{ fill: '#555', fontSize: 10, fontFamily: 'Space Mono' }}
            axisLine={false} tickLine={false} interval={4} />
          <YAxis hide />
          <Tooltip
            contentStyle={{ background: '#0d0d0d', border: '1px solid #222', borderRadius: 8, fontFamily: 'Space Mono', fontSize: 12 }}
            labelStyle={{ color: '#888' }}
            itemStyle={{ color: '#00ff88' }}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="commits" radius={[3, 3, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.commits === max ? '#00ff88' : entry.commits > max * 0.5 ? '#00cc6a' : '#1a3d2b'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
