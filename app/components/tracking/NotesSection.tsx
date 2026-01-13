'use client';

import { useTracking } from './TrackingContext';

export default function NotesSection() {
  const { notes, setNotes } = useTracking();

  return (
    <div 
      className="w-full"
      style={{
        width: '100%',
        borderRadius: '15px',
        border: '1px solid #E8E8E8',
        backgroundColor: 'white',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        width: '100%'
      }}>
        {/* Left side: Icon and Title */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px' 
        }}>
          {/* Notes Icon - Two overlapping documents */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* First document (behind) */}
            <path d="M2 4C2 2.89543 2.89543 2 4 2H8.58579C8.851 2 9.10536 2.10536 9.29289 2.29289L11.7071 4.70711C11.8946 4.89464 12.149 5 12.4142 5H14C15.1046 5 16 5.89543 16 7V14C16 15.1046 15.1046 16 14 16H4C2.89543 16 2 15.1046 2 14V4Z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5"/>
            {/* Second document (in front) */}
            <path d="M4 6C4 4.89543 4.89543 4 6 4H10.5858C10.851 4 11.1054 4.10536 11.2929 4.29289L13.7071 6.70711C13.8946 6.89464 14.149 7 14.4142 7H16C17.1046 7 18 7.89543 18 9V16C18 17.1046 17.1046 18 16 18H6C4.89543 18 4 17.1046 4 16V6Z" fill="white" stroke="#9CA3AF" strokeWidth="1.5"/>
          </svg>
          
          {/* Title */}
          <h3 style={{ 
            fontFamily: 'Geist, sans-serif', 
            fontSize: '16px', 
            fontWeight: 600, 
            color: '#0F172A', 
            margin: 0 
          }}>
            Notes
          </h3>
        </div>

        {/* Right side: Menu button (three dots) */}
        <button
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#F3F4F6',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="4" r="1.5" fill="#6B7280"/>
            <circle cx="8" cy="8" r="1.5" fill="#6B7280"/>
            <circle cx="8" cy="12" r="1.5" fill="#6B7280"/>
          </svg>
        </button>
      </div>

      {/* Text Input Area */}
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Inputting Note"
        style={{
          width: '100%',
          minHeight: '100px',
          border: 'none',
          outline: 'none',
          fontFamily: 'Geist, sans-serif',
          fontSize: '14px',
          fontWeight: 400,
          color: '#0F172A',
          backgroundColor: 'transparent',
          resize: 'none',
          padding: 0,
          lineHeight: '1.5'
        }}
      />
    </div>
  );
}
