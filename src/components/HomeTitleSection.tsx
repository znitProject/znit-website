import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const HomeTitleSection: React.FC = () => {
  const wordsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const words = wordsRef.current;
    if (!words) return;

    const handleMouseEnter = () => {
      gsap.to(words.querySelectorAll('p'), {
        y: -88, // -12rem (h-24 두 배 높이만큼 완전히 이동)
        duration: 0.4,
        ease: "power2.inOut"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(words.querySelectorAll('p'), {
        y: 0,
        duration: 0.4,
        ease: "power2.inOut"
      });
    };

    words.addEventListener('mouseenter', handleMouseEnter);
    words.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      words.removeEventListener('mouseenter', handleMouseEnter);
      words.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const lines = [
    { first: '\u00A0', second: 'ZNIT', left: '29px' },
    { first: 'ZNIT', second: 'DEVELOP', left: '58px' },
    { first: 'DEVELOP', second: 'DESIGN', left: '87px' },
    { first: 'DESIGN', second: 'CONNECT', left: '116px' },
    { first: 'CONNECT', second: 'ARCHITECT', left: '145px' },
    { first: 'ARCHITECT', second: 'ZNIT', left: '174px' },
    { first: 'ZNIT', second: '\u00A0', left: '203px' }
  ];

  return (
    <div className="flex items-center justify-center h-screen">
      <ul 
        ref={wordsRef}
        className="mx-auto py-20 text-7xl font-black tracking-normal uppercase text-gray-900"
        style={{ 
          fontFamily: "'Source Sans Pro', Helvetica, Arial, sans-serif",
          transform: 'translate3d(0, 0, 0)',
          WebkitFontSmoothing: 'antialiased',
          WebkitFontKerning: 'normal',
          WebkitTextSizeAdjust: '100%'
        }}
      >
        {lines.map((line, index) => (
          <li 
            key={index}
            className="h-20 overflow-hidden relative"
            style={{
              left: line.left,
              transform: index % 2 === 0 
                ? 'skew(60deg, -30deg) scaleY(0.66667)' 
                : 'skew(0deg, -30deg) scaleY(1.33333)'
            }}
          >
            <div className="h-20 leading-none px-2 whitespace-nowrap align-top"
                 style={{ transform: 'translate3d(0, 0, 0)' }}>
              <p className="h-20 leading-none flex items-center">{line.first}</p>
              <p className="h-20 leading-none flex items-center">{line.second}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeTitleSection;