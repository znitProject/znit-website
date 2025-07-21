'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'PROJECTS', path: '/work' },
    { name: 'ABOUT', path: '/slogan' },
    { name: 'STORY', path: '/recruit' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-transparent z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 - 왼쪽 */}
          <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="text-2xl font-bold text-gray-900">ZNIT</div>
          </Link>

          {/* 햄버거 메뉴 버튼 - 오른쪽 */}
          <button
            onClick={toggleMenu}
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 노란색 메뉴 오버레이 */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-transparent z-40">
          <div className="flex justify-end h-full">
            <div className="flex flex-col justify-center items-end pr-8 space-y-4">
              {menuItems.map((item, index) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMenu}
                  className={`bg-yellow-400 text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 ${
                    pathname === item.path ? 'ring-4 ring-blue-300' : ''
                  }`}
                  style={{
                    transform: `translateX(${isMenuOpen ? '0' : '100px'})`,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 