import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface BoxData {
  id: number;
  title: string;
  content: string;
  position: string;
}

const CulturePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const boxesRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const boxData: BoxData[] = [
    {
      id: 1,
      title: "주도성",
      content: "우리는 능동적이고 선도적으로 생각하고 행동하며 변화에 맞서 발전하며 연결 좋은 효과를 창출합니다. 목표를 향해 정진하며 사업과 체계 등에서 시스템을 기능성이 높이며 기꺼이 도전합니다. 우리의 창의적 항상성은 확고한 목적에 약속합니다. 수준 높은 품질로는 함께 우리의 문화를 만들어갑니다.",
      position: "top-left"
    },
    {
      id: 2,
      title: "믿임",
      content: "우리는 마음을 창의롭게 공유하며 고구합니다. 시스템 보안하는 다원론을 위해서 전신전력 있습니다. 공존을 다져 신뢰하게 드러냅니다. 시대집약 예전가는 이것인이 것과 수의는 객관 수에서가지 련을 주 위한 술칠을 못각입니다. 함께 반하는 팀워크 시간가을 다짐입니다.",
      position: "top-right"
    },
    {
      id: 3,
      title: "협정력",
      content: "우리는 세계들 수정하는 순간들을 동지선 함습니다. 단지한 노력만이 아닌 협직의 총체 담건 이야기들 정립니다. 다른 변화의 이해와 정단 사상을 창조합니다. 순급의 강인저체 시선에 닿는 청담을 몸에 이뤄냅니다. 변화된 복해 기하 수수미이와 다 디자인에서 우리의 발전입니다.",
      position: "bottom-left"
    },
    {
      id: 4,
      title: "전달적 사고",
      content: "우리는 한 생각을 내던지기 전 모든의 새로운 터 된공의 가지를 만들어 습득합니다. 어릴 존재이 지성도는 생활을 수 있도록 것기르듭저자미는 명지며 그곳에서 되는 컬러서스든지 모든에게 되어 가는 컬라드스든지 거안과는 수림 시급응 지아라 다득이가 죽심을.",
      position: "bottom-right"
    }
  ];

  // 4개의 퍼즐 SVG 컴포넌트들
  const TopLeftPuzzle = ({ children, id }: { children: React.ReactNode; id: number }) => (
    <div className="relative" style={{ width: '520px', height: '440px' }}>
      <svg width="520" height="440" viewBox="0 0 520 440" className="absolute inset-0">
        <defs>
          <clipPath id={`clip-top-left-${id}`}>
            <path d="M0 0 H520 V295 A147 147 0 0 0 373 442 H0 Z" fill="white" />
          </clipPath>
        </defs>
        <rect width="520" height="440" fill="#e5e7eb" clipPath={`url(#clip-top-left-${id})`} />
      </svg>
      <div className="absolute inset-0 p-8" style={{ clipPath: `url(#clip-top-left-${id})` }}>
        {children}
      </div>
    </div>
  );

  const TopRightPuzzle = ({ children, id }: { children: React.ReactNode; id: number }) => (
    <div className="relative" style={{ width: '520px', height: '440px' }}>
      <svg width="520" height="440" viewBox="0 0 520 440" className="absolute inset-0">
        <defs>
          <clipPath id={`clip-top-right-${id}`}>
            <path d="M0 0 H520 V440 H147 A147 147 0 0 0 0 293 Z" fill="white" />
          </clipPath>
        </defs>
        <rect width="520" height="440" fill="#e5e7eb" clipPath={`url(#clip-top-right-${id})`} />
      </svg>
      <div className="absolute inset-0 p-8" style={{ clipPath: `url(#clip-top-right-${id})` }}>
        {children}
      </div>
    </div>
  );

  const BottomLeftPuzzle = ({ children, id }: { children: React.ReactNode; id: number }) => (
    <div className="relative" style={{ width: '520px', height: '440px' }}>
      <svg width="520" height="440" viewBox="0 0 520 440" className="absolute inset-0">
        <defs>
          <clipPath id={`clip-bottom-left-${id}`}>
            <path d="M0 0 H373 A147 147 0 0 0 520 147 V440 H0 Z" fill="white" />
          </clipPath>
        </defs>
        <rect width="520" height="440" fill="#e5e7eb" clipPath={`url(#clip-bottom-left-${id})`} />
      </svg>
      <div className="absolute inset-0 p-8" style={{ clipPath: `url(#clip-bottom-left-${id})` }}>
        {children}
      </div>
    </div>
  );

  const BottomRightPuzzle = ({ children, id }: { children: React.ReactNode; id: number }) => (
    <div className="relative" style={{ width: '520px', height: '440px' }}>
      <svg width="520" height="440" viewBox="0 0 520 440" className="absolute inset-0">
        <defs>
          <clipPath id={`clip-bottom-right-${id}`}>
            <path d="M147 0 H520 V440 H0 V147 A147 147 0 0 0 147 0 Z" fill="white" />
          </clipPath>
        </defs>
        <rect width="520" height="440" fill="#e5e7eb" clipPath={`url(#clip-bottom-right-${id})`} />
      </svg>
      <div className="absolute inset-0 p-8" style={{ clipPath: `url(#clip-bottom-right-${id})` }}>
        {children}
      </div>
    </div>
  );

  useEffect(() => {
    // 초기 애니메이션 (클릭 유도용)
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(centerCircleRef.current, {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleCenterClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      animateExpansion();
    } else {
      setIsExpanded(false);
      animateCollapse();
    }
  };

  const animateExpansion = () => {
    const tl = gsap.timeline();

    // 중앙 원형 애니메이션
    tl.to(centerCircleRef.current, {
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out"
    });

    // 박스들 등장 애니메이션
    boxesRef.current.forEach((box, index) => {
      if (box) {
        gsap.set(box, { 
          opacity: 0,
          scale: 0,
          x: 0,
          y: 0
        });

        const delay = index * 0.1;
        let targetX = 0;
        let targetY = 0;

        // 위치별 좌표 설정
        switch (boxData[index].position) {
          case 'top-left':
            targetX = -300;
            targetY = -250;
            break;
          case 'top-right':
            targetX = 300;
            targetY = -250;
            break;
          case 'bottom-left':
            targetX = -300;
            targetY = 250;
            break;
          case 'bottom-right':
            targetX = 300;
            targetY = 250;
            break;
        }

        tl.to(box, {
          opacity: 1,
          scale: 1,
          x: targetX,
          y: targetY,
          duration: 0.8,
          ease: "back.out(1.4)"
        }, delay);
      }
    });
  };

  const animateCollapse = () => {
    const tl = gsap.timeline();

    // 박스들 사라지는 애니메이션
    boxesRef.current.forEach((box, index) => {
      if (box) {
        const delay = index * 0.05;
        tl.to(box, {
          opacity: 0,
          scale: 0,
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.in"
        }, delay);
      }
    });

    // 중앙 원형 복원
    tl.to(centerCircleRef.current, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out"
    }, 0.2);
  };

  const renderPuzzleBox = (box: BoxData, index: number) => {
    const content = (
      <div className="h-full flex flex-col justify-between">
        {/* 제목 영역 */}
        <div className="flex-shrink-0">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-left leading-tight">
            {box.title}
          </h3>
        </div>
        
        {/* 내용 영역 */}
        <div className="flex-1 min-h-0">
          <div className="h-full overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-none">
              {box.content}
            </p>
          </div>
        </div>
      </div>
    );

    switch (box.position) {
      case 'top-left':
        return <TopLeftPuzzle key={box.id} id={box.id}>{content}</TopLeftPuzzle>;
      case 'top-right':
        return <TopRightPuzzle key={box.id} id={box.id}>{content}</TopRightPuzzle>;
      case 'bottom-left':
        return <BottomLeftPuzzle key={box.id} id={box.id}>{content}</BottomLeftPuzzle>;
      case 'bottom-right':
        return <BottomRightPuzzle key={box.id} id={box.id}>{content}</BottomRightPuzzle>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8" ref={containerRef}>
      <div className="relative w-full h-[1100px] flex items-center justify-center">
        
        {/* 중앙 원형 */}
        <div
          ref={centerCircleRef}
          onClick={handleCenterClick}
          className="w-72 h-72 bg-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600 transition-colors duration-200 shadow-xl z-10 border-4 border-gray-400"
        >
          <span className="text-white font-bold text-3xl">Culture</span>
        </div>

        {/* 4개의 퍼즐 박스들 */}
        {boxData.map((box, index) => (
          <div
            key={box.id}
            ref={(el) => boxesRef.current[index] = el}
            className="absolute opacity-0"
            style={{ 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -50%)'
            }}
          >
            {renderPuzzleBox(box, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CulturePage;