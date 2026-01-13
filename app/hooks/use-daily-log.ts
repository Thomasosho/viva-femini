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
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load daily log');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveDailyLog = async (data: CreateDailyLogDto | UpdateDailyLogDto) => {
    try {
      setError(null);
      let saved: DailyLog;
      
      if (dailyLog?._id) {
        saved = await dailyLogsApi.update(date, data as UpdateDailyLogDto);
      } else {
        saved = await dailyLogsApi.create({ ...data, date } as CreateDailyLogDto);
      }
      
      setDailyLog(saved);
      return saved;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save daily log';
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
