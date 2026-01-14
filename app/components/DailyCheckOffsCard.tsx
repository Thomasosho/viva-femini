'use client';

import { useDailyLog } from '../hooks/use-daily-log';

export default function DailyCheckOffsCard() {
  const today = new Date().toISOString().split('T')[0];
  const { dailyLog, loading } = useDailyLog(today);

  const symptomsText = dailyLog?.symptoms && dailyLog.symptoms.length > 0
    ? dailyLog.symptoms.join(', ')
    : 'None logged';

  const healthActivitiesText = dailyLog?.healthActivities && dailyLog.healthActivities.length > 0
    ? dailyLog.healthActivities[0] + (dailyLog.healthActivities.length > 1 ? ` (+${dailyLog.healthActivities.length - 1})` : '')
    : 'None logged';

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
          Daily Check-Offs
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
        Daily Check-Offs
      </h3>
      
      {/* First Content Row - Symptoms */}
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
          Symptoms:
        </span>
        <div className="flex items-center" style={{ gap: '4px' }}>
          <span 
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              color: '#FB3179',
              lineHeight: '100%',
              letterSpacing: '-0.03em'
            }}
          >
            {symptomsText}
          </span>
        </div>
      </div>

      {/* Second Content Row - Health Report */}
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
          Health Report:
        </span>
          <span 
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              color: healthActivitiesText !== 'None logged' ? '#16A34A' : '#6B7280',
              lineHeight: '100%',
              letterSpacing: '-0.03em'
            }}
          >
            {healthActivitiesText !== 'None logged' ? `${healthActivitiesText} (Logged)` : healthActivitiesText}
          </span>
      </div>
    </div>
  );
}
