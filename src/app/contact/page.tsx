"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

import ContactLayout from "./components/ContactLayout";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";

import type { FormData } from "../../types/contact";

const flowerImages = [
  "/flower/fleur1.png",
  "/flower/fleur2.png",
  "/flower/fleur3.png",
  "/flower/fleur4.png",
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    projectType: [],
    projectTitle: "",
    projectDescription: "",
    companyName: "",
    name: "",
    position: "",
    email: "",
    phone: "",
    selectedFile: null,
  });

  const flowerRefs = useRef<(HTMLImageElement | null)[]>([]);
  const prevStepRef = useRef<number>(currentStep);

  // 꽃 애니메이션
  useEffect(() => {
    const prev = prevStepRef.current;
    const animateFlower = (idx: number, show: boolean) => {
      const els = flowerRefs.current.filter(
        (_, i) => i === idx || i === idx + 4 || i === idx + 8
      );
      els.forEach((el) => {
        if (el) {
          gsap.to(el, {
            opacity: show ? 1 : 0,
            scale: show ? 1 : 0.5,
            duration: show ? 0.8 : 0.5,
            ease: show ? "power3.out" : "power3.in",
          });
        }
      });
    };

    if (currentStep > prev) {
      if (currentStep === 2) {
        animateFlower(0, true);
        animateFlower(1, true);
      }
      if (currentStep === 3) animateFlower(2, true);
      if (currentStep === 4) animateFlower(3, true);
    } else if (currentStep < prev) {
      if (prev === 2) {
        animateFlower(0, false);
        animateFlower(1, false);
      }
      if (prev === 3) animateFlower(2, false);
      if (prev === 4) animateFlower(3, false);
    }

    prevStepRef.current = currentStep;
  }, [currentStep]);

  const updateFormData = (data: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...data }));

  const nextStep = () => {
    if (currentStep < 4) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
    }
  };
  const previousStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
    }
  };

  // 제출 핸들러 (채용 지원 API)
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = new FormData();
      // JSON 타입 필드
      payload.append("projectType", JSON.stringify(formData.projectType));
      // 기타 텍스트 필드
      payload.append("projectTitle", formData.projectTitle);
      payload.append("projectDescription", formData.projectDescription);
      payload.append("companyName", formData.companyName);
      payload.append("name", formData.name);
      payload.append("position", formData.position);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      // 파일 첨부
      if (formData.selectedFile) {
        payload.append("projectFile", formData.selectedFile);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || res.statusText);

      alert("문의가 성공적으로 전송되었습니다!");
      // 초기화
      setFormData({
        projectType: [],
        projectTitle: "",
        projectDescription: "",
        companyName: "",
        name: "",
        position: "",
        email: "",
        phone: "",
        selectedFile: null,
      });
      setCurrentStep(1);
    } catch (e: any) {
      alert("전송 실패: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const pageVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 50 : -50,
      scale: 0.95,
    }),
    in: { opacity: 1, y: 0, scale: 1 },
    out: (dir: number) => ({
      opacity: 0,
      y: dir < 0 ? 50 : -50,
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
        return (
          <Step4
            formData={formData}
            onSubmit={handleSubmit}
            loading={loading}
          />
        );
      default:
        return null;
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
