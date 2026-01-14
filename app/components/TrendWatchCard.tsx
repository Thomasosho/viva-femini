'use client';

import { useSymptoms } from '../hooks/use-symptoms';
import { useEffect, useMemo, useState } from 'react';

export default function TrendWatchCard() {
  // Get symptoms for the last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const startDate = thirtyDaysAgo.toISOString().split('T')[0];
  const endDate = new Date().toISOString().split('T')[0];
  
  const { symptoms, loading } = useSymptoms(startDate, endDate);
  const [mostFrequentSymptom, setMostFrequentSymptom] = useState<string>('None');
  const [trendStatus, setTrendStatus] = useState<{ text: string; emoji: string }>({ text: 'Stable', emoji: '😊' });

  useEffect(() => {
    if (symptoms && typeof symptoms === 'object' && !Array.isArray(symptoms)) {
      // symptoms is a Record<string, number> (frequency map)
      const symptomFreq = symptoms as Record<string, number>;
      const entries = Object.entries(symptomFreq);
      if (entries.length > 0) {
        const sorted = entries.sort((a, b) => b[1] - a[1]);
        setMostFrequentSymptom(sorted[0][0] || 'None');
      }
    }
  }, [symptoms]);

  if (loading) {
    return (
      <div 
        className="bg-white border-0 w-full lg:w-[352px]"
        style={{
          height: 'auto',
          borderRadius: '15px',
          paddingTop: '18px',
          paddingRight: '15px',
          paddingBottom: '24px',
          paddingLeft: '15px',
          backgroundColor: '#FFFFFF',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          fontFamily: 'Geist, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative'
        }}
      >
        <h3 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#0F172A',
            lineHeight: '100%',
            margin: 0,
            paddingBottom: '10px'
          }}
        >
          Trend Watch
        </h3>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div 
      className="bg-white border-0 w-full lg:w-[352px]"
      style={{
        height: 'auto',
        borderRadius: '15px',
        paddingTop: '18px',
        paddingRight: '15px',
        paddingBottom: '24px',
        paddingLeft: '15px',
        backgroundColor: '#FFFFFF',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        fontFamily: 'Geist, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative'
      }}
    >
      {/* Title */}
      <h3 
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#0F172A',
          lineHeight: '100%',
          margin: 0,
          paddingBottom: '10px'
        }}
      >
        Trend Watch
      </h3>
      
      {/* First Content Row - Most Frequent Symptom */}
      <div 
        className="flex items-center justify-between w-full" 
        style={{ 
          height: '36px',
          paddingTop: '10px',
          paddingBottom: '10px',
          borderTopWidth: '0.5px',
          borderBottomWidth: '0px',
          borderLeftWidth: '0px',
          borderRightWidth: '0px',
          borderStyle: 'dashed',
          borderColor: '#E5E7EB',
          alignItems: 'center'
        }}
      >
        <span 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#0F172A',
            lineHeight: '100%',
            whiteSpace: 'nowrap'
          }}
        >
          Most Frequent Symptom
        </span>
        <span 
          className="inline-block"
          style={{
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: '12px',
            paddingRight: '12px',
            backgroundColor: 'rgba(233, 72, 103, 0.1)',
            color: '#FB3179',
            borderRadius: '14px',
            fontSize: '12px',
            fontWeight: 700,
            fontFamily: 'Geist, sans-serif',
            lineHeight: '100%',
            letterSpacing: '-0.03em',
            width: 'fit-content'
          }}
        >
          {mostFrequentSymptom}
        </span>
      </div>

      {/* Second Content Row - Symptom Intensity Change */}
      <div 
        className="flex items-center justify-between w-full" 
        style={{ 
          height: '36px',
          paddingTop: '10px',
          paddingBottom: '10px',
          borderTopWidth: '0.5px',
          borderBottomWidth: '0.5px',
          borderLeftWidth: '0px',
          borderRightWidth: '0px',
          borderStyle: 'dashed',
          borderColor: '#E5E7EB',
          alignItems: 'center'
        }}
      >
        <span 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#0F172A',
            lineHeight: '100%',
            whiteSpace: 'nowrap'
          }}
        >
          Symptom Intensity Change
        </span>
        <span 
          className="inline-block"
          style={{
            paddingTop: '4px',
            paddingBottom: '4px',
            paddingLeft: '12px',
            paddingRight: '12px',
            backgroundColor: 'rgba(79, 196, 248, 0.22)',
            color: '#07DBB1',
            borderRadius: '14px',
            fontSize: '12px',
            fontWeight: 700,
            fontFamily: 'Geist, sans-serif',
            lineHeight: '100%',
            letterSpacing: '-0.03em',
            width: 'fit-content',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          {trendStatus.text} {trendStatus.emoji}
        </span>
      </div>
    </div>
  );
}
