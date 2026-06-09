import { GitHubRepo } from '../types';
import { getLanguageColor } from '../utils/api';

interface TopReposProps {
  repos: GitHubRepo[];
}

export const TopRepos
    = ({ repos }: TopReposProps) => (
  <div className="chart-card">
    <h3 className="card-title">TOP REPOSITORIES</h3>
    <div className="repo-grid">
      {repos.map((repo) => (
        <a key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer" className="repo-card">
          <div className="repo-name">{repo.name}</div>
          {repo.description && (
            <div className="repo-desc">{repo.description.slice(0, 80)}{repo.description.length > 80 ? '…' : ''}</div>
          )}
          <div className="repo-meta">
            {repo.language && (
              <span className="repo-lang">
                <span className="lang-dot-sm" style={{ background: getLanguageColor(repo.language) }} />
                {repo.language}
              </span>
            )}
            <span className="repo-stat">⭐ {repo.stargazers_count}</span>
            <span className="repo-stat">🍴 {repo.forks_count}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
);
