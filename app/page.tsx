import Header from "./components/Header";
import CycleCalendarCard from "./components/CycleCalendarCard";
import CombinedCardsSection from "./components/CombinedCardsSection";
import CycleHighlightCard from "./components/CycleHighlightCard";
import TipsCards from "./components/TipsCards";
import DailyCheckOffsCard from "./components/DailyCheckOffsCard";
import TrendWatchCard from "./components/TrendWatchCard";
import RecommendedArticles from "./components/RecommendedArticles";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content - Responsive Layout */}
      <main className="w-full px-3 py-4 md:px-6 md:py-6 pt-20 md:pt-4 lg:pt-6 pb-20 lg:pb-6" style={{ position: 'relative' }}>
        <div 
          className="mx-auto w-full max-w-full md:max-w-[1400px] flex flex-col lg:flex-row lg:justify-center gap-5 md:gap-6 lg:items-start"
        >
          {/* Left Column */}
          <div className="w-full flex flex-col gap-5 md:gap-5 lg:w-auto">
            <CycleCalendarCard />
            <CombinedCardsSection />
          </div>

          {/* Right Column - Vertical Stack */}
          <div 
            className="w-full flex flex-col gap-5 md:gap-6 lg:w-auto"
          >
            {/* First Right Card */}
            <div 
              className="w-full lg:w-[749px]"
              style={{
                height: 'auto',
                backgroundColor: '#F3F4F6',
                borderRadius: '16px',
                padding: '16px',
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <CycleHighlightCard />
              <div 
                className="flex flex-col md:flex-row gap-4 md:gap-[15px]"
              >
                <DailyCheckOffsCard />
                <TrendWatchCard />
              </div>
            </div>

            {/* Recommended Articles - Standalone Card */}
            <div 
              className="w-full lg:w-[749px]"
              style={{
                height: 'auto',
                minHeight: '281px',
                backgroundColor: '#F3F4F6',
                borderRadius: '16px',
                padding: '16px',
                border: 'none',
                outline: 'none',
                boxShadow: 'none'
              }}
            >
              <RecommendedArticles />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
