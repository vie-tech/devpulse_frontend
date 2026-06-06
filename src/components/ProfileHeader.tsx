import { GitHubUser } from '../types';

interface ProfileHeaderProps {
  user: GitHubUser;
  totalStars: number;
  totalForks: number;
  onReset: () => void;
}

export const ProfileHeader = ({ user, totalStars, totalForks, onReset }: ProfileHeaderProps) => (
  <div className="profile-header">
    <button className="back-btn" onClick={onReset}>← NEW SEARCH</button>
    <div className="profile-identity">
      <img src={user.avatar_url} alt={user.login} className="avatar" />
      <div className="profile-info">
        <h1 className="profile-name">{user.name || user.login}</h1>
        <span className="profile-handle">@{user.login}</span>
        {user.bio && <p className="profile-bio">{user.bio}</p>}
        <div className="profile-meta">
          {user.location && <span>📍 {user.location}</span>}
          {user.company && <span>🏢 {user.company}</span>}
          {user.blog && <a href={user.blog} target="_blank" rel="noreferrer">🔗 {user.blog}</a>}
        </div>
      </div>
    </div>
    <div className="profile-counts">
      <div className="count-item">
        <span className="count-num">{user.public_repos}</span>
        <span className="count-lbl">REPOS</span>
      </div>
      <div className="count-item">
        <span className="count-num">{totalStars.toLocaleString()}</span>
        <span className="count-lbl">STARS</span>
      </div>
      <div className="count-item">
        <span className="count-num">{totalForks.toLocaleString()}</span>
        <span className="count-lbl">FORKS</span>
      </div>
      <div className="count-item">
        <span className="count-num">{user.followers.toLocaleString()}</span>
        <span className="count-lbl">FOLLOWERS</span>
      </div>
    </div>
  </div>
);
