'use client';

import { motion } from 'framer-motion';

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const benefits: Benefit[] = [
  { 
    id: 1, 
    title: "유연근무제", 
    description: "자유로운 출퇴근 시간", 
    icon: "⏰",
    color: "from-blue-500 to-blue-600"
  },
  { 
    id: 2, 
    title: "원격근무", 
    description: "재택 및 원격 근무 지원", 
    icon: "🏠",
    color: "from-purple-500 to-purple-600"
  },
  { 
    id: 3, 
    title: "교육지원", 
    description: "개발자 컨퍼런스 참가 지원", 
    icon: "📚",
    color: "from-green-500 to-green-600"
  },
  { 
    id: 4, 
    title: "건강검진", 
    description: "연 1회 종합 건강검진", 
    icon: "💪",
    color: "from-orange-500 to-orange-600"
  },
  { 
    id: 5, 
    title: "식대지원", 
    description: "점심식대 및 저녁식대 지원", 
    icon: "🍽️",
    color: "from-red-500 to-red-600"
  },
  { 
    id: 6, 
    title: "경조사지원", 
    description: "결혼, 출산 등 경조사 지원", 
    icon: "🎁",
    color: "from-pink-500 to-pink-600"
  },
  { 
    id: 7, 
    title: "휴가제도", 
    description: "연차 및 반차 자유 사용", 
    icon: "🏖️",
    color: "from-indigo-500 to-indigo-600"
  },
  { 
    id: 8, 
    title: "성장지원", 
    description: "개인 성장을 위한 다양한 지원", 
    icon: "🚀",
    color: "from-teal-500 to-teal-600"
  }
];

export default function Benefits() {

  return (
    <div className="py-20">
      <motion.div 
        className="text-center mb-16"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          우리가 제공하는 혜택
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          함께 성장하는 즐거운 환경을 만들어갑니다
        </p>
      </motion.div>

      {/* 2줄 무한 슬라이드 컨테이너 */}
      <div className="space-y-8">
        {/* 첫 번째 줄 - 왼쪽으로 이동 */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-6 lg:gap-8"
            animate={{ x: [0, -100] }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {/* 첫 번째 세트 */}
            {benefits.map((benefit, index) => (
              <motion.div
                key={`first-row-${benefit.id}`}
                className="flex-shrink-0 w-80 lg:w-96"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${benefit.color} rounded-3xl p-6 lg:p-8 text-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[280px] lg:min-h-[320px] relative overflow-hidden`}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px -12px rgba(0, 0, 0, 0.3)",
                      "0 20px 40px -12px rgba(0, 0, 0, 0.4)",
                      "0 10px 30px -12px rgba(0, 0, 0, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                >
                  {/* 배경 패턴 */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className="w-full h-full border-2 border-white rounded-full"></div>
                  </div>
                  
                  <motion.div 
                    className="text-4xl lg:text-5xl mb-6 relative z-10"
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [1, 1.1, 1],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    whileHover={{
                      scale: 1.3,
                      rotateY: 10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                  
                  <h3 className="text-lg lg:text-xl font-bold mb-4 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-sm lg:text-base opacity-90 relative z-10 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
            
            {/* 두 번째 세트 (무한 반복을 위해) */}
            {benefits.map((benefit, index) => (
              <motion.div
                key={`first-row-second-${benefit.id}`}
                className="flex-shrink-0 w-80 lg:w-96"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${benefit.color} rounded-3xl p-6 lg:p-8 text-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[280px] lg:min-h-[320px] relative overflow-hidden`}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px -12px rgba(0, 0, 0, 0.3)",
                      "0 20px 40px -12px rgba(0, 0, 0, 0.4)",
                      "0 10px 30px -12px rgba(0, 0, 0, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                >
                  {/* 배경 패턴 */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className="w-full h-full border-2 border-white rounded-full"></div>
                  </div>
                  
                  <motion.div 
                    className="text-4xl lg:text-5xl mb-6 relative z-10"
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [1, 1.1, 1],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    whileHover={{
                      scale: 1.3,
                      rotateY: 10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                  
                  <h3 className="text-lg lg:text-xl font-bold mb-4 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-sm lg:text-base opacity-90 relative z-10 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 두 번째 줄 - 오른쪽으로 이동 */}
        <div className="relative overflow-hidden">
          <motion.div 
            className="flex gap-6 lg:gap-8"
            animate={{ x: [0, 100] }}
            transition={{ 
              duration: 30, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {/* 첫 번째 세트 */}
            {benefits.map((benefit, index) => (
              <motion.div
                key={`second-row-${benefit.id}`}
                className="flex-shrink-0 w-80 lg:w-96"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${benefit.color} rounded-3xl p-6 lg:p-8 text-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[280px] lg:min-h-[320px] relative overflow-hidden`}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px -12px rgba(0, 0, 0, 0.3)",
                      "0 20px 40px -12px rgba(0, 0, 0, 0.4)",
                      "0 10px 30px -12px rgba(0, 0, 0, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                >
                  {/* 배경 패턴 */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className="w-full h-full border-2 border-white rounded-full"></div>
                  </div>
                  
                  <motion.div 
                    className="text-4xl lg:text-5xl mb-6 relative z-10"
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [1, 1.1, 1],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    whileHover={{
                      scale: 1.3,
                      rotateY: 10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                  
                  <h3 className="text-lg lg:text-xl font-bold mb-4 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-sm lg:text-base opacity-90 relative z-10 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
            
            {/* 두 번째 세트 (무한 반복을 위해) */}
            {benefits.map((benefit, index) => (
              <motion.div
                key={`second-row-second-${benefit.id}`}
                className="flex-shrink-0 w-80 lg:w-96"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <motion.div
                  className={`bg-gradient-to-br ${benefit.color} rounded-3xl p-6 lg:p-8 text-center text-white shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[280px] lg:min-h-[320px] relative overflow-hidden`}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)"
                  }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px -12px rgba(0, 0, 0, 0.3)",
                      "0 20px 40px -12px rgba(0, 0, 0, 0.4)",
                      "0 10px 30px -12px rgba(0, 0, 0, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  }}
                >
                  {/* 배경 패턴 */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className="w-full h-full border-2 border-white rounded-full"></div>
                  </div>
                  
                  <motion.div 
                    className="text-4xl lg:text-5xl mb-6 relative z-10"
                    animate={{ 
                      y: [0, -5, 0],
                      scale: [1, 1.1, 1],
                      rotateY: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                    whileHover={{
                      scale: 1.3,
                      rotateY: 10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {benefit.icon}
                  </motion.div>
                  
                  <h3 className="text-lg lg:text-xl font-bold mb-4 relative z-10">
                    {benefit.title}
                  </h3>
                  <p className="text-sm lg:text-base opacity-90 relative z-10 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 