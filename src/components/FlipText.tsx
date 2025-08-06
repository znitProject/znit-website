"use client";

import { useEffect, useRef, useState } from "react";

interface FlipTextProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function FlipText({ children, style }: FlipTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(
      ".m-flip_item"
    ) as NodeListOf<HTMLElement>;

    if (items.length === 0) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        if (height > 0) {
          container.style.height = `${height}px`;
          if (items.length > 1) {
            items[1].style.top = `${height}px`;
          }
          setIsInitialized(true);
          resizeObserver.disconnect();
        }
      }
    });

    resizeObserver.observe(items[0]);

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  const handleMouseEnter = () => {
    const container = containerRef.current;
    if (container) {
      const items = container.querySelectorAll(
        ".m-flip_item"
      ) as NodeListOf<HTMLElement>;
      if (items.length > 0) {
        const itemHeight = items[0].offsetHeight;
        items[0].style.top = `-${itemHeight}px`;
        if (items.length > 1) {
          items[1].style.top = "0px";
        }
      }
    }
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    if (container) {
      const items = container.querySelectorAll(
        ".m-flip_item"
      ) as NodeListOf<HTMLElement>;
      if (items.length > 0) {
        const itemHeight = items[0].offsetHeight;
        items[0].style.top = "0px";
        if (items.length > 1) {
          items[1].style.top = `${itemHeight}px`;
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="m-flip cursor-pointer"
      style={{ ...style, visibility: isInitialized ? "visible" : "hidden" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <style jsx>{`
        .m-flip {
          overflow: hidden;
          position: relative;
        }
      `}</style>
    </div>
  );
}
