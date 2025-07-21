export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-6">
          ZNIT에 문의하거나 연락하고 싶으시면 언제든지 연락주세요.
        </p>
        <div className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            연락처 정보
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>이메일: contact@znit.com</p>
            <p>전화번호: 02-1234-5678</p>
            <p>주소: 서울특별시 강남구 테헤란로 123</p>
          </div>
        </div>
      </div>
    </div>
  );
} 