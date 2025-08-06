import React, { useEffect, useRef, useState } from 'react';
import GeometricGlobe from './HeroGeometric';
import { useTheme } from 'next-themes';


// GSAP은 사용할 수 없으므로 Web Animations API로 대체하겠습니다
interface Mouse {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  diff: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  size: number;
  startTime: number;
}

const MadAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<SVGGElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFEGaussianBlurElement>(null);

  const animationRef = useRef<number>();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  

  const [mouse] = useState<Mouse>({
    x: 0,
    y: 0,
    smoothX: 0,
    smoothY: 0,
    diff: 0,
  });

  const [viewport] = useState<Viewport>({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const [particles, setParticles] = useState<ParticleData[]>([]);
  const particleIdRef = useRef(0);

  const createParticle = (x: number, y: number, size: number): ParticleData => {
    const particle: ParticleData = {
      id: particleIdRef.current++,
      x,
      y,
      size,
      startTime: Date.now(),
    };

    return particle;
  };

  const emitParticle = () => {
    if (mouse.diff > 0.01) {
      const particle = createParticle(
        mouse.smoothX,
        mouse.smoothY,
        mouse.diff * 0.4
      ); // 크기를 0.2에서 0.4로 증가
      setParticles((prev) => [...prev, particle]);
    }
  };

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  };

  const onResize = () => {
    viewport.width = window.innerWidth;
    viewport.height = window.innerHeight;

    if (svgRef.current) {
      svgRef.current.style.width = viewport.width + "px";
      svgRef.current.style.height = viewport.height + "px";
    }

    if (sceneRef.current) {
      sceneRef.current.style.backgroundSize =
        window.innerWidth < 768 ? "20px 20px" : "40px 40px";
    }

    if (filterRef.current) {
      const deviation = window.innerWidth < 768 ? "20" : "35";
      filterRef.current.setAttribute("stdDeviation", deviation);
    }
  };

  const render = () => {
    // Smooth mouse
    mouse.smoothX += (mouse.x - mouse.smoothX) * 0.1;
    mouse.smoothY += (mouse.y - mouse.smoothY) * 0.1;

    mouse.diff = Math.hypot(mouse.x - mouse.smoothX, mouse.y - mouse.smoothY);

    emitParticle();

    // Cursor
    if (cursorRef.current) {
      cursorRef.current.style.setProperty("--x", mouse.smoothX + "px");
      cursorRef.current.style.setProperty("--y", mouse.smoothY + "px");
    }

    // Clean up old particles
    const now = Date.now();
    setParticles((prev) =>
      prev.filter((particle) => now - particle.startTime < 7000)
    );

    animationRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    onResize();
    animationRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full h-auto xl:h-screen">
      {/* Hero Section */}
      <div
        className="absolute top-0 left-0 w-full h-full xl:block hidden"
        style={{ 
          background: theme === 'dark' ? '#1F1F1F' : '#ffffff',
          cursor: 'none',
          color: theme === 'dark' ? '#ffffff' : '#0c0b0e',
          fontFamily: '"Fira Sans", sans-serif'
        }}
      >
        {/* Title */}
        <div className="flex justify-center pt-12 sm:pt-16 md:pt-20 lg:pt-24">
          <GeometricGlobe />
        </div>

        {/* Catcher */}
        <div
          className="absolute left-0 bottom-0 w-full text-center whitespace-nowrap"
          style={{
            fontWeight: 700,
            fontSize: "clamp(48px, 13vw, 200px)",
            letterSpacing: "-0.025em",
          }}
        >
          REVEAL ZNIT.
        </div>
      </div>

      {/* Mobile/Tablet - 간단한 레이아웃 */}
      <div
        className="block xl:hidden py-4 md:py-8 lg:py-12 px-4"
        style={{ 
          background: theme === 'dark' ? '#1F1F1F' : '#ffffff',
          color: theme === 'dark' ? '#ffffff' : '#0c0b0e',
          fontFamily: '"Fira Sans", sans-serif'
        }}
      >
        {/* Geometric Globe */}
        <div className="flex justify-center mb-2 md:mb-6 lg:mb-8">
          <GeometricGlobe />
        </div>

        {/* REVEAL ZNIT */}
        <div className="text-center mb-4 md:mb-8 lg:mb-12">
          <div
            style={{
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 10vw, 4rem)",
              letterSpacing: "-0.025em",
            }}
          >
            REVEAL ZNIT.
          </div>
        </div>

      </div>

      {/* Scene - All devices */}
      <div
        ref={sceneRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{

          backgroundColor: theme === "dark" ? "#0c0b0e" : "#fafafa",
          backgroundImage:
            theme === "dark"
              ? "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)"
              : "linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          mask: "url(#mask)",
          color: theme === "dark" ? "#f1f0f9" : "#0c0b0e",

        }}
      >
        {/* Scene Title */}
        <div
          className="absolute top-[4vw] sm:top-[1vw] right-[2vw] left-[2vw] flex flex-wrap justify-between items-baseline text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[10.5rem]"
          style={{
            fontWeight: 700,
            letterSpacing: "-0.025em",
            lineHeight: 1.2,
          }}
        >
          {/* All Devices Layout - 4줄 세로 구조 */}
          <div className="w-full flex flex-col">
            {/* 상위 2줄 - 좌측 정렬 */}
            <div className="text-left mb-4 sm:mb-6 md:mb-8">
              <div className="mb-2 sm:mb-3">
                <span style={{ color: "#ff68a8" }}>O</span>ne Vision,
              </div>
              <div>
                Two <span style={{ color: "#009800" }}>C</span>rafts.
              </div>
            </div>

            {/* 하위 2줄 - 우측 정렬 */}
            <div className="text-right">
              <div className="mb-2 sm:mb-3">
                IT<span style={{color: '#4376AB'}}>&</span>DESIGN
              </div>
              <div style={{color: '#F6BF41'}}>
                ZNIT
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Cursor - Desktop only */}
      <div
        ref={cursorRef}
        className="absolute rounded-full pointer-events-none hidden xl:block"
        style={{
          top: "-1.5vw",
          left: "-1.5vw",
          zIndex: 2,
          width: "3vw",
          height: "3vw",
          background: "#88f901",
          transform: "translate3d(var(--x), var(--y), 0)",
        }}
      />

      {/* SVG - All devices */}
      <svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        width="100"
        height="100"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 3 }}
      >
        <mask id="mask">
          <g ref={wrapperRef}>
            {particles.map((particle) => {
              const age = (Date.now() - particle.startTime) / 1000;
              let size = particle.size;

              // Animate size based on age - 크기를 더 크게 조정
              if (age < 2) {
                size = particle.size + particle.size * age * 0.8; // 0.5에서 0.8로 증가
              } else if (age < 6) {
                const fadeAge = (age - 2) / 4;
                size =
                  particle.size *
                  2.5 *
                  (1 - fadeAge * fadeAge * fadeAge * fadeAge); // 2에서 2.5로 증가
              } else {
                size = 0;
              }

              return (
                <circle
                  key={particle.id}
                  cx={particle.x}
                  cy={particle.y}
                  r={Math.max(0, size)}
                  fill="#fff"
                />
              );
            })}
          </g>
        </mask>
        <filter id="gooey">
          <feGaussianBlur
            ref={filterRef}
            in="SourceGraphic"
            stdDeviation="35"
          />{" "}
          {/* 25에서 35로 증가하여 더 부드러운 효과 */}
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -7"
            result="goo"
          />
        </filter>
      </svg>
    </div>
  );
};

export default MadAnimation;