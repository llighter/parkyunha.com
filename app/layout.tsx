import type { Metadata } from "next";
import "./globals.css";
import "./font/pretendard.css";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import ThemeProvider from "./components/themeProvider";
import { Nunito_Sans } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

// 라틴: Nunito Sans, 한글: Pretendard (다이나믹 서브셋, pretendard.css)
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
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
    google: "jtxIYmK86CEf-UGFv3tT25cVTofoBJn2KVJBKZgcmms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 글꼴 변수는 <html> 에 둔다 — :root 의 --font-sans 가 이 변수를 읽기 때문 (body 에 두면 스택 전체가 무효)
    <html
      lang="ko"
      className={`${nunitoSans.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="flex h-full flex-col bg-canvas font-sans text-fg antialiased">
        <ThemeProvider>
          <div className="wrapper grid min-h-screen grid-cols-1 grid-rows-[auto_1fr_auto]">
            <Sidebar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
