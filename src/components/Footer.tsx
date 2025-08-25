"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setIsFooterVisible(rect.top < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 확인

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // 애니메이션 시작 전에 요소들을 숨기지 않고, transform만 사용
    (gsap.utils.toArray(".footer-link") as HTMLElement[]).forEach(
      (link, index) => {
        gsap.fromTo(
          link,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.05,
          }
        );
      }
    );

    (gsap.utils.toArray(".footer-icon") as HTMLElement[]).forEach(
      (icon, index) => {
        gsap.fromTo(
          icon,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.3 + index * 0.1,
          }
        );
      }
    );
  }, []);

  return (
    <div className="relative">
      {/* Back to Top Card - Footer와 같은 세로 길이로 오른쪽에 붙임 */}
      <div className="absolute top-0 right-0 z-10 h-full">
        <button
          onClick={scrollToTop}
          className="bg-white dark:bg-zinc-900 text-zinc-500 rounded-[20px] p-6 border border-zinc-700 shadow-xl backdrop-glass transition-all duration-300 hover:scale-105 hover:shadow-2xl group h-full flex flex-col justify-center"
          aria-label="맨 위로 이동"
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Arrow Icon */}
            <div className="w-12 h-12 rounded-full bg-zinc-700 dark:bg-zinc-600 flex items-center justify-center group-hover:bg-zinc-600 dark:group-hover:bg-zinc-500 transition-colors duration-300">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
            {/* Text */}
            <div className="text-sm font-medium text-center leading-tight">
              <span className="block">BACK TO</span>
              <span className="block">THE TOP</span>
            </div>
          </div>
        </button>
      </div>

      <footer
        ref={footerRef}
        className="bg-white dark:bg-zinc-900 text-zinc-500 rounded-[20px] mx-2 sm:mx-4 my-4 border border-zinc-700 shadow-xl backdrop-glass transition-colors duration-300"
        style={{ width: "calc(100% - 140px)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
            {/* 회사 정보 */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <div className="mb-3 sm:mb-4">
                <img 
                  src="/logo/ZNLogo.png" 
                  alt="ZNIT" 
                  className="h-8 sm:h-10"
                />
              </div>
              <p className="text-zinc-500 mb-4 max-w-md text-sm sm:text-base leading-relaxed tracking-tight">
                기술과 디자인으로 사람을 잇고,
                <br />
                세상에 편안함과 아름다움을 더합니다.
              </p>
              <div className="flex space-x-4">
                <a
                  href="mailto:contact@znit.com"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors footer-icon p-2"
                  aria-label="이메일"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </a>
                <a
                  href="tel:031-1234-5678"
                  className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors footer-icon p-2"
                  aria-label="전화번호"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 사업자 정보 */}
            <div className="col-span-2 flex flex-col justify-end -mt-4">
              <div className="text-zinc-600 dark:text-zinc-400 text-sm space-y-2 text-right">
                <p>ZNIT | 대표자: 정지호 | 사업자등록번호: 176-81-00290</p>
                <p>경기 김포시 고촌읍 장차로5번길 20 2층 | 031-996-4823</p>
                <div className="flex justify-end space-x-4 mt-4">
                  <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                    이용약관
                  </a>
                  <span>|</span>
                  <Link
                    href="/credits"
                    className="hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Credits
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 구분선 */}
          <div className="border-t border-zinc-700 mt-6 sm:mt-8 pt-6 sm:pt-8">
            <div className="flex justify-end">
              <p className="text-zinc-500 text-xs sm:text-sm tracking-tight">
                © {currentYear} ZNIT. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
