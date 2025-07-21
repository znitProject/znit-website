import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-900 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">ZNIT</div>
            <p className="text-gray-600 mb-4 max-w-md">
              혁신적인 솔루션으로 미래를 만들어갑니다. 
              우리는 우리가 하는 모든 일에 책임을 지고, 
              최고의 결과물을 만들어내는 것을 약속합니다.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@znit.com"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="이메일"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a
                href="tel:02-1234-5678"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="전화번호"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/recruit" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Recruit
                </Link>
              </li>
              <li>
                <Link href="/slogan" className="text-gray-600 hover:text-gray-900 transition-colors">
                  We Own It
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">연락처</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="mailto:contact@znit.com" className="hover:text-gray-900 transition-colors">
                  contact@znit.com
                </a>
              </li>
              <li>
                <a href="tel:02-1234-5678" className="hover:text-gray-900 transition-colors">
                  02-1234-5678
                </a>
              </li>
              <li>
                서울특별시 강남구<br />
                테헤란로 123
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} ZNIT. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 