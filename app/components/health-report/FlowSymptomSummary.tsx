'use client';

import { useHealthReport } from '../../hooks/use-health-reports';

interface FlowSymptomSummaryProps {
  month: number;
  year: number;
}

export default function FlowSymptomSummary({ month, year }: FlowSymptomSummaryProps) {
  const { healthReport, loading } = useHealthReport(month, year);

  if (loading) {
    return (
      <div 
        className="bg-white border-0 w-full"
        style={{
          height: 'auto',
          borderRadius: '15px',
          padding: '20px',
          backgroundColor: '#FFFFFF',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          fontFamily: 'Geist, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxSizing: 'border-box'
        }}
      >
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Loading flow & symptom summary...</p>
      </div>
    );
  }

  const cycleLength = healthReport?.averageCycleLength || 28;
  const symptomFrequency = healthReport?.symptomFrequency || {};
  const hasMoreFrequentSymptoms = Object.keys(symptomFrequency).length > 0;
  const flowSummary = healthReport?.flowSummary || { light: 0, medium: 0, heavy: 0 };
  const totalFlowDays = flowSummary.light + flowSummary.medium + flowSummary.heavy;
  const isFlowTypical = totalFlowDays > 0 && totalFlowDays <= 7;

  return (
    <div 
      className="bg-white border-0 w-full"
      style={{
        height: 'auto',
        borderRadius: '15px',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        fontFamily: 'Geist, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxSizing: 'border-box'
      }}
    >
      {/* Title */}
      <div>
        <h2
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#0F172A',
            margin: 0,
            marginBottom: '4px'
          }}
        >
          Flow & Symptom Summary
        </h2>
        <p
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#6B7280',
            margin: 0
          }}
        >
          Understand your symptoms linked to sleep & activity
        </p>
      </div>

      {/* Summary Text */}
      <p
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: '#0F172A',
          margin: 0,
          lineHeight: '1.5'
        }}
      >
        Your average cycle length is {cycleLength} days. {hasMoreFrequentSymptoms ? 'PMS symptoms were more frequent this month. ' : ''}Flow pattern {isFlowTypical ? 'remains within a typical range' : 'varies from typical range'}.
      </p>

      {/* Tips Section */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}
        >
          <h3
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#FB3179',
              margin: 0,
              whiteSpace: 'nowrap'
            }}
          >
            Tips To Adhere To:
          </h3>
          <div
            style={{
              flex: 1,
              height: '1px',
              backgroundColor: '#F1F1F1'
            }}
          />
        </div>
        <ul
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#0F172A',
            margin: 0,
            paddingLeft: '20px',
            lineHeight: '1.8',
            listStyle: 'disc'
          }}
        >
          <li>Low sleep nights → higher cramp scores</li>
          <li>Low hydration → increased bloating</li>
        </ul>
      </div>
    </div>
  );
}
