import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export const SearchBar = ({ onSearch, loading }: SearchBarProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-wrapper">
        <span className="search-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Enter GitHub username..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          autoFocus
        />
        <button type="submit" className="search-btn" disabled={loading || !value.trim()}>
          {loading ? (
            <span className="spinner" />
          ) : (
            <>ANALYZE <span className="btn-arrow">→</span></>
          )}
        </button>
      </div>
    </form>
  );
};
