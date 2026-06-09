import {useState} from "react";
import {DevPulseProfile, CompareMetric} from "../types";
import {fetchProfile} from "../utils/api.ts";

interface CompareModeProps{
    profileA: DevPulseProfile
}

function buildMetrics(a: DevPulseProfile, b: DevPulseProfile): CompareMetric[] {
    return [
        {
            label: 'Overall Score',
            a: a.stats.overallScore,
            b: b.stats.overallScore,
            higherIsBetter: true,
        },
        {
            label: 'Consistency',
            a: a.stats.consistencyScore,
            b: b.stats.consistencyScore,
            higherIsBetter: true,
        },
        {
            label: 'Impact Score',
            a: a.stats.impactScore,
            b: b.stats.impactScore,
            higherIsBetter: true,
        },
        {
            label: 'Tech Diversity',
            a: a.stats.diversityScore,
            b: b.stats.diversityScore,
            higherIsBetter: true,
        },
        {
            label: 'Commits / Year',
            a: a.stats.totalCommitsLastYear,
            b: b.stats.totalCommitsLastYear,
            higherIsBetter: true,
        },
        {
            label: 'Total Stars',
            a: a.totalStars,
            b: b.totalStars,
            higherIsBetter: true,
        },
        {
            label: 'Public Repos',
            a: a.user.public_repos,
            b: b.user.public_repos,
            higherIsBetter: true,
        },
        {
            label: 'Followers',
            a: a.user.followers,
            b: b.user.followers,
            higherIsBetter: true,
        },
        {
            label: 'Longest Streak (wks)',
            a: a.stats.longestStreak,
            b: b.stats.longestStreak,
            higherIsBetter: true,
        },
    ];
}

function determineWinner(metrics: CompareMetric[]): 'a' | 'b'| 'tie' {
    let aWins = 0; let bWins = 0;
    metrics?.forEach((m)=>{
        if(m.a > m.b) aWins++;
        else if(m.b>m.a)bWins++;
    });
    if(aWins > bWins) return "a";
    if(bWins > bWins) return "b";
    return "tie";
}

interface MetricRowProps {
    metric: CompareMetric;
}

const MetricRow = ({ metric }: MetricRowProps) => {
    const total = metric.a + metric.b || 1;
    const aPercent = Math.round((metric.a / total) * 100);
    const bPercent = 100 - aPercent;
    const aWins = metric.higherIsBetter ? metric.a >= metric.b : metric.a <= metric.b;
    const bWins = metric.higherIsBetter ? metric.b >= metric.a : metric.b <= metric.a;
    const tied = metric.a === metric.b;

    return (
        <>
            <div className="metric-row">
                <div className="metric-label">{metric.label}</div>
                <div className="metric-bar-wrap">
        <span className={`metric-val-a ${aWins && !tied ? 'metric-winner' : ''}`}>
          {metric.a.toLocaleString()}
        </span>
                    <div className="metric-bar">
                        <div
                            className="metric-bar-a"
                            style={{ width: `${aPercent}%`, background: aWins && !tied ? '#00ff88' : '#1a3d2b' }}
                        />
                        <div
                            className="metric-bar-b"
                            style={{ width: `${bPercent}%`, background: bWins && !tied ? '#a78bfa' : '#2a1a4d' }}
                        />
                    </div>
                    <span className={`metric-val-b ${bWins && !tied ? 'metric-winner metric-winner-b' : ''}`}>
          {metric.b.toLocaleString()}
        </span>
                </div>
            </div>
        </>

    );
};

export const CompareMode = ({ profileA }: CompareModeProps) => {
    const [username, setUsername] = useState('');
    const [profileB, setProfileB] = useState<DevPulseProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCompare = async () => {
        if (!username.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProfile(username.trim());
            setProfileB(data);
        } catch {
            setError('User not found. Check the username and try again.');
        } finally {
            setLoading(false);
        }
    };

    const metrics = profileB ? buildMetrics(profileA, profileB) : [];
    const winner = profileB ? determineWinner(metrics) : null;

    return (
        <div className="compare-panel chart-card">
            <div className="compare-header">
                <span className="compare-badge">⚡ COMPARE MODE</span>
                <p className="recruiter-sub">Head-to-head developer matchup</p>
            </div>

            <div className="compare-search-row">
                <div className="compare-user-a">
                    <img src={profileA.user.avatar_url} alt="" className="compare-avatar" />
                    <span className="compare-name">@{profileA.user.login}</span>
                </div>
                <span className="vs-badge">VS</span>
                <div className="compare-input-wrap">
                    <input
                        className="compare-input"
                        placeholder="GitHub username..."
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setProfileB(null); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
                        disabled={loading}
                    />
                    <button className="compare-btn" onClick={handleCompare} disabled={loading || !username.trim()}>
                        {loading ? <span className="spinner-dark" /> : 'GO'}
                    </button>
                </div>
            </div>

            {error && <div className="error-msg" style={{ marginTop: '0.75rem' }}>{error}</div>}

            {profileB && (
                <div className="compare-results">
                    {/* Winner banner */}
                    <div className={`winner-banner ${winner === 'tie' ? 'winner-tie' : ''}`}>
                        {winner === 'tie' ? (
                            <span>🤝 IT&apos;S A TIE</span>
                        ) : (
                            <span>
                {winner === 'a' ? '🏆' : '🏆'} WINNER:&nbsp;
                                <strong style={{ color: winner === 'a' ? '#00ff88' : '#a78bfa' }}>
                  @{winner === 'a' ? profileA.user.login : profileB.user.login}
                </strong>
              </span>
                        )}
                    </div>

                    {/* Avatars + scores */}
                    <div className="compare-heads">
                        <div className="compare-head">
                            <img src={profileA.user.avatar_url} alt="" className="compare-avatar-lg" />
                            <div className="compare-head-name">@{profileA.user.login}</div>
                            <div className="compare-head-score" style={{ color: '#00ff88' }}>
                                {profileA.stats.overallScore}
                            </div>
                        </div>
                        <div className="compare-divider" />
                        <div className="compare-head">
                            <img src={profileB.user.avatar_url} alt="" className="compare-avatar-lg" />
                            <div className="compare-head-name">@{profileB.user.login}</div>
                            <div className="compare-head-score" style={{ color: '#a78bfa' }}>
                                {profileB.stats.overallScore}
                            </div>
                        </div>
                    </div>

                    {/* Metrics */}
                    <div className="metrics-list">
                        {metrics.map((m) => <MetricRow key={m.label} metric={m} />)}
                    </div>
                </div>
            )}
        </div>
    );
};

