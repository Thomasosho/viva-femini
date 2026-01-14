'use client';

import { useState } from 'react';
import Header from "../components/Header";
import CycleSummary from "../components/health-report/CycleSummary";
import FlowSymptomSummary from "../components/health-report/FlowSymptomSummary";
import PeriodLengthChart from "../components/health-report/PeriodLengthChart";
import SymptomFrequency from "../components/health-report/SymptomFrequency";
import HistoricalCycleData from "../components/health-report/HistoricalCycleData";

export default function HealthReportPage() {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1); // 1-12
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full px-3 py-4 md:px-6 md:py-6 pt-20 md:pt-4 lg:pt-6 pb-20 lg:pb-6" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        {/* Health Report Container - Exact layout from design */}
        <div
          className="w-full"
          style={{
            width: '100%',
            maxWidth: '1306px',
            minHeight: '1358.80810546875px',
            borderRadius: '25px',
            padding: '20px',
            backgroundColor: '#EFEFEF',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {/* Month/Year Selector */}
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '12px', 
              marginBottom: '10px',
              alignItems: 'center'
            }}
          >
            <label 
              style={{ 
                fontFamily: 'Geist, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151'
              }}
            >
              Select Month:
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              style={{ 
                padding: '8px 12px', 
                borderRadius: '8px', 
                border: '1px solid #D1D5DB',
                fontSize: '14px',
                fontFamily: 'Geist, sans-serif',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                cursor: 'pointer',
                minWidth: '150px'
              }}
            >
              {monthNames.map((name, index) => (
                <option key={name} value={index + 1}>{name}</option>
              ))}
            </select>
            <label 
              style={{ 
                fontFamily: 'Geist, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                marginLeft: '16px'
              }}
            >
              Year:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              style={{ 
                padding: '8px 12px', 
                borderRadius: '8px', 
                border: '1px solid #D1D5DB',
                fontSize: '14px',
                fontFamily: 'Geist, sans-serif',
                backgroundColor: '#FFFFFF',
                color: '#0F172A',
                cursor: 'pointer',
                minWidth: '100px'
              }}
            >
              {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Top Row - Cycle Summary and Flow & Symptom Summary */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{
              gap: '20px',
              width: '100%'
            }}
          >
            {/* Cycle Summary - Top Left */}
            <CycleSummary month={selectedMonth} year={selectedYear} />

            {/* Flow & Symptom Summary - Top Right */}
            <FlowSymptomSummary month={selectedMonth} year={selectedYear} />
          </div>

          {/* Middle Row - Period Length Chart and Symptom Frequency */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{
              gap: '20px',
              width: '100%'
            }}
          >
            {/* Period Length Chart - Middle Left */}
            <PeriodLengthChart month={selectedMonth} year={selectedYear} />

            {/* Symptom Frequency - Middle Right */}
            <SymptomFrequency month={selectedMonth} year={selectedYear} />
          </div>

          {/* Bottom Row - Historical Cycle Data */}
          <div style={{ width: '100%' }}>
            <HistoricalCycleData month={selectedMonth} year={selectedYear} />
          </div>
        </div>
      </main>
    </div>
  );
}
