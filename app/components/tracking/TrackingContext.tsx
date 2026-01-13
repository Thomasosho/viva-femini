'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useDailyLog } from '../../hooks/use-daily-log';

interface TrackingState {
  selectedSymptoms: string[];
  flowIntensity: number;
  notes: string;
  healthActivities: string[];
  setSelectedSymptoms: (symptoms: string[]) => void;
  setFlowIntensity: (intensity: number) => void;
  setNotes: (notes: string) => void;
  setHealthActivities: (activities: string[]) => void;
  save: () => Promise<void>;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const TrackingContext = createContext<TrackingState | undefined>(undefined);

export function TrackingProvider({ 
  children, 
  date 
}: { 
  children: ReactNode; 
  date: string;
}) {
  const { dailyLog, loading, saveDailyLog } = useDailyLog(date);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [flowIntensity, setFlowIntensity] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [healthActivities, setHealthActivities] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing data when dailyLog changes
  useEffect(() => {
    if (dailyLog) {
      setSelectedSymptoms(dailyLog.symptoms || []);
      setFlowIntensity(dailyLog.flowIntensity || 0);
      setNotes(dailyLog.notes || '');
      setHealthActivities(dailyLog.healthActivities || []);
    } else {
      // Reset to defaults if no log exists
      setSelectedSymptoms([]);
      setFlowIntensity(0);
      setNotes('');
      setHealthActivities([]);
    }
  }, [dailyLog]);

  const save = async () => {
    try {
      setSaving(true);
      setError(null);
      await saveDailyLog({
        symptoms: selectedSymptoms,
        flowIntensity,
        notes,
        healthActivities,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return (
    <TrackingContext.Provider
      value={{
        selectedSymptoms,
        flowIntensity,
        notes,
        healthActivities,
        setSelectedSymptoms,
        setFlowIntensity,
        setNotes,
        setHealthActivities,
        save,
        loading,
        saving,
        error,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const context = useContext(TrackingContext);
  if (context === undefined) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
}
