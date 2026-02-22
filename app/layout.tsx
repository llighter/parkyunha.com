import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import localFont from "next/font/local";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "./font/RIDIBatang.otf",
  display: "swap",
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
    <html lang="ko" className="scroll-smooth">
      <body className={`${myFont.className} flex flex-col antialiased`}>
        <div className="wrapper grid min-h-full grid-rows-[auto_1fr_auto]">
          <Sidebar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
