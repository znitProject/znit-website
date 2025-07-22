"use client";
import React, { useEffect, useRef, useState } from "react";

// 주요 색상 및 스타일 상수
const BG_GRADIENT = "linear-gradient(135deg, #2b323a 0%,#1d0c1f 100%)";

// 시간 포맷 함수
function getTimeVal(date: Date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
}

export default function FancyClockCard() {
  // 시간 상태
  const [now, setNow] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);
  // 애니메이션용 ref
  const requestRef = useRef<number | undefined>(undefined);

  // 애니메이션 프레임
  const animate = () => {
    setNow(new Date());
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    setIsMounted(true);
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (typeof requestRef.current === "number")
        cancelAnimationFrame(requestRef.current);
    };
    // eslint-disable-next-line
  }, []);

  // 클라이언트에서 마운트될 때까지 플레이스홀더 렌더링
  if (!isMounted) {
    return (
      <div
        className="card flex flex-col items-center justify-center py-4"
        style={{
          gridArea: "clock",
          background: BG_GRADIENT,
          color: "white",
          borderRadius: 24,
          height: "360px", // 최종 컴포넌트와 높이를 맞추어 레이아웃 쉬프트 방지
          width: "100%",
        }}
      >
        <div className="text-xs text-gray-200">Loading Clock...</div>
      </div>
    );
  }

  // 시간 각도 계산
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();
  const ms = now.getMilliseconds();
  const hourAngle = (hour + minute / 60) * 30;
  const minuteAngle = (minute + second / 60) * 6;
  const secondAngle = (second + ms / 1000) * 6;

  // 낮/밤 판별
  const isNight = now.getHours() < 6 || now.getHours() >= 18;

  // 날짜 텍스트
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const day = now.toLocaleDateString("ko-KR", { weekday: "long" });

  return (
    <div
      className="card flex flex-col items-center justify-center py-4"
      style={{
        gridArea: "clock",
        background: BG_GRADIENT,
        color: "white",
        borderRadius: 24,
      }}
    >
      {/* 날짜 */}
      <div className="text-lg sm:text-xl font-semibold mb-2 tracking-wide">
        {year}년 {month}월 {date}일{" "}
        <span className="text-blue-200 font-bold">{day}</span>
      </div>
      {/* SVG 시계 전체 */}
      <div className="flex items-center justify-center">
        <svg
          width="260"
          height="260"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block" }}
        >
          {/* 배경 그라데이션 */}
          <defs>
            <radialGradient id="bg" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor={isNight ? "#23243a" : "#f3f8fc"} />
              <stop offset="100%" stopColor={isNight ? "#1d0c1f" : "#efe6f9"} />
            </radialGradient>
            <linearGradient id="mountain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b6b6d8" />
              <stop offset="100%" stopColor="#6e6e8e" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="300" height="300" fill="url(#bg)" />
          {/* 산 */}
          <path
            d="M0 220 Q60 180 120 220 T300 220 V300 H0Z"
            fill="url(#mountain)"
          />
          {/* 해/달 */}
          {isNight ? (
            <g id="moonstars">
              <circle cx="220" cy="60" r="28" fill="#f7f7e0" opacity="0.8" />
              {/* 별 */}
              <circle cx="200" cy="40" r="2" fill="#fff" opacity="0.7" />
              <circle cx="240" cy="80" r="1.5" fill="#fff" opacity="0.5" />
              <circle cx="210" cy="90" r="1.2" fill="#fff" opacity="0.6" />
            </g>
          ) : (
            <circle cx="220" cy="60" r="28" fill="#ffe066" opacity="0.9" />
          )}
          {/* 구름 (간단 애니메이션) */}
          <g
            style={{
              transform: `translateX(${isNight ? 10 : (second * 2) % 60}px)`,
            }}
          >
            <ellipse cx="80" cy="70" rx="24" ry="10" fill="#fff" opacity="0.7" />
            <ellipse cx="100" cy="75" rx="16" ry="7" fill="#fff" opacity="0.5" />
          </g>
          {/* 나무 (정적) */}
          <rect x="40" y="200" width="10" height="40" fill="#4e3c2a" />
          <ellipse cx="45" cy="200" rx="18" ry="22" fill="#3a7d3a" />
          {/* 시계 다이얼 */}
          <g className="dial">
            <circle cx="150" cy="150" r="90" fill="#fff" opacity="0.85" />
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30) * Math.PI / 180;
              const x1 = 150 + Math.sin(angle) * 70;
              const y1 = 150 - Math.cos(angle) * 70;
              const x2 = 150 + Math.sin(angle) * 85;
              const y2 = 150 - Math.cos(angle) * 85;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#333"
                  strokeWidth={i % 3 === 0 ? 4 : 2}
                  strokeLinecap="round"
                />
              );
            })}
            {/* 시침 */}
            <line
              x1="150"
              y1="150"
              x2={150 + Math.sin(hourAngle * Math.PI / 180) * 45}
              y2={150 - Math.cos(hourAngle * Math.PI / 180) * 45}
              stroke="#222"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* 분침 */}
            <line
              x1="150"
              y1="150"
              x2={150 + Math.sin(minuteAngle * Math.PI / 180) * 65}
              y2={150 - Math.cos(minuteAngle * Math.PI / 180) * 65}
              stroke="#2563eb"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* 초침 */}
            <line
              x1="150"
              y1="150"
              x2={150 + Math.sin(secondAngle * Math.PI / 180) * 75}
              y2={150 - Math.cos(secondAngle * Math.PI / 180) * 75}
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* 중심 원 */}
            <circle
              cx="150"
              cy="150"
              r="8"
              fill="#2563eb"
              stroke="#fff"
              strokeWidth="2"
            />
          </g>
          {/* 시간 텍스트 */}
          <text
            x="150"
            y="270"
            textAnchor="middle"
            fontSize="2rem"
            fill="#fff"
            style={{ fontFamily: "Myriad Pro, Arial, sans-serif", fontWeight: 700 }}
          >
            {getTimeVal(now)}
          </text>
        </svg>
      </div>
      {/* 라벨 */}
      <div className="mt-2 text-xs text-gray-200">
        Fancy Clock (React 변환)
      </div>
    </div>
  );
}