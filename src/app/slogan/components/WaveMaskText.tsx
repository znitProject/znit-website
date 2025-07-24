'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollToPlugin);

export default function WaveMaskText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const maskRef = useRef<SVGMaskElement>(null);
  const textRef = useRef<SVGUseElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current || !maskRef.current || dimensions.width === 0) return;

    const cw = dimensions.width;
    const ch = dimensions.height;
    const nWaves = 5;
    const waves: SVGPolygonElement[] = [];
    const amp = 10;
    const speed = 0.4;
    const detail = 30;
    let waveY = 0;

    // 마스크 내부 초기화
    maskRef.current.innerHTML = '';

    // 웨이브 폴리곤 생성
    for (let w = 0; w < nWaves; w++) {
      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      waves.push(polygon);
      maskRef.current.appendChild(polygon);
      
      if (w === 0) {
        gsap.set(polygon, { attr: { fill: '#fff' } });
      } else {
        gsap.set(polygon, { 
          attr: { 
            fill: 'none', 
            stroke: '#fff', 
            'stroke-dasharray': '2 4', 
            'stroke-width': 3 - w/nWaves * 3 
          } 
        });
      }
    }

    // 초기 애니메이션 (원본 코드 복원)
    gsap.timeline({ defaults: { duration: 1 }, delay: 0.9 })
      .from('.txt1', { opacity: 0, ease: 'power2.inOut' }, 0)
      .to(window, { scrollTo: ch/2 }, 0);

    // 컴포넌트가 화면에 보이는지 확인하는 함수
    const isComponentVisible = () => {
      if (!containerRef.current) return false;
      const rect = containerRef.current.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    // 스크롤에 따른 텍스트 페이드아웃
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      const fadeStart = ch * 0.5; // 화면 중앙부터 시작
      const fadeEnd = ch * 1.1;   // 화면 높이의 1.1배에서 완전히 사라짐
      
      if (scrollY >= fadeStart) {
        const progress = Math.min(1, (scrollY - fadeStart) / (fadeEnd - fadeStart));
        // 비선형 애니메이션: 처음에는 천천히, 마지막에 빠르게
        const easeProgress = Math.pow(progress, 2); // 제곱 함수로 마지막에 가속
        const opacity = Math.max(0, 1 - easeProgress);
        const y = -easeProgress * 80; // 더 큰 이동 거리
        
        if (textRef.current) {
          gsap.set(textRef.current, { 
            opacity: opacity,
            y: y,
            transform: `translate(-375px, ${y}px)`
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // 웨이브 그리기 함수
    function drawWave(t: number) { 
      if (waveY !== -window.pageYOffset) {
        gsap.to(window, { duration: 1, waveY: Math.round(window.pageYOffset) });
        waveY = Math.round(window.pageYOffset);
      }
      
      for (let k = 0; k < nWaves; k++) {
        const polygon = waves[k];
        const offset = (1 - k/nWaves) * nWaves/6;
        let pts = '';
        
        for (let i = -1; i < (cw + detail); i += detail) {
          let y = ch - waveY;
          y += Math.sin(i * 0.003 - t/speed + offset) * amp;
          y += Math.sin(i * 0.004 - t/speed + offset) * amp;
          y += Math.sin(i * -0.011 - t/speed + 20 + offset) * amp;
          pts += i.toFixed(2) + ',' + y.toFixed(2) + ' ';
        }
        
        gsap.set(polygon, { attr: { points: '-20,-20 -20,' + ch/2 + ' ' + pts + ' ' + cw + ',-20' } });
      }  
    }

    gsap.ticker.add(drawWave);

    return () => {
      gsap.ticker.remove(drawWave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dimensions]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden" ref={containerRef}>
      {/* 스크롤 거리 (원본과 동일) */}
      <div className="scrollDist w-full h-[200%] absolute" />
      
      {/* SVG 컨테이너 */}
      <svg 
        ref={svgRef}
        className="fixed inset-0 w-full h-full"
        width="100%" 
        height="100%"
      >
        <defs>
          <mask id="m" ref={maskRef}>
            {/* 웨이브 폴리곤들이 여기에 동적으로 추가됨 */}
          </mask>
          
          <g id="txt2">
            <rect width="750" height="120" fill="none" />
            <text 
              className="txt2" 
              x="100" 
              y="0" 
              stroke="#fff"
              style={{
                fontSize: '90px',
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontWeight: 900
              }}
            >
              WE OWN IT!
            </text>
          </g>

          <g id="txt1">    
            <rect width="750" height="120" fill="none" />    
            <text 
              className="txt1" 
              x="-40" 
              y="0" 
              fill="#000" 
              style={{
                fontSize: '90px',
                fontFamily: 'var(--font-montserrat), sans-serif',
                fontWeight: 900,
                letterSpacing: '0.15em'
              }}
            >
              ZNIT IDENTITY

            </text>
          </g>
        </defs>
        
        {/* 배경 텍스트 (스크롤에 따라 사라짐) */}
        <use 
          ref={textRef}
          href="#txt2" 
          x="50%" 
          y="50%" 
          transform="translate(-375 0)"
        />
        
        {/* 마스크된 텍스트 (웨이브로 채워짐) */}
        <g mask="url(#m)">
          <rect fill="#fff" width="100%" height="100%" />
          <use 
            href="#txt1" 
            x="50%" 
            y="50%" 
            transform="translate(-375 0)" 
          />
        </g>
      </svg>
    </div>
  );
} 