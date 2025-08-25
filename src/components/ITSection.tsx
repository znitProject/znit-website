"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "next-themes";
import "./ITSection.css";

// CSS 변수 타입 정의
interface CSSPropertiesWithVars extends React.CSSProperties {
  "--conn-len"?: string;
}

export default function ITSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 다크모드 여부에 따른 배경색과 텍스트 색상 결정
  const backgroundColor =
    mounted && theme === "dark" ? "bg-[#1F1F1F]" : "bg-white";
  const textColor =
    mounted && theme === "dark" ? "text-white" : "text-gray-700";
  const descriptionTextColor =
    mounted && theme === "dark" ? "#e5e7eb" : "#e5e7eb"; // 연한 회색으로 설정

  useEffect(() => {
    if (!mounted) return;

    gsap.registerPlugin(ScrollTrigger);

    // Title animation - DesignSection과 동일
    if (titleRef.current) {
      const titleText = titleRef.current.textContent || "";
      titleRef.current.innerHTML = titleText
        .split("")
        .map((char, i) =>
          char === " "
            ? " "
            : `<span class="inline-block char-${i}">${char}</span>`
        )
        .join("");

      gsap.fromTo(
        titleRef.current.querySelectorAll("span"),
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformOrigin: "50% 50% -50px",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 헥사곤 애니메이션을 위한 Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.3, // 30% 보일 때 애니메이션 시작
        rootMargin: "0px 0px -100px 0px", // 아래쪽에서 100px 전에 시작
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      // GSAP 애니메이션 정리
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mounted]);

  return (
    <div
      id="it-section"
      ref={sectionRef}
      className={`w-full h-[120vh] relative overflow-hidden ${backgroundColor} transition-colors duration-300 ${isVisible ? "animate-hexagons" : ""}`}
    >
      {/* Main Title - DesignSection과 동일한 스타일 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-6 md:top-8 z-20">
        <h1
          ref={titleRef}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 text-center ${textColor}`}
          style={{ fontFamily: "Red Hat Display, sans-serif" }}
        >
          Develop with ZNIT
        </h1>
      </div>

      {/* Hexagon Grid Container */}
      <div className="it-hex-container">
        {/* 1 */}
        <ol className={`even ${isVisible ? "first" : ""}`}>
          <li className="it-hex hex-1">
            <div className="stars"></div>
            <div className="stars2"></div>
            <img
              src="/itsection/it4.jpg"
              alt="통합 개발 서비스"
              className="hex-hover-image"
            />
            <span className="hex-text">통합 개발 서비스</span>
          </li>
          {/* 헥사곤과 설명을 잇는 선 */}
          <span
            className="hex-connector"
            style={{ "--conn-len": "12vw" } as CSSPropertiesWithVars}
            aria-hidden="true"
          />
        </ol>

        {/* 2 */}
        <ol className={`odd ${isVisible ? "second" : ""}`}>
          <li className="it-hex hex-2">
            <div className="stars"></div>
            <div className="stars2"></div>
            <img
              src="/itsection/it2.jpg"
              alt="분야별 맞춤 아키텍처"
              className="hex-hover-image"
            />
            <span className="hex-text">분야별 맞춤 아키텍처</span>
          </li>
          <span
            className="hex-connector"
            style={{ "--conn-len": "10vw" } as CSSPropertiesWithVars}
            aria-hidden="true"
          />
        </ol>

        {/* 3 */}
        <ol className={`even ${isVisible ? "third" : ""}`}>
          <li className="it-hex hex-3">
            <div className="stars"></div>
            <div className="stars2"></div>
            <img
              src="/itsection/it6.jpg"
              alt="미래 대응 설계"
              className="hex-hover-image"
            />
            <span className="hex-text">미래 대응 설계</span>
          </li>
          <span
            className="hex-connector"
            style={{ "--conn-len": "12vw" } as CSSPropertiesWithVars}
            aria-hidden="true"
          />
        </ol>
      </div>

      {/* Right Column - Descriptions with Precise Hexagon Alignment */}
      {/* Description 1 - 첫 번째 육각형과 정확히 수평 정렬 */}
      <div
        className={`absolute left-[830px] top-[230px] z-10 max-w-none ${isVisible ? "description-first" : ""}`}
      >
        <p
          className="text-gray-700 leading-relaxed relative"
          style={{ color: descriptionTextColor }}
        >
          <img
            src={
              mounted && theme === "dark"
                ? "/itsection/icons8-quotation-mark-100_white-left.png"
                : "/itsection/icons8-quote-left-100-fill.png"
            }
            alt="따옴표"
            className="quote-mark quote-open"
          />
          웹, 앱, 플랫폼, IoT까지 기획부터 디자인, 개발, 배포까지 <br />한
          흐름으로 완성합니다
          <img
            src={
              mounted && theme === "dark"
                ? "/itsection/icons8-get-quote-100_white-right.png"
                : "/itsection/icons8-quote-right-100-fill.png"
            }
            alt="따옴표"
            className="quote-mark quote-close"
          />
        </p>
      </div>

      {/* Description 2 - 두 번째 육각형과 정확히 수평 정렬 */}
      <div
        className={`absolute left-[930px] top-[460px] z-10 max-w-none ${isVisible ? "description-second" : ""}`}
      >
        <p
          className="text-gray-700 leading-relaxed relative"
          style={{ color: descriptionTextColor }}
        >
          <img
            src={
              mounted && theme === "dark"
                ? "/itsection/icons8-quotation-mark-100_white-left.png"
                : "/itsection/icons8-quote-left-100-fill.png"
            }
            alt="따옴표"
            className="quote-mark quote-open"
          />
          분야별 비즈니스와 사용자 특성을 깊이 이해하고 <br />
          그에 최적화된 IT 서비스를 구현합니다
          <img
            src={
              mounted && theme === "dark"
                ? "/itsection/icons8-get-quote-100_white-right.png"
                : "/itsection/icons8-quote-right-100-fill.png"
            }
            alt="따옴표"
            className="quote-mark quote-close"
          />
        </p>
      </div>

      {/* Description 3 - 세 번째 육각형과 정확히 수평 정렬 */}
      <div
        className={`absolute left-[830px] top-[680px] z-10 max-w-none ${isVisible ? "description-third" : ""}`}
      >
        <p
          className="text-gray-700 leading-relaxed relative"
          style={{ color: descriptionTextColor }}
        >
          <img
            src={
              mounted && theme === "dark"
                ? "/itsection/icons8-quotation-mark-100_white-left.png"
                : "/itsection/icons8-quote-left-100-fill.png"
            }
            alt="따옴표"
            className="quote-mark quote-open"
          />
          변화하는 시장과 기술에 유연하게 적응하는 구조로 <br />
          서비스의 지속적 성장과 확장을 지원합니다
          <img
            src={
              mounted && theme === "dark"
                ? "/itsection/icons8-get-quote-100_white-right.png"
                : "/itsection/icons8-quote-right-100-fill.png"
            }
            alt="따옴표"
            className="quote-mark quote-close"
          />
        </p>
      </div>
    </div>
  );
}
