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
    const [rotationY, setRotationY] = useState(0);
    const [rotationX, setRotationX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouseX, setLastMouseX] = useState(0);
    const [lastMouseY, setLastMouseY] = useState(0);

    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
  
    // 반응형 반지름과 카드 크기 (더 작게)
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 200 : 280;
    const angleStep = 360 / items.length; // 카드 하나당 각도
  

  
    // 지속적인 자동 회전
    useEffect(() => {
      const interval = setInterval(() => {
        if (!isDragging) {
          setRotationY((prev: number) => prev - 0.2); // 더 느리게 회전
        }
      }, 16); // 60fps로 부드러운 애니메이션
  
      return () => clearInterval(interval);
    }, [isDragging]);

    // 마우스 위치 추적
    useEffect(() => {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        
        if (!isDragging) {
          // 전체 화면 기준으로 마우스 위치 계산
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
          
          // 마우스 위치를 -1에서 1 사이의 값으로 정규화 (전체 화면 기준)
          const normalizedX = (mouseEvent.clientX - centerX) / centerX;
          const normalizedY = (mouseEvent.clientY - centerY) / centerY;
          
          // 부드러운 마우스 추적을 위한 보간
          setMouseX(prev => prev * 0.7 + normalizedX * 0.3);
          setMouseY(prev => prev * 0.7 + normalizedY * 0.3);
        }
      };

      // 전체 문서에 마우스 이벤트 리스너 추가
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [isDragging]);
  
    // 마우스 드래그 시작
    const handleMouseDown = (e: React.MouseEvent) => {
      setIsDragging(true);
      setLastMouseX(e.clientX);
      setLastMouseY(e.clientY);
      document.body.style.cursor = 'crosshair';
    };
  
    // 마우스 드래그 중 (3D 회전)
    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - lastMouseX;
      const deltaY = e.clientY - lastMouseY;
      
      // Y축 회전 (좌우)
      setRotationY((prev: number) => prev + deltaX * 0.5);
      // X축 회전 (상하) - 제한된 범위
      setRotationX((prev: number) => {
        const newRotation = prev - deltaY * 0.3;
        return Math.max(-45, Math.min(45, newRotation)); // -45도에서 45도로 제한
      });
      
      setLastMouseX(e.clientX);
      setLastMouseY(e.clientY);
    };
  
    // 마우스 드래그 종료 - 자연스럽게 정지
    const handleMouseUp = () => {
      setIsDragging(false);
      
      // 드래그 종료 시 자연스럽게 정지 (스냅 없음)
      // X축은 중앙으로 부드럽게 복귀
      setRotationX(0);
      document.body.style.cursor = 'default';
    };
  
    return (
      <div 
        className="flex flex-col items-center select-none carousel-container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={() => {
          document.body.style.cursor = 'crosshair';
        }}
        onMouseLeave={() => {
          handleMouseUp();
          document.body.style.cursor = 'default';
        }}
      >

        {/* 3D 캐러셀 컨테이너 */}
        <div 
          className="relative h-[190px] sm:h-[240px] lg:h-[280px] mb-1 sm:mb-1 lg:mb-2" 
          style={{ perspective: typeof window !== 'undefined' && window.innerWidth < 768 ? '600px' : '800px' }}
          onMouseDown={handleMouseDown}
        >
          <div 
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rotationY + mouseX * 8}deg) rotateX(${rotationX + mouseY * 12}deg)`,
              transition: isDragging ? 'none' : 'transform 0.4s ease-out'
            }}
          >
            {items.map((item, index) => {
              const rotateY = index * angleStep;
              
              return (
                <div
                  key={item.id}
                  className="absolute w-48 sm:w-56 lg:w-64 h-36 sm:h-40 lg:h-48 flex flex-col justify-center items-center border-2 sm:border-4 border-gray-300 shadow-lg rounded-lg bg-white"
                  style={{
                    transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
                    transformOrigin: 'center center',
                    left: '50%',
                    top: '50%',
                    marginLeft: typeof window !== 'undefined' && window.innerWidth < 768 ? '-96px' : typeof window !== 'undefined' && window.innerWidth < 1024 ? '-112px' : '-128px',
                    marginTop: typeof window !== 'undefined' && window.innerWidth < 768 ? '-72px' : typeof window !== 'undefined' && window.innerWidth < 1024 ? '-80px' : '-96px',
                  }}
                  onClick={() => {}} // 카드 클릭 이벤트
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">{item.id}</div>
                  <div className="text-xs sm:text-sm text-gray-600 text-center px-2 sm:px-3 lg:px-4 opacity-90 font-medium">{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }