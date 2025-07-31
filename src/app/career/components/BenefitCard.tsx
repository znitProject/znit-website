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
        style={{ 
          backfaceVisibility: 'hidden',
          background: `
            linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%),
            radial-gradient(circle at 30% 30%, rgba(67, 118, 171, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(246, 191, 65, 0.05) 0%, transparent 50%)
          `,
          border: '1px solid rgba(67, 118, 171, 0.1)'
        }}
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
          transform: 'rotateY(180deg)',
          background: `
            linear-gradient(135deg, rgba(0, 34, 78, 0.9) 0%, rgba(2, 5, 10, 0.9) 100%),
            radial-gradient(circle at 30% 30%, rgba(67, 118, 171, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(246, 191, 65, 0.2) 0%, transparent 50%)
          `,
          border: '1px solid rgba(67, 118, 171, 0.2)'
        }}
      >
        {/* 뒷면 배경 이미지 */}
        {backImage && (
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `url(${backImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
        
        {/* 검은색 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        {/* 뒷면 배경 패턴 */}
        <div className="absolute top-0 left-0 w-20 h-20 opacity-10 pointer-events-none">
          <div className="w-full h-full border-2 border-white rounded-full"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10 pointer-events-none">
          <div className="w-full h-full border-2 border-white rounded-full"></div>
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