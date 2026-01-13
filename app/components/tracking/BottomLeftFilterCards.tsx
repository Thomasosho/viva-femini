'use client';

import { useState } from 'react';

export default function BottomLeftFilterCards() {
  const [activePill1, setActivePill1] = useState<string>('Spotting');
  const [activePill2, setActivePill2] = useState<string>('Increased sex drive');

  // First card pills - Period Indicators
  const firstCardPills = [
    { id: 'Spotting', label: 'Spotting', emoji: '🩸' },
    { id: 'heavier flow', label: 'heavier flow', emoji: '💦' },
    { id: 'lighter flow', label: 'lighter flow', emoji: '💧' },
    { id: 'Virginal Dryness', label: 'Virginal Dryness', emoji: '😐' }
  ];

  // Second card pills - Sexual Health
  const secondCardPills = [
    { id: 'Increased sex drive', label: 'Increased sex drive', emoji: '😊' },
    { id: 'Decreased sex drive', label: 'Decreased sex drive', emoji: '😐' },
    { id: 'Virginal discharge', label: 'Virginal discharge', emoji: '😔' }
  ];

  const Pill = ({ pill, isActive, setActive }: { pill: { id: string; label: string; emoji: string }, isActive: boolean, setActive: (id: string) => void }) => (
    <button
      onClick={() => setActive(pill.id)}
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

  return (
    <div 
      className="w-full"
      style={{
        width: '100%',
        maxWidth: '500px',
        height: '355px',
        borderRadius: '10px',
        border: '2px solid #E8E8E8',
        backgroundColor: 'white',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        overflow: 'auto',
        boxSizing: 'border-box'
      }}
    >
      {/* First Card - Period Indicators */}
      <div 
        className="w-full"
        style={{
          width: '100%',
          maxWidth: '468px',
          height: '143px',
          borderRadius: '15px',
          backgroundColor: 'white',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {/* Title */}
        <h3 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#0F172A',
            margin: 0,
            paddingBottom: '8px'
          }}
        >
          Period Indicators
        </h3>
        
        {/* Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {firstCardPills.map((pill) => (
            <Pill key={pill.id} pill={pill} isActive={activePill1 === pill.id} setActive={setActivePill1} />
          ))}
        </div>
      </div>

      {/* Second Card - Sexual Health */}
      <div 
        className="w-full"
        style={{
          width: '100%',
          maxWidth: '468px',
          height: '148px',
          borderRadius: '15px',
          backgroundColor: 'white',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        {/* Title */}
        <h3 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            color: '#0F172A',
            margin: 0,
            paddingBottom: '8px'
          }}
        >
          Sexual Health
        </h3>
        
        {/* Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          {secondCardPills.map((pill) => (
            <Pill key={pill.id} pill={pill} isActive={activePill2 === pill.id} setActive={setActivePill2} />
          ))}
        </div>
      </div>
    </div>
  );
}
