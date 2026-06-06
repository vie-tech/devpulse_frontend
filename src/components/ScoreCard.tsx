import { DeveloperStats } from '../types';

interface ScoreCardProps {
  stats: DeveloperStats;
}

const ScoreRing = ({ score, label, color }: { score: number; label: string; color: string }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="score-ring-wrapper">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <circle
          cx="45" cy="45" r={radius} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: 'stroke-dashoffset 1.2s ease' }}
        />
        <text x="45" y="49" textAnchor="middle" fill="white" fontSize="16" fontFamily="Space Mono" fontWeight="700">
          {score}
        </text>
      </svg>
      <span className="score-label">{label}</span>
    </div>
  );
};

export const ScoreCard = ({ stats }: ScoreCardProps) => (
  <div className="score-card">
    <div className="score-header">
      <div className="overall-score">
        <span className="overall-number">{stats.overallScore}</span>
        <span className="overall-label">DEV SCORE</span>
      </div>
      <div className="score-rings">
        <ScoreRing score={stats.consistencyScore} label="Consistency" color="#00ff88" />
        <ScoreRing score={stats.impactScore} label="Impact" color="#ff6b35" />
        <ScoreRing score={stats.diversityScore} label="Diversity" color="#a78bfa" />
      </div>
    </div>
    <div className="score-stats">
      <div className="stat-pill">
        <span className="stat-val">{stats.totalCommitsLastYear.toLocaleString()}</span>
        <span className="stat-key">commits / year</span>
      </div>
      <div className="stat-pill">
        <span className="stat-val">{stats.avgCommitsPerWeek}</span>
        <span className="stat-key">avg / week</span>
      </div>
      <div className="stat-pill">
        <span className="stat-val">{stats.longestStreak}w</span>
        <span className="stat-key">longest streak</span>
      </div>
      <div className="stat-pill">
        <span className="stat-val">{stats.currentStreak}w</span>
        <span className="stat-key">current streak</span>
      </div>
    </div>
  </div>
);
