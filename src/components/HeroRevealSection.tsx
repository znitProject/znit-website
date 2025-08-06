import React, { useEffect, useRef, useState } from "react";
import GeometricGlobe from "./HeroGeometric";
import { useTheme } from "next-themes";

// GSAP은 사용할 수 없으므로 Web Animations API로 대체하겠습니다
interface Mouse {
  x: number;
  y: number;
  smoothX: number;
  smoothY: number;
  diff: number;
  vx: number;
  vy: number;
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
  seed: number;
  freq: number;
  amplitude: number;
  startTime: number;
}

const MadAnimation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<SVGGElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<SVGFEGaussianBlurElement>(null);

  const animationRef = useRef<number | null>(null);
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
    vx: 0,
    vy: 0,
  });

  const [viewport] = useState<Viewport>({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const [particles, setParticles] = useState<ParticleData[]>([]);
  const particleIdRef = useRef(0);

  // 커스텀 CSS 스타일
  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lexend:wght@100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Climate+Crisis&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lexend:wght@100..900&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      
    }
    
    .char-animation {
      transform-origin: 50% 86.5%;
    }
    
    .char-animation:nth-child(1) {
      color: #fe6319;
    }
    
    .char-animation:nth-child(2) {
      color: #ff68a8;
    }
    
    .char-animation:nth-child(3) {
      color: #009800;
    }
  `;

  useEffect(() => {
    const createParticle = (
      x: number,
      y: number,
      size: number,
    ): ParticleData => {
      const particle: ParticleData = {
        id: particleIdRef.current++,
        x,
        y,
        size,
        seed: Math.random() * 1000,
        freq: (0.5 + Math.random() * 1) * 0.01,
        amplitude: (1 - Math.random() * 2) * 0.5,
        startTime: Date.now(),
      };

      return particle;
    };

    const emitParticle = () => {
      if (mouse.diff > 0.01) {
        const particle = createParticle(
          mouse.smoothX,
          mouse.smoothY,
          mouse.diff * 0.4,
        ); // 크기를 0.2에서 0.4로 증가
        setParticles((prev) => [...prev, particle]);
      }
    };
    // Add styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = customStyles;
    document.head.appendChild(styleSheet);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.vx += mouse.x - e.pageX;
      mouse.vy += mouse.y - e.pageY;

      mouse.x = e.pageX;
      mouse.y = e.pageY;
    };

    const handleResize = () => {
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

    const handleRender = () => {
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
        prev.filter((particle) => now - particle.startTime < 7000),
      );

      animationRef.current = requestAnimationFrame(handleRender);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    handleResize();
    animationRef.current = requestAnimationFrame(handleRender);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.head.removeChild(styleSheet);
    };
  }, [customStyles, mouse, viewport]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative w-full h-screen">
      {/* Hero Section */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: theme === "dark" ? "#1F1F1F" : "#ffffff",
          cursor: "none",
          color: theme === "dark" ? "#ffffff" : "#0c0b0e",
          fontFamily: '"Fira Sans", sans-serif',
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

      {/* Scene */}
      <div
        ref={sceneRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundColor: theme === "dark" ? "#0c0b0e" : "#ffffff",
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
          className="absolute top-[2vw] right-[2vw] left-[2vw] flex flex-wrap justify-between items-baseline"
          style={{
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 13vw, 12rem)",
            letterSpacing: "-0.025em",
            lineHeight: 0.9,
          }}
        >
          <div className="flex-none">
            <div>
              <span style={{ color: "#ff68a8" }}>O</span>ne Vision,
            </div>
            <div>
              {" "}
              Two <span style={{ color: "#009800" }}>C</span>rafts.
            </div>
          </div>

          <div className="flex-end text-right ml-auto  ">
            <div className="mt-5 md:mt-10">
              IT<span style={{ color: "#4376AB" }}>&</span>DESIGN
            </div>
            <div style={{ color: "#F6BF41" }}>ZNIT</div>
          </div>
        </div>
      </div>

      {/* Cursor */}
      <div
        ref={cursorRef}
        className="absolute rounded-full pointer-events-none"
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

      {/* SVG */}
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
