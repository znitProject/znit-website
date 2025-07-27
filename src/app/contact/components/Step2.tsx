// src/app/contact/components/Step2.tsx
"use client";

import { ChangeEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FormData } from "../../../types/contact";

interface Step2Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Step2({ formData, updateFormData }: Step2Props) {
  // 초기 상태를 formData.selectedFile로부터 가져오도록
  const [selectedFile, setSelectedFile] = useState<File | null>(
    formData.selectedFile || null
  );

  // formData.selectedFile이 외부에서 바뀌면 동기화
  useEffect(() => {
    setSelectedFile(formData.selectedFile || null);
  }, [formData.selectedFile]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleFileAttach = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.hwp,.doc,.docx,.txt,.jpg,.jpeg,.png";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0] || null;
      if (file) {
        setSelectedFile(file);
        updateFormData({ selectedFile: file });
      }
    };
    input.click();
  };

  const removeFile = () => {
    setSelectedFile(null);
    updateFormData({ selectedFile: null });
  };

  return (
    <div className="py-2 sm:py-4 md:py-6 xl:py-8">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl xl:text-4xl font-bold text-black mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        프로젝트 세부 내용을 작성해 주십시오.
      </motion.h2>

      <div className="space-y-6 sm:space-y-8 xl:space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <label className="block text-base sm:text-lg xl:text-lg font-semibold text-black mb-2">
            프로젝트 제목
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base text-black focus:outline-none focus:border-gray-900"
            placeholder="프로젝트 제목을 입력하세요"
            value={formData.projectTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("projectTitle", e.target.value)
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <label className="block text-base sm:text-lg xl:text-lg font-semibold text-black mb-2">
            프로젝트 내용
          </label>
          <textarea
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base text-black focus:outline-none focus:border-gray-900 min-h-[120px] resize-y"
            placeholder="프로젝트에 대해 자세히 설명해주세요"
            value={formData.projectDescription}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange("projectDescription", e.target.value)
            }
          />
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row justify-end items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {selectedFile && (
            <motion.div
              className="flex items-center space-x-3 px-3 py-2 border-2 border-gray-900 rounded-lg w-full sm:w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-sm sm:text-base text-black font-medium truncate">
                {selectedFile.name}
              </span>
              <button
                onClick={removeFile}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </motion.div>
          )}
          <motion.button
            className="px-4 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-700 transition w-full sm:w-auto"
            onClick={handleFileAttach}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            파일첨부 (.pdf, .hwp, .doc, .docx)
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
