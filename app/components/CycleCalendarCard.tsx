'use client';

import { useState, useEffect, useMemo } from 'react';
import { useCurrentCycle } from '../hooks/use-cycles';
import { dailyLogsApi } from '../lib/api/daily-logs';
import CreateCycleModal from './CreateCycleModal';
import EditCycleModal from './EditCycleModal';

export default function CycleCalendarCard() {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Get current date
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // State for selected month and year (default to current month/year)
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  // State for selected dates (stored as date strings)
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  
  // State for hovered date
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  
  // State for expanded/collapsed calendar
  const [isExpanded, setIsExpanded] = useState(false);
  
  // State for showing month/year picker
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  
  // State for create cycle modal
  const [showCreateCycleModal, setShowCreateCycleModal] = useState(false);
  
  // State for edit cycle modal
  const [showEditCycleModal, setShowEditCycleModal] = useState(false);
  
  // API hooks
  const { cycle, loading: cycleLoading, reload: reloadCycle } = useCurrentCycle();
  const [periodDates, setPeriodDates] = useState<Set<string>>(new Set());
  const [loadingPeriods, setLoadingPeriods] = useState(false);

  // Fetch period dates for the selected month
  useEffect(() => {
    const fetchPeriodDates = async () => {
      setLoadingPeriods(true);
      try {
        const startOfMonth = new Date(selectedYear, selectedMonth, 1);
        const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);
        const startDate = startOfMonth.toISOString().split('T')[0];
        const endDate = endOfMonth.toISOString().split('T')[0];
        const logs = await dailyLogsApi.getAll(startDate, endDate);
        const periodSet = new Set<string>();
        logs.forEach(log => {
          if (log.isPeriodDay) {
            // Extract day of month and store as string for matching
            const logDate = new Date(log.date);
            // Ensure we're comparing dates in the same month/year context
            if (logDate.getMonth() === selectedMonth && logDate.getFullYear() === selectedYear) {
              periodSet.add(logDate.getDate().toString());
            }
          }
        });
        setPeriodDates(periodSet);
      } catch (err) {
        console.error('Failed to load period dates:', err);
        setPeriodDates(new Set()); // Reset on error
      } finally {
        setLoadingPeriods(false);
      }
    };
    fetchPeriodDates();
  }, [selectedMonth, selectedYear]);

  // Calculate cycle day from current cycle
  const cycleDay = useMemo(() => {
    if (!cycle?.startDate) return null;
    const startDate = new Date(cycle.startDate);
    const diffTime = today.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 && diffDays <= (cycle.cycleLength || 28) ? diffDays : null;
  }, [cycle, today]);

  // Calculate next period date
  const nextPeriodDate = useMemo(() => {
    if (!cycle?.endDate) return null;
    const endDate = new Date(cycle.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? { date: endDate, days: diffDays } : null;
  }, [cycle, today]);

  // Calculate fertile window (typically days 10-17 of cycle, but simplified to day 14)
  const fertileWindowStart = useMemo(() => {
    if (!cycle?.startDate) return null;
    const startDate = new Date(cycle.startDate);
    startDate.setDate(startDate.getDate() + 13); // Day 14 of cycle
    return startDate;
  }, [cycle]);

  // Dates with events (period days from API)
  const datesWithEvents = periodDates;
  
  // Get the first day of the month and number of days in the month
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Generate calendar days for the selected month/year
  const generateCalendarDays = (month: number, year: number, expanded: boolean) => {
    const days: (number | null)[] = [];
    const firstDay = getFirstDayOfMonth(month, year);
    const daysInMonth = getDaysInMonth(month, year);
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    if (expanded) {
      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
      }
    } else {
      // When collapsed, show only first 2 rows (14 days)
      const daysToShow = Math.min(14, daysInMonth);
      for (let day = 1; day <= daysToShow; day++) {
        days.push(day);
      }
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays(selectedMonth, selectedYear, isExpanded);
  
  // Handle date click
  const handleDateClick = (day: number | null) => {
    if (day === null) return;
    
    const dateString = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const newSelectedDates = new Set(selectedDates);
    
    if (newSelectedDates.has(dateString)) {
      newSelectedDates.delete(dateString);
    } else {
      newSelectedDates.add(dateString);
    }
    
    setSelectedDates(newSelectedDates);
  };
  
  // Check if date is current date
  const isCurrentDate = (day: number | null) => {
    if (day === null) return false;
    return day === currentDate && selectedMonth === currentMonth && selectedYear === currentYear;
  };
  
  // Check if date is selected
  const isSelected = (day: number | null) => {
    if (day === null) return false;
    const dateString = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return selectedDates.has(dateString);
  };
  
  // Check if date has event
  const hasEvent = (day: number | null) => {
    if (day === null) return false;
    return datesWithEvents.has(day.toString());
  };
  
  // Check if date is hovered
  const isHovered = (day: number | null) => {
    if (day === null) return false;
    const dateString = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return hoveredDate === dateString;
  };
  
  // Get date style
  const getDateStyle = (day: number | null) => {
    const baseStyle = {
      width: '59.027774810791016px',
      height: '48px',
      borderRadius: '86.81px',
      paddingTop: '16px',
      paddingRight: '8.68px',
      paddingBottom: '16px',
      paddingLeft: '8.68px',
      gap: '8.68px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: day !== null ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
    };
    
    if (day === null) {
      return { ...baseStyle, backgroundColor: 'transparent', border: 'none' };
    }
    
    const selected = isSelected(day);
    const current = isCurrentDate(day);
    const event = hasEvent(day);
    const hovered = isHovered(day);
    
    let backgroundColor = 'transparent';
    let border = '0.43px solid #FFFFFF';
    let color = '#FFFFFF';
    
    // Priority: Selected > Period Day (event) > Current > Default
    // Period days should always be highlighted (pink) unless selected
    if (selected) {
      backgroundColor = '#0D34F9';
      border = '0.43px solid #FFFFFF';
      color = '#FFFFFF';
    } else if (event) {
      // Period day - highlight in pink
      backgroundColor = '#FB3179';
      border = '0.43px solid #FFFFFF';
      color = '#FFFFFF';
    } else if (current) {
      backgroundColor = '#FFFFFF';
      border = '0.43px solid #FFFFFF';
      color = '#000000';
    } else {
      backgroundColor = 'transparent';
      border = '0.43px solid #FFFFFF';
      color = '#FFFFFF';
    }
    
    // If current day is also a period day, add a pink border or indicator
    if (current && event && !selected) {
      backgroundColor = '#FB3179';
      border = '2px solid #FFFFFF';
      color = '#FFFFFF';
    }
    
    // Add white outline on hover
    if (hovered && !selected) {
      border = '2px solid #FFFFFF';
    }
    
    return {
      ...baseStyle,
      backgroundColor,
      border,
      color,
    };
  };
  
  // Handle month change
  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setShowMonthYearPicker(false);
  };
  
  // Handle year change
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };
  
  // Generate years for dropdown (current year ± 5 years)
  const generateYears = () => {
    const years = [];
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
      years.push(i);
    }
    return years;
  };
  
  // Format today's date string
  const getTodayString = () => {
    const monthName = monthNames[currentMonth];
    return `Today, ${monthName} ${currentDate}`;
  };

  return (
    <div 
      className="relative overflow-hidden flex flex-col w-full lg:w-[500px]"
      style={{
        height: 'auto',
        gap: '18px',
        paddingTop: '20px',
        paddingRight: '16px',
        paddingBottom: '20px',
        paddingLeft: '16px',
        borderRadius: '16px',
        background: 'linear-gradient(179.42deg, #FB3179 9.47%, #FFC0D6 90.53%)'
      }}
    >
      {/* Background pattern placeholder - faint leaf patterns for top section */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Leaf pattern placeholders */}
        <div className="absolute top-4 right-8 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-white rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col flex-1" style={{ gap: '18px' }}>
        {/* Top Section: Date Header and Calendar */}
        <div className="flex flex-col flex-shrink-0">
          {/* Date Header - Centered */}
          <div className="text-center mb-4">
            <p 
              className="mb-2" 
              style={{ 
                fontFamily: 'Geist, sans-serif',
                fontWeight: 400,
                fontSize: '10.42px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#FFFFFF'
              }}
            >
              {getTodayString()}
            </p>
            {/* Month and Year Selector - Active/Clickable */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <button 
                onClick={() => {
                  setShowMonthYearPicker(!showMonthYearPicker);
                }}
                className="flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ 
                  fontFamily: 'Geist, sans-serif',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none'
                }}
              >
                {/* Calendar icon with day number */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" strokeWidth="2" fill="none"/>
                  <line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="10" x2="21" y2="10" stroke="white" strokeWidth="2"/>
                  <text x="12" y="18" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Geist, sans-serif">{currentDate}</text>
                </svg>
                {/* Month and Year Text */}
                <span className="text-sm font-medium text-white" style={{ fontFamily: 'Geist, sans-serif' }}>
                  {monthNames[selectedMonth]} {selectedYear}
                </span>
              </button>
              {/* Dropdown arrow - clickable to expand/collapse calendar */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                  setShowMonthYearPicker(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                >
                  <path d="M2 4L6 8L10 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Month/Year Picker Dropdown */}
              {showMonthYearPicker && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginTop: '8px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    zIndex: 1000,
                    minWidth: '200px',
                    fontFamily: 'Geist, sans-serif'
                  }}
                >
                  {/* Year Selector */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#111827', marginBottom: '8px', display: 'block' }}>Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => handleYearChange(parseInt(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        fontFamily: 'Geist, sans-serif',
                        backgroundColor: '#FFFFFF',
                        color: '#111827',
                        cursor: 'pointer'
                      }}
                    >
                      {generateYears().map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Month Grid */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#111827', marginBottom: '8px', display: 'block' }}>Month</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {monthNames.map((month, index) => (
                        <button
                          key={index}
                          onClick={() => handleMonthChange(index)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: selectedMonth === index ? '2px solid #FB3179' : '1px solid #E5E7EB',
                            backgroundColor: selectedMonth === index ? '#FFE5EE' : '#FFFFFF',
                            color: selectedMonth === index ? '#FB3179' : '#111827',
                            fontSize: '12px',
                            fontFamily: 'Geist, sans-serif',
                            fontWeight: selectedMonth === index ? 600 : 400,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          {month.substring(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Grid */}
          <div>
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 mb-2" style={{ gap: '4.34px' }}>
              {daysOfWeek.map((day) => (
                <div key={day} className="text-center text-xs font-medium text-white opacity-80">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7" style={{ gap: '4.34px' }}>
              {calendarDays.map((day, index) => {
                const dateString = day !== null ? `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}` : null;
                
                return (
                  <div
                    key={index}
                    onClick={() => handleDateClick(day)}
                    onMouseEnter={() => day !== null && setHoveredDate(dateString!)}
                    onMouseLeave={() => setHoveredDate(null)}
                    style={getDateStyle(day)}
                  >
                    {day !== null && (
                      <span style={{ 
                        fontFamily: 'Geist, sans-serif',
                        fontSize: '14px',
                        fontWeight: isCurrentDate(day) ? 'bold' : 'medium'
                      }}>
                        {day}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section: White Cycle Day Display with leaf patterns - All content inside */}
        <div 
          className="relative flex flex-col items-center justify-between overflow-hidden w-full lg:w-[468px]"
          style={{
            minHeight: '228.40277099609375px',
            paddingTop: '19.1px',
            paddingRight: '17.36px',
            paddingBottom: '19.1px',
            paddingLeft: '17.36px',
            borderRadius: '34.72px',
            backgroundColor: '#FFFFFF'
          }}
        >
          {/* Leaf pattern assets overlaid on white background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: '34.72px' }}>
            {/* Left side leaves */}
            <div className="absolute left-0 bottom-0" style={{ width: '197px', height: '287px', opacity: 0.2 }}>
              <svg width="197" height="287" viewBox="0 0 197 287" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.2" clipPath="url(#clip0_71_1728)">
                  <path d="M-27.2873 75.1296C-21.5061 77.1001 -16.5565 80.5487 -12.4426 84.9262C-5.76075 92.0372 -0.964074 101.431 3.31178 111.338C11.8624 131.154 18.6614 153.176 29.6911 163.231C40.044 172.668 50.4059 176.039 59.6343 175.504C63.6043 175.274 67.3958 174.301 70.9076 172.707C66.3937 144.561 48.526 115.063 24.2473 101.597C51.3236 109.869 73.8346 132.106 83.2596 162.929L80.7299 165.927C81.5749 165.095 82.3796 164.223 83.1415 163.314C95.1662 149.02 98.0956 124.293 78.8228 100.542C69.9677 89.6291 52.6436 76.8104 31.8403 70.7946C13.8432 65.5912 -6.65311 65.3039 -27.2873 75.1306L-27.2873 75.1296ZM112.355 87.1841C114.398 91.7785 115.227 96.7013 115.074 101.653C114.806 110.307 111.946 119.152 108.445 127.971C101.443 145.607 92.0601 163.481 92.6563 176.333C93.222 188.507 97.5048 196.872 103.46 202.174C106.007 204.444 108.957 206.217 112.156 207.401C126.622 187.159 133.695 158.01 127.024 134.746C138.638 156.574 138.861 184.16 125.779 209.033C141.715 207.405 158.354 194.117 161.079 167.903C162.342 155.758 159.564 137.127 150.438 120.582C142.691 106.537 130.557 93.9485 112.356 87.185L112.355 87.1841ZM-28.969 196.618C-23.5304 215.261 -11.8433 228.28 1.60858 237.016C17.4537 247.307 35.8421 251.413 48.0446 251.025C74.381 250.19 88.8159 234.547 91.5844 218.767C65.8413 230.029 38.3473 227.825 17.4143 214.673C40.1395 222.998 69.7165 218.038 90.9424 205.06C89.995 201.783 88.4413 198.712 86.3618 196.008C81.501 189.687 73.4482 184.816 61.3479 183.379C48.5753 181.862 30.0825 189.939 11.9908 195.657C2.94583 198.516 -6.07588 200.739 -14.726 200.384C-19.6777 200.181 -24.5301 198.987 -28.9681 196.618L-28.969 196.618Z" fill="#FB3179"/>
                </g>
                <defs>
                  <clipPath id="clip0_71_1728">
                    <rect width="212.244" height="212.244" fill="white" transform="translate(-90.1763 99.4515) rotate(-27.9416)"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            {/* Right side leaves */}
            <div className="absolute right-0 top-0" style={{ width: '182px', height: '289px', opacity: 0.2 }}>
              <svg width="182" height="289" viewBox="0 0 182 289" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.2" clipPath="url(#clip0_71_1726)">
                  <path d="M195.653 55.7458C194.778 61.6017 192.35 66.9214 188.89 71.6056C183.27 79.2139 175.145 85.4212 166.44 91.2209C149.029 102.82 129.208 113.132 121.536 125.398C114.336 136.912 112.922 147.379 115.037 156.087C115.946 159.833 117.533 163.28 119.664 166.352C145.721 157.155 170.747 134.988 179.368 109.494C176.186 136.753 158.892 162.087 131.136 176.432L127.837 174.541C128.777 175.202 129.749 175.818 130.748 176.387C146.47 185.37 170.56 183.866 189.861 161.357C198.729 151.016 207.943 132.266 210.064 111.381C211.898 93.3131 208.61 73.7163 195.652 55.746L195.653 55.7458ZM208.428 191.015C204.402 193.761 199.851 195.408 195.103 196.123C186.803 197.371 177.87 196.18 168.852 194.375C150.816 190.763 132.138 184.921 119.986 187.723C108.474 190.379 101.24 195.917 97.219 202.518C95.4969 205.342 94.319 208.463 93.7461 211.72C115.565 221.997 144.592 223.677 165.62 213.271C146.821 228.14 120.552 233.148 94.5575 224.995C98.8797 239.911 114.445 253.469 139.918 251.512C151.72 250.604 169.005 244.717 183.197 233.138C195.245 223.309 205.141 209.549 208.428 191.016L208.428 191.015ZM79.5 75.2584C62.6657 83.6854 52.2817 97.0939 46.2879 111.441C39.2284 128.341 38.5085 146.591 40.9991 158.161C46.3737 183.132 63.8009 194.179 79.3304 194.077C64.1165 171.484 61.4389 144.88 70.3434 122.631C66.3542 145.751 76.2253 173.095 92.2914 191.082C95.2521 189.609 97.9102 187.594 100.128 185.14C105.311 179.406 108.556 170.88 107.824 159.09C107.051 146.646 96.1334 130.413 87.5361 114.154C83.2369 106.025 79.5487 97.8073 78.3837 89.4962C77.7167 84.7386 78.0123 79.9034 79.5002 75.2592L79.5 75.2584Z" fill="#FB3179"/>
                </g>
                <defs>
                  <clipPath id="clip0_71_1726">
                    <rect width="205.746" height="205.746" fill="white" transform="translate(161.53) rotate(51.7293)"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          {/* Content - All contained within white section */}
          <div className="relative z-10 flex flex-col items-center w-full" style={{ gap: '12px' }}>
            {/* Cycle Day Display - Centered */}
            <div className="w-full flex flex-col items-center">
              <p className="text-base font-bold mb-3 text-gray-900">Today is Cycle Day</p>
              {/* Large pink 8-sided shape with curved edges - centered - exact SVG from design */}
              <div className="flex items-center justify-center mb-3" style={{ width: '80px', height: '80px', position: 'relative' }}>
                <svg width="80" height="80" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.15)' }}>
                  <defs>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(251, 49, 121, 0.3)"/>
                    </filter>
                  </defs>
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M61.5088 22.3506C65.1581 24.9792 67.636 29.0527 67.636 33.818C67.636 38.5833 65.1581 42.6599 61.5088 45.2854C62.2466 49.7186 61.0968 54.3794 57.7366 57.7366C54.3701 61.103 49.7125 62.222 45.2977 61.5026C42.6814 65.1642 38.571 67.636 33.818 67.636C29.0527 67.636 24.97 65.155 22.3475 61.4996C17.9266 62.222 13.2659 61.1061 9.89638 57.7366C6.52995 54.3701 5.41088 49.7094 6.15488 45.2854C2.50868 42.6629 -6.17714e-08 38.5863 -5.41379e-08 33.818C-4.65045e-08 29.0497 2.50868 24.97 6.15488 22.3506C5.41088 17.9266 6.52995 13.2659 9.89945 9.89945C13.2597 6.5361 17.9235 5.38936 22.3721 6.12721C24.9792 2.47179 29.062 4.65242e-08 33.818 5.41379e-08C38.5679 6.17419e-08 42.6722 2.46871 45.2915 6.12721C49.7248 5.38936 54.3794 6.54225 57.7366 9.89945C61.0938 13.2567 62.2497 17.9174 61.5088 22.3506Z" 
                    fill="#FB3179"
                    filter="url(#shadow)"
                  />
                </svg>
                <span className="text-3xl font-bold text-white relative z-10">
                  {cycleLoading ? '...' : (cycleDay || '?')}
                </span>
              </div>
              {/* Cycle info BELOW the circle - centered, on same line */}
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Avg. Cycle: <span className="font-bold">{cycle?.cycleLength || 28} Days</span> {cycleDay && cycle?.cycleLength ? `Currently: ${Math.round((cycleDay / cycle.cycleLength) * 100)}% of ${cycle.cycleLength}` : ''}
                </p>
              </div>
              {/* Cycle Management Buttons */}
              {!cycleLoading && (
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'center' }}>
                  {!cycle ? (
                    <button
                      onClick={() => setShowCreateCycleModal(true)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '20px',
                        border: '1px solid #FB3179',
                        backgroundColor: '#FFFFFF',
                        color: '#FB3179',
                        fontSize: '14px',
                        fontWeight: 600,
                        fontFamily: 'Geist, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFE5EE';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      Create Cycle
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowEditCycleModal(true)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid #FB3179',
                        backgroundColor: '#FFFFFF',
                        color: '#FB3179',
                        fontSize: '12px',
                        fontWeight: 600,
                        fontFamily: 'Geist, sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFE5EE';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#FFFFFF';
                      }}
                    >
                      Edit Cycle
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Next Period Info - button-like element with pink border */}
            <div className="mt-2">
              <div 
                className="inline-flex items-center"
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: '1px solid #FB3179'
                }}
              >
                <span className="text-sm font-medium text-gray-900" style={{ color: '#FB3179' }}>
                  {nextPeriodDate ? (
                    <>
                      Next Period: <span style={{ color: '#FB3179', fontWeight: 'bold' }}>
                        {monthNames[nextPeriodDate.date.getMonth()]} {nextPeriodDate.date.getDate()}
                      </span> <span style={{ color: '#FB3179', fontWeight: 'bold' }}>({nextPeriodDate.days} Days)</span>
                    </>
                  ) : (
                    <span style={{ color: '#6B7280' }}>No upcoming period</span>
                  )}
                </span>
              </div>
            </div>

            {/* Fertile Window */}
            {fertileWindowStart && (
              <p className="text-sm font-medium text-gray-700">
                Fertile window starts <span className="font-bold">{monthNames[fertileWindowStart.getMonth()]} {fertileWindowStart.getDate()}</span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Create Cycle Modal */}
      <CreateCycleModal
        isOpen={showCreateCycleModal}
        onClose={() => setShowCreateCycleModal(false)}
        onSuccess={() => {
          reloadCycle();
        }}
      />

      {/* Edit Cycle Modal */}
      <EditCycleModal
        isOpen={showEditCycleModal}
        onClose={() => setShowEditCycleModal(false)}
        onSuccess={() => {
          reloadCycle();
        }}
        cycle={cycle}
      />
    </div>
  );
}
