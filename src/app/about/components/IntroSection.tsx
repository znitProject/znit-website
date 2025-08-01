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

    const PPC = 10; // Pixels per character
    const BUFFER = 40;

    document.documentElement.style.setProperty("--buffer", BUFFER.toString());
    document.documentElement.style.setProperty("--ppc", PPC.toString());
    document.documentElement.style.setProperty("--pad", "8");
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
          element.className.includes("text-blue-400")
        ) {
          // 색상이 적용된 span인 경우
          const text = element.textContent || "";
          const words = text.trim().split(/\s+/);

          words.forEach((word) => {
            if (word) {
              const coloredSpan = document.createElement("span");
              coloredSpan.textContent = word + " ";
              coloredSpan.className = "text-blue-400";
              coloredSpan.style.cssText = `
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
      <div className="flex items-start justify-center pt-10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1
            className="font-black text-white mb-6"
            style={{
              fontSize: "100px",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 900,
            }}
          >
            WE OWN IT!
          </h1>

          <div
            className="h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full mx-auto"
            style={{ width: "200px" }}
          />
        </div>
      </div>

      {/* 스크롤 애니메이션 섹션 */}
      <section className="reader relative" id="read">
        <div className="content">
          <div
            ref={toSplitRef}
            data-split
            aria-hidden="true"
            className="text-9xl md:text-10xl font-semibold text-white"
          >
            We take responsibility for everything <br />
            we do and think of every result we create as our{" "}
            <span className="text-blue-400">own</span>. 우리는, 우리가 하는 일에
            책임을 지고 우리가 만든 모든 결과를
            <span className="text-blue-400">내 것처럼</span> 생각합니다.
          </div>
        </div>
      </section>
    </div>
  );
}
