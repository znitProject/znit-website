import Link from "next/link";

// WorkCard 컴포넌트: Work 페이지로 이동하는 카드, 호버 애니메이션 포함
export default function WorkCard() {
  return (
    <Link
      href="/work"
      className="card !text-3xl !font-bold transition-transform duration-300 hover:scale-105"
      style={{ gridArea: 'work' }}
    >
      WORK
    </Link>
  );
} 