'use client';

import Benefits from './components/Benefits';
import RecruitProcess from './components/RecruitProcess';
import TitleAnimation from './components/TitleAnimation';
import ApplySection from './components/ApplySection';

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
        <div className="w-full">

          {/* 8개 카드 그리드 */}
          <Benefits />

          {/* 채용 프로세스 */}
          <RecruitProcess />

          {/* 지원 섹션 */}
          <ApplySection onSubmit={handleFileSubmit} />
        </div>
      </div>
    </div>
  );
} 