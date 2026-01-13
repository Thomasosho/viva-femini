'use client';

import Header from "../components/Header";
import CycleChart from "../components/tracking/CycleChart";
import FilterPillsSection from "../components/tracking/FilterPillsSection";
import ProgressBarSection from "../components/tracking/ProgressBarSection";
import NotesSection from "../components/tracking/NotesSection";
import SaveButtonSection from "../components/tracking/SaveButtonSection";
import BottomLeftFilterCards from "../components/tracking/BottomLeftFilterCards";
import { TrackingProvider } from "../components/tracking/TrackingContext";

export default function TrackingPage() {
  // Use today's date in YYYY-MM-DD format
  const today = new Date();
  const dateString = today.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full px-3 py-4 md:px-6 md:py-6 pt-20 md:pt-4 lg:pt-6 pb-20 lg:pb-6" style={{ position: 'relative' }}>
        <div 
          className="mx-auto flex flex-col lg:flex-row gap-5 md:gap-6 lg:justify-center"
          style={{ 
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {/* Left Column */}
          <div className="w-full flex flex-col gap-5 md:gap-6 lg:w-[500px]">
            {/* Cycle Chart */}
            <CycleChart />
            
            {/* Bottom Left Filter Cards */}
            <BottomLeftFilterCards />
          </div>

          {/* Right Column */}
          <div 
            className="w-full lg:w-[748px]"
            style={{
              width: '100%',
              maxWidth: '748px',
              height: '815px',
              borderRadius: '10px',
              border: '2px solid #E8E8E8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              boxSizing: 'border-box',
              backgroundColor: 'white'
            }}
          >
            <TrackingProvider date={dateString}>
              {/* Filter Pills Sections */}
              <FilterPillsSection />
              
              {/* Progress Bar Section */}
              <ProgressBarSection />
              
              {/* Notes Section */}
              <NotesSection />
              
              {/* Save Button Section */}
              <SaveButtonSection />
            </TrackingProvider>
          </div>
        </div>
      </main>
    </div>
  );
}
