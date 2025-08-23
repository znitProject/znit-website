"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BoxData {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

type Notch = { dx: number; dy: number };

const ACCENT: Record<
  BoxData["position"],
  { from: string; to: string; side: "left" | "right" }
> = {
  "top-left": { from: "#818cf8", to: "#38bdf8", side: "left" },
  "top-right": { from: "#a78bfa", to: "#f472b6", side: "right" },
  "bottom-left": { from: "#34d399", to: "#22d3ee", side: "left" },
  "bottom-right": { from: "#f59e0b", to: "#fb7185", side: "right" },
};

function PuzzleCard({
  children,
  className = "",
  notchDx,
  notchDy,
  notchRadius,
  accent,
  accentSide = "left",
}: {
  children: React.ReactNode;
  className?: string;
  notchDx: number;
  notchDy: number;
  notchRadius: number;
  accent: { from: string; to: string };
  accentSide?: "left" | "right";
}) {
  const RADIUS = notchRadius;
  const STROKE = 1.5;

  const cardMask = `radial-gradient(${RADIUS}px ${RADIUS}px at calc(50% - ${notchDx}px) calc(50% - ${notchDy}px),
    transparent 0 ${RADIUS}px, #000 ${RADIUS + 0.5}px)`;

  return (
    <div className="relative group will-change-transform">
      {/* 베이스 그림자 (마스크에 적용) */}
      <div
        className="absolute inset-0 w-84 h-60 md:w-[440px] md:h-64 lg:w-[580px] lg:h-80 rounded-[32px]"
        style={{
          WebkitMaskImage: cardMask,
          maskImage: cardMask,
          transform: "translateZ(0)",
          boxShadow:
            "0 20px 56px rgba(2,12,27,0.12), 0 8px 22px rgba(2,12,27,0.07)",
        }}
      />

      {/* 외곽 라인 */}
      <div
        className="absolute inset-0 w-84 h-60 md:w-[440px] md:h-64 lg:w-[580px] lg:h-80 rounded-[32px] pointer-events-none"
        style={{
          WebkitMaskImage: cardMask,
          maskImage: cardMask,
          transform: "translateZ(0)",
          boxShadow: "0 0 0 2px rgba(0,0,0,0.15) inset",
        }}
      />

      {/* 동심원 절단면 테두리 */}
      <div className="absolute inset-0 pointer-events-none rounded-[32px] overflow-hidden">
        <div
          style={{
            position: "absolute",
            left: `calc(50% - ${notchDx}px - ${RADIUS}px)`,
            top: `calc(50% - ${notchDy}px - ${RADIUS}px)`,
            width: `${RADIUS * 2}px`,
            height: `${RADIUS * 2}px`,
            border: `${STROKE}px solid rgba(0,0,0,0.22)`,
            borderRadius: "50%",
            boxSizing: "border-box",
            transform: "translateZ(0)",
          }}
          aria-hidden
        />
      </div>

      {/* 콘텐츠 카드 (hover 시 섀도우 업) */}
      <div
        className={
          "relative w-84 h-60 md:w-[440px] md:h-64 lg:w-[580px] lg:h-80 rounded-[32px] bg-white " +
          "transition-shadow duration-300 border-2 border-gray-200/80 " +
          className
        }
        style={{
          WebkitMaskImage: cardMask,
          maskImage: cardMask,
          transform: "translateZ(0)",
          boxShadow:
            "0 12px 28px rgba(2,12,27,0.15), 0 5px 12px rgba(2,12,27,0.10), 0 0 0 1px rgba(0,0,0,0.05) inset",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 26px 68px rgba(2,12,27,0.18), 0 12px 26px rgba(2,12,27,0.13), 0 0 0 1px rgba(0,0,0,0.08) inset";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 12px 28px rgba(2,12,27,0.15), 0 5px 12px rgba(2,12,27,0.10), 0 0 0 1px rgba(0,0,0,0.05) inset";
        }}
      >
        {/* Accent gradient bar */}
        <div
          className="absolute top-4 bottom-4 w-[2px] rounded-full"
          style={
            {
              [accentSide]: "10px",
              background: `linear-gradient(to bottom, ${accent.from}, ${accent.to})`,
              opacity: 0.9,
            } as React.CSSProperties
          }
        />
        {children}
      </div>
    </div>
  );
}

function useCenterCircleCues(
  ref: React.RefObject<HTMLDivElement | null>,
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

    const breath = gsap.to(el, {
      scale: 1.015,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    const glow = gsap.to(el, {
      boxShadow:
        "0 0 25px 6px rgba(196, 181, 253, 0.3), 0 12px 40px rgba(0,0,0,0.15)",
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    const gradients = [
      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(219,234,254,0.9) 50%, rgba(191,219,254,0.85) 100%)",
      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(254,240,138,0.7) 50%, rgba(253,224,71,0.6) 100%)",
      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(252,231,243,0.8) 50%, rgba(249,168,212,0.7) 100%)",
      "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(220,252,231,0.8) 50%, rgba(134,239,172,0.7) 100%)",
    ];
    let i = 0;
    const gradientTimer = window.setInterval(() => {
      i = (i + 1) % gradients.length;
      gsap.to(el, {
        "--center-gradient": gradients[i],
        duration: 3,
        ease: "power2.inOut",
      });
    }, 4000);

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
        {
          opacity: 0,
          scale: 1.6,
          duration: 1.0,
          ease: "power2.out",
          onComplete: () => ring.remove(),
        }
      );
    };
    timer = window.setInterval(makePulse, 2400);

    const moveX = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3.out" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3.out" });
    const MAG = 8;
    const onPointerMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      moveX(((e.clientX - (r.left + r.width / 2)) / r.width) * MAG);
      moveY(((e.clientY - (r.top + r.height / 2)) / r.height) * MAG);
    };
    const onEnter = () => window.addEventListener("pointermove", onPointerMove);
    const onLeave = () => {
      window.removeEventListener("pointermove", onPointerMove);
      gsap.to(el, { x: 0, y: 0, duration: 0.25, ease: "power3.out" });
    };
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    const onClick = () => {
      const ring = document.createElement("span");
      Object.assign(ring.style, {
        position: "absolute",
        inset: "0",
        borderRadius: "50%",
        pointerEvents: "none",
        boxShadow: "0 0 0 0 rgba(59,130,246,0.55)",
        zIndex: "1",
      });
      el.appendChild(ring);
      gsap.fromTo(
        ring,
        { opacity: 0.7, scale: 1 },
        {
          opacity: 0,
          scale: 1.9,
          duration: 0.9,
          ease: "power3.out",
          onComplete: () => ring.remove(),
        }
      );
    };
    el.addEventListener("click", onClick);

    return () => {
      breath.kill();
      glow.kill();
      if (timer) window.clearInterval(timer);
      if (gradientTimer) window.clearInterval(gradientTimer);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("click", onClick);
      gsap.set(el, { clearProps: "x,y,scale,boxShadow,--center-gradient" });
    };
  }, [ref, disabled]);
}

/* ───────────── 유틸 ───────────── */

function alignFor(pos: BoxData["position"]) {
  const isRight = pos.includes("right");
  return {
    wrapperAlign: isRight ? "items-end text-right" : "items-start text-left",
    titleAlign: isRight ? "text-right" : "text-left",
    paragraphAlign: isRight ? "text-right" : "text-left",
  };
}

function cornerSafePadding(pos: BoxData["position"]) {
  switch (pos) {
    case "top-left":
      return "pr-8 pb-7 md:pr-10 md:pb-9 lg:pr-14 lg:pb-12";
    case "top-right":
      return "pl-8 pb-7 md:pl-10 md:pb-9 lg:pl-14 lg:pb-12";
    case "bottom-left":
      return "pr-8 pt-7 md:pr-10 md:pt-9 lg:pr-14 lg:pt-12";
    case "bottom-right":
      return "pl-8 pt-7 md:pl-10 md:pt-9 lg:pl-14 lg:pt-12";
    default:
      return "";
  }
}

function rightAnchor(pos: BoxData["position"]) {
  return pos.includes("right")
    ? "ml-auto text-right items-end"
    : "mr-auto text-left items-start";
}

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

const BOXES: BoxData[] = [
  {
    id: 1,
    title: "주도성",
    subtitle: "Initiative",
    content:
      "멈춰 서 있지 않고 스스로 움직입니다. 필요할 때는 방향을 제시하며, 끝까지 책임져 결과로 이끕니다.",
    position: "top-left",
  },
  {
    id: 2,
    title: "몰입",
    subtitle: "Focus",
    content:
      "복잡함에 흔들리지 않고 본질에 몰두합니다. 깊이 파고들어 세밀함을 놓치지 않으며, 결국 성과를 이룹니다.",
    position: "top-right",
  },
  {
    id: 3,
    title: "관찰력",
    subtitle: "Observation",
    content:
      "작은 흔적 속에서도 가치를 발견합니다. 눈에 잘 띄지 않는 변화에서 단서를 찾아내어 새로운 길을 만듭니다.",
    position: "bottom-left",
  },
  {
    id: 4,
    title: "전략적 사고",
    subtitle: "Strategic Thinking",
    content:
      "다양한 시선과 의견을 연결해 더 넓게 봅니다. 단기 성과를 넘어 장기적 그림까지 고려하며 길을 설계합니다.",
    position: "bottom-right",
  },
];

const CulturePage: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const centerCircleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [centerRadius, setCenterRadius] = useState(64);
  const [notches, setNotches] = useState<Record<number, Notch>>({});
  const NOTCH_MARGIN = 60;

  const getImageForBox = (id: number) =>
    ({
      1: "/culture/initiative.png",
      2: "/culture/focus.png",
      3: "/culture/observation.png",
      4: "/culture/strategicThinking.png",
    })[id as 1 | 2 | 3 | 4] || "";

  const getCardBackground = () =>
    "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.92))";

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

  const animateLayout = (expand: boolean) => {
    if (!itemsRef.current.length) return;

    tlRef.current?.kill();
    tlRef.current = gsap.timeline({ defaults: { overwrite: "auto" } });

    const w = window.innerWidth;
    const isSm = w < 768;
    const isMd = w >= 768 && w < 1024;

    const OFFSET_X = isSm ? 180 : isMd ? 240 : 320;
    const OFFSET_Y = isSm ? 150 : isMd ? 180 : 210;

    const targets: Record<BoxData["position"], { x: number; y: number }> = {
      "top-left": { x: -OFFSET_X, y: -OFFSET_Y },
      "top-right": { x: OFFSET_X, y: -OFFSET_Y },
      "bottom-left": { x: -OFFSET_X, y: OFFSET_Y },
      "bottom-right": { x: OFFSET_X, y: OFFSET_Y },
    };

    const next: Record<number, Notch> = {};
    for (const b of BOXES) {
      const t = targets[b.position];
      next[b.id] = { dx: t.x, dy: t.y };
    }
    setNotches(next);

    if (expand) {
      itemsRef.current.forEach(
        (el) => el && gsap.set(el, { pointerEvents: "auto" })
      );
      itemsRef.current.forEach((el, i) => {
        if (!el) return;
        const { x, y } = targets[BOXES[i].position];
        tlRef.current!.to(
          el,
          { opacity: 1, scale: 1, x, y, duration: 0.8, ease: "expo.out" },
          0
        );
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
  const notchRadius = centerRadius + NOTCH_MARGIN;

  useCenterCircleCues(centerCircleRef, { disabled: isExpanded });

  return (
    <div className="w-full min-h-screen bg-sky-50/60">
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-full max-w-[1600px] h-[720px] md:h-[900px] lg:h-[1100px] px-6">
          {/* 중앙 원 */}
          <div
            ref={centerCircleRef}
            onClick={handleCenterClick}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full
                     border-2 border-violet-200/80
                     text-gray-700 grid place-items-center cursor-pointer select-none
                     shadow-[0_0_15px_2px_rgba(196,181,253,0.2),0_12px_40px_rgba(0,0,0,0.25)]
                     z-10"
            style={{
              background:
                "var(--center-gradient, linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(219,234,254,0.9) 50%, rgba(191,219,254,0.85) 100%))",
              outline: "none",
              // @ts-ignore
              "--center-gradient":
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(219,234,254,0.9) 50%, rgba(191,219,254,0.85) 100%)",
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <span className="font-bold text-2xl md:text-3xl lg:text-[34px]">
              Culture
            </span>
          </div>

          {/* click me 안내 */}
          {!isExpanded && (
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-20 md:translate-y-24 lg:translate-y-28 
                            flex flex-col items-center gap-2 z-5 pointer-events-none"
            >
              <div className="text-gray-400 animate-bounce">
                <div
                  className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] 
                                border-l-transparent border-r-transparent border-b-gray-400
                                md:border-l-[10px] md:border-r-[10px] md:border-b-[14px] md:border-b-gray-400"
                />
              </div>
              <span className="text-xs md:text-sm text-gray-400 font-medium tracking-wide">
                click me!
              </span>
            </div>
          )}

          {/* 카드들 */}
          {BOXES.map((box, i) => {
            const A = alignFor(box.position);
            const pad = cornerSafePadding(box.position);
            const accent = ACCENT[box.position];
            const notch = notches[box.id] ?? { dx: 0, dy: 0 };

            return (
              <div
                key={box.id}
                ref={(el) => (itemsRef.current[i] = el)}
                className="absolute left-1/2 top-1/2 opacity-0"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <PuzzleCard
                  notchDx={notch.dx}
                  notchDy={notch.dy}
                  notchRadius={notchRadius}
                  className="overflow-hidden"
                  accent={{ from: accent.from, to: accent.to }}
                  accentSide={accent.side}
                >
                  <div
                    className={[
                      "h-full flex flex-col",
                      "p-6 md:p-8 lg:p-10",
                      "gap-2 md:gap-3 lg:gap-4",
                      pad,
                      A.wrapperAlign,
                      "max-md:text-left max-md:items-start",
                    ].join(" ")}
                    style={{
                      fontFamily:
                        "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans KR, sans-serif",
                      background: getCardBackground(),
                    }}
                  >
                    {/* Header */}
                    <div
                      className={[
                        "relative",
                        rightAnchor(box.position),
                        outerPull(box.position),
                      ].join(" ")}
                    >
                      <div className="relative z-10">
                        <div
                          className={[
                            "flex items-center gap-3 md:gap-4 mb-1",
                            box.position.includes("left")
                              ? ""
                              : "flex-row-reverse",
                          ].join(" ")}
                        >
                          <h3
                            className={[
                              "text-[clamp(24px,2.4vw,32px)] lg:text-[clamp(26px,2.1vw,36px)]",
                              "font-semibold tracking-[-0.01em] text-slate-900",
                              "leading-[1.05]",
                              A.titleAlign,
                            ].join(" ")}
                            style={{ textWrap: "balance" as any }}
                          >
                            {box.title}
                          </h3>

                          <div className="flex-shrink-0">
                            <img
                              src={getImageForBox(box.id)}
                              alt={`${box.title} 아이콘`}
                              className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                              loading="lazy"
                            />
                          </div>
                        </div>

                        {/* English subtitle */}
                        <div
                          className={[
                            "flex items-center gap-2",
                            A.titleAlign === "text-right"
                              ? "flex-row-reverse"
                              : "",
                          ].join(" ")}
                        >
                          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.14em] text-slate-500 font-medium">
                            {box.subtitle}
                          </p>
                          <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent max-w-8" />
                        </div>

                        {/* 구분선 */}
                        <div className="mt-3 mb-2">
                          <div
                            className={[
                              "h-px bg-gradient-to-r from-slate-300/60 to-transparent w-full max-w-[200px]",
                              A.titleAlign === "text-right" ? "ml-auto" : "",
                            ].join(" ")}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content (2줄 고정) */}
                    <div className="mt-4 md:mt-5">
                      <p
                        className={[
                          "text-[14.5px] md:text-[15.5px] lg:text-[16px]",
                          "leading-[1.7] text-slate-700",
                          "max-w-[58ch]", // ← 가로폭 살짝 넓힘
                          "line-clamp-2", // ← 2줄 고정
                          "relative",
                          A.paragraphAlign,
                        ].join(" ")}
                        style={{ textWrap: "balance" as any }}
                      >
                        {box.content}
                      </p>
                    </div>

                    <div className="mt-auto pt-1 md:pt-2" />
                  </div>
                </PuzzleCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CulturePage;
