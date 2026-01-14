import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
    themeColor: "#0B1F33",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    title: "six50 — Digital Card",
    description: "six50 — Where clarity triggers transformation. AI Strategy, Automation, Risk & Ops Transformation.",
    manifest: "/card/manifest.webmanifest",
    icons: {
        icon: [
            { url: "/card/icons/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/card/icons/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: "/card/icons/apple-touch-icon.png",
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent",
        title: "six50",
    },
};

export default function CardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <head>
                {/* Fallback or specific manual tags if Metadata API misses something */}
            </head>
            {children}
        </>
    );
}
