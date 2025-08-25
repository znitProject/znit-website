"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import HamburgerButton from "./HamburgerButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "WORKS", path: "/work" },
    { name: "ABOUT", path: "/about" },
    { name: "CAREERS", path: "/career" },
    // { name: "CONTACT US", path: "/contact" },
  ];

  // 스크롤 위치 감지 (about 페이지에서만)
  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/about") {
        const scrollPosition = window.scrollY;
        // about 페이지에서 800px 이상 스크롤되면 색상 변경 (검정 배경 구간)
        setIsScrolled(scrollPosition > 800);
      } else {
        setIsScrolled(false);
      }
    };

    // 초기 상태 설정
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // 화면 다른 곳 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[500] mb-[10px] transition-all duration-300 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 relative">
          {/* 로고 - 왼쪽 */}
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={closeMenu}
          >
            <Image
              src="/logo/ZNLogo.png"
              alt="ZNIT Logo"
              width={80}
              height={40}
              className="h-6 w-auto"
            />
          </Link>

          {/* 햄버거 메뉴 버튼 - 오른쪽 */}
          {/* <div className="relative" ref={menuRef}>
            <HamburgerButton
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
              isScrolled={pathname === "/about" ? isScrolled : false}
            />

            <div
              className="absolute top-full right-0 mt-2 bg-transparent"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                pointerEvents: isMenuOpen ? "auto" : "none",
                transition: "opacity 0.2s ease-out",
              }}
            >
              <div className="flex flex-col items-end space-y-2">
                {menuItems.map((item, index) => (
                  <div
                    key={item.path}
                    className="overflow-visible"
                    style={{
                      maxHeight: isMenuOpen ? "300px" : "0",
                      opacity: isMenuOpen ? 1 : 0,
                      transform: isMenuOpen
                        ? "translateY(0)"
                        : "translateY(30px)",
                      transition: `all 0.2s ease-out ${isMenuOpen ? index * 0.05 : (4 - index) * 0.05}s`,
                    }}
                  >
                    <Link
                      href={item.path}
                      onClick={closeMenu}
                      className="bg-[#5051A2] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 block whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}
