import { ReactNode } from 'react';

interface RecruitLayoutProps {
  children: ReactNode;
}

export default function RecruitLayout({ children }: RecruitLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* 메인 제목 */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Work with us</h1>
          <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">ZNIT가 바라는 인재상</p>
        </div>

        {children}
      </div>
    </div>
  );
} 