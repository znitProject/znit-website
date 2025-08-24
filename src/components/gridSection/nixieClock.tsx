'use client';

import React, { useState, useEffect } from 'react';

interface ProgressClockProps {
  style?: React.CSSProperties;
}

const ProgressClock: React.FC<ProgressClockProps> = ({ style }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate progress percentages
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Progress calculations
  const dayProgress = ((hours * 3600 + minutes * 60 + seconds) / (24 * 3600)) * 100;
  const hourProgress = ((minutes * 60 + seconds) / 3600) * 100;
  const minuteProgress = (seconds / 60) * 100;

  // Create circular progress using stroke-dasharray (much simpler)
  const getStrokeDashArray = (progress: number, radius: number) => {
    const circumference = 2 * Math.PI * radius;
    const strokeLength = (progress / 100) * circumference;
    return `${strokeLength} ${circumference}`;
  };

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div
      className="progress-clock-container relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 overflow-hidden"
      style={{
        width: '100%',
        height: '100%',
        gridArea: 'clock',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.05), 0 10px 30px rgba(0,0,0,0.1)',
        ...style,
      }}
    >
      {/* Main Progress Circles */}
      <div className="relative flex items-center justify-center">
        <svg width="220" height="220" className="transform -rotate-90">
          {/* Day Progress Circle (Outer) - Background */}
          <circle
            cx="110"
            cy="110"
            r="95"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Day Progress Circle (Outer) - Progress */}
          <circle
            cx="110"
            cy="110"
            r="95"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={getStrokeDashArray(dayProgress, 95)}
            className="transition-all duration-1000 ease-out"
            style={{ transformOrigin: 'center' }}
          />
          
          {/* Hour Progress Circle (Middle) - Background */}
          <circle
            cx="110"
            cy="110"
            r="75"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="6"
          />
          {/* Hour Progress Circle (Middle) - Progress */}
          <circle
            cx="110"
            cy="110"
            r="75"
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={getStrokeDashArray(hourProgress, 75)}
            className="transition-all duration-1000 ease-out"
            style={{ transformOrigin: 'center' }}
          />
          
          {/* Minute Progress Circle (Inner) - Background */}
          <circle
            cx="110"
            cy="110"
            r="55"
            fill="none"
            stroke="#f9fafb"
            strokeWidth="4"
          />
          {/* Minute Progress Circle (Inner) - Progress */}
          <circle
            cx="110"
            cy="110"
            r="55"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={getStrokeDashArray(minuteProgress, 55)}
            className="transition-all duration-1000 ease-out"
            style={{ transformOrigin: 'center' }}
          />
        </svg>

        {/* Center Time Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800 font-mono tracking-tight">
              {formatTime(hours)}:{formatTime(minutes)}
            </div>
            <div className="text-sm text-gray-500 font-mono mt-1">
              {formatTime(seconds)}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Labels */}
      <div className="flex justify-between items-center w-full max-w-xs mt-6">
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-blue-500 rounded-full mb-1"></div>
          <div className="text-xs text-gray-600 font-medium">DAY</div>
          <div className="text-xs text-gray-500">{dayProgress.toFixed(1)}%</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-emerald-500 rounded-full mb-1"></div>
          <div className="text-xs text-gray-600 font-medium">HOUR</div>
          <div className="text-xs text-gray-500">{hourProgress.toFixed(1)}%</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-amber-500 rounded-full mb-1"></div>
          <div className="text-xs text-gray-600 font-medium">MIN</div>
          <div className="text-xs text-gray-500">{minuteProgress.toFixed(0)}%</div>
        </div>
      </div>

      {/* Time Flow Message */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs text-gray-400 font-medium tracking-wider">TIME FLOWS</div>
      </div>

      {/* Current Phase */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <div className="text-xs text-gray-500 font-mono">
          {hours < 6 ? '🌙 NIGHT' : 
           hours < 12 ? '🌅 MORNING' : 
           hours < 18 ? '☀️ AFTERNOON' : 
           '🌆 EVENING'}
        </div>
      </div>

      {/* Floating progress indicators */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) + (dayProgress * 1.5); // Rotate based on day progress
          const radius = 110;
          const x = Math.cos((angle * Math.PI) / 180) * radius + 50;
          const y = Math.sin((angle * Math.PI) / 180) * radius + 50;
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-300 rounded-full opacity-60"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                animation: `float ${3 + i * 0.2}s infinite ease-in-out`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); opacity: 0.6; }
          50% { transform: translate(-50%, -50%) translateY(-4px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default ProgressClock;