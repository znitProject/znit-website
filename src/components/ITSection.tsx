"use client";

import { useEffect, useRef, useState } from "react";
import "./ITSection.css";

export default function ITSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 한 번만 실행되도록 observer 해제
          observer.disconnect();
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

    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="it-section"
      ref={sectionRef}
      className={`w-full h-[120vh] relative overflow-hidden bg-white ${isVisible ? "animate-hexagons" : ""}`}
    >
      {/* Main Title - 중앙 정렬 */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 text-gray-900 text-center"
          style={{ fontFamily: "Red Hat Display, sans-serif" }}
        >
          Develop with ZNIT
        </h1>
      </div>

      {/* Hexagon Grid Container */}
      <div className="it-hex-container">
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
        </ol>
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
        </ol>
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
        </ol>
      </div>

      {/* Right Column - Descriptions with Precise Hexagon Alignment */}
      {/* Description 1 - 첫 번째 육각형과 정확히 수평 정렬 */}
      <div
        className={`absolute left-3/5 transform -translate-x-1/2 top-[28%] z-10 max-w-none ml-15 ${isVisible ? "description-first" : ""}`}
      >
        <p className="text-gray-700 leading-relaxed">
          "웹, 앱, 플랫폼, IoT까지 기획부터
          <br />
          디자인, 개발, 배포까지 한 흐름으로 완성합니다."
        </p>
      </div>

      {/* Description 2 - 두 번째 육각형과 정확히 수평 정렬 */}
      <div
        className={`absolute left-3/5 transform -translate-x-1/2 top-[50%] -translate-y-1/2 z-10 max-w-none ml-15 ${isVisible ? "description-second" : ""}`}
      >
        <p className="text-gray-700 leading-relaxed">
          "분야별 비즈니스와 사용자 특성을 깊이 이해하고
          <br />
          그에 최적화된 IT 서비스를 구현합니다."
        </p>
      </div>

      {/* Description 3 - 세 번째 육각형과 정확히 수평 정렬 */}
      <div
        className={`absolute left-3/5 transform -translate-x-1/2 top-[72%] z-10 max-w-none ml-15 ${isVisible ? "description-third" : ""}`}
      >
        <p className="text-gray-700 leading-relaxed">
          "변화하는 시장과 기술에 유연하게 적응하는 구조로
          <br />
          서비스의 지속적 성장과 확장을 지원합니다."
        </p>
      </div>
    </div>
  );
}
