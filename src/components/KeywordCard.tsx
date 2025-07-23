"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

const keywords = ["협동심", "책임감", "꼼꼼함", "전문성", "맥락", "전략적", "행복함"];

export default function KeywordCard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTextRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<any>(null);
  const renderRef = useRef<any>(null);
  const bodiesRef = useRef<any[]>([]);
  const [visibleKeywords, setVisibleKeywords] = useState<string[]>([]);

  // 키워드 순차 렌더링
  useEffect(() => {
    keywords.forEach((keyword, index) => {
      setTimeout(() => {
        setVisibleKeywords((prev) => [...prev, keyword]);
      }, index * 200); // 0.2초 간격으로 하나씩 추가
    });
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

    const Matter = require("matter-js");
    const { World, Bodies } = Matter;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const width = rect.width;

    const index = visibleKeywords.length - 1;
    const bubbleEl = bubbleRefs.current[index];

    if (!bubbleEl) return;

    const bubbleWidth = bubbleEl.offsetWidth || 100;
    const bubbleHeight = 44;
    const x = Math.random() * (width - bubbleWidth - 40) + bubbleWidth / 2 + 20;
    const y = Math.random() * 50 + 20;

    const body = Bodies.rectangle(x, y, bubbleWidth, bubbleHeight, {
      restitution: 0.6,
      friction: 0.3,
      frictionAir: 0.01,
      density: 0.001,
      render: { visible: false },
    });

    bodiesRef.current.push(body);
    World.add(engineRef.current.world, body);
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

  const bubbleStyle: React.CSSProperties = {
    height: 44,
    padding: "0 20px",
    borderRadius: "22px",
    background: "radial-gradient(circle at 30% 30%, #f0f0f0 0%, #ccc 40%, #999 100%)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1), 0 1.5px 0 0 #fff inset",
    border: "2px solid #fff",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: 20,
    color: "#111",
    fontFamily: "system-ui, sans-serif",
    userSelect: "none",
    cursor: "grab",
    zIndex: 10,
    whiteSpace: "nowrap",
    pointerEvents: "auto",
    transformOrigin: "center center",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto h-[310px] bg-neutral-100 rounded-2xl overflow-hidden"
      style={{ gridArea: "keyword" }}
    >
      {/* 무한 스크롤 문장 */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-20 py-2">
        <div
          ref={scrollTextRef}
          className="flex whitespace-nowrap text-[4rem] font-extrabold text-neutral-800"
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
          key={word}
          ref={(el) => (bubbleRefs.current[i] = el)}
          style={bubbleStyle}
        >
          <span style={{ pointerEvents: "none" }}>{word}</span>
        </div>
      ))}

      {/* 하단 그림자 */}
      <div className="absolute left-0 bottom-0 w-full h-8 bg-gradient-to-t from-neutral-300 to-transparent pointer-events-none" />
    </div>
  );
}