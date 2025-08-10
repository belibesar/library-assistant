import { useState, useEffect } from "react";

interface Stats {
  bookcount: number;
  journalcount: number;
  skripsicount: number;
}

interface UseStatsResult {
  data: Stats | null;
  loading: boolean;
  error: string | null;
}

export function useGetStats(): UseStatsResult {
  const [data, setData] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/stats");

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
