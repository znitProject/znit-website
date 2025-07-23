import type { Metadata } from "next";
import { Red_Hat_Display, Montserrat } from "next/font/google";
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

const nanumSquareNeo = localFont({
  src: "../../public/fonts/NanumSquareNeo-Variable.ttf",
  variable: "--font-nanum-square-neo",
});

export const metadata: Metadata = {
  title: "ZNIT - 혁신적인 솔루션으로 미래를 만들어갑니다",
  description: "ZNIT는 혁신적인 솔루션으로 미래를 만들어갑니다. 우리는 우리가 하는 모든 일에 책임을 지고, 최고의 결과물을 만들어내는 것을 약속합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${redHatDisplay.variable} ${montserrat.variable} ${nanumSquareNeo.variable} antialiased`}>
        <Providers>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
