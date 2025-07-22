"use client";
import React, { useEffect, useState } from "react";

const ClockCard = () => {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date()); // Set initial time on client
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) {
      return {
        month: '',
        dayName: '',
        dateNumber: '',
        timeString: '',
        seconds: '',
      };
    }
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const month = months[date.getMonth()];
    const dayName = days[date.getDay()];
    const dateNumber = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return {
      month,
      dayName,
      dateNumber,
      timeString: `${hours}:${minutes}`,
      seconds,
    };
  };

  const { month, dayName, dateNumber, timeString, seconds } = formatTime(time);

  return (
    <>
      <style jsx>{`
        .clock-card {
          background: linear-gradient(135deg,rgb(83, 90, 121) 0%,rgb(70, 49, 92) 100%);
          color: white;
          border-radius: 24px;
          padding: 32px 28px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.05);
          text-align: left;
          width: 100%;
          height: 100%;
          position: relative;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .clock-card:hover {
          transform: translateY(-5px);
        }

        .month {
          font-size: 4rem;
          font-weight: 600;
          color: white;
          margin-bottom: 12x;
          letter-spacing: -0.02em;
        }

        .date-section {
          margin-bottom: 16px;
        }

        .day-name {
          font-size: 2rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 4px;
          text-transform: capitalize;
        }

        .date-number {
          font-size: 7rem;
          font-weight: 700;
          color: white;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .time {
          font-size: 6rem;
          font-weight: 600;
          color: white;
          letter-spacing: -0.02em;
          margin-top: auto;
        }

        .seconds {
          font-size: 2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-left: 4px;
          font-weight: 400;
        }
      `}</style>
      <div className="clock-card" style={{ gridArea: 'clock' }}>
        <div className="month">{month}</div>
        <div className="date-section">
          <div className="day-name">{dayName}</div>
          <div className="date-number">{dateNumber}</div>
        </div>
        <div className="time">
          <span>{timeString}</span>
          <span className="seconds">:{seconds}</span>
        </div>
      </div>
    </>
  );
};

export default ClockCard;
