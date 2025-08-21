import "./ITSection.css";

export default function ITSection() {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-white">
      {/* Main Title */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 text-gray-900"
          style={{ fontFamily: "Red Hat Display, sans-serif" }}
        >
          Develop with ZNIT
        </h1>
      </div>

      {/* Hexagon Grid Container */}
      <div className="it-hex-container">
        <ol className="even">
          <li className="it-hex">
            <span className="hex-text">통합 개발 서비스</span>
          </li>
        </ol>
        <ol className="odd">
          <li className="it-hex">
            <span className="hex-text">분야별 맞춤 아키텍처</span>
          </li>
        </ol>
        <ol className="even">
          <li className="it-hex">
            <span className="hex-text">미래 대응 설계</span>
          </li>
        </ol>
      </div>

      {/* Right Column - Descriptions with Adjusted Positions */}
      {/* Description 1 - 첫 번째 헥사곤과 수평 정렬 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/4 z-10 max-w-4xl ml-32">
        <p className="text-gray-700 leading-relaxed text-xl">
          웹, 앱, 플랫폼, IoT까지 기획부터 디자인, 개발, 배포까지 한 흐름으로
          완성합니다.
        </p>
      </div>

      {/* Description 2 - 두 번째 헥사곤과 수평 정렬 (그대로) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 max-w-4xl ml-32">
        <p className="text-gray-700 leading-relaxed text-xl">
          분야별 비즈니스와 사용자 특성을 깊이 이해하고 그에 최적화된 IT
          서비스를 구현합니다.
        </p>
      </div>

      {/* Description 3 - 세 번째 헥사곤과 수평 정렬 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1/4 z-10 max-w-4xl ml-32">
        <p className="text-gray-700 leading-relaxed text-xl">
          변화하는 시장과 기술에 유연하게 적응하는 구조로 서비스의 지속적 성장과
          확장을 지원합니다.
        </p>
      </div>
    </div>
  );
}
