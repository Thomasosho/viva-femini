export default function CycleChart() {
  return (
    <div 
      className="w-full"
      style={{
        width: '100%',
        maxWidth: '500px',
        height: '437px',
        borderRadius: '10px',
        border: '2px solid #E8E8E8',
        backgroundColor: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        outline: 'none'
      }}
    >
      {/* Cycle Chart Visualization - Using the provided SVG design */}
      <img 
        src="/cycle-chart-frame.svg?v=2" 
        alt="Cycle Chart" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
}
