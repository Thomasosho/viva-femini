'use client';

import { useTracking } from './TrackingContext';

export default function FilterPillsSection() {
  const { selectedSymptoms, setSelectedSymptoms } = useTracking();

  // Physical Pain badges - from Frame 1618874605.svg
  const physicalPainPills = [
    { id: 'Headache', label: 'Headache', emoji: '🧠' },
    { id: 'Back pain', label: 'Back pain', emoji: '🔙' },
    { id: 'Cramps', label: 'Cramps', emoji: '💢' },
    { id: 'Breast tenderness', label: 'Breast tenderness', emoji: '💔' },
    { id: 'Joint pain', label: 'Joint pain', emoji: '🦴' },
    { id: 'Muscle aches', label: 'Muscle aches', emoji: '💪' },
    { id: 'Stomach pain', label: 'Stomach pain', emoji: '🤢' },
    { id: 'Pelvic pain', label: 'Pelvic pain', emoji: '🫥' }
  ];

  // Emotional & Mental badges - from Frame 2147225526.svg
  const emotionalMentalPills = [
    { id: 'Anxiety', label: 'Anxiety', emoji: '😰' },
    { id: 'Stress', label: 'Stress', emoji: '😓' },
    { id: 'Mood swings', label: 'Mood swings', emoji: '😤' },
    { id: 'Irritability', label: 'Irritability', emoji: '😠' },
    { id: 'Depression', label: 'Depression', emoji: '😔' },
    { id: 'Fatigue', label: 'Fatigue', emoji: '😴' },
    { id: 'Brain fog', label: 'Brain fog', emoji: '🧠' },
    { id: 'Insomnia', label: 'Insomnia', emoji: '🌙' }
  ];

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const Pill = ({ pill, isActive }: { pill: { id: string; label: string; emoji: string }, isActive: boolean }) => {
    return (
      <button
        onClick={() => toggleSymptom(pill.id)}
        style={{
          height: '35.3px',
          borderRadius: '17.65px',
          backgroundColor: isActive ? '#FB3179' : '#FFE9F5',
          border: '0.7px solid #FB3179',
          outline: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          fontFamily: 'Geist, sans-serif',
          fontSize: '12px',
          fontWeight: isActive ? 600 : 500,
          color: isActive ? 'white' : '#FB3179',
          transition: 'all 0.2s ease',
          flexShrink: 0,
          paddingLeft: '12px',
          paddingRight: '12px',
          whiteSpace: 'nowrap'
        }}
      >
        {/* Emoji */}
        <span style={{ fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {pill.emoji}
        </span>
        {/* Label */}
        <span>{pill.label}</span>
      </button>
    );
  };

  return (
    <div className="w-full flex flex-col gap-5 md:gap-6">
      {/* Physical Pain Card - First Row */}
      <div 
        className="w-full"
        style={{
          width: '100%',
          maxWidth: '748px',
          height: '148px',
          borderRadius: '15px',
          gap: '20px',
          padding: '15px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* Title */}
        <h3 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#0F172A',
            margin: 0
          }}
        >
          Physical Pain
        </h3>
        
        {/* Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {physicalPainPills.map((pill) => (
            <Pill key={pill.id} pill={pill} isActive={selectedSymptoms.includes(pill.id)} />
          ))}
        </div>
      </div>

      {/* Emotional & Mental Card - Second Row */}
      <div 
        className="w-full"
        style={{
          width: '100%',
          maxWidth: '748px',
          height: '148px',
          borderRadius: '15px',
          gap: '20px',
          padding: '15px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box'
        }}
      >
        {/* Title */}
        <h3 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#0F172A',
            margin: 0
          }}
        >
          Emotional & Mental
        </h3>
        
        {/* Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {emotionalMentalPills.map((pill) => (
            <Pill key={pill.id} pill={pill} isActive={selectedSymptoms.includes(pill.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
