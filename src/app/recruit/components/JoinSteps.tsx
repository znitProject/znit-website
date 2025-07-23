interface JoinStep {
  id: number;
  title: string;
  description: string;
}

const joinSteps: JoinStep[] = [
  { id: 1, title: "지원서 작성", description: "온라인 지원서 작성" },
  { id: 2, title: "서류 검토", description: "이력서 및 포트폴리오 검토" },
  { id: 3, title: "1차 면접", description: "온라인 또는 대면 면접" },
  { id: 4, title: "2차 면접", description: "실무진 면접" },
  { id: 5, title: "최종 합격", description: "합격자 발표 및 입사" },
  { id: 6, title: "입사 준비", description: "입사 전 준비사항 안내" },
  { id: 7, title: "입사", description: "ZNIT와 함께 시작" },
  { id: 8, title: "성장", description: "지속적인 성장과 발전" }
];

export default function JoinSteps() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {joinSteps.map((step) => (
        <div
          key={step.id}
          className="bg-gray-100 rounded-t-lg rounded-br-lg p-6 text-center hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <div className="text-2xl font-bold text-gray-800 mb-2">{step.id}</div>
          <h3 className="font-semibold text-gray-800 mb-2">{step.title}</h3>
          <p className="text-sm text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  );
} 