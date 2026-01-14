'use client';

import { useState, useEffect } from 'react';
import { useDailyLog } from '../hooks/use-daily-log';
import { format } from 'date-fns';

type PregnancyTestResult = 'none' | 'positive' | 'negative' | 'faint_line';

export default function PregnancyTestSection() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const { dailyLog, loading, saveDailyLog } = useDailyLog(today);
  const [selectedResult, setSelectedResult] = useState<PregnancyTestResult>('none');
  const [saving, setSaving] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  // Load existing pregnancy test result
  useEffect(() => {
    if (dailyLog?.pregnancyTestResult) {
      setSelectedResult(dailyLog.pregnancyTestResult);
    }
  }, [dailyLog]);

  const handleResultSelect = async (result: PregnancyTestResult) => {
    setSelectedResult(result);
    setSaving(true);
    try {
      await saveDailyLog({
        pregnancyTestResult: result,
      });
    } catch (err) {
      console.error('Failed to save pregnancy test result:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async () => {
    setSaving(true);
    try {
      await saveDailyLog({
        pregnancyTestResult: selectedResult,
      });
    } catch (err) {
      console.error('Failed to save pregnancy test result:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  // Don't render if closed
  if (isClosed) return null;

  return (
    <div 
      className="bg-white relative border-0 pregnancy-test-section"
      style={{
        width: '100%',
        borderRadius: '13.0208px',
        padding: '16px',
        border: '0px',
        borderWidth: '0px',
        borderStyle: 'none',
        outline: 'none',
        boxShadow: 'none'
      }}
    >
      {/* Close button on right */}
      <button 
        onClick={handleClose}
        className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600"
        style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_74_2004_pt)">
            <path d="M6.94455 0.868042C3.55914 0.868042 0.868164 3.55901 0.868164 6.94443C0.868164 10.3298 3.55914 13.0208 6.94455 13.0208C10.33 13.0208 13.0209 10.3298 13.0209 6.94443C13.0209 3.55901 10.33 0.868042 6.94455 0.868042ZM9.2883 9.98263L6.94455 7.63888L4.6008 9.98263L3.90636 9.28818L6.25011 6.94443L3.90636 4.60068L4.6008 3.90624L6.94455 6.24999L9.2883 3.90624L9.98275 4.60068L7.639 6.94443L9.98275 9.28818L9.2883 9.98263Z" fill="#9CA3AF"/>
          </g>
          <defs>
            <clipPath id="clip0_74_2004_pt">
              <rect width="13.8889" height="13.8889" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </button>

      <div className="pr-8">
        <h3 className="text-base font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Geist, sans-serif' }}>
          Hi! Did you take your pregnancy test?
        </h3>

        {/* Test Result Options - 4 circular buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Didn't take test */}
          <button 
            onClick={() => handleResultSelect('none')}
            className="flex flex-col items-center gap-2 p-3 transition-colors"
            style={{
              borderRadius: '8px',
              border: selectedResult === 'none' ? '2px solid #FB3179' : '1px solid transparent',
              backgroundColor: selectedResult === 'none' ? '#FFE5EE' : 'transparent',
              cursor: 'pointer'
            }}
            disabled={saving || loading}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
              <path d="M0 21.7014C0 9.71604 9.71604 0 21.7014 0C33.6867 0 43.4028 9.71604 43.4028 21.7014C43.4028 33.6867 33.6867 43.4028 21.7014 43.4028C9.71604 43.4028 0 33.6867 0 21.7014Z" fill="url(#paint0_linear_522_151_pt)"/>
              <g clipPath="url(#clip0_522_151_pt)">
                <path d="M23.9068 15.5514V21.1923L20.5562 17.1207V15.5514H23.9068Z" fill="#FFFEF7"/>
                <path d="M20.5562 19.1141L23.9068 23.1858V28.6571H20.5562V19.1141Z" fill="#FFFEF7"/>
                <path d="M27.8515 28.657H26.876V26.8333L27.6394 27.7663C27.8515 28.0208 27.8939 28.3601 27.8515 28.657Z" fill="#FFFEF7"/>
                <path d="M34.7224 15.5514V28.6571H30.057L26.876 24.7975V15.5514H34.7224Z" fill="#FFFEF7"/>
                <path d="M17.5874 15.5514H8.68066V28.6571H17.5874V15.5514Z" fill="#FFFEF7"/>
                <path d="M27.8514 28.6571C27.809 28.8692 27.6817 29.0812 27.4697 29.2509C27.0031 29.6326 26.3245 29.5478 25.9428 29.0812L23.907 26.6213L20.5563 22.5496L17.5874 18.9021L14.9154 15.6363C14.873 15.5939 14.873 15.5939 14.8306 15.5515C14.5337 15.0849 14.6185 14.4911 15.0426 14.1094C15.2123 13.9822 15.4667 13.8973 15.7212 13.8973C16.0181 13.8973 16.3574 14.0246 16.5695 14.2791L20.5563 19.1566L23.907 23.2282L26.8759 26.8333L27.6393 27.7664C27.8514 28.0209 27.8938 28.3602 27.8514 28.6571Z" fill="#FFFEF7"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_522_151_pt" x1="21.7014" y1="0" x2="21.7014" y2="43.4028" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B32070"/>
                  <stop offset="1" stopColor="#FB3179"/>
                </linearGradient>
                <clipPath id="clip0_522_151_pt">
                  <rect width="26.0417" height="15.608" fill="white" transform="translate(8.68066 13.8973)"/>
                </clipPath>
              </defs>
            </svg>
            <span className="text-xs text-center text-gray-700" style={{ fontFamily: 'Geist, sans-serif', whiteSpace: 'nowrap' }}>Didn't take test</span>
          </button>

          {/* Positive */}
          <button 
            onClick={() => handleResultSelect('positive')}
            className="flex flex-col items-center gap-2 p-3 rounded-full hover:border-pink-300 transition-colors"
            style={{
              borderRadius: '8px',
              border: selectedResult === 'positive' ? '2px solid #FB3179' : '1px solid transparent',
              backgroundColor: selectedResult === 'positive' ? '#FFE5EE' : 'transparent',
              cursor: 'pointer'
            }}
            disabled={saving || loading}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
              <path d="M0 21.7014C0 9.71604 9.71604 0 21.7014 0C33.6867 0 43.4028 9.71604 43.4028 21.7014C43.4028 33.6867 33.6867 43.4028 21.7014 43.4028C9.71604 43.4028 0 33.6867 0 21.7014Z" fill="url(#paint0_linear_522_164_pt)"/>
              <g clipPath="url(#clip0_522_164_pt)">
                <path d="M8.68408 28.6458H22.1211V14.757H8.68408V28.6458ZM15.145 18.0831L15.1846 20.735H19.8618V23.4768H15.2242L15.2639 26.1288L10.6263 22.0835L15.145 18.0831Z" fill="white"/>
                <path d="M28.0671 14.757H24.1826V28.6458H28.0671V14.757Z" fill="white"/>
                <path d="M34.7228 14.757H30.8384V28.6458H34.7228V14.757Z" fill="white"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_522_164_pt" x1="21.7014" y1="0" x2="21.7014" y2="43.4028" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B32070"/>
                  <stop offset="1" stopColor="#FB3179"/>
                </linearGradient>
                <clipPath id="clip0_522_164_pt">
                  <rect width="26.0417" height="13.8889" fill="white" transform="translate(8.68066 14.757)"/>
                </clipPath>
              </defs>
            </svg>
            <span className="text-xs text-center text-gray-700" style={{ fontFamily: 'Geist, sans-serif', whiteSpace: 'nowrap' }}>Positive</span>
          </button>

          {/* Faint line */}
          <button 
            onClick={() => handleResultSelect('faint_line')}
            className="flex flex-col items-center gap-2 p-3 rounded-full hover:border-pink-300 transition-colors"
            style={{
              borderRadius: '8px',
              border: selectedResult === 'faint_line' ? '2px solid #FB3179' : '1px solid transparent',
              backgroundColor: selectedResult === 'faint_line' ? '#FFE5EE' : 'transparent',
              cursor: 'pointer'
            }}
            disabled={saving || loading}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
              <path d="M0 21.7014C0 9.71604 9.71604 0 21.7014 0C33.6867 0 43.4028 9.71604 43.4028 21.7014C43.4028 33.6867 33.6867 43.4028 21.7014 43.4028C9.71604 43.4028 0 33.6867 0 21.7014Z" fill="url(#paint0_linear_522_164_fl)"/>
              <g clipPath="url(#clip0_522_164_fl)">
                <path d="M8.68408 28.6458H22.1211V14.757H8.68408V28.6458ZM15.145 18.0831L15.1846 20.735H19.8618V23.4768H15.2242L15.2639 26.1288L10.6263 22.0835L15.145 18.0831Z" fill="white"/>
                <path d="M28.0671 14.757H24.1826V28.6458H28.0671V14.757Z" fill="white"/>
                <path d="M34.7228 14.757H30.8384V28.6458H34.7228V14.757Z" fill="white"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_522_164_fl" x1="21.7014" y1="0" x2="21.7014" y2="43.4028" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B32070"/>
                  <stop offset="1" stopColor="#FB3179"/>
                </linearGradient>
                <clipPath id="clip0_522_164_fl">
                  <rect width="26.0417" height="13.8889" fill="white" transform="translate(8.68066 14.757)"/>
                </clipPath>
              </defs>
            </svg>
            <span className="text-xs text-center text-gray-700" style={{ fontFamily: 'Geist, sans-serif', whiteSpace: 'nowrap' }}>Faint line</span>
          </button>

          {/* Negative */}
          <button 
            onClick={() => handleResultSelect('negative')}
            className="flex flex-col items-center gap-2 p-3 rounded-full hover:border-pink-300 transition-colors"
            style={{
              borderRadius: '8px',
              border: selectedResult === 'negative' ? '2px solid #FB3179' : '1px solid transparent',
              backgroundColor: selectedResult === 'negative' ? '#FFE5EE' : 'transparent',
              cursor: 'pointer'
            }}
            disabled={saving || loading}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '32px', height: '32px' }}>
              <path d="M0 21.7014C0 9.71604 9.71604 0 21.7014 0C33.6867 0 43.4028 9.71604 43.4028 21.7014C43.4028 33.6867 33.6867 43.4028 21.7014 43.4028C9.71604 43.4028 0 33.6867 0 21.7014Z" fill="url(#paint0_linear_522_183_pt)"/>
              <g clipPath="url(#clip0_522_183_pt)">
                <path d="M21.6024 15.5774H8.68066V27.8253H21.6024H28.0633V15.5774H21.6024ZM19.8584 23.267H15.2208L15.2604 25.6056L10.6229 22.0383L15.1812 18.5105L15.2208 20.8491H19.898V23.267H19.8584Z" fill="#FFFEF7"/>
                <path d="M34.7223 15.5774H30.8379V27.8253H34.7223V15.5774Z" fill="#FFFEF7"/>
              </g>
              <defs>
                <linearGradient id="paint0_linear_522_183_pt" x1="21.7014" y1="0" x2="21.7014" y2="43.4028" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#B32070"/>
                  <stop offset="1" stopColor="#FB3179"/>
                </linearGradient>
                <clipPath id="clip0_522_183_pt">
                  <rect width="26.0417" height="12.2479" fill="white" transform="translate(8.68066 15.5774)"/>
                </clipPath>
              </defs>
            </svg>
            <span className="text-xs text-center text-gray-700" style={{ fontFamily: 'Geist, sans-serif', whiteSpace: 'nowrap' }}>Negative</span>
          </button>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center">
          <button 
            onClick={handleApply}
            disabled={saving || loading}
            className="py-2 px-8 bg-[#FB3179] text-white rounded-full text-sm font-medium hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {saving ? 'Saving...' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}
