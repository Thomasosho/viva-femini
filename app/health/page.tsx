import Header from "../components/Header";
import CycleSummary from "../components/health-report/CycleSummary";
import FlowSymptomSummary from "../components/health-report/FlowSymptomSummary";
import PeriodLengthChart from "../components/health-report/PeriodLengthChart";
import SymptomFrequency from "../components/health-report/SymptomFrequency";
import HistoricalCycleData from "../components/health-report/HistoricalCycleData";

export default function HealthReportPage() {
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
          {/* Top Row - Cycle Summary and Flow & Symptom Summary */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{
              gap: '20px',
              width: '100%'
            }}
          >
            {/* Cycle Summary - Top Left */}
            <CycleSummary />

            {/* Flow & Symptom Summary - Top Right */}
            <FlowSymptomSummary />
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
            <PeriodLengthChart />

            {/* Symptom Frequency - Middle Right */}
            <SymptomFrequency />
          </div>

          {/* Bottom Row - Historical Cycle Data */}
          <div style={{ width: '100%' }}>
            <HistoricalCycleData />
          </div>
        </div>
      </main>
    </div>
  );
}
