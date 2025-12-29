import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EGX33 Stock Tracker - Egyptian Stock Exchange",
  description: "متابعة مؤشر EGX33 في البورصة المصرية مع التحليلات والأخبار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body className="antialiased bg-gray-950 text-gray-100 font-sans">
        {children}
      </body>
    </html>
  );
}
