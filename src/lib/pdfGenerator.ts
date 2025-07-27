import jsPDF from "jspdf";

export interface ContactFormData {
  timestamp: string;
  projectType: string[];
  projectTitle: string;
  projectDescription: string;
  companyName: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  ip: string;
}

// 채용 지원용 타입은 그대로 두시면 됩니다.
export interface RecruitFormData {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio: string;
  message: string;
  ip: string;
}

export function generateContactPDF(data: ContactFormData): Buffer {
  const doc = new jsPDF();

  // 제목
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ZNIT 프로젝트 문의서", 105, 20, { align: "center" });

  // 구분선
  doc.setDrawColor(0);
  doc.line(20, 30, 190, 30);

  // 프로젝트 정보
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("프로젝트 정보", 20, 45);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`유형: ${data.projectType.join(", ")}`, 20, 55);
  doc.text(`제목: ${data.projectTitle}`, 20, 65);

  const descLines = doc.splitTextToSize(data.projectDescription, 170);
  doc.text(descLines, 20, 75);

  // 회사명
  doc.setFont("helvetica", "bold");
  doc.text("회사명", 20, 100);
  doc.setFont("helvetica", "normal");
  doc.text(data.companyName, 20, 110);

  // 의뢰자 정보
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("의뢰자 정보", 20, 130);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`성함: ${data.name}`, 20, 140);
  doc.text(`직함: ${data.position}`, 20, 150);
  doc.text(`연락처: ${data.phone}`, 20, 160);
  doc.text(`이메일: ${data.email}`, 20, 170);

  // 메타 정보
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(`접수 시간: ${data.timestamp}`, 20, 250);
  doc.text(`IP 주소: ${data.ip}`, 20, 255);

  return Buffer.from(doc.output("arraybuffer"));
}

export function generateRecruitPDF(data: RecruitFormData): Buffer {
  const doc = new jsPDF();

  // 제목
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ZNIT 채용 지원서", 105, 20, { align: "center" });

  // 구분선
  doc.setDrawColor(0);
  doc.line(20, 30, 190, 30);

  // 지원자 정보
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("지원자 정보", 20, 45);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`이름: ${data.name}`, 20, 55);
  doc.text(`이메일: ${data.email}`, 20, 65);
  doc.text(`전화번호: ${data.phone}`, 20, 75);
  doc.text(`지원 포지션: ${data.position}`, 20, 85);

  // 경력
  if (data.experience) {
    doc.setFont("helvetica", "bold");
    doc.text("경력", 20, 105);
    doc.setFont("helvetica", "normal");
    const expLines = doc.splitTextToSize(data.experience, 170);
    doc.text(expLines, 20, 115);
  }

  // 포트폴리오
  if (data.portfolio) {
    const y = data.experience ? 135 : 105;
    doc.setFont("helvetica", "bold");
    doc.text("포트폴리오", 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(data.portfolio, 20, y + 10);
  }

  // 자기소개
  if (data.message) {
    let y = 105;
    if (data.experience && data.portfolio) y = 155;
    else if (data.experience || data.portfolio) y = 125;

    doc.setFont("helvetica", "bold");
    doc.text("자기소개", 20, y);
    doc.setFont("helvetica", "normal");
    const msgLines = doc.splitTextToSize(data.message, 170);
    doc.text(msgLines, 20, y + 10);
  }

  // 메타 정보
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(`접수 시간: ${data.timestamp}`, 20, 250);
  doc.text(`IP 주소: ${data.ip}`, 20, 255);

  return Buffer.from(doc.output("arraybuffer"));
}
