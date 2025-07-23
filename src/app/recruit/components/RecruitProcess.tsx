'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const RecruitProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const processSteps = [
    {
      step: "01",
      title: "서류전형",
      subtitle: "Document Screening",
      description: "지원 자격 및 경력 확인과\n입사지원서를 통한 역량 평가",
      detail: "실무진"
    },
    {
      step: "02", 
      title: "1차 면접",
      subtitle: "1st Interview",
      description: "실무 관련 질문을 통한\n직무 적합성 평가",
      detail: "실무진"
    },
    {
      step: "03",
      title: "2차 면접", 
      subtitle: "2nd Interview",
      description: "지원자의 역량, 인성, 태도 등의\n종합 평가",
      detail: "임원진"
    },
    {
      step: "04",
      title: "최종합격 및 입사",
      subtitle: "Final Acceptance & Onboarding",
      description: "합격자 발표 및\n입사 절차 진행",
      detail: "인사팀"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      x: (index: number) => index % 2 === 0 ? -50 : 50
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 제목 섹션 */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            채용 프로세스
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            투명하고 체계적인 채용 과정을 통해<br />
            최고의 인재를 찾아갑니다
          </p>
        </motion.div>

        {/* 프로세스 스텝들 */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className={`relative ${
                index % 2 === 0 ? 'lg:justify-self-start' : 'lg:justify-self-end'
              }`}
              variants={itemVariants}
              custom={index}
            >
              {/* 카드 */}
              <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                {/* 스텝 번호 */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-6xl lg:text-7xl font-black text-gray-100 group-hover:text-blue-100 transition-colors duration-300">
                    {step.step}
                  </span>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                </div>

                {/* 제목 */}
                <motion.div variants={textVariants}>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-blue-600 font-medium mb-4">
                    {step.subtitle}
                  </p>
                </motion.div>

                {/* 설명 */}
                <motion.div variants={textVariants}>
                  <p className="text-gray-600 leading-relaxed mb-4 whitespace-pre-line">
                    {step.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {step.detail}
                    </span>
                  </div>
                </motion.div>

                {/* 연결선 (마지막 아이템 제외) */}
                {index < processSteps.length - 1 && (
                  <div className={`hidden lg:block absolute top-1/2 ${
                    index % 2 === 0 ? '-right-6' : '-left-6'
                  } transform -translate-y-1/2`}>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <div className={`w-3 h-3 bg-blue-500 rounded-full absolute top-1/2 transform -translate-y-1/2 ${
                      index % 2 === 0 ? '-right-1.5' : '-left-1.5'
                    }`}></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 하단 설명 */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            각 단계별로 투명하고 공정한 평가를 통해<br />
            본인에게 가장 적합한 포지션을 찾을 수 있도록 도와드립니다
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RecruitProcess; 