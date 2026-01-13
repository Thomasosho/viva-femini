export default function ChartVisualization() {
  return (
    <div 
      className="w-full"
      style={{
        width: '100%',
        maxWidth: '748px',
        height: 'auto',
        minHeight: '150px',
        borderRadius: '14.5px',
        border: '2px solid #C8C8C8',
        backgroundColor: 'white',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      {/* Chart visualization area */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Chart lines and data points will go here */}
        <svg width="700" height="118" viewBox="0 0 700 118" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Placeholder chart lines */}
          <path d="M20 98 L120 80 L220 60 L320 70 L420 50 L520 40 L620 30 L680 20" 
            stroke="#FB3179" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
          />
          {/* Data points */}
          {[20, 120, 220, 320, 420, 520, 620].map((x, i) => (
            <circle 
              key={i} 
              cx={x} 
              cy={98 - (i * 12)} 
              r="4" 
              fill="#FB3179"
            />
          ))}
        </svg>
      </div>
      
      {/* Settings icon in top right */}
      <button
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          width: '29px',
          height: '30px',
          borderRadius: '14.5px',
          backgroundColor: '#F3F4F6',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 10.6667C9.47276 10.6667 10.6667 9.47276 10.6667 8C10.6667 6.52724 9.47276 5.33333 8 5.33333C6.52724 5.33333 5.33333 6.52724 5.33333 8C5.33333 9.47276 6.52724 10.6667 8 10.6667Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.9333 6.66667C12.7867 6.81333 12.6933 7.01333 12.6933 7.22667C12.6933 7.44 12.7867 7.64 12.9333 7.78667L13.04 7.89333C13.1867 8.04 13.3867 8.13333 13.6 8.13333C13.8133 8.13333 14.0133 8.04 14.16 7.89333L14.2667 7.78667C14.4133 7.64 14.5067 7.44 14.5067 7.22667C14.5067 7.01333 14.4133 6.81333 14.2667 6.66667L14.16 6.56C14.0133 6.41333 13.8133 6.32 13.6 6.32C13.3867 6.32 13.1867 6.41333 13.04 6.56L12.9333 6.66667Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
