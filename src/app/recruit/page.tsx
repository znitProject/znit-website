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
    <div className="bg-white">
      {/* 메인 제목 */}
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Work with us</h1>
          <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">ZNIT가 바라는 인재상</p>
        </div>
      </div>

      {/* 3D 캐러셀 - 풀스크린 */}
      <div className="w-full bg-white">
        <div className="w-full px-8">
          <Carousel3D items={carouselItems} />
        </div>
      </div>

      {/* 풀스크린 섹션 */}
      <div className="w-full bg-white">
        <div className="w-full px-8">
          {/* TO JOIN US! 제목 */}
          <h2 className="text-4xl font-bold text-gray-900 mb-8 mt-8 text-right">TO JOIN US!</h2>

          {/* 8개 카드 그리드 */}
          <JoinSteps />

          {/* 지원 섹션 */}
          <div className="mt-20 mb-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 gap-8 mb-12">
                {/* 왼쪽 영역 */}
                <div className="flex flex-col justify-between">
                  {/* 글귀 */}
                  <div className="text-right">
                    <p className="text-lg text-gray-600 leading-relaxed">
                      경력, 신입, 디자이너 등 함께할 여러분을 찾습니다.<br />
                      ZNIT와 함께 성장하고 싶은 분들의 많은 지원을 기다립니다.
                    </p>
                  </div>

                  {/* 파일 제출 섹션 */}
                  <div className="flex justify-end">
                    <FileUpload onSubmit={handleFileSubmit} />
                  </div>
                </div>

                {/* 오른쪽 이미지 영역 */}
                <div className="w-96 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📄</div>
                    <p className="text-gray-600">이미지 영역</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 