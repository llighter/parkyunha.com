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
    <html lang="ko" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className={`${nunitoSans.variable} flex h-full flex-col font-sans antialiased bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100`}
      >
        <ThemeProvider>
          <div className="wrapper grid min-h-screen grid-rows-[auto_1fr_auto]">
            <Sidebar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
