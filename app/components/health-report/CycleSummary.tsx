'use client';

import { useHealthReport } from '../../hooks/use-health-reports';

interface CycleSummaryProps {
  month: number;
  year: number;
}

export default function CycleSummary({ month, year }: CycleSummaryProps) {
  const { healthReport, loading } = useHealthReport(month, year);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Loading cycle summary...</p>
      </div>
    );
  }

  // Use data from backend health report
  const cycleLength = healthReport?.averageCycleLength || 0;
  const periodLength = healthReport?.averagePeriodLength || 0;
  const totalCycles = healthReport?.totalCycles || 0;
  
  // Calculate estimated next period (using average cycle length from backend)
  const estimatedNextPeriod = new Date();
  if (cycleLength > 0) {
    estimatedNextPeriod.setDate(estimatedNextPeriod.getDate() + cycleLength);
  }
  
  // Calculate ovulation window (typically 14-16 days from period start, using average cycle length)
  const ovulationStart = new Date();
  ovulationStart.setDate(ovulationStart.getDate() + 14);
  const ovulationEnd = new Date();
  ovulationEnd.setDate(ovulationEnd.getDate() + 16);

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
      <h2
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '18px',
          fontWeight: 600,
          color: '#0F172A',
          margin: 0,
          marginBottom: '16px'
        }}
      >
        Cycle Summary - {monthNames[month - 1]} {year} {totalCycles > 0 && `(${totalCycles} cycle${totalCycles !== 1 ? 's' : ''})`}
      </h2>

      {/* Badges - Top Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          width: '100%',
          marginBottom: '12px'
        }}
      >
        {/* Cycle Length Badge */}
        <div
          style={{
            width: 'auto',
            height: '38px',
            borderRadius: '100px',
            gap: '5px',
            borderWidth: '1px',
            padding: '10px',
            background: 'rgba(255, 149, 0, 0.1)',
            border: '1px solid #FF9500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          {/* Cycle icon */}
          <img 
            src="/cycle-icon.svg" 
            alt="Cycle" 
            width="16" 
            height="16" 
            style={{ flexShrink: 0 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#FF9500'
              }}
            >
              Cycle Length:{' '}
            </span>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0F172A'
              }}
            >
              {cycleLength} Days
            </span>
          </span>
        </div>

        {/* Period Duration Badge */}
        <div
          style={{
            width: 'auto',
            height: '38px',
            borderRadius: '100px',
            gap: '5px',
            borderWidth: '1px',
            padding: '10px',
            background: 'rgba(251, 49, 121, 0.1)',
            border: '1px solid #FB3179',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          {/* Period icon */}
          <img 
            src="/period-icon.svg" 
            alt="Period" 
            width="16" 
            height="16" 
            style={{ flexShrink: 0 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#FB3179'
              }}
            >
              Period Duration:{' '}
            </span>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0F172A'
              }}
            >
              {periodLength} Days
            </span>
          </span>
        </div>

        {/* Estimated Next Period Badge */}
        <div
          style={{
            width: 'auto',
            height: '38px',
            borderRadius: '100px',
            gap: '5px',
            borderWidth: '1px',
            padding: '10px',
            background: 'rgba(147, 51, 234, 0.1)',
            border: '1px solid #9333EA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          {/* Single water icon */}
          <img 
            src="/water-single-icon.svg" 
            alt="Water" 
            width="16" 
            height="16" 
            style={{ flexShrink: 0 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#9333EA'
              }}
            >
              Estimated Next Period:{' '}
            </span>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0F172A'
              }}
            >
              {monthNames[estimatedNextPeriod.getMonth()]} {estimatedNextPeriod.getDate()}
            </span>
          </span>
        </div>
      </div>

      {/* Badges - Bottom Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          width: '100%'
        }}
      >
        {/* Ovulation Window Badge */}
        <div
          style={{
            width: 'auto',
            height: '38px',
            borderRadius: '100px',
            gap: '5px',
            borderWidth: '1px',
            padding: '10px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid #3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          {/* Double water icon */}
          <img 
            src="/water-double-icon.svg" 
            alt="Water" 
            width="16" 
            height="16" 
            style={{ flexShrink: 0 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#3B82F6'
              }}
            >
              Ovulation Window:{' '}
            </span>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0F172A'
              }}
            >
              {monthNames[ovulationStart.getMonth()]} {ovulationStart.getDate()}-{ovulationEnd.getDate()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
