import Link from "next/link";

export default function HomePage() {
  return (
    <div className="h-screen w-full overflow-hidden bg-white">
      {/* 풀스크린 그리드 레이아웃 */}
      <div className="grid grid-cols-2 grid-rows-2 h-full">
        
        {/* Work 섹션 - 좌상단 */}
        <Link href="/work" className="group relative bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 overflow-hidden border border-gray-200">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-gray-800 p-8">
            <h2 className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 text-blue-600">
              WORK
            </h2>
            <p className="text-xl text-center max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-gray-700">
              우리의 프로젝트와 작업물을 확인하세요
            </p>
            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-lg font-semibold text-blue-600">→ 자세히 보기</span>
            </div>
          </div>
        </Link>

        {/* Recruit 섹션 - 우상단 */}
        <Link href="/recruit" className="group relative bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 overflow-hidden border border-gray-200">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-gray-800 p-8">
            <h2 className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 text-green-600">
              RECRUIT
            </h2>
            <p className="text-xl text-center max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-gray-700">
              함께 일할 팀원을 찾고 있습니다
            </p>
            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-lg font-semibold text-green-600">→ 지원하기</span>
            </div>
          </div>
        </Link>

        {/* Slogan 섹션 - 좌하단 */}
        <Link href="/slogan" className="group relative bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 overflow-hidden border border-gray-200">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-gray-800 p-8">
            <h2 className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 text-purple-600">
              WE OWN IT
            </h2>
            <p className="text-xl text-center max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-gray-700">
              우리의 슬로건과 가치관을 알아보세요
            </p>
            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-lg font-semibold text-purple-600">→ 알아보기</span>
            </div>
          </div>
        </Link>

        {/* Contact 섹션 - 우하단 */}
        <Link href="/contact" className="group relative bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all duration-300 overflow-hidden border border-gray-200">
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-gray-800 p-8">
            <h2 className="text-6xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300 text-orange-600">
              CONTACT
            </h2>
            <p className="text-xl text-center max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-300 text-gray-700">
              언제든지 연락주세요
            </p>
            <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-lg font-semibold text-orange-600">→ 연락하기</span>
            </div>
          </div>
        </Link>

      </div>


    </div>
  );
}
