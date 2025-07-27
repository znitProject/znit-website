import { useEffect, useRef } from "react";

const WorkTitle = () => {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');

      .skew-title {
        font-size: 35px;
        text-align: center;
        margin: 0 auto;
        font-family: 'Roboto Condensed', sans-serif;
        font-weight: 700;
        color: #fff;
        position: relative;
        height: 50px;
        z-index: 1;
        clear: both;
        margin-bottom: 30px;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 50%;
        transform: translateX(-50%);
      }

      .skew-title span {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 50px;
        z-index: 2;
        text-align: center;
        color: #fff;
        font-family: 'Roboto Condensed', sans-serif;
        font-weight: 700;
        font-size: 35px;
        line-height: 50px;
        transform: skewY(-15deg);
        transform-origin: 0 100%;
        transition: all 0.3s ease;
        cursor: default;
        box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }

      .skew-title span:after,
      .skew-title span:before {
        display: block;
        top: 0;
        left: 0;
        width: 40px;
        height: 50px;
        position: absolute;
        background: #1f2937;
        content: ' ';
        z-index: -1;
        transition: all 0.3s ease;
        border: 1px solid rgba(255,255,255,0.1);
      }

      .skew-title span:before {
        background: rgba(0,0,0,0.2);
        transform: skewY(15deg);
        transform-origin: 0 0;
        box-shadow: inset 2px 2px 4px rgba(0,0,0,0.3);
      }

      .skew-title span:nth-child(even) {
        background-color: #374151;
        transform: skewY(15deg);
        transform-origin: 100% 100%;
        color: #e5e7eb;
      }

      .skew-title span:nth-child(even):after {
        background-color: #374151;
      }

      .skew-title span:nth-child(even):before {
        transform-origin: 100% 0;
        transform: skewY(-15deg);
      }

      .skew-title span.flat {
        transform: skewY(0);
        color: #fff;
        box-shadow: 0 4px 8px rgba(0,0,0,0.4);
      }

      .skew-title span.flat:before {
        transform: skewY(0);
        box-shadow: none;
      }

      .skew-title span:nth-child(even).flat {
        background-color: #1f2937;
        transform: skewY(0);
      }

      .skew-title span:nth-child(even).flat:after {
        background-color: #1f2937;
      }

      .skew-title span:hover {
        transform: skewY(0);
        box-shadow: 0 6px 12px rgba(0,0,0,0.5);
        z-index: 10;
      }

      @media screen and (max-width: 768px) {
        .skew-title {
          font-size: 28px;
          height: 40px;
        }
        .skew-title span {
          width: 32px;
          height: 40px;
          font-size: 28px;
          line-height: 40px;
          margin: 0 1px;
          box-shadow: 1px 1px 3px rgba(0,0,0,0.3);
        }
        .skew-title span:after,
        .skew-title span:before {
          width: 32px;
          height: 40px;
        }
        .skew-title span.flat {
          transform: skewY(0);
          box-shadow: 0 3px 6px rgba(0,0,0,0.4);
        }
        .skew-title span:hover {
          transform: skewY(0);
          box-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }
      }

      @media screen and (max-width: 480px) {
        .skew-title {
          font-size: 24px;
          height: 36px;
        }
        .skew-title span {
          width: 28px;
          height: 36px;
          font-size: 24px;
          line-height: 36px;
          margin: 0 1px;
          box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
        .skew-title span:after,
        .skew-title span:before {
          width: 28px;
          height: 36px;
        }
        .skew-title span.flat {
          transform: skewY(0);
          box-shadow: 0 2px 4px rgba(0,0,0,0.4);
        }
        .skew-title span:hover {
          transform: skewY(0);
          box-shadow: 0 3px 6px rgba(0,0,0,0.5);
        }
      }
    `;
    document.head.appendChild(style);

    const createSkewedSpans = (element: HTMLElement) => {
      const text = element.innerText;
      const letters = text.split("");
      element.innerHTML = letters
        .map(
          (letter, i) =>
            `<span class="${i === letters.length - 1 ? "last" : ""}">${letter}</span>`
        )
        .join("");
    };

    const addHoverEffects = () => {
      const spans = document.querySelectorAll(".skew-title span");

      spans.forEach((span) => {
        span.addEventListener("mouseenter", () => {
          const $el = span as HTMLElement;
          const n = Array.from(spans).indexOf($el) + 1;

          $el.classList.add("flat");

          if (n % 2 === 0) {
            const prev = $el.previousElementSibling as HTMLElement;
            if (prev) prev.classList.add("flat");
          } else {
            if (!$el.classList.contains("last")) {
              const next = $el.nextElementSibling as HTMLElement;
              if (next) next.classList.add("flat");
            }
          }
        });

        span.addEventListener("mouseleave", () => {
          const $el = span as HTMLElement;
          const n = Array.from(spans).indexOf($el) + 1;

          $el.classList.remove("flat");

          if (n % 2 === 0) {
            const prev = $el.previousElementSibling as HTMLElement;
            if (prev) prev.classList.remove("flat");
          } else {
            if (!$el.classList.contains("last")) {
              const next = $el.nextElementSibling as HTMLElement;
              if (next) next.classList.remove("flat");
            }
          }
        });
      });
    };

    if (titleRef.current) {
      createSkewedSpans(titleRef.current);
      addHoverEffects();
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <h1 className="skew-title" ref={titleRef}>
      WORKS
    </h1>
  );
};

export default WorkTitle;
