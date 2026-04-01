import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";




const openSans = Open_Sans({
  variable: "--font-openSans",
  weight: ["300","400","500","600","800"]
});

export const metadata: Metadata = {
  title: "CamPak",
  description: "CamPak is one of Pakistan best value tour operators for your comfort and hassle free journey. We at CamPak share a common dream of exploring unspoiled areas of Pakistan.We provide budget freindly tours",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>
<Header />
        {children}
        <Footer />
        </main>
        <Toaster />
        </body>
    </html>
  );
}
