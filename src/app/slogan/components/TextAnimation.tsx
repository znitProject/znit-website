'use client';

import { useEffect, useState } from 'react';

const TextAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const texts = [
    'ZNIT',
    'ZNSPACE',
    'ZNATURE',
    'ZNWAVE',
    'ZNUS',
    'ZNLINK'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="flex items-center text-4xl font-semibold text-gray-700">
          <span className="mr-4">WE ARE</span>
          
          <div className="relative w-48 h-12 overflow-hidden">
            <div 
              className="transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateY(-${currentIndex * 48}px)`
              }}
            >
              {texts.map((text, index) => (
                <div 
                  key={index}
                  className="h-12 flex items-center text-[#5051A2] font-bold"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
          
          <span className="ml-1">!</span>
        </div>
        
        {/* 괄호 애니메이션 */}
        <div className="absolute -left-8 top-0 text-5xl text-blue-400 animate-pulse">
          [
        </div>
        <div className="absolute -right-8 top-0 text-5xl text-blue-400 animate-pulse">
          ]
        </div>
      </div>
    </div>
  );
};

export default TextAnimation; 