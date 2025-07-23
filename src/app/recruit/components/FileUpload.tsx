'use client';

import { useState } from 'react';

interface FileUploadProps {
  onSubmit: (file: File) => Promise<void>;
}

export default function FileUpload({ onSubmit }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setSubmitStatus({
        type: 'error',
        message: '파일을 선택해주세요.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      await onSubmit(selectedFile);
      setSubmitStatus({
        type: 'success',
        message: '이력서가 성공적으로 제출되었습니다!'
      });
      setSelectedFile(null);
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: '제출 중 오류가 발생했습니다.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {submitStatus.type && (
        <div className={`p-4 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}

      {/* 숨겨진 파일 input - 항상 렌더링 */}
      <input
        type="file"
        id="resume"
        onChange={handleFileChange}
        accept=".pdf,.hwp,.doc,.docx"
        className="hidden"
      />

      {/* 파일 선택 영역 */}
      {!selectedFile && (
        <div className="flex justify-end">
          <button
            onClick={() => document.getElementById('resume')?.click()}
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
          >
            이력서 첨부하기
          </button>
        </div>
      )}

      {/* 파일이 선택되었을 때만 보이는 영역 */}
      {selectedFile && (
        <div className="flex justify-end items-center space-x-4">
          <div className="w-64">
            <label
              htmlFor="resume"
              className="block w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-full text-gray-600 cursor-pointer hover:border-gray-400 transition-colors"
            >
              {selectedFile.name}
            </label>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '제출 중...' : '보내기'}
          </button>
        </div>
      )}
    </div>
  );
} 