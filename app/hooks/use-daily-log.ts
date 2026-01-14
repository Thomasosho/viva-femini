'use client';

import { useState, useEffect } from 'react';
import { dailyLogsApi, DailyLog, CreateDailyLogDto, UpdateDailyLogDto } from '../lib/api/daily-logs';
import { ApiError } from '../lib/api';

export function useDailyLog(date: string) {
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDailyLog();
  }, [date]);

  const loadDailyLog = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dailyLogsApi.getByDate(date);
      setDailyLog(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        // Not found is okay, means no log exists for this date yet
        setDailyLog(null);
        // Don't set error for 404, it's expected when no log exists
        setError(null);
      } else {
        const errorMessage = err instanceof ApiError 
          ? err.message 
          : (err instanceof Error ? err.message : 'Failed to load daily log');
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveDailyLog = async (data: CreateDailyLogDto | UpdateDailyLogDto) => {
    try {
      setError(null);
      let saved: DailyLog;
      
      // Use update with upsert support - it will create if doesn't exist
      // This simplifies the logic and avoids race conditions
      saved = await dailyLogsApi.update(date, { ...data, date } as UpdateDailyLogDto);
      
      setDailyLog(saved);
      // Reload to ensure we have the latest data
      await loadDailyLog();
      return saved;
    } catch (err) {
      let errorMessage = 'Failed to save daily log';
      if (err instanceof ApiError) {
        errorMessage = err.message || `Failed to save: ${err.status}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      throw err;
    }
  };

  return {
    dailyLog,
    loading,
    error,
    saveDailyLog,
    reload: loadDailyLog,
  };
}
