'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactLayout from './components/ContactLayout';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import { FormData } from '../../types/contact';

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    projectType: [],
    projectTitle: '',
    projectDescription: '',
    companyName: '',
    name: '',
    position: '',
    email: '',
    phone: ''
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setDirection(1); // 다음 단계로 이동 (아래로)
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setDirection(-1); // 이전 단계로 이동 (위로)
      setCurrentStep(currentStep - 1);
    }
  };

  // 페이지 전환 애니메이션 variants
  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      y: direction > 0 ? 50 : -50,
      scale: 0.95
    }),
    in: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    out: (direction: number) => ({
      opacity: 0,
      y: direction < 0 ? 50 : -50,
      scale: 0.95
    })
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.5
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2 formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3 formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4 formData={formData} />;
      default:
        return <Step1 formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <ContactLayout
      currentStep={currentStep}
      nextStep={nextStep}
      previousStep={previousStep}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </ContactLayout>
  );
} 