export default function SymptomFrequency() {
  const symptoms = [
    { label: 'Physical Pain', percentage: 55, color: '#DF0910', iconColor: '#DF0910' },
    { label: 'Mood & Mental', percentage: 75, color: '#E643FF', iconColor: '#07A537' },
    { label: 'Digestion & Appetite', percentage: 62, color: '#07A537', iconColor: '#FACC15' },
    { label: 'Sexual Health', percentage: 32, color: '#EC4899', iconColor: '#EC4899' },
    { label: 'Digestion & Appetite', percentage: 23, color: '#FACC15', iconColor: '#FACC15' }
  ];

  const DonutChart = ({ percentage, color }: { percentage: number; color: string }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        {/* Percentage text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Geist, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#0F172A'
          }}
        >
          {percentage}%
        </div>
      </div>
    );
  };

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
      <div>
        <h2
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '18px',
            fontWeight: 600,
            color: '#0F172A',
            margin: 0,
            marginBottom: '4px'
          }}
        >
          Symptom Frequency
        </h2>
        <p
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#6B7280',
            margin: 0
          }}
        >
          Study your body system & understand your wellbeing
        </p>
      </div>

      {/* Charts Grid - 3 top, 2 bottom */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '100%'
        }}
      >
        {/* Top Row - 3 items */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            width: '100%'
          }}
        >
          {symptoms.slice(0, 3).map((symptom, index) => (
            <div
              key={`${symptom.label}-${index}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <DonutChart percentage={symptom.percentage} color={symptom.color} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: symptom.iconColor,
                    flexShrink: 0
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#0F172A',
                    textAlign: 'center'
                  }}
                >
                  {symptom.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row - 2 items, centered */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            gap: '20px',
            width: '100%'
          }}
        >
          {symptoms.slice(3).map((symptom, index) => (
            <div
              key={`${symptom.label}-${index + 3}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                width: 'calc((100% - 40px) / 3)' // Same width as top row items
              }}
            >
              <DonutChart percentage={symptom.percentage} color={symptom.color} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: symptom.iconColor,
                    flexShrink: 0
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#0F172A',
                    textAlign: 'center'
                  }}
                >
                  {symptom.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
