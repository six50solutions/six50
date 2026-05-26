import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { OrganizationSchema, WebsiteSchema } from "@/components/JsonLd";

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
  metadataBase: new URL("https://six50.io"),
  title: {
    default: "six50 | Chicago AI Automation & Fractional CFO Consulting",
    template: "%s | six50",
  },
  description:
    "six50 combines Big Four financial expertise and AI-driven automation to help founder-led and PE-backed businesses ($2M-$50M) run smarter. Fractional CFO, accounting, workflow automation, and AI implementation. Chicago & national.",
  keywords: [
    "six50", "650", "6fifty", "sixfifty", "Six50 Solutions", "Six Fifty",
    "Chicago AI", "AI automation consulting Chicago", "fractional CFO services",
    "SMB financial consulting", "PE-backed business consulting", "workflow automation",
    "AI implementation agency", "Chicago consulting firm", "Aurora IL business consulting",
    "financial leadership", "intelligent systems", "accounting services",
  ],
  authors: [{ name: "Adil Ghazali, CPA", url: "https://six50.io/about" }],
  creator: "six50 solutions LLC",
  publisher: "six50 solutions LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://six50.io",
    siteName: "six50 strategy & consulting",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "six50 - Chicago AI Automation & Fractional CFO Consulting" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@six50solutions",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: "https://six50.io" },
  icons: {
    icon: "/icon.svg?v=650",
    shortcut: "/icon.svg?v=650",
    apple: "/icon.svg?v=650",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <OrganizationSchema />
        <WebsiteSchema />
        <AnimatedBackground />
        <Navbar />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
