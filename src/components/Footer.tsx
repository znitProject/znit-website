"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    // gsap utils.toArray 반환값을 HTMLElement[]로 명시적으로 캐스팅 (linter 에러 방지)
    (gsap.utils.toArray(".footer-link") as HTMLElement[]).forEach((link) => {
      gsap.fromTo(
        link,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: link, start: "top 90%" },
        }
      );
    });

    (gsap.utils.toArray(".footer-icon") as HTMLElement[]).forEach((icon) => {
      gsap.fromTo(
        icon,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: icon, start: "top 90%" },
        }
      );
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-zinc-900 text-zinc-300 rounded-[20px] mx-2 sm:mx-4 my-4 border border-zinc-700 shadow-xl backdrop-glass bg-opacity-20 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* 회사 정보 */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 tracking-tight">
              ZNIT
            </div>
            <p className="text-zinc-400 mb-4 max-w-md text-sm sm:text-base leading-relaxed tracking-tight">
              혁신적인 솔루션으로 미래를 만들어갑니다. 우리는 우리가 하는 모든
              일에 책임을 지고, 최고의 결과물을 만들어내는 것을 약속합니다.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@znit.com"
                className="text-zinc-400 hover:text-white transition-colors footer-icon p-2"
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
                className="text-zinc-400 hover:text-white transition-colors footer-icon p-2"
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

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 tracking-tight text-zinc-200">
              빠른 링크
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/"
                  className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded px-1 py-0.5 transition-all duration-200 footer-link text-sm sm:text-base block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded px-1 py-0.5 transition-all duration-200 footer-link text-sm sm:text-base block"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/recruit"
                  className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded px-1 py-0.5 transition-all duration-200 footer-link text-sm sm:text-base block"
                >
                  Recruit
                </Link>
              </li>
              <li>
                <Link
                  href="/slogan"
                  className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded px-1 py-0.5 transition-all duration-200 footer-link text-sm sm:text-base block"
                >
                  We Own It
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 tracking-tight text-zinc-200">
              연락처
            </h3>
            <ul className="space-y-1 text-zinc-400">
              <li>
                <a
                  href="mailto:contact@znit.com"
                  className="hover:text-white hover:bg-zinc-800 rounded px-1 py-0.5 transition-all duration-200 footer-link text-sm sm:text-base block"
                >
                  contact@znit.com
                </a>
              </li>
              <li>
                <a
                  href="tel:02-1234-5678"
                  className="hover:text-white hover:bg-zinc-800 rounded px-1 py-0.5 transition-all duration-200 footer-link text-sm sm:text-base block"
                >
                  031-1234-5678
                </a>
              </li>
              <li className="text-sm sm:text-base py-0.5 text-zinc-400">
                경기 김포시 고촌읍
                <br />
                장차로5번길 20
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-zinc-700 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-zinc-400 text-xs sm:text-sm text-center sm:text-left tracking-tight">
              © {currentYear} ZNIT. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
              <Link
                href="/privacy"
                className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded px-2 py-1 text-xs sm:text-sm transition-all duration-200 footer-link text-center"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className="text-zinc-500 hover:text-white hover:bg-zinc-800 rounded px-2 py-1 text-xs sm:text-sm transition-all duration-200 footer-link text-center"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
