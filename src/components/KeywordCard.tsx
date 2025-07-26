"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const keywords = [
  "Detail",
  "Technology",
  "주도성",
  "전략적 사고",
  "Empathy",
  "성장",
  "진정성",
  "유연성",
  "Big-picture",
];

export default function KeywordCard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTextRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<number | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const [visibleKeywords, setVisibleKeywords] = useState<string[]>([]);

  // 키워드 순차 렌더링
  useEffect(() => {
    let mounted = true;
    const addKeyword = (index: number) => {
      if (index >= keywords.length || !mounted) return;
      setVisibleKeywords((prev) => [...prev, keywords[index]]);
      setTimeout(() => addKeyword(index + 1), 200);
    };
    addKeyword(0);
    return () => {
      mounted = false;
    };
  }, []);

  // Matter.js 초기화 및 바디 생성
  useEffect(() => {
    if (!containerRef.current) return;

    const loadMatterJS = async () => {
      try {
        const Matter = await import("matter-js");
        const { Engine, World, Bodies, Mouse, MouseConstraint } = Matter;

        const container = containerRef.current!;
        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const engine = Engine.create();
        engineRef.current = engine;
        engine.world.gravity.y = 0.8;

        const wallThickness = 20;
        const ground = Bodies.rectangle(
          width / 2,
          height + wallThickness / 2,
          width + wallThickness * 2,
          wallThickness,
          { isStatic: true, render: { visible: false } }
        );
        const leftWall = Bodies.rectangle(
          -wallThickness / 2,
          height / 2,
          wallThickness,
          height + wallThickness,
          { isStatic: true, render: { visible: false } }
        );
        const rightWall = Bodies.rectangle(
          width + wallThickness / 2,
          height / 2,
          wallThickness,
          height + wallThickness,
          { isStatic: true, render: { visible: false } }
        );

        World.add(engine.world, [ground, leftWall, rightWall]);

        const mouse = Mouse.create(container);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: { stiffness: 0.2, render: { visible: false } },
        });
        World.add(engine.world, mouseConstraint);

        const render = () => {
          Engine.update(engine, 1000 / 60);
          bodiesRef.current.forEach((body, index) => {
            const bubbleEl = bubbleRefs.current[index];
            if (bubbleEl && body) {
              const x = body.position.x - bubbleEl.offsetWidth / 2;
              const y = body.position.y - 22;
              const rotation = body.angle;
              bubbleEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}rad)`;
              bubbleEl.style.visibility = "visible";
            }
          });
          renderRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
          if (renderRef.current) cancelAnimationFrame(renderRef.current);
          if (engineRef.current) {
            World.clear(engineRef.current.world, false);
            Engine.clear(engineRef.current);
          }
        };
      } catch (error) {
        console.error("Matter.js 로딩 실패:", error);
      }
    };

    loadMatterJS();
  }, []);

  // 키워드 바디 생성: visibleKeywords가 추가될 때마다 해당 바디 추가
  useEffect(() => {
    if (!containerRef.current || !engineRef.current) return;

    const createBody = async () => {
      const Matter = await import("matter-js");
      const { World, Bodies } = Matter;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const width = rect.width;

      const index = visibleKeywords.length - 1;
      if (index < 0) return;

      const bubbleEl = bubbleRefs.current[index];
      if (!bubbleEl) return;

      const bubbleWidth = bubbleEl.offsetWidth || 100;
      const bubbleHeight = 44;
      const x =
        Math.random() * (width - bubbleWidth - 40) + bubbleWidth / 2 + 20;
      const y = Math.random() * 20 + 20;

      const body = Bodies.rectangle(x, y, bubbleWidth, bubbleHeight, {
        restitution: 0.6,
        friction: 0.3,
        frictionAir: 0.01,
        density: 0.001,
        render: { visible: false },
      });

      bodiesRef.current.push(body);
      if (engineRef.current) {
        World.add(engineRef.current.world, body);
      }
    };

    createBody();
  }, [visibleKeywords]);

  // GSAP 무한 스크롤
  useEffect(() => {
    if (!scrollTextRef.current) return;

    const totalWidth = scrollTextRef.current.scrollWidth;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        scrollTextRef.current,
        { x: 0 },
        {
          x: -totalWidth / 2,
          duration: 60,
          ease: "linear",
          repeat: -1,
        }
      );
    }, scrollTextRef);

    return () => ctx.revert();
  }, []);

  const bubbleColors = [
    "#FF6B6B", // Red
    "#4ECDC4", // Teal
    "#45B7D1", // Blue
    "#FFA07A", // Light Salmon
    "#98D8AA", // Green
    "#FFD700", // Gold
    "#BA55D3", // Medium Orchid
    "#6A5ACD", // Slate Blue
    "#FF6347", // Tomato
    "#20B2AA", // Light Sea Green
  ];

  const getBubbleStyle = (index: number): React.CSSProperties => {
    const color = bubbleColors[index % bubbleColors.length];
    return {
      height: 44,
      padding: "0 20px",
      borderRadius: "22px",
      background: color,
      boxShadow: `0 8px 20px ${color}80, 0 1.5px 0 0 #fff inset`,
      border: "2px solid #fff",
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 20,
      color: "#fff", // Changed text color to white for better contrast
      fontFamily: "system-ui, sans-serif",
      userSelect: "none",
      cursor: "grab",
      zIndex: 10,
      whiteSpace: "nowrap",
      pointerEvents: "auto",
      transformOrigin: "center center",
      visibility: "hidden", // 초기에 보이지 않도록 설정
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto h-[310px] bg-neutral-100 rounded-2xl overflow-hidden"
      style={{ gridArea: "keyword" }}
    >
      {/* 무한 스크롤 문장 */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-20 ">
        <div
          ref={scrollTextRef}
          className="flex whitespace-nowrap text-[4rem] font-extrabold text-stroke text-transparent"
        >
          {Array(20)
            .fill("The Values That Define Who We Are")
            .map((text, idx) => (
              <span key={idx} className="mx-8">
                {text}
              </span>
            ))}
        </div>
      </div>

      {/* 키워드 버블 */}
      {visibleKeywords.map((word, i) => (
        <div
          key={`${word}-${i}`}
          ref={(el) => {
            bubbleRefs.current[i] = el;
          }}
          style={getBubbleStyle(i)}
        >
          <span style={{ pointerEvents: "none" }}>{word}</span>
        </div>
      ))}

      {/* 하단 그림자 */}
      <div className="absolute left-0 bottom-0 w-full h-8 bg-gradient-to-t from-neutral-300 to-transparent pointer-events-none" />
    </div>
  );
}
