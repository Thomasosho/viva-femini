'use client';

import { useState, FormEvent } from 'react';
import { format, addDays } from 'date-fns';
import { cyclesApi, CreateCycleDto } from '../lib/api/cycles';

interface CreateCycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateCycleModal({ isOpen, onClose, onSuccess }: CreateCycleModalProps) {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [averageFlow, setAverageFlow] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const start = new Date(startDate);
      const endDate = addDays(start, cycleLength - 1);

      const cycleData: CreateCycleDto = {
        startDate: format(start, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        cycleLength,
        periodLength,
        averageFlow,
      };

      await cyclesApi.create(cycleData);
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create cycle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '20px',
            fontWeight: 600,
            color: '#0F172A',
            marginBottom: '20px',
          }}
        >
          Create New Cycle
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                style={{
                  display: 'block',
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Start Date (First day of period)
              </label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '14px',
                  fontFamily: 'Geist, sans-serif',
                  color: '#0F172A',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Cycle Length */}
            <div>
              <label
                htmlFor="cycleLength"
                style={{
                  display: 'block',
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Cycle Length (days)
              </label>
              <input
                type="number"
                id="cycleLength"
                min="21"
                max="45"
                value={cycleLength}
                onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '14px',
                  fontFamily: 'Geist, sans-serif',
                  color: '#0F172A',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Period Length */}
            <div>
              <label
                htmlFor="periodLength"
                style={{
                  display: 'block',
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Period Length (days)
              </label>
              <input
                type="number"
                id="periodLength"
                min="1"
                max="10"
                value={periodLength}
                onChange={(e) => setPeriodLength(parseInt(e.target.value) || 5)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '14px',
                  fontFamily: 'Geist, sans-serif',
                  color: '#0F172A',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Average Flow */}
            <div>
              <label
                htmlFor="averageFlow"
                style={{
                  display: 'block',
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#374151',
                  marginBottom: '8px',
                }}
              >
                Average Flow
              </label>
              <select
                id="averageFlow"
                value={averageFlow}
                onChange={(e) => setAverageFlow(e.target.value as 'light' | 'medium' | 'heavy')}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '14px',
                  fontFamily: 'Geist, sans-serif',
                  color: '#0F172A',
                  boxSizing: 'border-box',
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer',
                }}
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>

            {/* Error Message */}
            {error && (
              <div
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#DC2626',
                  fontSize: '14px',
                  fontFamily: 'Geist, sans-serif',
                }}
              >
                {error}
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  backgroundColor: '#FFFFFF',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Geist, sans-serif',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#FB3179',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 500,
                  fontFamily: 'Geist, sans-serif',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {loading ? 'Creating...' : 'Create Cycle'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
