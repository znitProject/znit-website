import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

interface HamburgerButtonProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ toggleMenu, isMenuOpen }) => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [buttonColor, setButtonColor] = useState('#000');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateButtonColor = () => {
      // 현재 스크롤 위치에 따라 배경색 감지
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // 메인 페이지에서만 다크모드 감지
      const isMainPage = pathname === '/';
      const isDarkMode = mounted && theme === 'dark';
      
      // /slogan 페이지에서 스크롤 위치에 따라 색상 결정
      if (pathname === '/slogan') {
        if (scrollY < windowHeight) {
          // 첫 번째 섹션 (화이트 배경)
          setButtonColor('#000');
        } else {
          // 나머지 섹션 (블랙 배경)
          setButtonColor('#fff');
        }
      } else if (isMainPage) {
        // 메인 페이지는 다크모드에 따라 색상 결정
        setButtonColor(isDarkMode ? '#fff' : '#000');
      } else {
        // 다른 페이지는 기본 검정색
        setButtonColor('#000');
      }
    };

    // 초기 색상 설정
    updateButtonColor();

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', updateButtonColor);
    
    return () => {
      window.removeEventListener('scroll', updateButtonColor);
    };
  }, [pathname, mounted, theme]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .toggle {
        cursor: pointer;
        width: 48px; /* w-12 */
        height: 48px; /* h-12 */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .toggle span {
        display: block;
        background: ${buttonColor};
        width: 32px; /* Adjusted for better visual */
        height: 4px;
        border-radius: 3px;
        transition: 0.25s margin 0.25s, 0.25s transform, 0.3s background;
      }
      .toggle span:nth-child(1) {
        margin-bottom: 6px; /* Adjusted for better visual */
      }
      .toggle span:nth-child(3) {
        margin-top: 6px; /* Adjusted for better visual */
      }
      .toggle.active span {
        transition: 0.25s margin, 0.25s transform 0.25s;
      }
      .toggle.active span:nth-child(1) {
        margin-top: 0px;
        margin-bottom: -4px;
        transform: rotate(45deg);
      }
      .toggle.active span:nth-child(2) {
        transform: rotate(45deg);
      }
      .toggle.active span:nth-child(3) {
        margin-top: -4px;
        transform: rotate(135deg);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [buttonColor]);

  return (
    <div className={`toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerButton;
