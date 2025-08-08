// ShootingStars.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const shootingTime = 3000;

const tail = keyframes`
  0% { width: 0; }
  30% { width: 100px; }
  100% { width: 0; }
`;

const shining = keyframes`
  0% { width: 0; }
  50% { width: 30px; }
  100% { width: 0; }
`;

const shooting = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(300px); }
`;

const Night = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotateZ(45deg);
`;

const ShootingStar = styled.div<{
  top: string;
  left: string;
  delay: number;
}>`
  position: absolute;
  height: 2px;
  background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  animation:
    ${tail} ${shootingTime}ms ease-in-out infinite,
    ${shooting} ${shootingTime}ms ease-in-out infinite;
  animation-delay: ${(props) => props.delay}ms;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    height: 2px;
    width: 30px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    border-radius: 100%;
    animation: ${shining} ${shootingTime}ms ease-in-out infinite;
    animation-delay: ${(props) => props.delay}ms;
  }

  &::before {
    transform: translateX(50%) rotateZ(45deg);
  }

  &::after {
    transform: translateX(50%) rotateZ(-45deg);
  }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; // 뒤에 위치하도록 z-index 추가
`;

const generateStars = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const delay = Math.floor(Math.random() * 9999);
    const top = `${50 - Math.floor(Math.random() * 400 - 200)}px`;
    const left = `${50 - Math.floor(Math.random() * 300)}px`;

    return <ShootingStar key={i} delay={delay} top={top} left={left} />;
  });
};

const ShootingStars: React.FC = () => {
  return (
    <Container>
      <Night>{generateStars(20)}</Night>
    </Container>
  );
};

export default ShootingStars;