import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you\'re looking for doesn\'t exist.",
  openGraph: {
    title: "Page Not Found | six50",
    description: "The page you\'re looking for doesn\'t exist.",
  },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-paper font-medium hover:opacity-90 transition"
      >
        ← Back to Home
      </Link>
    </main>
  );
}
