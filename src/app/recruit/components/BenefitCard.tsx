import { motion } from 'framer-motion';
import React from 'react';

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  backDescription?: string;
  backImage?: string;
}

// 공통 카드 컴포넌트
const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, backDescription, backImage }) => {
  return (
    <motion.div
      className="relative w-full h-[280px] lg:h-[320px] perspective-1000 mb-2"
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* 앞면 */}
      <motion.div
        className="absolute inset-0 bg-white rounded-3xl p-6 lg:p-8 text-center text-gray-800 backface-hidden min-h-[280px] lg:min-h-[320px] border border-gray-200 flex flex-col items-center justify-center"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {/* 배경 패턴 */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-5 pointer-events-none">
          <div className="w-full h-full border-2 border-gray-200 rounded-full"></div>
        </div>
        <div className="text-2xl lg:text-3xl mb-4 relative z-10">
          {icon}
        </div>
        <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 relative z-10 leading-tight">{title}</h3>
        <p className="text-base lg:text-lg opacity-90 relative z-10 leading-relaxed px-2 whitespace-pre-line">{description}</p>
      </motion.div>

      {/* 뒷면 */}
      <motion.div
        className="absolute inset-0 bg-white rounded-3xl p-6 lg:p-8 text-center text-white backface-hidden min-h-[280px] lg:min-h-[320px] border border-gray-200 overflow-hidden flex flex-col items-center justify-center"
        style={{
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)'
        }}
      >
        {/* 뒷면 배경 이미지 */}
        {backImage && (
          <div 
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `url(${backImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
        
        {/* 검은색 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* 뒷면 배경 패턴 */}
        <div className="absolute top-0 left-0 w-20 h-20 opacity-5 pointer-events-none">
          <div className="w-full h-full border-2 border-gray-200 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-5 pointer-events-none">
          <div className="w-full h-full border-2 border-gray-200 rounded-full"></div>
        </div>
        
        <div className="text-2xl lg:text-3xl mb-4 relative z-10 opacity-90">
          {icon}
        </div>
        <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 relative z-10 leading-tight text-white">{title}</h3>
        <p className="text-sm lg:text-base opacity-95 leading-relaxed px-4 relative z-10 text-white whitespace-pre-line">
          {backDescription ? backDescription : `${title}에 대한 상세한 정보를 확인하세요`}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BenefitCard; 