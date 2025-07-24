"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ContactLayout from "./components/ContactLayout";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import { FormData } from "../../types/contact";

const flowerImages = [
  "/flower/fleur1.png",
  "/flower/fleur2.png",
  "/flower/fleur3.png",
  "/flower/fleur4.png",
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    projectType: [],
    projectTitle: "",
    projectDescription: "",
    companyName: "",
    name: "",
    position: "",
    email: "",
    phone: "",
  });

  const flowerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    const prevStep = prevStepRef.current;

    // --- 꽃 애니메이션 로직 ---
    const animateFlower = (index: number, show: boolean) => {
      const flowerElement = flowerRefs.current[index];
      if (flowerElement) {
        gsap.to(flowerElement, {
          opacity: show ? 1 : 0,
          scale: show ? 1 : 0.5,
          duration: show ? 0.8 : 0.5,
          ease: show ? "power3.out" : "power3.in",
        });
      }
    };

    if (currentStep > prevStep) { // 앞으로 이동
      if (currentStep === 2) {
        animateFlower(0, true);
        animateFlower(1, true);
      } else if (currentStep === 3) {
        animateFlower(2, true);
      } else if (currentStep === 4) {
        animateFlower(3, true);
      }
    } else if (currentStep < prevStep) { // 뒤로 이동
      if (prevStep === 2) {
        animateFlower(0, false);
        animateFlower(1, false);
      } else if (prevStep === 3) {
        animateFlower(2, false);
      } else if (prevStep === 4) {
        animateFlower(3, false);
      }
    }

    prevStepRef.current = currentStep;
  }, [currentStep]);


  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const pageVariants = {
    initial: (direction: number) => ({
      opacity: 0,
      y: direction > 0 ? 50 : -50,
      scale: 0.95,
    }),
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: (direction: number) => ({
      opacity: 0,
      y: direction < 0 ? 50 : -50,
      scale: 0.95,
    }),
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.5,
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
      flowerImages={flowerImages}
      flowerRefs={flowerRefs}
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