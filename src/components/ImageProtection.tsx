import { useEffect } from 'react';

interface ImageProtectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ImageProtection({ children, className = '', style = {} }: ImageProtectionProps) {
  // 이미지 보호 기능
  useEffect(() => {
    const preventImageProtection = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const preventKeyboardShortcuts = (e: KeyboardEvent) => {
      // Ctrl+S, Ctrl+Shift+S 방지 (이미지 저장 방지)
      if (
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.shiftKey && e.key === 'S')
        // 개발 시 필요할 수 있는 단축키들 (주석처리)
        // || e.key === 'F12' ||
        // || (e.ctrlKey && e.key === 'u') ||
        // || (e.ctrlKey && e.shiftKey && e.key === 'I')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 우클릭 방지
    document.addEventListener('contextmenu', preventImageProtection);
    
    // 드래그 방지
    document.addEventListener('dragstart', preventImageProtection);
    document.addEventListener('selectstart', preventImageProtection);
    
    // 키보드 단축키 방지
    document.addEventListener('keydown', preventKeyboardShortcuts);

    return () => {
      document.removeEventListener('contextmenu', preventImageProtection);
      document.removeEventListener('dragstart', preventImageProtection);
      document.removeEventListener('selectstart', preventImageProtection);
      document.removeEventListener('keydown', preventKeyboardShortcuts);
    };
  }, []);

  return (
    <div 
      className={`image-protection ${className}`}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        ...style
      }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
      
      {/* 이미지 보호 스타일 */}
      <style jsx>{`
        .image-protection {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-user-drag: none;
          -khtml-user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
} 