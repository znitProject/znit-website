import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";
import Image from "next/image";

/**
 * 다크 모드 토글 버튼으로 사용될 카드 컴포넌트입니다.
 * 타이포그래피 스타일을 적용하여 시각적 강조를 줍니다.
 */
interface DarkModeCardProps {
  style?: React.CSSProperties;
}

const DarkModeCard: React.FC<DarkModeCardProps> = ({ style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 기본값을 라이트모드로 설정
    if (!localStorage.getItem("theme")) {
      setTheme("light");
    }
  }, [setTheme]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      backgroundColor: theme === "dark" ? "#f0f0f0" : "#1a1a1a",
      color: theme === "dark" ? "#333333" : "#cccccc",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      backgroundColor: theme === "dark" ? "white" : "black",
      color: theme === "dark" ? "black" : "white",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  const handleClick = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <div
      ref={cardRef}
      className="w-full h-full flex items-center justify-center cursor-pointer border rounded-[20px]"
      style={{
        backgroundColor: theme === "dark" ? "white" : "black",
        color: theme === "dark" ? "black" : "white",
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Image
        src={theme === "dark" ? "/lightmodeIcon.png" : "/darkmodeIcon.png"}
        alt={theme === "dark" ? "Light Mode" : "Dark Mode"}
        width={70}
        height={70}
      />
      <div className="flex flex-col items-center ml-4">
        <span
          className="text-xl font-bold tracking-widest"
          style={{ fontFamily: "Istok Web" }}
        >
          {theme === "dark" ? "LIGHT" : "DARK"}
        </span>
        <span
          className="text-xl font-bold tracking-widest"
          style={{ fontFamily: "Istok Web" }}
        >
          MODE
        </span>
      </div>
    </div>
  );
};

export default DarkModeCard;
