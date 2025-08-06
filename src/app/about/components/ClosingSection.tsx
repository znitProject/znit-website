"use client";

import { useEffect, useRef } from "react";

export default function ClosingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containers = containerRef.current?.querySelectorAll(
      ".js-flip"
    ) as NodeListOf<HTMLElement>;

    containers?.forEach((container) => {
      const targets = container.querySelectorAll(
        ".m-flip_item"
      ) as NodeListOf<HTMLElement>;

      if (targets.length > 0) {
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
      }
    });
  }, []);

  return (
    <section className="min-h-screen py-20 relative overflow-hidden">
      <div className="container px-4 relative z-10 mt-20">
        <div
          ref={containerRef}
          className="text-center flex flex-col items-center justify-center min-h-screen space-y-12"
        >
          <p
            className="m-flip js-flip"
            style={{
              fontSize: "40px",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span
              className="m-flip_item"
              style={{ fontFamily: "'Pacifico', cursive" }}
            >
              We believe.
            </span>
            <span className="m-flip_item">우리는 믿습니다.</span>
          </p>

          <p
            className="m-flip js-flip"
            style={{
              fontSize: "32px",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span className="m-flip_item">
              기술과 디자인이 사람을 위한 것이어야 한다는 것을.
            </span>
            <span className="m-flip_item">
              기술과 디자인이 사람을 위한 것이어야 한다는 것을.
            </span>
          </p>

          <p
            className="m-flip js-flip"
            style={{
              fontSize: "35px",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span
              className="m-flip_item"
              style={{
                fontFamily: "var(--font-zen-kurenaido)",
                fontWeight: "400",
                fontSize: "40px",
              }}
            >
              ZNITは 今日も、
            </span>
            <span className="m-flip_item">ZNIT는 오늘도,</span>
          </p>

          <p
            className="m-flip js-flip"
            style={{
              fontSize: "40px",
              fontFamily: "var(--font-red-hat-display), sans-serif",
              fontWeight: "bold",
            }}
          >
            <span
              className="m-flip_item"
              style={{ fontFamily: "'Song Myung', serif" }}
            >
              세상을 더 아름답고 편안하게 만들기 위해 움직입니다.
            </span>
            <span className="m-flip_item">
              to make the world more beautiful and comfortable.
            </span>
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
          color: #ffffff;
        }
      `}</style>
    </section>
  );
}
