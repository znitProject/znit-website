'use client';

import FileUpload from './components/FileUpload';
import Benefits from './components/Benefits';
import RecruitProcess from './components/RecruitProcess';
import TitleAnimation from './components/TitleAnimation';

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
      {/* Work with us 타이틀 애니메이션 - 풀스크린 */}
      <TitleAnimation />

      {/* 풀스크린 섹션 */}
      <div className="w-full bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">

          {/* 8개 카드 그리드 */}
          <Benefits />

          {/* 채용 프로세스 */}
          <RecruitProcess />

          {/* 지원 섹션 */}
          <div className="mt-12 sm:mt-16 lg:mt-20 mb-12 sm:mb-16 lg:mb-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                {/* 왼쪽 영역 */}
                <div className="flex flex-col justify-between order-2 lg:order-1">
                  {/* 글귀 */}
                  <div className="text-center lg:text-right mb-6 lg:mb-0">
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      경력, 신입, 디자이너 등 함께할 여러분을 찾습니다.<br className="hidden sm:block" />
                      ZNIT와 함께 성장하고 싶은 분들의 많은 지원을 기다립니다.
                    </p>
                  </div>

                  {/* 파일 제출 섹션 */}
                  <div className="flex justify-center lg:justify-end">
                    <FileUpload onSubmit={handleFileSubmit} />
                  </div>
                </div>

                {/* 오른쪽 이미지 영역 */}
                <div className="w-full lg:w-96 h-48 sm:h-56 lg:h-64 bg-gray-200 rounded-lg flex items-center justify-center order-1 lg:order-2 mb-6 lg:mb-0">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl lg:text-6xl mb-2 sm:mb-4">📄</div>
                    <p className="text-gray-600 text-sm sm:text-base">이미지 영역</p>
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