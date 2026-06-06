import { useState, useCallback } from 'react';
import { DevPulseProfile } from '../types';
import { fetchProfile } from '../utils/api';

interface UseProfileReturn {
  profile: DevPulseProfile | null;
  loading: boolean;
  error: string | null;
  search: (username: string) => Promise<void>;
  reset: () => void;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<DevPulseProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (username: string) => {
    if (!username.trim()) return;
    setLoading(true);
    setError(null);
    setProfile(null);
    try {
      const data = await fetchProfile(username.trim());
      setProfile(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
        'Failed to fetch profile. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setProfile(null);
    setError(null);
  }, []);

  return { profile, loading, error, search, reset };
};
