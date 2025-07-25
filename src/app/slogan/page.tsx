'use client';

import WaveMaskText from './components/WaveMaskText';
import ValuesSection from './components/ValuesSection';
import RibbonAnimation from './components/RibbonAnimation';
import TextAnimation from './components/TextAnimation';

export default function SloganPage() {
  return (
    <div className="bg-gradient-to-b from-black via-blue-900 to-white min-h-screen">
      {/* 첫 번째 섹션 - 웨이브 마스크 (180vh) */}
      <div className="h-[180vh] relative">
        <WaveMaskText />
      </div>
      
      {/* 두 번째 섹션 - 핵심 가치 */}
      <ValuesSection />
      
      {/* 세 번째 섹션 - 리본 애니메이션 */}
      <div className="mt-[100px]">
        <RibbonAnimation />
      </div>
      
      {/* 네 번째 섹션 - ZNIT 브랜딩 */}
      <TextAnimation />
      

    </div>
  );
} 