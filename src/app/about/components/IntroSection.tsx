"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./IntroSection.css";

export default function IntroSection() {
  const toSplitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toSplitRef.current) return;

    const toSplit = toSplitRef.current;
    const content = toSplit.innerText;
    const contentLength = content.length;

    const PPC = 5; // Pixels per character (10에서 5로 줄임)
    const BUFFER = 20; // 40에서 20으로 줄임

    document.documentElement.style.setProperty("--buffer", BUFFER.toString());
    document.documentElement.style.setProperty("--ppc", PPC.toString());
    document.documentElement.style.setProperty("--pad", "4"); // 8에서 4로 줄임
    document.documentElement.style.setProperty(
      "--content-length",
      (contentLength + 2).toString()
    );

    // 원본 HTML을 보존하면서 단어 분리
    const originalHTML = toSplit.innerHTML;
    toSplit.innerHTML = "";

    // HTML을 파싱하여 단어별로 분리하되 색상 정보 보존
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = originalHTML;

    let cumulation = 10;
    let wordIndex = 0;

    // 텍스트 노드와 요소 노드를 순회하면서 처리
    function processNode(node: Node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // 텍스트 노드인 경우 단어별로 분리
        const text = node.textContent || "";
        const words = text.trim().split(/\s+/);

        words.forEach((word) => {
          if (word) {
            const textSpan = document.createElement("span");
            textSpan.textContent = word + " ";
            textSpan.style.cssText = `
              --index: ${wordIndex};
              --start: ${cumulation};
              --end: ${cumulation + word.length};
            `;
            textSpan.dataset.index = wordIndex.toString();
            textSpan.dataset.start = cumulation.toString();
            textSpan.dataset.end = (cumulation + word.length).toString();
            cumulation += word.length + 1;
            toSplit.appendChild(textSpan);
            wordIndex++;
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        if (element.tagName === "BR") {
          // 줄바꿈 처리
          const lineBreak = document.createElement("br");
          toSplit.appendChild(lineBreak);
        } else if (
          element.tagName === "SPAN" &&
          (element.className.includes("text-blue-400") ||
            element.className.includes("text-yellow-400") ||
            (element as HTMLElement).style.color === "#F6BF41")
        ) {
          // 색상이 적용된 span인 경우
          const text = element.textContent || "";
          const words = text.trim().split(/\s+/);
          const isYellow =
            element.className.includes("text-yellow-400") ||
            (element as HTMLElement).style.color === "#F6BF41";

          words.forEach((word) => {
            if (word) {
              const coloredSpan = document.createElement("span");
              coloredSpan.textContent = word + " ";
              if (isYellow) {
                coloredSpan.className = "text-yellow-400";
                coloredSpan.style.textShadow =
                  "0 0 20px rgba(251, 191, 36, 0.5)";
                coloredSpan.style.transition = "all 0.3s ease";
              } else {
                coloredSpan.className = "text-blue-400";
              }
              coloredSpan.style.cssText += `
                --index: ${wordIndex};
                --start: ${cumulation};
                --end: ${cumulation + word.length};
              `;
              coloredSpan.dataset.index = wordIndex.toString();
              coloredSpan.dataset.start = cumulation.toString();
              coloredSpan.dataset.end = (cumulation + word.length).toString();
              cumulation += word.length + 1;
              toSplit.appendChild(coloredSpan);
              wordIndex++;
            }
          });
        } else if (
          element.tagName === "SPAN" &&
          element.className.includes("smaller")
        ) {
          // .smaller 클래스를 가진 span은 애니메이션 제외하고 그대로 복사
          const smallerSpan = document.createElement("span");
          smallerSpan.className = "smaller";
          smallerSpan.style.cssText = (element as HTMLElement).style.cssText;
          smallerSpan.innerHTML = element.innerHTML;
          toSplit.appendChild(smallerSpan);
        } else {
          // 다른 요소인 경우 자식 노드들을 재귀적으로 처리
          Array.from(element.childNodes).forEach(processNode);
        }
      }
    }

    // 모든 노드를 처리
    Array.from(tempDiv.childNodes).forEach(processNode);

    // GSAP ScrollTrigger 추가
    if (!CSS.supports("animation-timeline: scroll()")) {
      gsap.registerPlugin(ScrollTrigger);
      console.info("GSAP ScrollTrigger: Registered");

      // Animate the words (div는 제외)
      for (const word of toSplit.querySelectorAll("span")) {
        const wordElement = word as HTMLElement;
        gsap.fromTo(
          wordElement,
          {
            "--active": 0,
          },
          {
            "--active": 1,
            ease: "steps(1)",
            scrollTrigger: {
              trigger: ".reader",
              start: `top top-=${parseInt(wordElement.dataset.start!) * PPC}px`,
              end: `top top-=${parseInt(wordElement.dataset.end!) * PPC}px`,
              scrub: true,
            },
          }
        );
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* 타이틀 섹션 */}
      <div
        className="flex items-start justify-center pt-10 pb-10 relative"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1
            className="font-black text-white mb-6"
            style={{
              fontSize: "clamp(40px, 10vw, 90px)",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 900,
            }}
          >
            WE OWN IT?
          </h1>
        </div>
      </div>

      {/* 스크롤 애니메이션 섹션 */}
      <section className="reader relative" id="read">
        <div className="content">
          <div
            ref={toSplitRef}
            data-split
            aria-hidden="true"
            style={{ lineHeight: 1.5 }}
          >
            We own our standards.
            <br />
            <span className="smaller">
              &ldquo;우리의 기준은 외부의 기대에만 머물지 않습니다. 우리는
              스스로
              <br />
              나아가야 할 방향을 정의하고, 그 기준을 주도적으로 세웁니다.&rdquo;
            </span>
            <br />
            We own our impact.
            <br />
            <span className="smaller">
              &ldquo;결과뿐 아니라 그로 인해 생기는 변화, 감정, 맥락까지
              <br />
              우리는 끝까지 돌보고, 깊이 있게 마주합니다.&rdquo;
            </span>
            <br />
            We own it , Because it reflects who we are.
            <br />
            <span className="smaller">
              &ldquo;우리가 만든 것은 단순한 결과물이 아닙니다.
              <br />
              우리가 어떻게 생각하고 움직이는지를 보여주는 증거입니다.&rdquo;
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
