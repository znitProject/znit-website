import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { FormData } from "../../../types/contact";

interface Step2Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Step2({ formData, updateFormData }: Step2Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value });
  };

  const handleFileAttach = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png";
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        setSelectedFile(target.files[0]);
      }
    };
    input.click();
  };

  return (
    <div className="py-2 sm:py-4 md:py-6 xl:py-8">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl xl:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 xl:mb-12"
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
          <label className="block text-base sm:text-lg xl:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 xl:mb-3">
            프로젝트 제목
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-6 xl:py-4 border-2 border-gray-300 rounded-lg text-base sm:text-lg xl:text-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-gray-900 placeholder-gray-500"
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
          <label className="block text-base sm:text-lg xl:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 xl:mb-3">
            프로젝트 내용
          </label>
          <textarea
            className="w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-6 xl:py-4 border-2 border-gray-300 rounded-lg text-base sm:text-lg xl:text-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-gray-900 min-h-[120px] sm:min-h-[150px] md:min-h-[180px] xl:min-h-[180px] resize-y placeholder-gray-500"
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
              className="flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-2 xl:px-4 xl:py-2 border-2 border-gray-900 rounded-lg w-full sm:w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 xl:w-5 xl:h-5 text-gray-900 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm sm:text-base xl:text-base text-gray-900 font-medium truncate">
                {selectedFile.name}
              </span>
              <button
                className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                onClick={() => setSelectedFile(null)}
              >
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 xl:w-4 xl:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </motion.div>
          )}
          <motion.button
            className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3 xl:px-6 xl:py-3 bg-gray-900 text-white border-2 border-gray-900 rounded-full text-sm sm:text-base xl:text-base transition-all duration-200 hover:bg-gray-700 w-full sm:w-auto"
            onClick={handleFileAttach}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            파일첨부
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
