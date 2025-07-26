import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { FormData } from "../../../types/contact";

interface Step3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Step3({ formData, updateFormData }: Step3Props) {
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value });

    // 유효성 검사
    if (field === "phone") {
      validatePhone(value);
    } else if (field === "email") {
      validateEmail(value);
    }
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (phone && !phoneRegex.test(phone)) {
      setPhoneError("올바른 전화번호 형식을 입력해주세요");
      setShowPhoneValidation(true);
    } else if (phone && phone.length < 10) {
      setPhoneError("전화번호는 최소 10자리 이상 입력해주세요");
      setShowPhoneValidation(true);
    } else {
      setPhoneError("");
      setShowPhoneValidation(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요");
      setShowEmailValidation(true);
    } else {
      setEmailError("");
      setShowEmailValidation(false);
    }
  };

  return (
    <div className="py-2 sm:py-4 md:py-6 xl:py-8">
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl xl:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 md:mb-12 xl:mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        의뢰하시는 분의 정보 입력
      </motion.h2>

      <div className="space-y-6 sm:space-y-8 xl:space-y-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 xl:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <label className="block text-base sm:text-lg xl:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 xl:mb-3">
              회사명
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-6 xl:py-4 border-2 border-gray-300 rounded-lg text-base sm:text-lg xl:text-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-gray-900 placeholder-gray-500"
              placeholder="회사명"
              value={formData.companyName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("companyName", e.target.value)
              }
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <label className="block text-base sm:text-lg xl:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 xl:mb-3">
              성함
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-6 xl:py-4 border-2 border-gray-300 rounded-lg text-base sm:text-lg xl:text-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-gray-900 placeholder-gray-500"
              placeholder="성함"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("name", e.target.value)
              }
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 xl:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <label className="block text-base sm:text-lg xl:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 xl:mb-3">
              직함
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-6 xl:py-4 border-2 border-gray-300 rounded-lg text-base sm:text-lg xl:text-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-gray-900 placeholder-gray-500"
              placeholder="직함"
              value={formData.position}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("position", e.target.value)
              }
            />
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <label className="block text-base sm:text-lg xl:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 xl:mb-3">
              연락처
            </label>
            <input
              type="tel"
              className={`w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-6 xl:py-4 border-2 rounded-lg text-base sm:text-lg xl:text-lg text-gray-900 transition-colors duration-200 focus:outline-none placeholder-gray-500 ${
                showPhoneValidation
                  ? "border-red-500"
                  : "border-gray-300 focus:border-gray-900"
              }`}
              placeholder="연락처"
              value={formData.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange("phone", e.target.value)
              }
            />
            {showPhoneValidation && (
              <motion.div
                className="mt-2 text-red-600 text-xs sm:text-sm xl:text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {phoneError}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <label className="block text-base sm:text-lg xl:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 xl:mb-3">
            이메일
          </label>
          <input
            type="email"
            className={`w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-6 xl:py-4 border-2 rounded-lg text-base sm:text-lg xl:text-lg text-gray-900 transition-colors duration-200 focus:outline-none placeholder-gray-500 ${
              showEmailValidation
                ? "border-red-500"
                : "border-gray-300 focus:border-gray-900"
            }`}
            placeholder="이메일"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange("email", e.target.value)
            }
          />
          {showEmailValidation && (
            <motion.div
              className="mt-2 text-red-600 text-xs sm:text-sm xl:text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {emailError}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
