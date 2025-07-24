import { ReactNode, MutableRefObject } from 'react';
import { motion } from 'framer-motion';
import AnimatedContactText from './AnimatedContactText';
import Image from 'next/image';

interface ContactLayoutProps {
  children: ReactNode;
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
  flowerImages: string[];
  flowerRefs: MutableRefObject<(HTMLImageElement | null)[]>;
}

export default function ContactLayout({
  children,
  currentStep,
  nextStep,
  previousStep,
  flowerImages,
  flowerRefs,
}: ContactLayoutProps) {
  const flowerPositions = [
    { top: '-80%', left: '-30%', width: 180, height: 180 },                                                     
    { top: '-60%', right: '2%', width: 150, height: 150 },                                                      
    { top: '-80%', right: '20%', width: 160, height: 160 },                                                   
    { top: '-80%', right: '35%', width: 400, height: 300 },  
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="w-1/2 bg-white pl-8 pr-4 pt-8 pb-8 flex flex-col justify-center items-center">
        <div className="flex items-center mb-16 ml-16">
          <div className="relative">
            <div style={{ zIndex: 10, position: 'relative' }}>
              <AnimatedContactText />
            </div>
            {flowerImages.map((src, index) => (
              <Image
                key={src}
                ref={(el) => {
                  if (flowerRefs.current) {
                    flowerRefs.current[index] = el;
                  }
                }}
                src={src}
                alt={`Flower ${index + 1}`}
                width={flowerPositions[index].width}
                height={flowerPositions[index].height}
                className="absolute"
                style={{
                  top: flowerPositions[index].top,
                  left: flowerPositions[index].left,
                  right: flowerPositions[index].right,
                  opacity: 0,
                  transform: 'scale(0.5)',
                  transformOrigin: 'center center',
                  zIndex: 0,
                }}
              />
            ))}
          </div>

          <div className="flex flex-col items-center">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl border ${
                    step <= currentStep
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-900'
                  }`}
                >
                  {step}
                </div>
                {index < 3 && (
                  <div className="w-px h-24" style={{
                    background: 'repeating-linear-gradient(to bottom, #1F2937 0px, #1F2937 6px, transparent 6px, transparent 12px)'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white pl-4 pr-16 pt-8 pb-8 flex flex-col justify-center relative">
        <div className="max-w-xl ml-8">
          <div className="flex-1">
            {children}
          </div>
        </div>

        <div className="absolute bottom-8 right-16 flex space-x-4">
          {currentStep > 1 && (
            <motion.button
              className="w-12 h-12 border-2 border-gray-900 rounded-full bg-white text-gray-900 flex items-center justify-center transition-all duration-200 hover:bg-gray-900 hover:text-white disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed"
              onClick={previousStep}
              disabled={currentStep === 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
          )}
          {currentStep < 3 && (
            <motion.button
              className="w-12 h-12 border-2 border-gray-900 rounded-full bg-white text-gray-900 flex items-center justify-center transition-all duration-200 hover:bg-gray-900 hover:text-white"
              onClick={nextStep}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
          {currentStep === 3 && (
            <motion.button
              className="px-6 py-3 border-2 border-gray-900 rounded-full bg-white text-gray-900 font-medium transition-all duration-200 hover:bg-gray-900 hover:text-white"
              onClick={nextStep}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              제출하기
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
