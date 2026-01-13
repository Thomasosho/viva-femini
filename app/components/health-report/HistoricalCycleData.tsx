export default function HistoricalCycleData() {
  const tableData = [
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch...' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' },
    { date: 'Oct 18th', time: '01:57:25 am', topSymptom: 'Physical Pain', totalSymptoms: '6/10', note: 'After lunch' }
  ];

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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          marginBottom: '4px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h2
            style={{
              fontFamily: 'Geist, sans-serif',
              fontSize: '18px',
              fontWeight: 600,
              color: '#0F172A',
              margin: 0,
              lineHeight: '1.2'
            }}
          >
            Historical Cycle Data
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'Geist, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#0F172A',
                lineHeight: '1.2'
              }}
            >
              Oct 2025
            </span>
            {/* Dropdown arrow icon placeholder */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Download PDF Button */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 16px',
            height: '36px',
            borderRadius: '18px',
            backgroundColor: '#B32070',
            border: '0.7px solid rgba(179, 32, 112, 0.17)',
            outline: 'none',
            cursor: 'pointer',
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'white',
            lineHeight: '1.2',
            flexShrink: 0
          }}
        >
          {/* Download icon placeholder */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
            <path d="M8 12L4 8H6V4H10V8H12L8 12Z" fill="white"/>
            <path d="M2 14V2H14V14H2Z" stroke="white" strokeWidth="1.5" fill="none"/>
          </svg>
          Download PDF
        </button>
      </div>

      {/* Table */}
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'Geist, sans-serif'
          }}
        >
          <thead>
            <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
              <th
                style={{
                  textAlign: 'left',
                  padding: '12px 12px 12px 0',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0F172A',
                  lineHeight: '1.4'
                }}
              >
                Date
              </th>
              <th
                style={{
                  textAlign: 'center',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0F172A',
                  lineHeight: '1.4'
                }}
              >
                Top Symptom
              </th>
              <th
                style={{
                  textAlign: 'center',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0F172A',
                  lineHeight: '1.4'
                }}
              >
                Total Symptoms
              </th>
              <th
                style={{
                  textAlign: 'left',
                  padding: '12px 0 12px 12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#0F172A',
                  lineHeight: '1.4'
                }}
              >
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: index < tableData.length - 1 ? '1px solid #E5E7EB' : 'none'
                }}
              >
                <td
                  style={{
                    padding: '12px 12px 12px 0',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#0F172A',
                    lineHeight: '1.4'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ lineHeight: '1.2' }}>{row.date}</span>
                    <span style={{ fontSize: '12px', color: '#6B7280', lineHeight: '1.2' }}>{row.time}</span>
                  </div>
                </td>
                <td
                  style={{
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#0F172A',
                    textAlign: 'center',
                    lineHeight: '1.4'
                  }}
                >
                  {row.topSymptom}
                </td>
                <td
                  style={{
                    padding: '12px',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#0F172A',
                    textAlign: 'center',
                    lineHeight: '1.4'
                  }}
                >
                  {row.totalSymptoms}
                </td>
                <td
                  style={{
                    padding: '12px 0 12px 12px',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    lineHeight: '1.4'
                  }}
                >
                  <span>{row.note}</span>
                  {/* Note icon placeholder - document with arrow */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <path d="M4 2H10C10.5523 2 11 2.44772 11 3V5H13C13.5523 5 14 5.44772 14 6V13C14 13.5523 13.5523 14 13 14H4C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z" stroke="#6B7280" strokeWidth="1.5" fill="none"/>
                    <path d="M11 2V5H14" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9L11 11L9 13" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
