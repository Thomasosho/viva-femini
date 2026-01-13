'use client';

import { useState, useEffect, useRef } from 'react';

export default function TipsCards() {
  const tips = [
    {
      title: "Stay Comfortable",
      description: "On heavy flow days, prioritize comfort. Stay hydrated and use heating pads for abdominal relief.",
      buttonText: "Listen to your body",
      gradientColor: '#FFABC9', // Pink
      icon: '🥗', // Salad/healthy icon
    },
    {
      title: "Gentle Movement",
      description: "Light stretch ease discom",
      buttonText: "Listen to your body",
      gradientColor: '#FFC172', // Orange/Yellow
      icon: '🧘‍♀️', // Yoga/meditation icon
    },
    {
      title: "Hydration",
      description: "Drink enough water for your health and your cycle - 8 glasses daily",
      buttonText: "Stay hydrated",
      gradientColor: '#71FDFD', // Cyan/Teal
      icon: '💧', // Water drop icon
    },
    {
      title: "Rest & Recovery",
      description: "Take time to rest during your cycle. Your body needs extra care during this time.",
      buttonText: "Take it easy",
      gradientColor: '#FFABC9', // Pink
      icon: '😴', // Sleeping/rest icon
    },
    {
      title: "Nutrition Tips",
      description: "Eat iron-rich foods and maintain a balanced diet to support your cycle health.",
      buttonText: "Eat well",
      gradientColor: '#FFC172', // Orange/Yellow
      icon: '🍎', // Apple/nutrition icon
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(tips.length); // Start at duplicated first card
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  
  // Create infinite loop by duplicating cards
  const duplicatedTips = [...tips, ...tips, ...tips];

  const cardWidth = 331.5; // Exact SVG dimensions
  const cardHeight = 206.95; // Exact SVG dimensions
  const cardGap = 2; // Very tight spacing between cards
  const cardTotalWidth = cardWidth + cardGap;

  // Auto-slide functionality - pauses when dragging or when a card is hovered
  useEffect(() => {
    // Clear any existing interval
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }

    // Only start auto-slide if not dragging and no card is hovered
    if (!isDragging && hoveredIndex === null) {
      autoSlideRef.current = setInterval(() => {
        setIsAutoSliding(true);
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          // Loop back to start of middle section if we reach the end
          if (nextIndex >= tips.length * 2) {
            return tips.length;
          }
          return nextIndex;
        });
        // Reset auto-sliding flag after a short delay
        setTimeout(() => setIsAutoSliding(false), 1000);
      }, 3000); // Auto-slide every 3 seconds
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [tips.length, isDragging, hoveredIndex]);

  // Set initial scroll position on mount to center the first card in middle section
  useEffect(() => {
    if (scrollContainerRef.current && !isInitialized) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const paddingLeft = (containerWidth / 2) - (cardWidth / 2);
      const scrollPosition = paddingLeft + (tips.length * cardTotalWidth); // Start at middle section
      
      // Set scroll position immediately without animation
      scrollContainerRef.current.scrollLeft = scrollPosition;
      
      // Mark as initialized
      setIsInitialized(true);
    }
  }, [tips.length, cardTotalWidth, cardWidth, isInitialized]);

  // Update scroll position when currentIndex changes (from auto-slide or manual interaction)
  useEffect(() => {
    if (scrollContainerRef.current && !isDragging && isAutoSliding) {
      isScrollingRef.current = true;
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const paddingLeft = (containerWidth / 2) - (cardWidth / 2);
      const scrollPosition = paddingLeft + (currentIndex * cardTotalWidth);
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
          });
          setTimeout(() => {
            isScrollingRef.current = false;
            // Handle infinite loop after scroll completes
            const container = scrollContainerRef.current;
            if (container) {
              const containerWidth = container.clientWidth;
              const paddingLeft = (containerWidth / 2) - (cardWidth / 2);
              const middleSectionStart = paddingLeft + (tips.length * cardTotalWidth);
              const middleSectionEnd = paddingLeft + (tips.length * 2 * cardTotalWidth);
              const scrollLeft = container.scrollLeft;
              
              // If scrolled too far, reset to middle section
              if (scrollLeft < middleSectionStart - cardTotalWidth) {
                container.scrollLeft = middleSectionEnd - cardTotalWidth;
              } else if (scrollLeft > middleSectionEnd) {
                container.scrollLeft = middleSectionStart;
              }
            }
          }, 600);
        }
      });
    }
  }, [currentIndex, cardTotalWidth, cardWidth, isDragging, isAutoSliding, tips.length]);
  
  // Handle infinite loop - reset scroll position when near edges
  useEffect(() => {
    if (!scrollContainerRef.current || isDragging || isScrollingRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const paddingLeft = (containerWidth / 2) - (cardWidth / 2);
    const totalWidth = duplicatedTips.length * cardTotalWidth;
    const middleSectionStart = paddingLeft + (tips.length * cardTotalWidth);
    const middleSectionEnd = paddingLeft + (tips.length * 2 * cardTotalWidth);
    
    // If scrolled too far left, jump to end of middle section
    if (scrollLeft < middleSectionStart - cardTotalWidth) {
      container.scrollLeft = middleSectionEnd - cardTotalWidth;
    }
    // If scrolled too far right, jump to start of middle section
    else if (scrollLeft > middleSectionEnd) {
      container.scrollLeft = middleSectionStart;
    }
  }, [currentIndex, tips.length, duplicatedTips.length, cardTotalWidth, cardWidth, isDragging]);

  // Handle scroll to detect which card is centered (for infinite loop)
  const handleScroll = () => {
    if (!scrollContainerRef.current || isScrollingRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerWidth = container.clientWidth;
    const containerCenter = containerWidth / 2;
    const scrollLeft = container.scrollLeft;
    const paddingLeft = containerCenter - (cardWidth / 2);
    
    // Find which card is closest to center
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    duplicatedTips.forEach((_, index) => {
      const cardLeft = paddingLeft + (index * cardTotalWidth);
      const cardCenter = cardLeft + (cardWidth / 2);
      const distance = Math.abs((scrollLeft + containerCenter) - cardCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    // Update currentIndex only if not dragging or auto-sliding (for auto-slide logic)
    if (!isDragging && !isAutoSliding && closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
    }
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  // Handle mouse move with smooth momentum
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced multiplier for smoother dragging
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up with smooth snap
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest card smoothly
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const containerCenter = containerWidth / 2;
      const paddingLeft = containerCenter - (cardWidth / 2);
      const scrollLeft = container.scrollLeft;
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      duplicatedTips.forEach((_, index) => {
        const cardLeft = paddingLeft + (index * cardTotalWidth);
        const cardCenter = cardLeft + (cardWidth / 2);
        const distance = Math.abs((scrollLeft + containerCenter) - cardCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      // Smooth scroll to closest card
      const targetScroll = paddingLeft + (closestIndex * cardTotalWidth);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      setCurrentIndex(closestIndex);
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (scrollContainerRef.current) {
      setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced multiplier for smoother dragging
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Snap to nearest card smoothly
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;
      const containerCenter = containerWidth / 2;
      const paddingLeft = containerCenter - (cardWidth / 2);
      const scrollLeft = container.scrollLeft;
      
      let closestIndex = 0;
      let closestDistance = Infinity;
      
      duplicatedTips.forEach((_, index) => {
        const cardLeft = paddingLeft + (index * cardTotalWidth);
        const cardCenter = cardLeft + (cardWidth / 2);
        const distance = Math.abs((scrollLeft + containerCenter) - cardCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      
      // Smooth scroll to closest card
      const targetScroll = paddingLeft + (closestIndex * cardTotalWidth);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      setCurrentIndex(closestIndex);
    }
  };

  // Get the actual tip index for a card in the duplicated array
  const getTipIndex = (index: number) => {
    return index % tips.length;
  };

  return (
    <div 
      ref={containerRef}
      className="w-full overflow-hidden mt-15 lg:w-[689px]"
      style={{
        height: '220px',
        borderRadius: '16px',
        border: '1px solid #E5E5EA',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        fontFamily: 'Geist, sans-serif'
      }}
    >
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          display: 'flex',
          gap: `${cardGap}px`,
          paddingLeft: `calc(50% - ${cardWidth / 2}px)`,
          paddingRight: `calc(50% - ${cardWidth / 2}px)`,
          height: '100%',
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
        className="[&::-webkit-scrollbar]:hidden"
        onWheel={(e) => {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += e.deltaY;
            e.preventDefault();
          }
        }}
      >
        {duplicatedTips.map((tip, index) => {
          const tipIndex = getTipIndex(index);
          const isHovered = hoveredIndex === index;
          const scale = isHovered ? 1.1 : 0.95; // Reduced zoom on hover
          const opacity = isHovered ? 1 : 0.6;
          
          // Convert hex color to rgba for gradient
          const hexToRgb = (hex: string) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            } : null;
          };
          
          const actualTip = tips[tipIndex];
          const rgb = hexToRgb(actualTip.gradientColor);
          const borderColor = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.22)` : 'rgba(255, 171, 201, 0.22)';
          const gradientStart = rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.22)` : 'rgba(255, 171, 201, 0.22)';

          return (
            <div
              key={`${tipIndex}-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                borderRadius: '19.875px',
                paddingTop: '20px',
                paddingRight: '13.25px',
                paddingBottom: '20px',
                paddingLeft: '13.25px',
                gap: '26.5px',
                border: `1.325px solid ${borderColor}`,
                background: `linear-gradient(139.97deg, ${gradientStart} 0.52%, #FFFFFF 99.48%)`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transform: `scale(${scale})`,
                opacity: opacity,
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease',
                flexShrink: 0,
                fontFamily: 'Geist, sans-serif',
                scrollSnapAlign: 'center',
                scrollSnapStop: 'always',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              {/* Card Icon at Top Left */}
              <div style={{ position: 'absolute', top: '20px', left: '13.25px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '32px' }}>{actualTip.icon}</span>
              </div>

              {/* Content Section */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '8px',
                paddingLeft: '53px', // Space for calendar icon
                paddingTop: '0px'
              }}>
                <h4 
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#0F172A',
                    margin: 0,
                    lineHeight: '100%',
                    textAlign: 'justify'
                  }}
                >
                  {actualTip.title}
                </h4>
                <p 
                  style={{
                    fontFamily: 'Geist, sans-serif',
                    fontSize: '12px',
                    fontWeight: 400,
                    color: '#0F172A',
                    opacity: 0.8,
                    margin: 0,
                    lineHeight: '140%',
                    textAlign: 'justify'
                  }}
                >
                  {actualTip.description}
                </p>
              </div>

              {/* Button at Bottom with Calendar Icon */}
              <button 
                className="flex items-center justify-center transition-colors"
                style={{
                  gap: '6px',
                  paddingTop: '6px',
                  paddingBottom: '6px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  borderRadius: '15.125px',
                  backgroundColor: 'white',
                  border: 'none',
                  outline: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Geist, sans-serif',
                  width: '151.875px',
                  height: '30.25px',
                  alignSelf: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Purple Heart Icon in Button */}
                <span style={{ fontSize: '14px' }}>💜</span>
                <span 
                  style={{
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#0F172A',
                    fontFamily: 'Geist, sans-serif'
                  }}
                >
                  {actualTip.buttonText}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
