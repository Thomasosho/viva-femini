export default function DailyCheckOffsCard() {
  return (
    <div 
      className="bg-white border-0 w-full lg:w-[352px]"
      style={{
        height: 'auto',
        borderRadius: '15px',
        paddingTop: '18px',
        paddingRight: '15px',
        paddingBottom: '24px',
        paddingLeft: '15px',
        backgroundColor: '#FFFFFF',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        fontFamily: 'Geist, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative'
      }}
    >
      {/* Title */}
      <h3 
        style={{
          fontFamily: 'Geist, sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          color: '#0F172A',
          lineHeight: '100%',
          margin: 0,
          paddingBottom: '10px'
        }}
      >
        Daily Check-Offs
      </h3>
      
      {/* First Content Row - Symptoms */}
      <div 
        className="flex items-center justify-between w-full" 
        style={{ 
          height: '36px',
          paddingTop: '10px',
          paddingBottom: '10px',
          borderTopWidth: '0.5px',
          borderBottomWidth: '0px',
          borderLeftWidth: '0px',
          borderRightWidth: '0px',
          borderStyle: 'dashed',
          borderColor: '#E5E7EB',
          alignItems: 'center'
        }}
      >
        <span 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#0F172A',
            lineHeight: '100%',
            whiteSpace: 'nowrap'
          }}
        >
          Symptoms:
        </span>
        <div className="flex items-center" style={{ gap: '4px' }}>
          <span 
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              color: '#FB3179',
              lineHeight: '100%',
              letterSpacing: '-0.03em'
            }}
          >
            Mild Bloating, Cravings 🍫
          </span>
        </div>
      </div>

      {/* Second Content Row - Health Report */}
      <div 
        className="flex items-center justify-between w-full" 
        style={{ 
          height: '36px',
          paddingTop: '10px',
          paddingBottom: '10px',
          borderTopWidth: '0.5px',
          borderBottomWidth: '0.5px',
          borderLeftWidth: '0px',
          borderRightWidth: '0px',
          borderStyle: 'dashed',
          borderColor: '#E5E7EB',
          alignItems: 'center'
        }}
      >
        <span 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#0F172A',
            lineHeight: '100%',
            whiteSpace: 'nowrap'
          }}
        >
          Health Report:
        </span>
        <span 
          style={{
            fontFamily: 'Geist, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            color: '#16A34A',
            lineHeight: '100%',
            letterSpacing: '-0.03em'
          }}
        >
          Pilates (Logged)
        </span>
      </div>
    </div>
  );
}
