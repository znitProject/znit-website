import jsPDF from 'jspdf';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  ip: string;
}

interface RecruitFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio: string;
  message: string;
  timestamp: string;
  ip: string;
}

export function generateContactPDF(data: ContactFormData): Buffer {
  const doc = new jsPDF();
  
  // 제목
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ZNIT 문의서', 105, 20, { align: 'center' });
  
  // 구분선
  doc.setDrawColor(0);
  doc.line(20, 30, 190, 30);
  
  // 기본 정보
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('기본 정보', 20, 45);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`이름: ${data.name}`, 20, 55);
  doc.text(`이메일: ${data.email}`, 20, 65);
  doc.text(`제목: ${data.subject}`, 20, 75);
  
  // 메시지
  doc.setFont('helvetica', 'bold');
  doc.text('문의 내용', 20, 95);
  
  doc.setFont('helvetica', 'normal');
  const messageLines = doc.splitTextToSize(data.message, 170);
  doc.text(messageLines, 20, 105);
  
  // 메타 정보
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text(`접수 시간: ${data.timestamp}`, 20, 250);
  doc.text(`IP 주소: ${data.ip}`, 20, 255);
  
  return Buffer.from(doc.output('arraybuffer'));
}

export function generateRecruitPDF(data: RecruitFormData): Buffer {
  const doc = new jsPDF();
  
  // 제목
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('ZNIT 채용 지원서', 105, 20, { align: 'center' });
  
  // 구분선
  doc.setDrawColor(0);
  doc.line(20, 30, 190, 30);
  
  // 지원자 정보
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('지원자 정보', 20, 45);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`이름: ${data.name}`, 20, 55);
  doc.text(`이메일: ${data.email}`, 20, 65);
  doc.text(`전화번호: ${data.phone}`, 20, 75);
  doc.text(`지원 포지션: ${data.position}`, 20, 85);
  
  // 경력
  if (data.experience) {
    doc.setFont('helvetica', 'bold');
    doc.text('경력', 20, 105);
    doc.setFont('helvetica', 'normal');
    const experienceLines = doc.splitTextToSize(data.experience, 170);
    doc.text(experienceLines, 20, 115);
  }
  
  // 포트폴리오
  if (data.portfolio) {
    const yPos = data.experience ? 135 : 105;
    doc.setFont('helvetica', 'bold');
    doc.text('포트폴리오', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(data.portfolio, 20, yPos + 10);
  }
  
  // 자기소개
  if (data.message) {
    const yPos = data.experience && data.portfolio ? 155 : 
                 data.experience || data.portfolio ? 125 : 105;
    doc.setFont('helvetica', 'bold');
    doc.text('자기소개', 20, yPos);
    doc.setFont('helvetica', 'normal');
    const messageLines = doc.splitTextToSize(data.message, 170);
    doc.text(messageLines, 20, yPos + 10);
  }
  
  // 메타 정보
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  doc.text(`접수 시간: ${data.timestamp}`, 20, 250);
  doc.text(`IP 주소: ${data.ip}`, 20, 255);
  
  return Buffer.from(doc.output('arraybuffer'));
}

// HTML 템플릿 생성 함수
export function generateContactHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>ZNIT 문의서</title>
      <style>
        body { font-family: 'Malgun Gothic', sans-serif; margin: 40px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .label { font-weight: bold; color: #333; }
        .value { margin-left: 10px; }
        .message { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
        .meta { font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>ZNIT 문의서</h1>
      </div>
      
      <div class="section">
        <div class="label">이름:</div>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="section">
        <div class="label">이메일:</div>
        <div class="value">${data.email}</div>
      </div>
      
      <div class="section">
        <div class="label">제목:</div>
        <div class="value">${data.subject}</div>
      </div>
      
      <div class="section">
        <div class="label">문의 내용:</div>
        <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
      
      <div class="meta">
        <div>접수 시간: ${data.timestamp}</div>
        <div>IP 주소: ${data.ip}</div>
      </div>
    </body>
    </html>
  `;
}

export function generateRecruitHTML(data: RecruitFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>ZNIT 채용 지원서</title>
      <style>
        body { font-family: 'Malgun Gothic', sans-serif; margin: 40px; }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .label { font-weight: bold; color: #333; }
        .value { margin-left: 10px; }
        .content { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
        .meta { font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>ZNIT 채용 지원서</h1>
      </div>
      
      <div class="section">
        <div class="label">이름:</div>
        <div class="value">${data.name}</div>
      </div>
      
      <div class="section">
        <div class="label">이메일:</div>
        <div class="value">${data.email}</div>
      </div>
      
      <div class="section">
        <div class="label">전화번호:</div>
        <div class="value">${data.phone}</div>
      </div>
      
      <div class="section">
        <div class="label">지원 포지션:</div>
        <div class="value">${data.position}</div>
      </div>
      
      ${data.experience ? `
      <div class="section">
        <div class="label">경력:</div>
        <div class="content">${data.experience.replace(/\n/g, '<br>')}</div>
      </div>
      ` : ''}
      
      ${data.portfolio ? `
      <div class="section">
        <div class="label">포트폴리오:</div>
        <div class="value"><a href="${data.portfolio}" target="_blank">${data.portfolio}</a></div>
      </div>
      ` : ''}
      
      ${data.message ? `
      <div class="section">
        <div class="label">자기소개:</div>
        <div class="content">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
      ` : ''}
      
      <div class="meta">
        <div>접수 시간: ${data.timestamp}</div>
        <div>IP 주소: ${data.ip}</div>
      </div>
    </body>
    </html>
  `;
} 