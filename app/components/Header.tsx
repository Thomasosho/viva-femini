'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'home' | 'tracking' | 'health'>('health');

  useEffect(() => {
    if (pathname === '/') {
      setActiveTab('home');
    } else if (pathname === '/tracking') {
      setActiveTab('tracking');
    } else if (pathname === '/health') {
      setActiveTab('health');
    }
  }, [pathname]);

  const handleTabClick = (tab: 'home' | 'tracking' | 'health') => {
    setActiveTab(tab);
    if (tab === 'home') {
      router.push('/');
    } else {
      router.push(`/${tab}`);
    }
  };

  return (
    <>
      {/* Desktop Header - Hidden on mobile */}
      <header 
        className="hidden lg:flex w-full items-center justify-between bg-white relative"
        style={{
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
          fontFamily: 'Geist, sans-serif'
        }}
      >
        {/* Left Section: Profile and Greeting */}
        <div className="flex items-center" style={{ gap: '12px' }}>
        {/* Profile Picture - circular with thin light gray border */}
        <div 
          className="rounded-full overflow-hidden flex-shrink-0"
          style={{
            width: '48px',
            height: '48px',
            border: '1px solid #E5E7EB'
          }}
        >
          <img 
            src="/profile-image.svg" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Greeting Text - Two Lines */}
        <div className="flex flex-col" style={{ gap: '2px' }}>
          {/* First Line: "Good Morning" in light gray with sun emoji */}
          <div className="flex items-center" style={{ gap: '4px' }}>
            <span 
              style={{ 
                fontFamily: 'Geist, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#9CA3AF',
                lineHeight: '100%'
              }}
            >
              Good Morning
            </span>
            <span style={{ fontSize: '14px' }}>🌤️</span>
          </div>
          {/* Second Line: "Emmanuelle" in darker, bolder gray, slightly larger */}
          <span 
            style={{ 
              fontFamily: 'Geist, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              color: '#111827',
              lineHeight: '100%'
            }}
          >
            Emmanuelle
          </span>
        </div>
      </div>

      {/* Center Section: Navigation Tabs - Exact Figma specs */}
      <nav 
        className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
        style={{
          width: '488px',
          height: '65px',
          gap: '12px',
          paddingTop: '6px',
          paddingRight: '16px',
          paddingBottom: '6px',
          paddingLeft: '16px',
          borderRadius: '30px',
          backgroundColor: '#F3F4F6'
        }}
      >
        {/* Home Tab */}
        <button 
          onClick={() => handleTabClick('home')}
          className="flex flex-col items-center justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none"
          style={{
            width: '144px',
            height: '53px',
            gap: '5px',
            paddingTop: '3px',
            paddingRight: '36px',
            paddingBottom: '3px',
            paddingLeft: '36px',
            borderRadius: '40px',
            backgroundColor: activeTab === 'home' ? '#B32070' : '#FFFFFF',
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Home icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 18V15" stroke={activeTab === 'home' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0698 2.82L3.13978 8.37C2.35978 8.99 1.85978 10.3 2.02978 11.28L3.35978 19.24C3.59978 20.66 4.95978 21.81 6.39978 21.81H17.5998C19.0298 21.81 20.3998 20.65 20.6398 19.24L21.9698 11.28C22.1298 10.3 21.6298 8.99 20.8598 8.37L13.9298 2.83C12.8598 1.97 11.1298 1.97 10.0698 2.82Z" stroke={activeTab === 'home' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            {/* Text BELOW icon */}
            <span className={`text-sm whitespace-nowrap ${activeTab === 'home' ? 'font-bold text-white' : 'font-normal text-gray-700'}`}>Home</span>
          </button>
          
          {/* Tracking Tab */}
          <button 
            onClick={() => handleTabClick('tracking')}
            className="flex flex-col items-center justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none"
            style={{
              width: '144px',
              height: '53px',
            gap: '5px',
            paddingTop: '3px',
            paddingRight: '36px',
            paddingBottom: '3px',
            paddingLeft: '36px',
            borderRadius: '40px',
            backgroundColor: activeTab === 'tracking' ? '#B32070' : '#FFFFFF',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Tracking icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 18V15" stroke={activeTab === 'tracking' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0698 2.82L3.13978 8.37C2.35978 8.99 1.85978 10.3 2.02978 11.28L3.35978 19.24C3.59978 20.66 4.95978 21.81 6.39978 21.81H17.5998C19.0298 21.81 20.3998 20.65 20.6398 19.24L21.9698 11.28C22.1298 10.3 21.6298 8.99 20.8598 8.37L13.9298 2.83C12.8598 1.97 11.1298 1.97 10.0698 2.82Z" stroke={activeTab === 'tracking' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke={activeTab === 'tracking' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Text BELOW icon */}
            <span className={`text-sm whitespace-nowrap ${activeTab === 'tracking' ? 'font-bold text-white' : 'font-normal text-gray-700'}`}>Tracking</span>
          </button>
          
          {/* Health Tab */}
          <button 
            onClick={() => handleTabClick('health')}
            className="flex flex-col items-center justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none"
            style={{
              width: '144px',
              height: '53px',
            gap: '5px',
            paddingTop: '3px',
            paddingRight: '36px',
            paddingBottom: '3px',
            paddingLeft: '36px',
            borderRadius: '40px',
            backgroundColor: activeTab === 'health' ? '#B32070' : '#FFFFFF',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onBlur={(e) => {
            e.currentTarget.style.outline = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {/* Stethoscope icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_83_4413_nav)">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8 3.73478 7.89464 3.48043 7.70711 3.29289C7.51957 3.10536 7.26522 3 7 3C6.73478 3 6.48043 3.10536 6.29289 3.29289C6.10536 3.48043 6 3.73478 6 4C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V9C3.00018 10.418 3.50239 11.7901 4.4176 12.8732C5.33281 13.9562 6.60193 14.6803 8 14.917V15C8 16.5913 8.63214 18.1174 9.75736 19.2426C10.8826 20.3679 12.4087 21 14 21C15.5913 21 17.1174 20.3679 18.2426 19.2426C19.3679 18.1174 20 16.5913 20 15V13.83C20.6675 13.5941 21.2301 13.1298 21.5884 12.5192C21.9466 11.9086 22.0775 11.191 21.9578 10.4932C21.8381 9.79545 21.4756 9.16246 20.9344 8.70613C20.3931 8.2498 19.708 7.99951 19 7.99951C18.292 7.99951 17.6069 8.2498 17.0656 8.70613C16.5244 9.16246 16.1619 9.79545 16.0422 10.4932C15.9225 11.191 16.0534 11.9086 16.4116 12.5192C16.7699 13.1298 17.3325 13.5941 18 13.83V15C18 16.0609 17.5786 17.0783 16.8284 17.8284C16.0783 18.5786 15.0609 19 14 19C12.9391 19 11.9217 18.5786 11.1716 17.8284C10.4214 17.0783 10 16.0609 10 15V14.917C11.3981 14.6803 12.6672 13.9562 13.5824 12.8732C14.4976 11.7901 14.9998 10.418 15 9V7C15 6.20435 14.6839 5.44129 14.1213 4.87868C13.5587 4.31607 12.7956 4 12 4C12 3.73478 11.8946 3.48043 11.7071 3.29289C11.5196 3.10536 11.2652 3 11 3C10.7348 3 10.4804 3.10536 10.2929 3.29289C10.1054 3.48043 10 3.73478 10 4V6C10 6.26522 10.1054 6.51957 10.2929 6.70711C10.4804 6.89464 10.7348 7 11 7C11.2652 7 11.5196 6.89464 11.7071 6.70711C11.8946 6.51957 12 6.26522 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7V9C13 10.0609 12.5786 11.0783 11.8284 11.8284C11.0783 12.5786 10.0609 13 9 13C7.93913 13 6.92172 12.5786 6.17157 11.8284C5.42143 11.0783 5 10.0609 5 9V7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6C6 6.26522 6.10536 6.51957 6.29289 6.70711C6.48043 6.89464 6.73478 7 7 7C7.26522 7 7.51957 6.89464 7.70711 6.70711C7.89464 6.51957 8 6.26522 8 6V4ZM19 12C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11C18 11.2652 18.1054 11.5196 18.2929 11.7071C18.4804 11.8946 18.7348 12 19 12Z" fill={activeTab === 'health' ? 'white' : '#0F172A'}/>
            </g>
            <defs>
              <clipPath id="clip0_83_4413_nav">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
            {/* Text BELOW icon */}
            <span className={`text-sm whitespace-nowrap ${activeTab === 'health' ? 'font-bold text-white' : 'font-normal text-gray-700'}`}>Health</span>
          </button>
        </nav>

        {/* Right Section: Empty - maintains white background */}
        <div className="w-0 lg:w-32"></div>
      </header>

      {/* Mobile Header - Profile only - Fixed to top */}
      <header 
        className="lg:hidden fixed top-0 left-0 right-0 w-full flex items-center justify-between bg-white border-b border-gray-200"
        style={{
          paddingTop: '16px',
          paddingBottom: '16px',
          paddingLeft: '16px',
          paddingRight: '16px',
          fontFamily: 'Geist, sans-serif',
          zIndex: 1000,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="flex items-center" style={{ gap: '12px' }}>
          {/* Profile Picture - circular with thin light gray border */}
          <div 
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{
              width: '48px',
              height: '48px',
              border: '1px solid #E5E7EB'
            }}
          >
            <img 
              src="/profile-image.svg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Greeting Text - Two Lines */}
          <div className="flex flex-col" style={{ gap: '2px' }}>
            {/* First Line: "Good Morning" in light gray with sun emoji */}
            <div className="flex items-center" style={{ gap: '4px' }}>
              <span 
                style={{ 
                  fontFamily: 'Geist, sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#9CA3AF',
                  lineHeight: '100%'
                }}
              >
                Good Morning
              </span>
              <span style={{ fontSize: '14px' }}>🌤️</span>
            </div>
            {/* Second Line: "Emmanuelle" in darker, bolder gray, slightly larger */}
            <span 
              style={{ 
                fontFamily: 'Geist, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                color: '#111827',
                lineHeight: '100%'
              }}
            >
              Emmanuelle
            </span>
          </div>
        </div>

        {/* Right Section: Notification and Settings Icons */}
        <div className="flex items-center" style={{ gap: '12px' }}>
          {/* Notification Bell with Badge */}
          <button 
            className="relative flex items-center justify-center"
            style={{
              width: '40px',
              height: '40px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Red Badge Counter */}
            <div 
              className="absolute top-0 right-0 flex items-center justify-center rounded-full"
              style={{
                width: '18px',
                height: '18px',
                backgroundColor: '#EF4444',
                border: '2px solid white',
                fontSize: '10px',
                fontWeight: 600,
                color: 'white',
                fontFamily: 'Geist, sans-serif'
              }}
            >
              3
            </div>
          </button>

          {/* Settings Icon */}
          <button 
            className="flex items-center justify-center"
            style={{
              width: '40px',
              height: '40px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9867C9.5799 19.7154 9.31074 19.5053 9 19.38C8.69838 19.2469 8.36381 19.2072 8.03941 19.266C7.71502 19.3248 7.41568 19.4795 7.18 19.71L7.12 19.77C6.93425 19.956 6.71368 20.1035 6.47088 20.2041C6.22808 20.3048 5.96783 20.3566 5.705 20.3566C5.44217 20.3566 5.18192 20.3048 4.93912 20.2041C4.69632 20.1035 4.47575 19.956 4.29 19.77C4.10405 19.5843 3.95653 19.3637 3.85588 19.1209C3.75523 18.8781 3.70343 18.6178 3.70343 18.355C3.70343 18.0922 3.75523 17.8319 3.85588 17.5891C3.95653 17.3463 4.10405 17.1257 4.29 16.94L4.35 16.88C4.58054 16.6443 4.73519 16.345 4.794 16.0206C4.85282 15.6962 4.81312 15.3616 4.68 15.06C4.55324 14.7642 4.34276 14.512 4.07447 14.3343C3.80618 14.1566 3.49179 14.0613 3.17 14.06H3C2.46957 14.06 1.96086 13.8493 1.58579 13.4742C1.21071 13.0991 1 12.5904 1 12.06C1 11.5296 1.21071 11.0209 1.58579 10.6458C1.96086 10.2707 2.46957 10.06 3 10.06H3.09C3.42099 10.0523 3.742 9.94512 4.0133 9.75251C4.28459 9.5599 4.49472 9.29074 4.62 8.98C4.75312 8.67838 4.79281 8.34381 4.734 8.01941C4.67519 7.69502 4.52054 7.39568 4.29 7.16L4.23 7.1C4.04405 6.91425 3.89653 6.69368 3.79588 6.45088C3.69523 6.20808 3.64343 5.94783 3.64343 5.685C3.64343 5.42217 3.69523 5.16192 3.79588 4.91912C3.89653 4.67632 4.04405 4.45575 4.23 4.27C4.41575 4.08405 4.63632 3.93653 4.87912 3.83588C5.12192 3.73523 5.38217 3.68343 5.645 3.68343C5.90783 3.68343 6.16808 3.73523 6.41088 3.83588C6.65368 3.93653 6.87425 4.08405 7.06 4.27L7.12 4.33C7.35568 4.56054 7.65502 4.71519 7.97941 4.774C8.30381 4.83282 8.63838 4.79312 8.94 4.66H9C9.29577 4.53324 9.54802 4.32276 9.72569 4.05447C9.90337 3.78618 9.99872 3.47179 10 3.15V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77281 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Bottom Navigation - Fixed to bottom */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-center bg-white border-t border-gray-200"
        style={{
          height: '65px',
          gap: '8px',
          paddingTop: '6px',
          paddingRight: '10px',
          paddingBottom: '6px',
          paddingLeft: '10px',
          borderRadius: '0',
          fontFamily: 'Geist, sans-serif',
          zIndex: 1000,
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Home Tab */}
        <button 
          onClick={() => handleTabClick('home')}
          className="flex flex-col items-center justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none flex-1"
          style={{
            height: '53px',
            gap: '4px',
            paddingTop: '3px',
            paddingRight: '8px',
            paddingBottom: '3px',
            paddingLeft: '8px',
            borderRadius: '40px',
            backgroundColor: activeTab === 'home' ? '#B32070' : 'transparent',
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          {/* Home icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 18V15" stroke={activeTab === 'home' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0698 2.82L3.13978 8.37C2.35978 8.99 1.85978 10.3 2.02978 11.28L3.35978 19.24C3.59978 20.66 4.95978 21.81 6.39978 21.81H17.5998C19.0298 21.81 20.3998 20.65 20.6398 19.24L21.9698 11.28C22.1298 10.3 21.6298 8.99 20.8598 8.37L13.9298 2.83C12.8598 1.97 11.1298 1.97 10.0698 2.82Z" stroke={activeTab === 'home' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Text BELOW icon */}
          <span className={`text-xs whitespace-nowrap ${activeTab === 'home' ? 'font-bold text-white' : 'font-normal text-gray-700'}`}>Home</span>
        </button>
        
        {/* Tracking Tab */}
        <button 
          onClick={() => handleTabClick('tracking')}
          className="flex flex-col items-center justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none flex-1"
          style={{
            height: '53px',
            gap: '4px',
            paddingTop: '3px',
            paddingRight: '8px',
            paddingBottom: '3px',
            paddingLeft: '8px',
            borderRadius: '40px',
            backgroundColor: activeTab === 'tracking' ? '#B32070' : 'transparent',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          {/* Tracking icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 18V15" stroke={activeTab === 'tracking' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.0698 2.82L3.13978 8.37C2.35978 8.99 1.85978 10.3 2.02978 11.28L3.35978 19.24C3.59978 20.66 4.95978 21.81 6.39978 21.81H17.5998C19.0298 21.81 20.3998 20.65 20.6398 19.24L21.9698 11.28C22.1298 10.3 21.6298 8.99 20.8598 8.37L13.9298 2.83C12.8598 1.97 11.1298 1.97 10.0698 2.82Z" stroke={activeTab === 'tracking' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12L11 14L15 10" stroke={activeTab === 'tracking' ? 'white' : '#292D32'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Text BELOW icon */}
          <span className={`text-xs whitespace-nowrap ${activeTab === 'tracking' ? 'font-bold text-white' : 'font-normal text-gray-700'}`}>Tracking</span>
        </button>
        
        {/* Health Tab */}
        <button 
          onClick={() => handleTabClick('health')}
          className="flex flex-col items-center justify-center focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none flex-1"
          style={{
            height: '53px',
            gap: '4px',
            paddingTop: '3px',
            paddingRight: '8px',
            paddingBottom: '3px',
            paddingLeft: '8px',
            borderRadius: '40px',
            backgroundColor: activeTab === 'health' ? '#B32070' : 'transparent',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          {/* Stethoscope icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_83_4413_nav)">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 4C8 3.73478 7.89464 3.48043 7.70711 3.29289C7.51957 3.10536 7.26522 3 7 3C6.73478 3 6.48043 3.10536 6.29289 3.29289C6.10536 3.48043 6 3.73478 6 4C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V9C3.00018 10.418 3.50239 11.7901 4.4176 12.8732C5.33281 13.9562 6.60193 14.6803 8 14.917V15C8 16.5913 8.63214 18.1174 9.75736 19.2426C10.8826 20.3679 12.4087 21 14 21C15.5913 21 17.1174 20.3679 18.2426 19.2426C19.3679 18.1174 20 16.5913 20 15V13.83C20.6675 13.5941 21.2301 13.1298 21.5884 12.5192C21.9466 11.9086 22.0775 11.191 21.9578 10.4932C21.8381 9.79545 21.4756 9.16246 20.9344 8.70613C20.3931 8.2498 19.708 7.99951 19 7.99951C18.292 7.99951 17.6069 8.2498 17.0656 8.70613C16.5244 9.16246 16.1619 9.79545 16.0422 10.4932C15.9225 11.191 16.0534 11.9086 16.4116 12.5192C16.7699 13.1298 17.3325 13.5941 18 13.83V15C18 16.0609 17.5786 17.0783 16.8284 17.8284C16.0783 18.5786 15.0609 19 14 19C12.9391 19 11.9217 18.5786 11.1716 17.8284C10.4214 17.0783 10 16.0609 10 15V14.917C11.3981 14.6803 12.6672 13.9562 13.5824 12.8732C14.4976 11.7901 14.9998 10.418 15 9V7C15 6.20435 14.6839 5.44129 14.1213 4.87868C13.5587 4.31607 12.7956 4 12 4C12 3.73478 11.8946 3.48043 11.7071 3.29289C11.5196 3.10536 11.2652 3 11 3C10.7348 3 10.4804 3.10536 10.2929 3.29289C10.1054 3.48043 10 3.73478 10 4V6C10 6.26522 10.1054 6.51957 10.2929 6.70711C10.4804 6.89464 10.7348 7 11 7C11.2652 7 11.5196 6.89464 11.7071 6.70711C11.8946 6.51957 12 6.26522 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7V9C13 10.0609 12.5786 11.0783 11.8284 11.8284C11.0783 12.5786 10.0609 13 9 13C7.93913 13 6.92172 12.5786 6.17157 11.8284C5.42143 11.0783 5 10.0609 5 9V7C5 6.73478 5.10536 6.48043 5.29289 6.29289C5.48043 6.10536 5.73478 6 6 6C6 6.26522 6.10536 6.51957 6.29289 6.70711C6.48043 6.89464 6.73478 7 7 7C7.26522 7 7.51957 6.89464 7.70711 6.70711C7.89464 6.51957 8 6.26522 8 6V4ZM19 12C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11C18 11.2652 18.1054 11.5196 18.2929 11.7071C18.4804 11.8946 18.7348 12 19 12Z" fill={activeTab === 'health' ? 'white' : '#0F172A'}/>
            </g>
            <defs>
              <clipPath id="clip0_83_4413_nav">
                <rect width="24" height="24" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          {/* Text BELOW icon */}
          <span className={`text-xs whitespace-nowrap ${activeTab === 'health' ? 'font-bold text-white' : 'font-normal text-gray-700'}`}>Health</span>
        </button>
      </nav>
    </>
  );
}
