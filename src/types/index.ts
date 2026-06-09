export interface GitHubUser {
    login: string;
    name: string | null;
    avatar_url: string;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
    location: string | null;
    company: string | null;
    blog: string | null;
    twitter_username: string | null;
}

export interface GitHubRepo {
    name: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    created_at: string;
    html_url: string;
    fork: boolean;
    open_issues_count: number;
    topics: string[];
    size: number;
    watchers_count: number;
}

export interface CommitActivity {
    days: number[];
    total: number;
    week: number;
}

export interface LanguageStats {
    [language: string]: number;
}

export interface RecentEvent {
    id: string;
    type: string;
    repo: string;
    createdAt: string;
}

export interface DeveloperStats {
    consistencyScore: number;
    impactScore: number;
    diversityScore: number;
    overallScore: number;
    longestStreak: number;
    currentStreak: number;
    totalCommitsLastYear: number;
    avgCommitsPerWeek: number;
}

export interface DevPulseProfile {
    user: GitHubUser;
    repos: GitHubRepo[];
    languages: LanguageStats;
    totalStars: number;
    totalForks: number;
    commitActivity: CommitActivity[];
    topRepos: GitHubRepo[];
    recentActivity: RecentEvent[];
    stats: DeveloperStats;
}

// ── Recruiter Mode ──────────────────────────────────────
export type HireVerdict = 'YES' | 'MAYBE' | 'NO';

export interface RiskFlag {
    severity: 'low' | 'medium' | 'high';
    label: string;
    detail: string;
}

export interface SkillConfidence {
    skill: string;
    score: number; // 0-100
    evidence: string;
}

export interface RecruiterReport {
    verdict: HireVerdict;
    verdictReason: string;
    role: string;
    skillConfidence: SkillConfidence[];
    riskFlags: RiskFlag[];
    strengths: string[];
    summary: string;
}

// ── Compare Mode ────────────────────────────────────────
export interface CompareMetric {
    label: string;
    a: number;
    b: number;
    unit?: string;
    higherIsBetter: boolean;
}

export interface CompareResult {
    profileA: DevPulseProfile;
    profileB: DevPulseProfile;
    metrics: CompareMetric[];
    winner: 'a' | 'b' | 'tie';
    winnerReason: string;
}
