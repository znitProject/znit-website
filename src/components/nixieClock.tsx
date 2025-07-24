'use client';

import React, { useState, useEffect } from 'react';
import './nixieClock.css';

const NixieClock: React.FC = () => {
  const [isOn, setIsOn] = useState(false);
  const [displayStr, setDisplayStr] = useState('000000000000');

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      let amPm = hours >= 12 ? 'PM' : 'AM';
      
      if (hours > 12) {
        hours -= 12;
      } else if (hours === 0) {
        hours = 12;
      }
      
      let timeStr = hours.toString().padStart(2, '0') + minutes;
      if (timeStr.startsWith('0')) {
        timeStr = ' ' + timeStr.slice(1);
      }
      
      let month = (now.getMonth() + 1).toString().padStart(2, '0');
      let day = now.getDate().toString().padStart(2, '0');
      const year = now.getFullYear().toString().slice(-2);
      
      if (month.startsWith('0')) {
        month = ' ' + month.slice(1);
      }
      if (day.startsWith('0')) {
        day = ' ' + day.slice(1);
      }
      
      const newDisplayStr = timeStr + amPm + month + day + year;
      setDisplayStr(newDisplayStr);
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 60000);

    return () => clearInterval(interval);
  }, []);

  const togglePower = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className="nixie-container card w-full h-full flex items-center justify-center bg-gradient-to-br from-[#535a79] to-[#46315c] rounded-2xl p-8"
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        gridArea: 'clock',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.05)',
      }}
    >
      {/* Noise SVG Filter */}
      <svg id="noise-svg" className="noise-svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="1.5" 
            numOctaves={3} 
            stitchTiles="stitch" 
          />
        </filter>
        <rect id="noise-rect" className="noise-rect" filter="url(#noiseFilter)" />
      </svg>

      <div
        className={`clock ${!isOn ? 'off' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          maxWidth: '100%',
          maxHeight: '100%',
          aspectRatio: '1/1',
          margin: '0 auto',
          transform: 'scale(0.7)', // 시계 축소
          transformOrigin: 'center',
        }}
      >
        <div className="shadow"></div>

        {/* Base */}
        <div className="base-container">
          <div className="base">
            <div></div>
          </div>
        </div>

        {/* Small Outer Pipe */}
        <div className="small-outer-pipe">
          <div className="small-inner-pipe"></div>
        </div>

        {/* Main Outer Pipe */}
        <div className="outer-pipe">
          <div className="inner-pipe"></div>
        </div>

        {/* Pipe Accents */}
        <div className="pipe-accents">
          <div className="top-tube"></div>
          <div className="tube-holders">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="top"></div>
          <div className="topinset"></div>
          <div className="left">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="right">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="bottom-left"></div>
          <div className="bottom-right"></div>
        </div>

        {/* Display */}
        <div className="display">
          <div className="row">
            <div className="col">
              <div>8</div>
              <div>{displayStr[0] || '0'}</div>
              <div>{displayStr[0] || '0'}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div>{displayStr[1] || '0'}</div>
              <div>{displayStr[1] || '0'}</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>8</div>
              <div>{displayStr[2] || '0'}</div>
              <div>{displayStr[2] || '0'}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div>{displayStr[3] || '0'}</div>
              <div>{displayStr[3] || '0'}</div>
            </div>
          </div>
          <div style={{ height: '0.2em' }}></div>
          <div className="small-row">
            <div className="row">
              <div className="col">
                <div>8</div>
                <div>{displayStr[4] || '0'}</div>
                <div>{displayStr[4] || '0'}</div>
              </div>
              <div className="col">
                <div>8</div>
                <div>{displayStr[5] || '0'}</div>
                <div>{displayStr[5] || '0'}</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>8</div>
              <div>{displayStr[6] || '0'}</div>
              <div>{displayStr[6] || '0'}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div>{displayStr[7] || '0'}</div>
              <div>{displayStr[7] || '0'}</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>8</div>
              <div>{displayStr[8] || '0'}</div>
              <div>{displayStr[8] || '0'}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div>{displayStr[9] || '0'}</div>
              <div>{displayStr[9] || '0'}</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div>8</div>
              <div>{displayStr[10] || '0'}</div>
              <div>{displayStr[10] || '0'}</div>
            </div>
            <div className="col">
              <div>8</div>
              <div>{displayStr[11] || '0'}</div>
              <div>{displayStr[11] || '0'}</div>
            </div>
          </div>
        </div>

        {/* Glass Tube */}
        <div className="glass-tube"></div>
        
        {/* Hex Pattern */}
        <div className="hex">
          <div className="overlay"></div>
        </div>

        {/* Tube Base Container */}
        <div className="tube-base-container">
          <div className="wires">
            <div></div>
            <div></div>
          </div>
          <div className="tube-base"></div>
          <div className="rods">
            <div className="left-rod"></div>
            <div className="center-rod"></div>
            <div className="right-rod"></div>
          </div>
          <div className="tube-btm"></div>
        </div>

        {/* Power Cord */}
        <div className="power-cord">
          <div></div>
          <div></div>
        </div>

        {/* Power Button */}
        <button 
          className="button" 
          onClick={togglePower}
          type="button"
          aria-label="Toggle clock power"
        >
          <div></div>
        </button>
      </div>
    </div>
  );
};

export default NixieClock;