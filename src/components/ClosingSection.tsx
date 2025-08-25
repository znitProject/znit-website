"use client";

import { useEffect, useRef } from "react";

export default function ClosingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containers = Array.from(
      containerRef.current?.querySelectorAll(
        ".js-flip"
      ) as NodeListOf<HTMLElement>
    );

    if (containers.length === 0) return;

    const eventHandlers = new Map<
      HTMLElement,
      { mouseenter: () => void; mouseleave: () => void }
    >();

    const setupContainers = () => {
      containers.forEach((container) => {
        if (eventHandlers.has(container)) {
          const handlers = eventHandlers.get(container);
          container.removeEventListener("mouseenter", handlers!.mouseenter);
          container.removeEventListener("mouseleave", handlers!.mouseleave);
        }

        const targets = container.querySelectorAll(
          ".m-flip_item"
        ) as NodeListOf<HTMLElement>;

        if (targets.length > 0) {
          container.style.height = "auto";
          const targetFirstHeight = targets[0].offsetHeight;
          container.style.height = `${targetFirstHeight}px`;

          const handleMouseEnter = () => {
            targets.forEach((target) => {
              target.style.top = `-${targetFirstHeight}px`;
            });
          };

          const handleMouseLeave = () => {
            targets.forEach((target) => {
              target.style.top = "0px";
            });
          };

          container.addEventListener("mouseenter", handleMouseEnter);
          container.addEventListener("mouseleave", handleMouseLeave);

          eventHandlers.set(container, {
            mouseenter: handleMouseEnter,
            mouseleave: handleMouseLeave,
          });
        }
      });
    };

    setupContainers();

    window.addEventListener("resize", setupContainers);

    return () => {
      window.removeEventListener("resize", setupContainers);
      containers.forEach((container) => {
        if (eventHandlers.has(container)) {
          const handlers = eventHandlers.get(container);
          container.removeEventListener("mouseenter", handlers!.mouseenter);
          container.removeEventListener("mouseleave", handlers!.mouseleave);
        }
      });
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center py-12 md:py-20 relative overflow-hidden">
      <div className="container px-4 relative z-10">
        <div
          ref={containerRef}
          className="text-center flex flex-col items-center justify-center space-y-6 md:space-y-10"
        >
          <p
            className="m-flip js-flip"
            style={{
              fontSize: "clamp(24px, 5vw, 40px)",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span
              className="m-flip_item"
              style={{ fontFamily: "var(--font-righteous), cursive" }}
            >
              We believe.
            </span>
            <span className="m-flip_item">우리는 믿습니다.</span>
          </p>

          <p
            className="m-flip js-flip"
            style={{
              fontSize: "clamp(20px, 4vw, 32px)",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span className="m-flip_item">
              기술과 디자인이 사람을 위한 것이어야 한다는 것을.
            </span>
            <span className="m-flip_item">
              Que la technologie et le design doivent servir les gens.
            </span>
          </p>

          <p
            className="m-flip js-flip"
            style={{
              fontSize: "clamp(22px, 4.5vw, 35px)",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span
              className="m-flip_item"
              style={{
                fontFamily: "var(--font-zen-kurenaido), sans-serif",
                fontWeight: "400",
                fontSize: "clamp(24px, 5vw, 40px)",
              }}
            >
              ZNITは 今日も、
            </span>
            <span className="m-flip_item">ZNIT는 오늘도,</span>
          </p>

          <p
            className="m-flip js-flip"
            style={{
              fontSize: "clamp(20px, 4vw, 32px)",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span
              className="m-flip_item"
              style={{
                fontFamily: "var(--font-devanagari), sans-serif",
                fontSize: "clamp(22px, 4.5vw, 35px)",
              }}
            >
              हम जुनून के साथ आगे बढ़ते हैं।
            </span>
            <span className="m-flip_item">열정을 가지고 앞으로 나아갑니다.</span>
          </p>

          <p
            className="m-flip js-flip"
            style={{
              fontSize: "clamp(24px, 5vw, 40px)",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span
              className="m-flip_item"
              style={{ fontFamily: "var(--font-roboto-flex), sans-serif" }}
            >
              Por un mundo mejor y más tranquilo.
            </span>
            <span className="m-flip_item">더 나은 그리고 더 평화로운 세상을 위해.</span>
          </p>
        </div>
      </div>
      <style jsx global>{`
        .m-flip {
          overflow: hidden;
          cursor: pointer;
        }
        .m-flip_item {
          display: block;
          position: relative;
          top: 0;
          transition: top 0.2s ease-out 0s;
        }
        .m-flip_item:nth-child(1) {
          color: #666;
        }
        .m-flip_item:nth-child(2) {
          color: #666;
        }
        .dark .m-flip_item:nth-child(1) {
          color: white;
        }
        .dark .m-flip_item:nth-child(2) {
          color: white;
        }
      `}</style>
    </section>
  );
}