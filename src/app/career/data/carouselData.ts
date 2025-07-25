export interface CarouselItem {
  id: number;
  title: string;
  description: string;
  color: string;
}

export const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "혁신적인 프로젝트",
    description: "최신 기술을 활용한 의미 있는 프로젝트에 참여",
    color: "#F06262"
  },
  {
    id: 2,
    title: "성장하는 팀",
    description: "다양한 배경의 전문가들과 함께 배우고 성장",
    color: "#2F325A"
  },
  {
    id: 3,
    title: "유연한 근무 환경",
    description: "원격 근무와 유연한 근무 시간을 지원",
    color: "#FFC170"
  },
  {
    id: 4,
    title: "창의적 문제 해결",
    description: "복잡한 문제를 창의적으로 해결하는 경험",
    color: "#4CAF50"
  },
  {
    id: 5,
    title: "글로벌 네트워크",
    description: "전 세계의 다양한 파트너들과 협업",
    color: "#9C27B0"
  },
  {
    id: 6,
    title: "지속적 학습",
    description: "끊임없는 학습과 기술 발전을 지원",
    color: "#2196F3"
  },
  {
    id: 7,
    title: "경쟁력 있는 보상",
    description: "성과에 따른 공정하고 경쟁력 있는 보상 체계",
    color: "#FF5722"
  }
]; 