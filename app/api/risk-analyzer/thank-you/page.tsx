import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Thank you | AI Risk Analyzer | six50',
  description:
    'Your AI readiness assessment has been received. six50 will follow up within 48 hours.',
  robots: { index: false, follow: false },
};

const BANDS = [
  { min: 80, label: 'Prepared', copy: 'Risks are managed. The work is optimization, not remediation.' },
  { min: 60, label: 'Developing', copy: 'Foundations exist. The gaps are in evidence and consistency.' },
  { min: 40, label: 'Exposed', copy: 'At least one pillar has a material gap worth closing this quarter.' },
  { min: 0,  label: 'Critical', copy: 'No meaningful controls in place. A 90-day remediation plan is warranted.' },
];

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ score?: string; level?: string }>;
}) {
  const params = await searchParams;
  const parsed = Number(params.score);
  const score = Number.isFinite(parsed) ? Math.min(100, Math.max(0, parsed)) : null;
  const band = score !== null ? BANDS.find((b) => score >= b.min)! : null;

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-24">
      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
        six50 · AI Risk Analyzer
      </p>

      <h1 className="mb-5 text-3xl font-semibold tracking-tight text-neutral-100 sm:text-4xl">
        Your assessment is in.
      </h1>

      {score !== null && band && (
        <div className="mb-8 rounded-lg border border-neutral-800 bg-neutral-900/60 p-6">
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-semibold tabular-nums text-neutral-100">
              {score}
            </span>
            <span className="text-sm text-neutral-500">/ 100</span>
            <span className="ml-auto rounded-full border border-neutral-700 px-3 py-1 text-xs uppercase tracking-wider text-neutral-300">
              {band.label}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">{band.copy}</p>
        </div>
      )}

      <div className="space-y-4 text-neutral-400">
        <p className="leading-relaxed">
          A six50 principal reviews every submission personally — this is not an
          automated report. You&apos;ll hear back within 48 hours with a written summary
          of where you&apos;re strong, where the exposure sits, and what the first 90 days
          of closing it would look like.
        </p>
        <p className="leading-relaxed">
          If something is time-sensitive, reply directly to{' '}
          <a
            href="mailto:contact@six50.io"
            className="text-neutral-200 underline underline-offset-4 hover:text-white"
          >
            contact@six50.io
          </a>{' '}
          and it moves to the front of the queue.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-md border border-neutral-700 px-5 py-2.5 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
        >
          Back to six50
        </Link>
        <Link
          href="/scan"
          className="rounded-md border border-neutral-800 px-5 py-2.5 text-sm text-neutral-400 transition hover:border-neutral-600 hover:text-neutral-200"
        >
          See the First 90 Days Diagnostic
        </Link>
      </div>
    </main>
  );
}
