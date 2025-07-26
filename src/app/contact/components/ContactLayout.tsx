import React, { ReactNode, MutableRefObject } from "react";
import { motion } from "framer-motion";
import AnimatedContactText from "./AnimatedContactText";
import Image from "next/image";

interface ContactLayoutProps {
  children: ReactNode;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  flowerImages: string[];
  flowerRefs: MutableRefObject<(HTMLImageElement | null)[]>;
}

export default function ContactLayout({
  children,
  currentStep,
  nextStep,
  previousStep,
  flowerImages,
  flowerRefs,
}: ContactLayoutProps) {
  const flowerPositions = [
    // 모바일: 작은 크기, 데스크톱: 큰 크기
    {
      mobile: { top: "-60%", left: "-20%", width: 80, height: 80 },
      tablet: { top: "-70%", left: "-25%", width: 120, height: 120 },
      desktop: { top: "-80%", left: "-30%", width: 180, height: 180 },
    },
    {
      mobile: { top: "-50%", right: "2%", width: 70, height: 70 },
      tablet: { top: "-55%", right: "2%", width: 100, height: 100 },
      desktop: { top: "-60%", right: "2%", width: 150, height: 150 },
    },
    {
      mobile: { top: "-60%", right: "15%", width: 80, height: 80 },
      tablet: { top: "-70%", right: "18%", width: 120, height: 120 },
      desktop: { top: "-80%", right: "20%", width: 160, height: 160 },
    },
    {
      mobile: { top: "-60%", right: "25%", width: 200, height: 150 },
      tablet: { top: "-70%", right: "30%", width: 300, height: 225 },
      desktop: { top: "-80%", right: "35%", width: 400, height: 300 },
    },
  ];

  return (
    <div className="flex flex-col xl:flex-row min-h-screen bg-gray-50">
      {/* 왼쪽 섹션 - 모바일/태블릿에서는 상단, 데스크톱에서는 왼쪽 */}
      <div className="w-full xl:w-1/2 bg-white px-4 sm:px-6 md:px-8 xl:pl-[150px] xl:pr-4 pt-[120px] sm:pt-[100px] md:pt-[80px] xl:pt-8 pb-2 xl:pb-4 flex flex-col justify-center items-center overflow-hidden">
        <div className="flex flex-col xl:flex-row items-center mb-2 sm:mb-4 md:mb-6 xl:mb-16 xl:ml-16 w-full max-w-md xl:max-w-none">
          <div className="relative mb-4 sm:mb-5 md:mb-6 xl:mb-0">
            <div style={{ zIndex: 10, position: "relative" }}>
              <AnimatedContactText />
            </div>
            {/* 데스크톱용 꽃 이미지 */}
            {flowerImages.map((src, index) => (
              <Image
                key={`desktop-${src}`}
                ref={(el) => {
                  if (flowerRefs.current) {
                    flowerRefs.current[index] = el;
                  }
                }}
                src={src}
                alt={`Flower ${index + 1}`}
                width={flowerPositions[index].desktop.width}
                height={flowerPositions[index].desktop.height}
                className="absolute hidden xl:block"
                style={{
                  top: flowerPositions[index].desktop.top,
                  left: flowerPositions[index].desktop.left,
                  right: flowerPositions[index].desktop.right,
                  opacity: 0,
                  transform: "scale(0.5)",
                  transformOrigin: "center center",
                  zIndex: 0,
                }}
              />
            ))}
            {/* 태블릿용 꽃 이미지 */}
            {flowerImages.map((src, index) => (
              <Image
                key={`tablet-${src}`}
                ref={(el) => {
                  if (flowerRefs.current) {
                    flowerRefs.current[index + 4] = el;
                  }
                }}
                src={src}
                alt={`Flower ${index + 1}`}
                width={flowerPositions[index].tablet.width}
                height={flowerPositions[index].tablet.height}
                className="absolute hidden sm:block xl:hidden"
                style={{
                  top: flowerPositions[index].tablet.top,
                  left: flowerPositions[index].tablet.left,
                  right: flowerPositions[index].tablet.right,
                  opacity: 0,
                  transform: "scale(0.5)",
                  transformOrigin: "center center",
                  zIndex: 0,
                }}
              />
            ))}
            {/* 모바일용 꽃 이미지 */}
            {flowerImages.map((src, index) => (
              <Image
                key={`mobile-${src}`}
                ref={(el) => {
                  if (flowerRefs.current) {
                    flowerRefs.current[index + 8] = el;
                  }
                }}
                src={src}
                alt={`Flower ${index + 1}`}
                width={flowerPositions[index].mobile.width}
                height={flowerPositions[index].mobile.height}
                className="absolute sm:hidden"
                style={{
                  top: flowerPositions[index].mobile.top,
                  left: flowerPositions[index].mobile.left,
                  right: flowerPositions[index].mobile.right,
                  opacity: 0,
                  transform: "scale(0.5)",
                  transformOrigin: "center center",
                  zIndex: 0,
                }}
              />
            ))}
          </div>

          {/* 스텝 인디케이터 */}
          <div className="flex xl:flex-col items-center xl:ml-8 space-x-2 sm:space-x-3 md:space-x-4 xl:space-x-0 xl:space-y-4">
            {[1, 2, 3, 4].map((step, index) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-16 xl:h-16 rounded-full flex items-center justify-center font-bold text-sm sm:text-base md:text-lg xl:text-xl border ${
                    step <= currentStep
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-900 border-gray-900"
                  }`}
                >
                  {step}
                </div>
                {index < 3 && (
                  <div className="h-px w-6 sm:w-8 md:w-10 xl:w-px xl:h-24 bg-gray-900"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽 섹션 - 폼 내용 */}
      <div className="flex-1 bg-white px-4 sm:px-6 md:px-8 xl:pl-4 xl:pr-16 pt-2 sm:pt-4 md:pt-6 xl:pt-4 pb-6 xl:pb-8 flex flex-col justify-center relative overflow-hidden">
        <div className="max-w-xl mx-auto xl:ml-8 w-full">
          <div className="flex-1">{children}</div>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex justify-center xl:justify-end xl:absolute xl:bottom-8 xl:right-16 mt-4 sm:mt-6 md:mt-8 xl:mt-0 space-x-3 sm:space-x-4">
          {currentStep > 1 && (
            <motion.button
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 xl:w-12 xl:h-12 border-2 border-gray-900 rounded-full bg-white text-gray-900 flex items-center justify-center transition-all duration-200 hover:bg-gray-900 hover:text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
              onClick={previousStep}
              disabled={currentStep === 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 xl:w-6 xl:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
          )}
          {currentStep < 3 && (
            <motion.button
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 xl:w-12 xl:h-12 border-2 border-gray-900 rounded-full bg-white text-gray-900 flex items-center justify-center transition-all duration-200 hover:bg-gray-900 hover:text-white"
              onClick={nextStep}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 xl:w-6 xl:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          )}
          {currentStep === 3 && (
            <motion.button
              className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 xl:px-6 xl:py-3 border-2 border-gray-900 rounded-full bg-white text-gray-900 font-medium transition-all duration-200 hover:bg-gray-900 hover:text-white text-sm sm:text-base md:text-base xl:text-base"
              onClick={nextStep}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              제출하기
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
