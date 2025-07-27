"use client";

import { useEffect, useState } from "react";

const TextAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const texts = ["ZNIT", "ZNSPACE", "ZNATURE", "ZNWAVE", "ZNUS", "ZNLINK"];

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);

    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="relative">
        <div className="flex flex-col sm:flex-row items-center text-xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 space-y-2 sm:space-y-0">
          <span className="mr-0 sm:mr-4">WE ARE</span>

          <div className="relative w-32 sm:w-40 lg:w-48 h-8 sm:h-10 lg:h-12 overflow-hidden">
            <div
              className="transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateY(-${currentIndex * (windowWidth < 640 ? 32 : windowWidth < 1024 ? 40 : 48)}px)`,
              }}
            >
              {texts.map((text, index) => (
                <div
                  key={index}
                  className="h-8 sm:h-10 lg:h-12 flex items-center text-[#5051A2] font-bold text-sm sm:text-base lg:text-lg"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

          <span className="ml-0 sm:ml-1">!</span>
        </div>

        {/* 괄호 애니메이션 */}
        <div className="absolute -left-4 sm:-left-6 lg:-left-8 top-0 text-2xl sm:text-4xl lg:text-5xl text-blue-400 animate-pulse">
          [
        </div>
        <div className="absolute -right-4 sm:-right-6 lg:-right-8 top-0 text-2xl sm:text-4xl lg:text-5xl text-blue-400 animate-pulse">
          ]
        </div>
      </div>
    </div>
  );
};

export default TextAnimation;
