import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "six50 | Chicago AI Automation & Fractional CFO Consulting",
  description: "Six50 is a leading Chicago AI automation and financial consulting firm. We help founder-led and PE-backed businesses transform operations through financial rigor, strategic accounting, and intelligent workflow automation.",
  keywords: [
    "Chicago AI", 
    "AI automation consulting Chicago", 
    "fractional CFO services", 
    "SMB financial consulting", 
    "PE-backed business consulting", 
    "workflow automation", 
    "AI implementation agency", 
    "Chicago consulting firm", 
    "Aurora IL business consulting",
    "financial leadership",
    "intelligent systems",
    "accounting services"
  ],
  openGraph: {
    title: "six50 | Chicago AI & Financial Consulting",
    description: "Bringing Big Four financial rigor and practical AI-driven automation to founder-led and PE-backed businesses.",
    url: "https://six50.io",
    siteName: "six50 strategy & consulting",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: '/icon.svg?v=650',
    shortcut: '/icon.svg?v=650',
    apple: '/icon.svg?v=650',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased flex flex-col min-h-screen relative`}
      >
        <AnimatedBackground />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatWidget />

      </body>
    </html>
  );
}
