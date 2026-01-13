import ReferralSection from "./ReferralSection";
import PregnancyTestSection from "./PregnancyTestSection";
import QuickActionSection from "./QuickActionSection";

export default function CombinedCardsSection() {
  return (
    <div
      className="flex flex-col w-full lg:w-[500px]"
      style={{
        height: 'auto',
        gap: '8px',
        padding: '8px',
        borderRadius: '16px',
        backgroundColor: '#E5E5EA'
      }}
    >
      <ReferralSection />
      <PregnancyTestSection />
      <QuickActionSection />
    </div>
  );
}
