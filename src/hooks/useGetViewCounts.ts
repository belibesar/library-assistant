import { useState, useEffect } from "react";

interface Stats {
  totalBookAccess: number;
  totalJournalAccess: number;
  totalThesisAccess: number;
  totalAllAccess: number;
}

interface UseStatsResult {
  data: Stats;
  loading: boolean;
  error: string | null;
}

export function useGetViewCounts(): UseStatsResult {
  const [data, setData] = useState<Stats>({
    totalBookAccess: 0,
    totalJournalAccess: 0,
    totalThesisAccess: 0,
    totalAllAccess: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/stats/count-view");

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const json: Stats = await res.json();
        setData(json);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { data, loading, error };
}
