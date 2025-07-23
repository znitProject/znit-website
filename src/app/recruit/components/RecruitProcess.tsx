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
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-white햣 -50 to-white">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="text-center"
              variants={itemVariants}
              custom={index}
            >
              {/* 스텝 번호 */}
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">{step.step}</span>
              </div>

              {/* 제목 */}
              <motion.div variants={textVariants}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-3">
                  {step.subtitle}
                </p>
              </motion.div>

              {/* 설명 */}
              <motion.div variants={textVariants}>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {step.description}
                </p>
              </motion.div>
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