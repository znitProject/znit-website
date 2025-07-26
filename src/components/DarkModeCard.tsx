import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

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
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      backgroundColor: "#1a1a1a", // 더 어두운 검정
      color: "#cccccc", // 약간 어두운 흰색
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      backgroundColor: "black", // 원래 검정
      color: "white", // 원래 흰색
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
      className="h-24 flex flex-col items-center justify-center cursor-pointer border rounded-[20px]"
      style={{ backgroundColor: "black", color: "white", ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <span
        className="text-xl font-bold tracking-widest"
        style={{ fontFamily: "Istok Web" }}
      >
        DARK
      </span>
      <span
        className="text-xl font-bold tracking-widest"
        style={{ fontFamily: "Istok Web" }}
      >
        MODE
      </span>
    </div>
  );
};

export default DarkModeCard;
