'use client';

import { useState, useEffect } from 'react';
import { cyclesApi, Cycle } from '../lib/api/cycles';
import { ApiError } from '../lib/api';

export function useCycles(startDate?: string, endDate?: string) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCycles();
  }, [startDate, endDate]);

  const loadCycles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cyclesApi.getAll(startDate, endDate);
      setCycles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cycles');
    } finally {
      setLoading(false);
    }
  };

  return {
    cycles,
    loading,
    error,
    reload: loadCycles,
  };
}

export function useCurrentCycle() {
  const [cycle, setCycle] = useState<Cycle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCurrentCycle();
  }, []);

  const loadCurrentCycle = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cyclesApi.getCurrent();
      setCycle(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        setCycle(null);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load current cycle');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    cycle,
    loading,
    error,
    reload: loadCurrentCycle,
  };
}
