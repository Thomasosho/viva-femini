export default function CycleSummary() {
  return (
    <div 
      className="bg-white border-0 w-full"
      style={{
        height: 'auto',
        borderRadius: '15px',
        padding: '20px',
        backgroundColor: '#FFFFFF',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        fontFamily: 'Geist, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxSizing: 'border-box'
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '18px',
          fontWeight: 600,
          color: '#0F172A',
          margin: 0,
          marginBottom: '16px'
        }}
      >
        Cycle Summary - October 2025
      </h2>

      {/* Badges - Top Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          width: '100%',
          marginBottom: '12px'
        }}
      >
        {/* Cycle Length Badge */}
        <div
          style={{
            width: 'auto',
            height: '38px',
            borderRadius: '100px',
            gap: '5px',
            borderWidth: '1px',
            padding: '10px',
            background: 'rgba(255, 149, 0, 0.1)',
            border: '1px solid #FF9500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          {/* Cycle icon */}
          <img 
            src="/cycle-icon.svg" 
            alt="Cycle" 
            width="16" 
            height="16" 
            style={{ flexShrink: 0 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#FF9500'
              }}
            >
              Cycle Length:{' '}
            </span>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0F172A'
              }}
            >
              28 Days
            </span>
          </span>
        </div>

        {/* Period Duration Badge */}
        <div
          style={{
            width: 'auto',
            height: '38px',
            borderRadius: '100px',
            gap: '5px',
            borderWidth: '1px',
            padding: '10px',
            background: 'rgba(251, 49, 121, 0.1)',
            border: '1px solid #FB3179',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          {/* Period icon */}
          <img 
            src="/period-icon.svg" 
            alt="Period" 
            width="16" 
            height="16" 
            style={{ flexShrink: 0 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#FB3179'
              }}
            >
              Period Duration:{' '}
            </span>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0F172A'
              }}
            >
              5 Days
            </span>
          </span>
        </div>

        {/* Estimated Next Period Badge */}
        <div
          style={{
            width: 'auto',
            height: '38px',
            borderRadius: '100px',
            gap: '5px',
            borderWidth: '1px',
            padding: '10px',
            background: 'rgba(147, 51, 234, 0.1)',
            border: '1px solid #9333EA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          {/* Single water icon */}
          <img 
            src="/water-single-icon.svg" 
            alt="Water" 
            width="16" 
            height="16" 
            style={{ flexShrink: 0 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#9333EA'
              }}
            >
              Estimated Next Period:{' '}
            </span>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0F172A'
              }}
            >
              Nov 4
            </span>
          </span>
        </div>
      </div>

      {/* Badges - Bottom Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          width: '100%'
        }}
      >
        {/* Ovulation Window Badge */}
        <div
          style={{
            width: 'auto',
            height: '38px',
            borderRadius: '100px',
            gap: '5px',
            borderWidth: '1px',
            padding: '10px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid #3B82F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxSizing: 'border-box'
          }}
        >
          {/* Double water icon */}
          <img 
            src="/water-double-icon.svg" 
            alt="Water" 
            width="16" 
            height="16" 
            style={{ flexShrink: 0 }}
          />
          <span style={{ whiteSpace: 'nowrap' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 400,
                fontStyle: 'normal',
                lineHeight: '18px',
                letterSpacing: '0%',
                color: '#3B82F6'
              }}
            >
              Ovulation Window:{' '}
            </span>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                fontStyle: 'normal',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0F172A'
              }}
            >
              Oct 17-22
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
