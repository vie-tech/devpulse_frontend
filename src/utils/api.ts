import axios from 'axios';
import { DevPulseProfile } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

export const fetchProfile = async (username: string): Promise<DevPulseProfile> => {
  const { data } = await api.get<{ success: boolean; data: DevPulseProfile }>(
    `/profile/${username}`
  );
  return data.data;
};

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Svelte: '#ff3e00',
};

export const getLanguageColor = (lang: string): string =>
  LANGUAGE_COLORS[lang] || '#8b8b8b';
