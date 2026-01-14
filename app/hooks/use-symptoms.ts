'use client';

import { useState, useEffect } from 'react';
import { symptomsApi } from '../lib/api/symptoms';
import { ApiError } from '../lib/api';

export function useSymptoms(startDate?: string, endDate?: string) {
  const [symptoms, setSymptoms] = useState<string[] | Record<string, number>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSymptoms();
  }, [startDate, endDate]);

  const loadSymptoms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await symptomsApi.getAll(startDate, endDate);
      setSymptoms(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load symptoms');
    } finally {
      setLoading(false);
    }
  };

  return {
    symptoms,
    loading,
    error,
    reload: loadSymptoms,
  };
}
