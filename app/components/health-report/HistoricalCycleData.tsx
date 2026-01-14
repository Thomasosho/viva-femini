'use client';

import { useState, useEffect } from 'react';
import { dailyLogsApi } from '../../lib/api/daily-logs';

interface HistoricalCycleDataProps {
  month: number;
  year: number;
}

export default function HistoricalCycleData({ month, year }: HistoricalCycleDataProps) {
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const handleDownloadPDF = () => {
    if (tableData.length === 0) {
      return;
    }

    // Create HTML content for the PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Historical Cycle Data - ${monthNames[month - 1]} ${year}</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              padding: 40px;
              color: #0F172A;
              background: white;
            }
            h1 {
              font-size: 24px;
              font-weight: 600;
              margin-bottom: 8px;
              color: #0F172A;
            }
            .subtitle {
              font-size: 14px;
              color: #6B7280;
              margin-bottom: 32px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th {
              text-align: left;
              padding: 12px;
              font-size: 14px;
              font-weight: 600;
              color: #0F172A;
              border-bottom: 2px solid #E5E7EB;
            }
            th.center {
              text-align: center;
            }
            td {
              padding: 12px;
              font-size: 14px;
              color: #0F172A;
              border-bottom: 1px solid #E5E7EB;
            }
            td.center {
              text-align: center;
            }
            .date-time {
              display: flex;
              flex-direction: column;
              gap: 4px;
            }
            .date-main {
              font-size: 14px;
            }
            .date-time-sub {
              font-size: 12px;
              color: #6B7280;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #E5E7EB;
              font-size: 12px;
              color: #6B7280;
              text-align: center;
            }
            @media print {
              body {
                padding: 20px;
              }
              @page {
                margin: 1cm;
              }
            }
          </style>
        </head>
        <body>
          <h1>Historical Cycle Data</h1>
          <div class="subtitle">${monthNames[month - 1]} ${year}</div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th class="center">Top Symptom</th>
                <th class="center">Total Symptoms</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              ${tableData.map(row => `
                <tr>
                  <td>
                    <div class="date-time">
                      <span class="date-main">${row.date}</span>
                      ${row.time ? `<span class="date-time-sub">${row.time}</span>` : ''}
                    </div>
                  </td>
                  <td class="center">${row.topSymptom}</td>
                  <td class="center">${row.totalSymptoms}</td>
                  <td>${row.note}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="footer">
            Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} at ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </body>
      </html>
    `;

    // Create a blob with the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `Historical_Cycle_Data_${monthNames[month - 1]}_${year}.html`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Also open in a new window so user can print/save as PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      // Auto-print after a short delay
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  useEffect(() => {
    const loadDailyLogs = async () => {
      setLoading(true);
      try {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0);
        const startDate = startOfMonth.toISOString().split('T')[0];
        const endDate = endOfMonth.toISOString().split('T')[0];
        const logs = await dailyLogsApi.getAll(startDate, endDate);
        
        const formattedData = logs
          .filter(log => log.symptoms && log.symptoms.length > 0)
          .map(log => {
            const logDate = new Date(log.date);
            const monthName = monthNames[logDate.getMonth()];
            const day = logDate.getDate();
            const ordinal = day === 1 || day === 21 || day === 31 ? 'st' : day === 2 || day === 22 ? 'nd' : day === 3 || day === 23 ? 'rd' : 'th';
            
            const topSymptom = log.symptoms[0] || 'None';
            const totalSymptoms = `${log.symptoms.length}/10`;
            const time = log.createdAt ? new Date(log.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).toLowerCase() : '';
            
            return {
              date: `${monthName} ${day}${ordinal}`,
              time,
              topSymptom,
              totalSymptoms,
              note: log.notes || 'No note',
            };
          })
          .sort((a, b) => {
            // Sort by date (newest first) - simplified comparison
            return b.date.localeCompare(a.date);
          });
        
        setTableData(formattedData);
      } catch (err) {
        console.error('Failed to load daily logs:', err);
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadDailyLogs();
  }, [month, year]);

  if (loading) {
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
        <p style={{ color: '#6B7280', fontSize: '14px' }}>Loading historical cycle data...</p>
      </div>
    );
  }

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
              {monthNames[month - 1]} {year}
            </span>
            {/* Dropdown arrow icon placeholder */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
              <path d="M3 4.5L6 7.5L9 4.5" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Download PDF Button */}
        <button
          onClick={handleDownloadPDF}
          disabled={tableData.length === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0 16px',
            height: '36px',
            borderRadius: '18px',
            backgroundColor: tableData.length === 0 ? '#D1D5DB' : '#B32070',
            border: '0.7px solid rgba(179, 32, 112, 0.17)',
            outline: 'none',
            cursor: tableData.length === 0 ? 'not-allowed' : 'pointer',
            fontFamily: 'Geist, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: 'white',
            lineHeight: '1.2',
            flexShrink: 0,
            opacity: tableData.length === 0 ? 0.6 : 1,
            transition: 'all 0.2s ease'
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
                  {/* Note icon - document expand */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <g clipPath="url(#clip0_75_2399_historical)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.5 1.5V13.5H9.25C9.44891 13.5 9.63968 13.579 9.78033 13.7197C9.92098 13.8603 10 14.0511 10 14.25C10 14.4489 9.92098 14.6397 9.78033 14.7803C9.63968 14.921 9.44891 15 9.25 15H3C2.73478 15 2.48043 14.8946 2.29289 14.7071C2.10536 14.5196 2 14.2652 2 14V1C2 0.734784 2.10536 0.48043 2.29289 0.292894C2.48043 0.105357 2.73478 4.89892e-07 3 4.89892e-07H9.644C9.77835 -0.000132485 9.91134 0.0268066 10.035 0.0792094C10.1588 0.131612 10.2706 0.208404 10.364 0.305L13.719 3.781C13.8992 3.96747 14 4.21666 14 4.476V5.25C14 5.35377 13.9784 5.45641 13.9366 5.55141C13.8949 5.64641 13.8339 5.73171 13.7574 5.80192C13.681 5.87213 13.5909 5.92572 13.4927 5.9593C13.3945 5.99288 13.2904 6.00572 13.187 5.997L13.125 6H9.75C9.28587 6 8.84075 5.81563 8.51256 5.48744C8.18437 5.15925 8 4.71413 8 4.25V1.5H3.5ZM9.5 1.57L12.328 4.5H9.75C9.6837 4.5 9.62011 4.47366 9.57322 4.42678C9.52634 4.37989 9.5 4.3163 9.5 4.25V1.57ZM15.853 13.798L13.5 16L11.147 13.798C10.833 13.503 11.056 13 11.5 13H12.75V10H11.5C11.056 10 10.833 9.497 11.147 9.202L13.5 7L15.853 9.202C16.167 9.497 15.944 10 15.5 10H14.25V13H15.5C15.944 13 16.167 13.503 15.853 13.798Z" fill="#9CA3AF"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_75_2399_historical">
                        <rect width="16" height="16" fill="white"/>
                      </clipPath>
                    </defs>
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
