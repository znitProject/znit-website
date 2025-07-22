import { ChangeEvent, useState } from 'react';
import { FormData } from '../../../types/contact';

interface Step3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

export default function Step3({ formData, updateFormData }: Step3Props) {
  const [showPhoneValidation, setShowPhoneValidation] = useState(false);
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value });
    
    // 유효성 검사
    if (field === 'phone') {
      validatePhone(value);
    } else if (field === 'email') {
      validateEmail(value);
    }
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9-+\s()]+$/;
    if (phone && !phoneRegex.test(phone)) {
      setPhoneError('올바른 전화번호 형식을 입력해주세요');
      setShowPhoneValidation(true);
    } else if (phone && phone.length < 10) {
      setPhoneError('전화번호는 최소 10자리 이상 입력해주세요');
      setShowPhoneValidation(true);
    } else {
      setPhoneError('');
      setShowPhoneValidation(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요');
      setShowEmailValidation(true);
    } else {
      setEmailError('');
      setShowEmailValidation(false);
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-gray-900 mb-12">의뢰하시는 분의 정보 입력</h2>
      
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">회사명</label>
            <input
              type="text"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-gray-900 placeholder-gray-500"
              placeholder="회사명"
              value={formData.companyName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                handleInputChange('companyName', e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">성함</label>
            <input
              type="text"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-gray-900 placeholder-gray-500"
              placeholder="성함"
              value={formData.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                handleInputChange('name', e.target.value)
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">직함</label>
            <input
              type="text"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg text-lg text-gray-900 transition-colors duration-200 focus:outline-none focus:border-gray-900 placeholder-gray-500"
              placeholder="직함"
              value={formData.position}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                handleInputChange('position', e.target.value)
              }
            />
          </div>
          <div className="relative">
            <label className="block text-lg font-semibold text-gray-900 mb-3">연락처</label>
            <input
              type="tel"
              className={`w-full px-6 py-4 border-2 rounded-lg text-lg text-gray-900 transition-colors duration-200 focus:outline-none placeholder-gray-500 ${
                showPhoneValidation ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'
              }`}
              placeholder="연락처"
              value={formData.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => 
                handleInputChange('phone', e.target.value)
              }
            />
            {showPhoneValidation && (
              <div className="mt-2 text-red-600 text-sm">
                {phoneError}
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <label className="block text-lg font-semibold text-gray-900 mb-3">이메일</label>
          <input
            type="email"
            className={`w-full px-6 py-4 border-2 rounded-lg text-lg text-gray-900 transition-colors duration-200 focus:outline-none placeholder-gray-500 ${
              showEmailValidation ? 'border-red-500' : 'border-gray-300 focus:border-gray-900'
            }`}
            placeholder="이메일"
            value={formData.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => 
              handleInputChange('email', e.target.value)
            }
          />
          {showEmailValidation && (
            <div className="mt-2 text-red-600 text-sm">
              {emailError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 