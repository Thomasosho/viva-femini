'use client';

import { useRef } from 'react';
import { useTracking } from './TrackingContext';

export default function ProgressBarSection() {
  const { flowIntensity, setFlowIntensity } = useTracking();
  const progress = flowIntensity * 10; // Convert 0-10 scale to 0-100 percentage
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !progressBarRef.current) return;

    const progressBarRect = progressBarRef.current.getBoundingClientRect();
    let newProgress = ((e.clientX - progressBarRect.left) / progressBarRect.width) * 100;
    newProgress = Math.max(0, Math.min(100, newProgress)); // Clamp between 0 and 100
    const scaleValue = Math.max(1, Math.min(10, Math.ceil(newProgress / 10)));
    setFlowIntensity(scaleValue);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className="w-full"
      style={{
        width: '100%',
        maxWidth: '748px',
        height: '150px',
        borderRadius: '15px',
        backgroundColor: 'white',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxSizing: 'border-box'
      }}
    >
      {/* Title, Description, and Scale */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h3 style={{ 
            fontFamily: 'Geist, sans-serif', 
            fontSize: '16px', 
            fontWeight: 600, 
            color: '#0F172A', 
            margin: 0 
          }}>
            Flow Intensity
          </h3>
          {/* Description text from SVG */}
          <p style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#6B7280',
            margin: 0
          }}>
            How heavy is your flow today?
          </p>
        </div>
        {/* Scale Text (1/10 format) - exact styling from SVG */}
        <span style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          color: '#9CA3AF',
          letterSpacing: '0'
        }}>
          {flowIntensity || 0}/10
        </span>
      </div>

      {/* Progress Bar Container with Labels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '718px' }}>
        <div 
          ref={progressBarRef}
          style={{
            width: '100%',
            height: '12px',
            borderRadius: '6px',
            backgroundColor: '#F3F3F3',
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            if (progressBarRef.current && !isDragging.current) {
              const progressBarRect = progressBarRef.current.getBoundingClientRect();
              let newProgress = ((e.clientX - progressBarRect.left) / progressBarRect.width) * 100;
              newProgress = Math.max(0, Math.min(100, newProgress));
              const scaleValue = Math.max(1, Math.min(10, Math.ceil(newProgress / 10)));
              setFlowIntensity(scaleValue);
            }
          }}
        >
          {/* Progress Fill with Gradient */}
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              borderRadius: '6px',
              background: 'linear-gradient(to right, #FB3179, #FF80AD)',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: isDragging.current ? 'none' : 'width 0.1s ease-out'
            }}
          />
          
          {/* Progress Indicator (Circular Thumb) */}
          <div
            style={{
              width: '22.976px', // rx="11.488" * 2
              height: '16px', // ry="8" * 2
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '2px solid #FB3179',
              position: 'absolute',
              top: '50%',
              left: `${progress}%`,
              transform: 'translate(-50%, -50%)',
              cursor: 'grab',
              transition: isDragging.current ? 'none' : 'left 0.1s ease-out',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              zIndex: 10
            }}
            onMouseDown={handleMouseDown}
          />
        </div>
        
        {/* Labels below slider - Light, Medium, Heavy */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%',
          position: 'relative'
        }}>
          <span style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#6B7280'
          }}>
            Light
          </span>
          <span style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#6B7280',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            Medium
          </span>
          <span style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#6B7280'
          }}>
            Heavy
          </span>
        </div>
      </div>
    </div>
  );
}
