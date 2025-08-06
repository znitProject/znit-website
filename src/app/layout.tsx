import type { Metadata } from "next";
import {
  Red_Hat_Display,
  Montserrat,
  Roboto_Flex,
  Stylish,
} from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-red-hat-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-montserrat",
});

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
});

const nanumSquareNeo = localFont({
  src: "../../public/fonts/NanumSquareNeo-Variable.ttf",
  variable: "--font-nanum-square-neo",
  display: "swap",
});

const stylish = Stylish({
  weight: ["400"],
  variable: "--font-stylish",
});

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
          href="https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Song+Myung&family=Zen+Kurenaido&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"
          async
        />
      </head>
      <body
        className={`${redHatDisplay.variable} ${montserrat.variable} ${robotoFlex.variable} ${nanumSquareNeo.variable} ${stylish.variable} antialiased`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
