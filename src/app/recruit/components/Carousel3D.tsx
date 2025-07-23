'use client';

import { useState, useEffect } from 'react';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  color: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
}

export default function Carousel3D({ items }: Carousel3DProps) {
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouseX, setLastMouseX] = useState(0);
    const [lastInteraction, setLastInteraction] = useState(Date.now());
    const [autoRotating, setAutoRotating] = useState(false);
  
    const radius = 500; // 카드가 커져서 반지름 증가
    const angleStep = 360 / items.length; // 카드 하나당 각도
  
    // 가장 가까운 카드 위치로 스냅하는 함수
    const snapToNearestCard = (currentRotation: number) => {
      const normalizedRotation = ((currentRotation % 360) + 360) % 360;
      const nearestCardIndex = Math.round(normalizedRotation / angleStep);
      const targetRotation = nearestCardIndex * angleStep;
      
      // 최단 경로 계산 (빙글빙글 도는 것을 방지)
      let shortestRotation = targetRotation;
      const currentNormalized = ((currentRotation % 360) + 360) % 360;
      const diff = targetRotation - currentNormalized;
      
      // 180도 이상 차이나면 반대 방향으로 가는 것이 더 짧음
      if (Math.abs(diff) > 180) {
        if (diff > 0) {
          shortestRotation = targetRotation - 360;
        } else {
          shortestRotation = targetRotation + 360;
        }
      }
      
      return currentRotation + (shortestRotation - currentNormalized);
    };
  
    // 3초마다 정확히 한 카드씩 자동 회전 (왼쪽으로)
    useEffect(() => {
      const interval = setInterval(() => {
        const timeSinceLastInteraction = Date.now() - lastInteraction;
        
        if (timeSinceLastInteraction > 3000 && !isDragging && !autoRotating) { // 3초 후 자동 회전 시작
          setAutoRotating(true);
          const nextRotation = rotation - angleStep; // 왼쪽으로 회전 (음수)
          const snappedRotation = snapToNearestCard(nextRotation);
          setRotation(snappedRotation);
          
          // 자동 회전 완료 후 플래그 리셋
          setTimeout(() => {
            setAutoRotating(false);
          }, 800); // 애니메이션 시간과 동일
        }
      }, 3000); // 3초마다 실행
  
      return () => clearInterval(interval);
    }, [lastInteraction, isDragging, angleStep, rotation, autoRotating]);
  
    // 마우스 드래그 시작
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setLastMouseX(e.clientX);
      setLastInteraction(Date.now()); // 상호작용 시간 업데이트
    };
  
    // 마우스 드래그 중 (왼쪽으로 회전)
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - lastMouseX;
      setRotation(prev => prev + deltaX * 0.5); // 마우스 방향과 일치하도록 양수로 변경
      setLastMouseX(e.clientX);
      setLastInteraction(Date.now()); // 상호작용 시간 업데이트
    };
  
    // 마우스 드래그 종료 - 가장 가까운 카드로 스냅
    const handleMouseUp = () => {
      setIsDragging(false);
      setLastInteraction(Date.now()); // 상호작용 시간 업데이트
      
      // 드래그 종료 시 가장 가까운 카드 위치로 스냅
      setTimeout(() => {
        setRotation(prev => snapToNearestCard(prev));
      }, 100); // 약간의 지연을 두어 부드러운 전환
    };
  
    return (
      <div 
        className="flex flex-col items-center select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 3D 캐러셀 컨테이너 */}
        <div 
          className="relative h-[500px] mb-8 cursor-grab active:cursor-grabbing" 
          style={{ perspective: '1200px' }}
          onMouseDown={handleMouseDown}
        >
          <div 
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotation}deg)`,
              transition: isDragging ? 'none' : 'transform 0.8s ease-in-out'
            }}
          >
            {items.map((item, index) => {
              const rotateY = index * angleStep;
              
              return (
                <div
                  key={item.id}
                  className="absolute w-96 h-72 flex flex-col justify-center items-center cursor-pointer border-4 border-gray-400 shadow-lg rounded-lg"
                  style={{
                    backgroundColor: item.color,
                    transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
                    transformOrigin: 'center center',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-192px', // w-96의 절반 (384px / 2)
                    marginTop: '-144px',  // h-72의 절반 (288px / 2)
                  }}
                  onClick={() => setLastInteraction(Date.now())} // 카드 클릭 시에도 상호작용 시간 업데이트
                >
                  <div className="text-6xl font-bold text-white mb-4">{item.id}</div>
                  <div className="text-base text-white text-center px-8 opacity-90 font-medium">{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }