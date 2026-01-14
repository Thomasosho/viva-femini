'use client';

import { useHealthReport } from '../../hooks/use-health-reports';
import { useEffect, useState, useMemo } from 'react';
import { dailyLogsApi, DailyLog } from '../../lib/api/daily-logs';
import { cyclesApi } from '../../lib/api/cycles';

interface PeriodLengthChartProps {
  month: number;
  year: number;
}

interface PeriodDayData {
  date: Date;
  flowIntensity: number;
}

export default function PeriodLengthChart({ month, year }: PeriodLengthChartProps) {
  const { healthReport, loading } = useHealthReport(month, year);
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [cycles, setCycles] = useState<any[]>([]);
  const [cyclesLoading, setCyclesLoading] = useState(false);

  // Fetch daily logs for the month to get flow intensity data
  useEffect(() => {
    const fetchDailyLogs = async () => {
      try {
        setLogsLoading(true);
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];
        console.log('[PeriodLengthChart] Fetching daily logs for:', { month, year, startDateStr, endDateStr });
        const logs = await dailyLogsApi.getAll(startDateStr, endDateStr);
        console.log('[PeriodLengthChart] Fetched logs:', logs.length, logs);
        setDailyLogs(logs);
      } catch (err) {
        console.error('Failed to load daily logs:', err);
        setDailyLogs([]);
      } finally {
        setLogsLoading(false);
      }
    };
    fetchDailyLogs();
  }, [month, year]);

  // Get cycle information so we can figure out which days are period days
  useEffect(() => {
    const fetchCycles = async () => {
      try {
        setCyclesLoading(true);
        // Look at a wider date range so we don't miss any cycles
        const searchStart = new Date(year, month - 2, 1); // 2 months before
        const searchEnd = new Date(year, month, 0); // End of selected month
        const cycles = await cyclesApi.getAll(
          searchStart.toISOString().split('T')[0],
          searchEnd.toISOString().split('T')[0]
        );
        console.log('[PeriodLengthChart] Fetched cycles:', cycles.length, cycles);
        setCycles(cycles);
      } catch (err) {
        console.error('Failed to load cycles:', err);
        setCycles([]);
      } finally {
        setCyclesLoading(false);
      }
    };
    fetchCycles();
  }, [month, year]);

  // Put together period days from both logged data and cycle information
  const chartData = useMemo<PeriodDayData[]>(() => {
    const periodDaysMap = new Map<string, PeriodDayData>();

    // Start with period days that were manually logged
    dailyLogs.forEach(log => {
      if (log.isPeriodDay === true) {
        const date = new Date(log.date);
        if (date.getMonth() + 1 === month && date.getFullYear() === year) {
          const dateKey = date.toISOString().split('T')[0];
          periodDaysMap.set(dateKey, {
            date,
            flowIntensity: log.flowIntensity || 1,
          });
        }
      }
    });

    // 2. Calculate period days from cycle data (if not already in daily logs)
    cycles.forEach(cycle => {
      if (cycle.startDate && cycle.periodLength) {
        let cycleStart: Date;
        if (typeof cycle.startDate === 'string') {
          const dateStr = cycle.startDate.split('T')[0];
          const [y, m, d] = dateStr.split('-').map(Number);
          cycleStart = new Date(y, m - 1, d);
        } else {
          cycleStart = new Date(cycle.startDate);
        }

        const periodLength = cycle.periodLength || 5;

        for (let i = 0; i < periodLength; i++) {
          const periodDay = new Date(cycleStart);
          periodDay.setDate(periodDay.getDate() + i);

          if (periodDay.getMonth() + 1 === month && periodDay.getFullYear() === year) {
            const dateKey = periodDay.toISOString().split('T')[0];
            
            // Only add if not already in map (daily logs take precedence)
            if (!periodDaysMap.has(dateKey)) {
              periodDaysMap.set(dateKey, {
                date: periodDay,
                flowIntensity: 1, // Default flow intensity for cycle-based period days
              });
            }
          }
        }
      }
    });

    const result = Array.from(periodDaysMap.values())
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    
    console.log('[PeriodLengthChart] Final chart data:', result.length, result);
    return result;
  }, [dailyLogs, cycles, month, year]);

  if (loading || logsLoading || cyclesLoading) {
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
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Loading period length chart...</p>
      </div>
    );
  }

  // Use periodLengthHistory from health report for reference
  const periodHistory = healthReport?.periodLengthHistory || [];
  
  // Prepare chart points from daily logs
  const maxFlow = 10;
  const chartHeight = 131;
  
  // Create points for the chart (only period days with flow)
  const chartPoints = chartData.map((log, index) => {
    const x = 20 + (index * (460 / Math.max(chartData.length - 1, 1)));
    const y = chartHeight - (log.flowIntensity / maxFlow * chartHeight);
    return { x, y, value: log.flowIntensity, date: log.date };
  });

  // Generate path for line chart
  const pathD = chartPoints.length > 0
    ? chartPoints.reduce((path, point, index) => {
        return index === 0 
          ? `M ${point.x} ${point.y}`
          : `${path} L ${point.x} ${point.y}`;
      }, '')
    : '';

  // Format dates for x-axis
  const xAxisDates = chartPoints.length > 0 
    ? chartPoints.map(p => p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    : [];
  
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
          Period Length
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
          Monthly period pattern (0-7 days) and flow intensity
        </p>
      </div>

      {/* Chart Container */}
      <div
        style={{
          width: '100%',
          height: '200px',
          position: 'relative',
          display: 'flex',
          padding: '10px 0 40px 0'
        }}
      >
        {/* Y-axis labels */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            paddingRight: '10px',
            alignItems: 'flex-end',
            minWidth: '30px'
          }}
        >
          {[10, 6, 3, 0].map((value) => (
            <span
              key={value}
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '12px',
                fontWeight: 400,
                color: '#6B7280'
              }}
            >
              {value}
            </span>
          ))}
        </div>

        {/* Chart Area */}
        <div
          style={{
            flex: 1,
            height: '100%',
            position: 'relative',
            minWidth: 0
          }}
        >
          {/* X-axis labels - positioned at bottom */}
          {xAxisDates.length > 0 && (
            <div
              style={{
                position: 'absolute',
                bottom: '-35px',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                paddingLeft: '0',
                paddingRight: '0'
              }}
            >
              {xAxisDates.map((date, index) => (
                <span
                  key={`${date}-${index}`}
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '10px',
                    fontWeight: 400,
                    color: '#6B7280',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {date}
                </span>
              ))}
            </div>
          )}
          
          {xAxisDates.length === 0 && (
            <div
              style={{
                position: 'absolute',
                bottom: '-35px',
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Geist, sans-serif',
                fontSize: '12px',
                color: '#9CA3AF'
              }}
            >
              No period data for this month
            </div>
          )}

          {/* Line Chart */}
          <svg
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            viewBox="0 0 500 131"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Grid lines for Y-axis (0, 3, 6, 10) */}
            {/* Y=0 (baseline) */}
            <line
              x1="0"
              y1="131"
              x2="500"
              y2="131"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
            {/* Y=3 */}
            <line
              x1="0"
              y1="98.25"
              x2="500"
              y2="98.25"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
            {/* Y=6 */}
            <line
              x1="0"
              y1="65.5"
              x2="500"
              y2="65.5"
              stroke="#E5E7EB"
              strokeWidth="1"
            />
            {/* Y=10 (top) */}
            <line
              x1="0"
              y1="0"
              x2="500"
              y2="0"
              stroke="#E5E7EB"
              strokeWidth="1"
            />

            {/* Data line from backend daily logs */}
            {pathD && (
              <path
                d={pathD}
                stroke="#FB3179"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data points from backend daily logs */}
            {chartPoints.map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="5"
                fill="white"
                stroke="#FB3179"
                strokeWidth="2"
              />
            ))}
            
            {/* Show message if no data */}
            {chartPoints.length === 0 && (
              <text
                x="250"
                y="65"
                textAnchor="middle"
                style={{
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '14px',
                  fill: '#9CA3AF'
                }}
              >
                No period data available
              </text>
            )}
          </svg>
        </div>
      </div>

      {/* Explanation with Question Mark Icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '8px'
        }}
      >
        {/* Help Icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M7.96634 12C8.19968 12 8.39701 11.9193 8.55834 11.758C8.71968 11.5966 8.80012 11.3995 8.79967 11.1666C8.79923 10.9338 8.71879 10.7364 8.55834 10.5746C8.3979 10.4129 8.20056 10.3324 7.96634 10.3333C7.73212 10.3342 7.53501 10.4149 7.37501 10.5753C7.21501 10.7358 7.13434 10.9329 7.13301 11.1666C7.13168 11.4004 7.21234 11.5978 7.37501 11.7586C7.53767 11.9195 7.73479 12 7.96634 12ZM7.99968 14.6666C7.07745 14.6666 6.21079 14.4915 5.39968 14.1413C4.58856 13.7911 3.88301 13.3162 3.28301 12.7166C2.68301 12.1171 2.20812 11.4115 1.85834 10.6C1.50856 9.78842 1.33345 8.92176 1.33301 7.99998C1.33256 7.0782 1.50768 6.21153 1.85834 5.39998C2.20901 4.58842 2.6839 3.88287 3.28301 3.28331C3.88212 2.68376 4.58768 2.20887 5.39968 1.85865C6.21168 1.50842 7.07834 1.33331 7.99968 1.33331C8.92101 1.33331 9.78767 1.50842 10.5997 1.85865C11.4117 2.20887 12.1172 2.68376 12.7163 3.28331C13.3155 3.88287 13.7906 4.58842 14.1417 5.39998C14.4928 6.21153 14.6677 7.0782 14.6663 7.99998C14.665 8.92176 14.4899 9.78842 14.141 10.6C13.7921 11.4115 13.3172 12.1171 12.7163 12.7166C12.1155 13.3162 11.4099 13.7913 10.5997 14.142C9.78945 14.4926 8.92279 14.6675 7.99968 14.6666ZM7.99968 13.3333C9.48856 13.3333 10.7497 12.8166 11.783 11.7833C12.8163 10.75 13.333 9.48887 13.333 7.99998C13.333 6.51109 12.8163 5.24998 11.783 4.21665C10.7497 3.18331 9.48856 2.66665 7.99968 2.66665C6.51079 2.66665 5.24968 3.18331 4.21634 4.21665C3.18301 5.24998 2.66634 6.51109 2.66634 7.99998C2.66634 9.48887 3.18301 10.75 4.21634 11.7833C5.24968 12.8166 6.51079 13.3333 7.99968 13.3333ZM8.06634 5.13331C8.34412 5.13331 8.5859 5.2222 8.79168 5.39998C8.99745 5.57776 9.10012 5.79998 9.09968 6.06665C9.09968 6.31109 9.02479 6.52776 8.87501 6.71665C8.72523 6.90553 8.55568 7.08331 8.36634 7.24998C8.11079 7.4722 7.8859 7.71665 7.69168 7.98331C7.49745 8.24998 7.40012 8.54998 7.39968 8.88331C7.39968 9.03887 7.45812 9.16953 7.57501 9.27531C7.6919 9.38109 7.8279 9.43376 7.98301 9.43331C8.14968 9.43331 8.29145 9.37776 8.40834 9.26665C8.52523 9.15553 8.60012 9.01665 8.63301 8.84998C8.67745 8.61665 8.77745 8.40842 8.93301 8.22531C9.08856 8.0422 9.25523 7.86709 9.43301 7.69998C9.68856 7.45553 9.90812 7.18887 10.0917 6.89998C10.2752 6.61109 10.3668 6.28887 10.3663 5.93331C10.3663 5.36665 10.1359 4.90287 9.67501 4.54198C9.21412 4.18109 8.6779 4.00042 8.06634 3.99998C7.64412 3.99998 7.24145 4.08887 6.85834 4.26665C6.47523 4.44442 6.18345 4.71665 5.98301 5.08331C5.90523 5.21665 5.88034 5.35842 5.90834 5.50865C5.93634 5.65887 6.01123 5.77265 6.13301 5.84998C6.28856 5.93887 6.44968 5.96665 6.61634 5.93331C6.78301 5.89998 6.9219 5.80554 7.03301 5.64998C7.15523 5.48331 7.30812 5.35554 7.49168 5.26665C7.67523 5.17776 7.86679 5.13331 8.06634 5.13331Z" fill="#9CA3AF"/>
        </svg>
        <p
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '12px',
            fontWeight: 400,
            color: '#6B7280',
            margin: 0
          }}
        >
          Higher peaks indicate stronger symptoms. Flow overlay (pink) shows heavier days.
        </p>
      </div>
    </div>
  );
}
