import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ProfileHeader } from './components/ProfileHeader';
import { ScoreCard } from './components/ScoreCard';
import { LanguageChart } from './components/LanguageChart';
import { CommitChart } from './components/CommitChart';
import { TopRepos } from './components/TopRepos';
import { CompareMode } from './components/CompareMode';
import { useProfile } from './hooks/useProfile';
import './styles/app.css';

const EXAMPLE_USERS = ['torvalds', 'gaearon', 'sindresorhus', 'tj'];
type Tab = 'analytics' | 'compare';

function App() {
    const { profile, loading, error, search, reset } = useProfile();
    const [tab, setTab] = useState<Tab>('analytics');

    const handleReset = () => { reset(); setTab('analytics'); };

    return (
        <div className="app">
            <div className="bg-grid" />
            <div className="bg-glow" />

            {!profile ? (
                <div className="landing">
                    <div className="logo-mark">⬡</div>
                    <h1 className="hero-title">DEV<span className="accent">PULSE</span></h1>
                    <p className="hero-sub">Real-time GitHub analytics for developers who ship.</p>
                    <SearchBar onSearch={search} loading={loading} />
                    {error && <div className="error-msg">{error}</div>}
                    <div className="examples">
                        <span className="examples-label">Try:</span>
                        {EXAMPLE_USERS.map((u) => (
                            <button key={u} className="example-btn" onClick={() => search(u)}>
                                {u}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="dashboard">
                    <ProfileHeader
                        user={profile.user}
                        totalStars={profile.totalStars}
                        totalForks={profile.totalForks}
                        onReset={handleReset}
                    />

                    {/* Tab bar */}
                    <div className="tab-bar">
                        <button
                            className={`tab-btn ${tab === 'analytics' ? 'tab-active' : ''}`}
                            onClick={() => setTab('analytics')}
                        >
                            📊 ANALYTICS
                        </button>
                        <button
                            className={`tab-btn ${tab === 'compare' ? 'tab-active' : ''}`}
                            onClick={() => setTab('compare')}
                        >
                            ⚡ COMPARE
                        </button>
                    </div>

                    {tab === 'analytics' && (
                        <div className="dashboard-grid">
                            <div className="col-left">
                                <ScoreCard stats={profile.stats} />
                                <LanguageChart languages={profile.languages} />
                            </div>
                            <div className="col-right">
                                <CommitChart activity={profile.commitActivity} />
                                <TopRepos repos={profile.topRepos} />
                            </div>
                        </div>
                    )}

                    {tab === 'compare' && (
                        <div className="compare-tab-wrap">
                            <CompareMode profileA={profile} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default App;
