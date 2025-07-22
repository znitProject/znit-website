"use client";
import { useRef, useEffect } from "react";
import Matter from "matter-js";

// 키워드 배열 예시
const keywords = [
  "혁신",
  "연결",
  "성장",
  "신뢰",
  "창의",
  "도전",
];

// KeywordCard 컴포넌트: matter.js 기반 3D bubble + 중력 + 마우스 인터랙션
export default function KeywordCard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // matter.js 엔진/월드 생성
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    world.gravity.y = 1.2; // 중력 세기

    // 컨테이너 크기 측정
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // 바닥(ground) 생성
    const ground = Matter.Bodies.rectangle(width / 2, height + 30, width, 60, {
      isStatic: true,
      render: { visible: false },
    });
    Matter.World.add(world, ground);

    // 좌우 벽(Static Body) 추가
    const wallThickness = 40;
    const leftWall = Matter.Bodies.rectangle(0 - wallThickness / 2, height / 2, wallThickness, height, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, {
      isStatic: true,
      render: { visible: false },
    });
    Matter.World.add(world, [leftWall, rightWall]);

    // 버블(키워드) 바디 생성
    const radius = 44;
    const bubbles = keywords.map((_, i) => {
      // x는 좌우 40px 여백 내에서만 고르게 분포
      const minX = 40 + radius;
      const maxX = width - 40 - radius;
      const x = minX + ((maxX - minX) / (keywords.length - 1)) * i;
      const y = 40 + Math.random() * 20;
      return Matter.Bodies.circle(x, y, radius, {
        restitution: 0.85, // 튕김
        friction: 0.01,
        frictionAir: 0.02,
        density: 0.002,
      });
    });
    Matter.World.add(world, bubbles);

    // 마우스 컨트롤 추가
    const mouse = Matter.Mouse.create(containerRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.World.add(world, mouseConstraint);
    mouseConstraintRef.current = mouseConstraint;

    // 렌더 루프: matter.js 바디 위치를 DOM에 반영
    let animationId: number;
    const render = () => {
      Matter.Engine.update(engine, 1000 / 60);
      bubbles.forEach((body, i) => {
        const ref = bubbleRefs.current[i];
        if (ref) {
          ref.style.transform = `translate3d(${body.position.x - radius}px, ${body.position.y - radius}px, 0) scale(1)`;
        }
      });
      animationId = requestAnimationFrame(render);
    };
    render();

    // 리사이즈 시 새로고침 권장
    const handleResize = () => {
      window.location.reload();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3D bubble 스타일 (CSS + 그라데이션 + 반사광)
  const bubbleStyle: React.CSSProperties = {
    width: 88,
    height: 88,
    borderRadius: "50%",
    background: "radial-gradient(circle at 30% 30%, #fff 0%, #e0e7ef 40%, #60a5fa 100%)",
    boxShadow: "0 8px 32px 0 rgba(30,64,175,0.18), 0 1.5px 0 0 #fff inset",
    border: "2.5px solid #fff",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 20,
    color: "#1e293b",
    userSelect: "none",
    cursor: "grab",
    zIndex: 2,
    transition: "box-shadow 0.2s",
    // 반사광 효과
    overflow: "hidden",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto h-[310px] bg-gradient-to-b from-blue-100 to-white rounded-2xl overflow-hidden pt-2 pb-4"
      style={{ gridArea: "keyword" }}
    >
      {/* 키워드 버블들 */}
      {keywords.map((word, i) => (
        <div
          key={word}
          ref={el => { bubbleRefs.current[i] = el; }}
          style={bubbleStyle}
        >
          {/* 반사광 SVG */}
          <svg width="88" height="88" style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
            <ellipse cx="30" cy="26" rx="16" ry="7" fill="#fff" fillOpacity="0.35" />
            <ellipse cx="56" cy="56" rx="7" ry="2.5" fill="#fff" fillOpacity="0.18" />
          </svg>
          <span style={{ position: "relative", zIndex: 2 }}>{word}</span>
        </div>
      ))}
      {/* 바닥 그림자 효과 */}
      <div className="absolute left-0 bottom-0 w-full h-8 bg-gradient-to-t from-blue-200/60 to-transparent pointer-events-none" />
    </div>
  );
} 