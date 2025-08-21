"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BoxData {
  id: number;
  title: string;
  subtitle: string; // ✅ 영어 번역 추가
  content: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

type Notch = { dx: number; dy: number };

/** 퍼즐 카드: 중앙 원을 기준으로 ‘동심원’ 파임(각 카드 방향 다름) */
function PuzzleCard({
  children,
  className = "",
  notchDx,
  notchDy,
  notchRadius,
}: {
  children: React.ReactNode;
  className?: string;
  notchDx: number; // 카드가 중심에서 이동한 x (px) → 파임 중심 보정
  notchDy: number; // 카드가 중심에서 이동한 y (px)
  notchRadius: number; // 파임 반경(= 중앙 원 반경 + 여유)
}) {
  // 카드 컷아웃 마스크: 중앙(전역) 기준 동심원으로 파임
  const cardMask = `radial-gradient(${notchRadius}px ${notchRadius}px at calc(50% - ${notchDx}px) calc(50% - ${notchDy}px),
                      transparent 0 ${notchRadius}px, #000 ${notchRadius + 0.5}px)`;

  // 파인 부분 얇은 테두리(링) 마스크
  const STROKE = 1.5;
  const ringMask = `radial-gradient(${notchRadius}px ${notchRadius}px at calc(50% - ${notchDx}px) calc(50% - ${notchDy}px),
                      transparent 0 ${notchRadius - STROKE / 2}px,
                      #000 ${notchRadius - STROKE / 2}px ${notchRadius + STROKE / 2}px,
                      transparent ${notchRadius + STROKE / 2}px)`;

  return (
    <div
      className={
        "relative w-84 h-60 md:w-[420px] md:h-64 lg:w-[550px] lg:h-80 " +
        "rounded-[32px] bg-slate-50/50 supports-[backdrop-filter]:bg-slate-50/30 backdrop-blur " +
        "border border-neutral-400/80 dark:border-neutral-700/70 " + // ← 기존 테두리 유지
        "shadow-[0_8px_32px_rgba(2,12,27,0.08)] focus-within:ring-1 focus-within:ring-blue-400/40 " +
        className
      }
      style={{
        WebkitMaskImage: cardMask,
        maskImage: cardMask,
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
      }}
    >
      {/* 파인(음각) 부분 테두리 — 톤/두께 기존 느낌 유지 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[32px]"
        style={{
          background: "currentColor",
          color: "rgba(163,163,163,0.85)",
          WebkitMaskImage: ringMask,
          maskImage: ringMask,
        }}
      />
      {children}
    </div>
  );
}

/** 중앙 원 클릭 유도(절제된 버전) */
function useCenterCircleCues(
  ref: React.RefObject<HTMLDivElement>,
  { disabled = false }: { disabled?: boolean } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (disabled || reduce) return;

    // 미세 호흡
    const breath = gsap.to(el, {
      scale: 1.03,
      duration: 1.8,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut",
    });

    // 간헐 링
    let timer: number | null = null;
    const makePulse = () => {
      const ring = document.createElement("span");
      Object.assign(ring.style, {
        position: "absolute",
        inset: "0",
        borderRadius: "50%",
        pointerEvents: "none",
        boxShadow: "0 0 0 0 rgba(59,130,246,0.45)",
      });
      el.appendChild(ring);
      gsap.fromTo(
        ring,
        { opacity: 0.6, scale: 1 },
        { opacity: 0, scale: 1.6, duration: 1.0, ease: "power2.out", onComplete: () => ring.remove() }
      );
    };
    timer = window.setInterval(makePulse, 2400);

    // 자기장 호버
    const moveX = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3.out" });
    const MAG = 8;
    const onPointerMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      moveX(((e.clientX - cx) / r.width) * MAG);
      moveY(((e.clientY - cy) / r.height) * MAG);
    };
    const onEnter = () => window.addEventListener("pointermove", onPointerMove);
    const onLeave = () => {
      window.removeEventListener("pointermove", onPointerMove);
      gsap.to(el, { x: 0, y: 0, duration: 0.25, ease: "power3.out" });
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    // 클릭 리플
    const onClick = () => {
      const ring = document.createElement("span");
      Object.assign(ring.style, {
        position: "absolute",
        inset: "0",
        borderRadius: "50%",
        pointerEvents: "none",
        boxShadow: "0 0 0 0 rgba(59,130,246,0.55)",
      });
      el.appendChild(ring);
      gsap.fromTo(
        ring,
        { opacity: 0.7, scale: 1 },
        { opacity: 0, scale: 1.9, duration: 0.9, ease: "power3.out", onComplete: () => ring.remove() }
      );
    };
    el.addEventListener("click", onClick);

    return () => {
      breath.kill();
      if (timer) window.clearInterval(timer);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("click", onClick);
      gsap.set(el, { clearProps: "x,y,scale" });
    };
  }, [ref, disabled]);
}

/* ──────────────────────────────────────────────────────────
   레이아웃/타이포 유틸
   ────────────────────────────────────────────────────────── */

function alignFor(pos: BoxData["position"]) {
  const isRight = pos.includes("right");
  return {
    wrapperAlign: isRight ? "items-end text-right" : "items-start text-left",
    titleAlign: isRight ? "text-right" : "text-left",
    paragraphAlign: isRight ? "text-right" : "text-left",
  };
}

/** 파임 코너 쪽에만 여분 패딩(凹 코너 안전영역) */
function cornerSafePadding(pos: BoxData["position"]) {
  switch (pos) {
    case "top-left":     //凹: bottom-right → pr/pb
      return "pr-8 pb-7 md:pr-10 md:pb-9 lg:pr-14 lg:pb-12";
    case "top-right":    //凹: bottom-left  → pl/pb
      return "pl-8 pb-7 md:pl-10 md:pb-9 lg:pl-14 lg:pb-12";
    case "bottom-left":  //凹: top-right   → pr/pt
      return "pr-8 pt-7 md:pr-10 md:pt-9 lg:pr-14 lg:pt-12";
    case "bottom-right": //凹: top-left    → pl/pt
      return "pl-8 pt-7 md:pl-10 md:pt-9 lg:pl-14 lg:pt-12";
    default:
      return "";
  }
}

/** 오른쪽 카드면 오른쪽 앵커, 왼쪽 카드면 왼쪽 앵커 */
function rightAnchor(pos: BoxData["position"]) {
  return pos.includes("right") ? "ml-auto text-right items-end" : "mr-auto text-left items-start";
}

/** 제목 블록을 바깥쪽으로 살짝 당겨 파임 간섭 최소화 */
function outerPull(pos: BoxData["position"]) {
  switch (pos) {
    case "top-left":
    case "bottom-left":
      return "pr-1 md:pr-2 lg:pr-3";
    case "top-right":
    case "bottom-right":
      return "pl-1 md:pl-2 lg:pl-3";
    default:
      return "";
  }
}

const CulturePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // 중앙 원 반경 측정 → 동심원 파임 반경 계산
  const [centerRadius, setCenterRadius] = useState(64); // 초기값(대략)
  const NOTCH_MARGIN = 60; // 중앙 원보다 얼마나 더 크게 파일지

  const boxData: BoxData[] = [
    {
      id: 1,
      title: "주도성",
      subtitle: "Initiative", // ✅ 영어 번역
      content:
        "가만히 기다리지 않고 먼저 움직입니다. 필요할 땐 방향을 잡아주고, 끝까지 책임을 다해 결과로 이어갑니다.",
      position: "top-left",
    },
    {
      id: 2,
      title: "몰입",
      subtitle: "Focus", // ✅ 영어 번역
      content:
        "복잡함에 휘둘리지 않고 본질에 집중합니다. 깊게 파고들며 세밀한 부분까지 놓치지 않고, 결국 성과로 이어갑니다.",
      position: "top-right",
    },
    {
      id: 3,
      title: "관찰력",
      subtitle: "Observation", // ✅ 영어 번역
      content:
        "작은 단서 속에서도 의미를 발견합니다. 눈에 잘 안 띄는 변화에서 실마리를 찾아내어 새로운 길을 열어갑니다.",
      position: "bottom-left",
    },
    {
      id: 4,
      title: "전략적 사고",
      subtitle: "Strategic Thinking", // ✅ 영어 번역
      content:
        "다양한 의견과 관점을 연결해 더 넓게 바라봅니다. 단기 성과를 넘어 장기적인 그림까지 고려하며 길을 설계합니다.",
      position: "bottom-right",
    },
  ];

  // 각 카드의 ‘중앙 기준’ 오프셋 저장 (동심원 파임 위치 계산에 사용)
  const [notches, setNotches] = useState<Record<number, Notch>>({});

  // 중앙 원 크기 측정
  useEffect(() => {
    const measure = () => {
      if (!centerCircleRef.current) return;
      const r = centerCircleRef.current.offsetWidth / 2;
      setCenterRadius(Math.max(48, r));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // 대칭 배치 + 애니메이션
  const animateLayout = (expand: boolean) => {
    if (!itemsRef.current.length) return;

    tlRef.current?.kill();
    tlRef.current = gsap.timeline();

    const w = window.innerWidth;
    const isSm = w < 768;
    const isMd = w >= 768 && w < 1024;

    const OFFSET_X = isSm ? 180 : isMd ? 240 : 320;
    const OFFSET_Y = isSm ? 150 : isMd ? 180 : 210; // 상하 간격

    const targets: Record<BoxData["position"], { x: number; y: number }> = {
      "top-left": { x: -OFFSET_X, y: -OFFSET_Y },
      "top-right": { x: OFFSET_X, y: -OFFSET_Y },
      "bottom-left": { x: -OFFSET_X, y: OFFSET_Y },
      "bottom-right": { x: OFFSET_X, y: OFFSET_Y },
    };

    // 동심원 파임 중심 좌표 저장(각 카드 방향이 달라짐)
    const nextNotches: Record<number, Notch> = {};
    boxData.forEach((b) => {
      const t = targets[b.position];
      nextNotches[b.id] = { dx: t.x, dy: t.y };
    });
    setNotches(nextNotches);

    if (expand) {
      itemsRef.current.forEach((el) => el && gsap.set(el, { pointerEvents: "auto" }));
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = targets[boxData[i].position];
        tlRef.current!.to(el, { opacity: 1, scale: 1, x, y, duration: 0.8, ease: "expo.out" }, 0);
      });
    } else {
      itemsRef.current.forEach((el) => {
        if (!el) return;
        tlRef.current!.to(
          el,
          {
            opacity: 0,
            scale: 0.3,
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => gsap.set(el, { pointerEvents: "none" }),
          },
          0
        );
      });
    }
  };

  useEffect(() => {
    animateLayout(isExpanded);
    const onResize = () => animateLayout(isExpanded);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const handleCenterClick = () => setIsExpanded((v) => !v);

  const notchRadius = centerRadius + 60; // 중앙 원보다 얼마나 더 크게 파일지

  // 중앙 원 클릭 유도(펼침 중엔 꺼짐)
  useCenterCircleCues(centerCircleRef, { disabled: isExpanded });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="relative w-full max-w-[1600px] h-[720px] md:h-[900px] lg:h-[1100px]">
        {/* 중앙 원 */}
        <div
          ref={centerCircleRef}
          onClick={handleCenterClick}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full
                     bg-[#1e293b] border-2 border-[#64748b]
                     text-white grid place-items-center cursor-pointer select-none
                     shadow-[0_12px_40px_rgba(0,0,0,0.25)]
                     hover:bg-[#0f172a] transition-colors z-10"
        >
          <span className="font-bold text-2xl md:text-3xl lg:text-[34px]">Culture</span>
        </div>

        {/* 카드들 (각 카드의 파임 방향이 모두 다르게, 중앙 기준 동심원) */}
        {boxData.map((box, i) => {
          const notch = notches[box.id] ?? { dx: 0, dy: 0 };
          const A = alignFor(box.position);
          const pad = cornerSafePadding(box.position);

          return (
            <div
              key={box.id}
              ref={(el) => (itemsRef.current[i] = el)}
              className="absolute left-1/2 top-1/2 opacity-0"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <PuzzleCard notchDx={notch.dx} notchDy={notch.dy} notchRadius={notchRadius}>
                <div
                  className={[
                    "h-full flex flex-col",
                    "p-6 md:p-8 lg:p-10",
                    "gap-2 md:gap-3 lg:gap-4",
                    pad,                           // 凹 코너 안전패딩
                    A.wrapperAlign,                // 정렬
                    "max-md:text-left max-md:items-start",
                  ].join(" ")}
                  style={{
                    fontFamily:
                      "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, sans-serif",
                  }}
                >

                  {/* Header Section */}
                  <div className={["relative", rightAnchor(box.position), outerPull(box.position)].join(" ")}>
                    {/* 배경 장식 요소 */}
                    <div 
                      className={[
                        "absolute -inset-2 opacity-5",
                        "text-6xl md:text-7xl lg:text-8xl font-black",
                        "text-slate-800 pointer-events-none select-none",
                        A.titleAlign,
                      ].join(" ")}
                      style={{ 
                        lineHeight: "0.8",
                        zIndex: -1,
                      }}
                    >
                      {String(box.id).padStart(2, '0')}
                    </div>

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className={["mb-3", A.titleAlign === "text-right" ? "flex justify-end" : "flex justify-start"].join(" ")}>
                        {box.id === 1 && (
                          <div className="w-12 h-12 md:w-14 md:h-14">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                              {/* 로켓 SVG */}
                              <path d="M100 20 L120 50 L140 45 L135 65 L160 80 L140 85 L145 105 L125 100 L120 120 L100 110 L80 120 L75 100 L55 105 L60 85 L40 80 L65 65 L60 45 L80 50 Z" fill="#64748b" stroke="#374151" strokeWidth="3"/>
                              <circle cx="100" cy="60" r="8" fill="#f1f5f9"/>
                              <path d="M85 130 Q100 140 115 130" fill="#f59e0b" stroke="#d97706" strokeWidth="2"/>
                              <circle cx="80" cy="140" r="3" fill="#94a3b8"/>
                              <circle cx="90" cy="145" r="2" fill="#94a3b8"/>
                              <circle cx="110" cy="145" r="2" fill="#94a3b8"/>
                              <circle cx="120" cy="140" r="3" fill="#94a3b8"/>
                              <path d="M70 150 Q100 160 130 150" stroke="#cbd5e1" strokeWidth="2" fill="none"/>
                            </svg>
                          </div>
                        )}
                        {box.id === 2 && (
                          <div className="w-12 h-12 md:w-14 md:h-14">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                              {/* 타겟/집중 SVG */}
                              <circle cx="100" cy="100" r="80" fill="none" stroke="#64748b" strokeWidth="4"/>
                              <circle cx="100" cy="100" r="60" fill="none" stroke="#64748b" strokeWidth="3"/>
                              <circle cx="100" cy="100" r="40" fill="none" stroke="#64748b" strokeWidth="3"/>
                              <circle cx="100" cy="100" r="20" fill="#64748b"/>
                              <line x1="20" y1="100" x2="40" y2="100" stroke="#374151" strokeWidth="4"/>
                              <line x1="160" y1="100" x2="180" y2="100" stroke="#374151" strokeWidth="4"/>
                              <line x1="100" y1="20" x2="100" y2="40" stroke="#374151" strokeWidth="4"/>
                              <line x1="100" y1="160" x2="100" y2="180" stroke="#374151" strokeWidth="4"/>
                            </svg>
                          </div>
                        )}
                        {box.id === 3 && (
                          <div className="w-12 h-12 md:w-14 md:h-14">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                              {/* 돋보기 SVG */}
                              <circle cx="80" cy="80" r="50" fill="#cbd5e1" stroke="#374151" strokeWidth="6"/>
                              <circle cx="80" cy="80" r="35" fill="none" stroke="#64748b" strokeWidth="3"/>
                              <path d="M80 65 L85 75 L95 70 L90 80 L80 95 L70 80 L75 70 L80 65 Z" fill="#64748b"/>
                              <line x1="120" y1="120" x2="165" y2="165" stroke="#374151" strokeWidth="8" strokeLinecap="round"/>
                              <circle cx="165" cy="165" r="8" fill="#64748b"/>
                            </svg>
                          </div>
                        )}
                        {box.id === 4 && (
                          <div className="w-12 h-12 md:w-14 md:h-14">
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                              {/* 퍼즐 SVG */}
                              <g fill="#64748b" stroke="#374151" strokeWidth="3">
                                <path d="M50 50 L90 50 Q95 40 100 45 Q105 50 110 50 L150 50 L150 90 Q160 95 155 100 Q150 105 150 110 L150 150 L110 150 Q105 160 100 155 Q95 150 90 150 L50 150 Z"/>
                                <path d="M50 90 Q40 95 45 100 Q50 105 50 110"/>
                                <circle cx="75" cy="75" r="4" fill="#e2e8f0"/>
                                <circle cx="125" cy="75" r="4" fill="#e2e8f0"/>
                                <circle cx="75" cy="125" r="4" fill="#e2e8f0"/>
                                <circle cx="125" cy="125" r="4" fill="#e2e8f0"/>
                              </g>
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      {/* Title */}
                      <h3
                        className={[
                          "text-[clamp(24px,2.6vw,32px)] lg:text-[clamp(26px,2.2vw,36px)]",
                          "font-bold tracking-[-0.02em] text-slate-900",
                          "leading-[0.95] mb-1",
                          A.titleAlign,
                        ].join(" ")}
                        style={{ textWrap: "balance" as any }}
                      >
                        {box.title}
                      </h3>

                      {/* English subtitle with decorative line */}
                      <div className={["flex items-center gap-2", A.titleAlign === "text-right" ? "flex-row-reverse" : ""].join(" ")}>
                        <p
                          className={[
                            "text-[10px] md:text-[11px] uppercase tracking-[0.15em]",
                            "text-slate-500 font-medium",
                          ].join(" ")}
                        >
                          {box.subtitle}
                        </p>
                        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent max-w-8" />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="mt-5 md:mt-6">
                    <p
                      className={[
                        "text-[14px] md:text-[15.5px] lg:text-[16px]",
                        "leading-[1.7] text-slate-700",
                        "max-w-[36ch]",
                        "relative",
                        A.paragraphAlign,
                      ].join(" ")}
                      style={{ textWrap: "balance" as any }}
                    >
                      <span className="absolute -left-3 top-0 text-slate-300 text-lg select-none pointer-events-none">"</span>
                      {box.content}
                      <span className="absolute -right-2 bottom-0 text-slate-300 text-lg select-none pointer-events-none">"</span>
                    </p>
                  </div>

                  {/* 바닥 숨쉬기 */}
                  <div className="mt-auto pt-1 md:pt-2" />
                </div>
              </PuzzleCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CulturePage;
