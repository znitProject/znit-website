# ZNIT 웹사이트

ZNIT의 공식 웹사이트입니다. Next.js와 TypeScript를 사용하여 구축되었습니다.

## 페이지 구성

- **Home (메인)**: ZNIT 소개 및 주요 섹션 안내
- **Work**: 프로젝트 및 작업물 소개
- **Recruit**: 채용 정보 및 함께 일할 팀원 모집
- **Slogan (We Own It)**: ZNIT의 슬로건과 가치관
- **Contact**: 문의 및 연락처 정보

## 기술 스택

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Email Service**: SendGrid
- **Deployment**: Vercel (권장)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

```env
# SendGrid 설정
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=noreply@yourdomain.com
CONTACT_EMAIL=contact@znit.com
HR_EMAIL=hr@znit.com

# 기타 설정
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### SendGrid 설정 방법

1. [SendGrid](https://sendgrid.com) 계정을 생성합니다.
2. API 키를 생성합니다.
3. 도메인 인증을 완료합니다.
4. 환경변수에 API 키와 인증된 이메일 주소를 설정합니다.

## 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 메인 페이지
│   ├── work/              # Work 페이지
│   ├── recruit/           # Recruit 페이지
│   ├── slogan/            # 슬로건 페이지
│   ├── contact/           # Contact 페이지
│   └── api/               # API 라우트
│       ├── contact/       # 문의 이메일 API
│       └── recruit/       # 채용 지원 API
├── components/            # 재사용 가능한 컴포넌트
├── lib/                   # 유틸리티 함수
└── types/                 # TypeScript 타입 정의
```

## 기능

- 반응형 디자인
- 문의 폼 (SendGrid 이메일 전송)
- 채용 지원 폼 (SendGrid 이메일 전송)
- SEO 최적화
- TypeScript 지원
- Tailwind CSS 스타일링

## 배포

이 프로젝트는 Vercel에 최적화되어 있습니다. GitHub 저장소를 Vercel에 연결하여 자동 배포를 설정할 수 있습니다.

## 라이선스

ZNIT © 2024
