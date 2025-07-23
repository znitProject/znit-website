import Link from "next/link";
import Image from "next/image";

// WorkCard 컴포넌트: Work 페이지로 이동하는 카드, 호버 애니메이션 포함
export default function WorkCard() {
  return (
    <Link
      href="/work"
      className="card !text-3xl !font-bold transition-transform duration-300 hover:scale-105 relative overflow-hidden group"
      style={{ gridArea: 'work' }}
    >
      {/* work_image.jpg 배경 이미지 */}
      <Image
        src="/work_image.jpg"
        alt="Work 배경 이미지"
        fill
        className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-80"
        aria-hidden="true"
        priority
      />
      {/* 어두운 오버레이 (호버 시 더 진해짐) */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300" aria-hidden="true" />
      {/* 텍스트 */}
      <span className="absolute left-0 bottom-0 z-10 text-white text-5xl font-extrabold p-6 drop-shadow-lg select-none">
        WORK
      </span>
    </Link>
  );
} 