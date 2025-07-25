import { useState, useEffect } from 'react';

interface HamburgerButtonProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ toggleMenu, isMenuOpen }) => {
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
        background: #000;
        width: 32px; /* Adjusted for better visual */
        height: 4px;
        border-radius: 3px;
        transition: 0.25s margin 0.25s, 0.25s transform;
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
  }, []);

  return (
    <div className={`toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default HamburgerButton;
