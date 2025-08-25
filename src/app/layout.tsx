import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "ZNIT - 혁신적인 솔루션으로 미래를 만들어갑니다",
  description:
    "ZNIT는 혁신적인 디지털 솔루션을 제공하는 기업입니다. 웹 개발, 디자인, 모바일 앱 개발 등 다양한 서비스를 제공합니다.",
  keywords: ["ZNIT", "웹 개발", "디자인", "모바일 앱", "디지털 솔루션"],
  authors: [{ name: "ZNIT" }],
  creator: "ZNIT",
  publisher: "ZNIT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZNIT - 혁신적인 솔루션으로 미래를 만들어갑니다",
    description: "ZNIT는 혁신적인 디지털 솔루션을 제공하는 기업입니다.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    siteName: "ZNIT",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZNIT - 혁신적인 솔루션으로 미래를 만들어갑니다",
    description: "ZNIT는 혁신적인 디지털 솔루션을 제공하는 기업입니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Zen+Kurenaido&family=Righteous&family=Secular+One&family=Kanit:wght@100;200;300;400;500;600;700;800;900&family=Gowun+Batang:wght@400;700&family=Song+Myung&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased overflow-x-hidden">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
        {/* p5.js는 npm 패키지로 로드하므로 CDN 제거 */}
      </body>
    </html>
  );
}
