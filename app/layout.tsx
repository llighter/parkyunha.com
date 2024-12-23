import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.parkyunha.com"),
  title: {
    default: "Park Yunha",
    template: "%s | Park Yunha",
  },
  description: "Dreaming to be a Developer and Entrepreneur.",
  openGraph: {
    title: "Park Yunha",
    description: "Dreaming to be a Developer and Entrepreneur.",
    url: "https://www.parkyunha.com",
    siteName: "Park Yunha",
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
      <body className={`flex flex-col antialiased`}>
        <div className="wrapper grid min-h-full grid-rows-[auto_1fr_auto]">
          <Sidebar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
