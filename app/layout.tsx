import Footer from "@/components/footer";
import "./globals.css";
import Sidebar from "@/components/sidebar";

export const metadata = {
  metadataBase: new URL("https://llighter.vercel.app"),
  title: {
    default: "llighter",
    template: "%s | llighter",
  },
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "llighter",
    description: "Developer, writer, and creator.",
    url: "https://llighter.vercel.app",
    siteName: "llighter",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
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
