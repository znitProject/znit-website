'use client';

import { motion } from 'framer-motion';
import WaveMaskText from './components/WaveMaskText';
import ValuesSection from './components/ValuesSection';

export default function SloganPage() {
  return (
    <div className="bg-black">
      {/* 첫 번째 섹션 - 웨이브 마스크 (180vh) */}
      <div className="h-[180vh] relative">
        <WaveMaskText />
      </div>
      
      {/* 두 번째 섹션 - 핵심 가치 */}
      <ValuesSection />
    </div>
  );
} 