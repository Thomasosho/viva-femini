'use client';

import { useState, useEffect } from 'react';
import { healthReportsApi, HealthReport } from '../lib/api/health-reports';
import { ApiError } from '../lib/api';

export function useHealthReports() {
  const [healthReports, setHealthReports] = useState<HealthReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHealthReports();
  }, []);

  const loadHealthReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await healthReportsApi.getAll();
      setHealthReports(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load health reports');
    } finally {
      setLoading(false);
    }
  };

  return {
    healthReports,
    loading,
    error,
    reload: loadHealthReports,
  };
}

export function useHealthReport(month: number, year: number) {
  const [healthReport, setHealthReport] = useState<HealthReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHealthReport();
  }, [month, year]);

  const loadHealthReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await healthReportsApi.getByMonthYear(month, year);
      setHealthReport(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        // Try to generate the report if it doesn't exist
        try {
          const generated = await healthReportsApi.generate(month, year);
          setHealthReport(generated);
        } catch (generateErr) {
          setError(generateErr instanceof Error ? generateErr.message : 'Failed to generate health report');
        }
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load health report');
      }
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      setError(null);
      const generated = await healthReportsApi.generate(month, year);
      setHealthReport(generated);
      return generated;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate health report';
      setError(errorMessage);
      throw err;
    }
  };

  return {
    healthReport,
    loading,
    error,
    generateReport,
    reload: loadHealthReport,
  };
}
