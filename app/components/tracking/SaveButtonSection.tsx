'use client';

import { useState } from 'react';
import { useTracking } from './TrackingContext';

export default function SaveButtonSection() {
  const [isHovered, setIsHovered] = useState(false);
  const { save, saving, error } = useTracking();

  const handleSave = async () => {
    try {
      await save();
      // Optionally show a success message
    } catch (err) {
      // Error is handled in context
      console.error('Failed to save:', err);
    }
  };

  return (
    <div 
      className="w-full"
      style={{
        width: '100%',
        maxWidth: 'auto',
        height: 'auto',
        borderRadius: '15px',
        backgroundColor: 'white',
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxSizing: 'border-box'
      }}
    >
      {/* Error Message */}
      {error && (
        <div style={{ 
          color: '#EF4444', 
          fontSize: '14px', 
          textAlign: 'center',
          width: '100%'
        }}>
          {error}
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '100%',
          maxWidth: '550px',
          height: '60px',
          borderRadius: '30px', // Half of height for pill shape
          backgroundColor: '#FB3179',
          border: '3px solid rgba(251, 49, 121, 0.19)', // #FB317930
          outline: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          paddingTop: '10px',
          paddingRight: '50px',
          paddingBottom: '10px',
          paddingLeft: '50px',
          fontFamily: 'Geist, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: 'white',
          transition: 'background-color 0.2s ease',
          boxSizing: 'border-box',
          opacity: saving ? 0.6 : 1,
          cursor: saving ? 'not-allowed' : 'pointer'
        }}
      >
        <span>{saving ? 'Saving...' : 'Save'}</span>
        {/* Checkmark Icon */}
        <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
          <path d="M6.297 15.6201L0.014 9.3365L1.585 7.7656L6.297 12.4783L16.412 2.3639L17.983 3.9348L6.297 15.6201Z" fill="white"/>
        </svg>
      </button>
    </div>
  );
}
