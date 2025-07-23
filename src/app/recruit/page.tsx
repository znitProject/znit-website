'use client';

import RecruitLayout from './components/RecruitLayout';
import Carousel3D from './components/Carousel3D';
import FileUpload from './components/FileUpload';
import JoinSteps from './components/JoinSteps';
import { carouselItems } from './data/carouselData';

export default function RecruitPage() {
  const handleFileSubmit = async (file: File) => {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch('/api/recruit', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || '제출 중 오류가 발생했습니다.');
    }

    return result;
  };

  return (
    <RecruitLayout>
      {/* 3D 캐러셀 */}
      <Carousel3D items={carouselItems} />

      {/* TO JOIN US! 섹션 */}
      <div className="mb-20">
        <div className="flex justify-between items-start mb-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">TO JOIN US!</h2>
            
            {/* 지원 안내 텍스트 */}
            <div className="mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                경력, 신입, 디자이너 등 함께할 여러분을 찾습니다.<br />
                ZNIT와 함께 성장하고 싶은 분들의 많은 지원을 기다립니다.
              </p>
            </div>

            {/* 파일 제출 섹션 */}
            <FileUpload onSubmit={handleFileSubmit} />
          </div>

          {/* 오른쪽 이미지 영역 */}
          <div className="w-96 h-64 bg-gray-200 rounded-lg ml-12 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-gray-600">이미지 영역</p>
            </div>
          </div>
        </div>

        {/* 8개 카드 그리드 */}
        <JoinSteps />
      </div>
    </RecruitLayout>
  );
} 