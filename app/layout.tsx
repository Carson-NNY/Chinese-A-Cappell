import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Columbia University Chinese A Cappella - 哥伦比亚大学中文阿卡贝拉",
  description:
    "Columbia University's premier Chinese a cappella group, dedicated to bridging cultures through the universal language of music.",
  keywords: [
    "a-cappella",
    "columbia",
    "chinese",
    "music",
    "university",
    "新音乐",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={playfairDisplay.className}>{children}</body>
    </html>
  );
}
