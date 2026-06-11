'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Download, Mail, Globe, Calendar, Copy, Share2 } from 'lucide-react';
import { Magnetic } from '@/components/ui/Magnetic';

export default function CardPage() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [toastMsg, setToastMsg] = useState('');
    const [showToast, setShowToast] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Tracking helper
    const track = (action: string) => {
        try {
            navigator.sendBeacon('/api/track', JSON.stringify({
                action,
                path: typeof window !== 'undefined' ? window.location.pathname : '/card',
                ref: typeof document !== 'undefined' ? document.referrer : null,
                ua: navigator.userAgent,
                ts: Date.now()
            }));
        } catch {
            // ignore
        }
    };

    useEffect(() => {
        track('page_view');
        setYear(new Date().getFullYear());

        // Service Worker (offline card)
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/card/sw.js').catch(() => { });
        }

        // Entrance choreography
        const root = cardRef.current;
        if (!root) return;
        const items = root.querySelectorAll('[data-card-item]');
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.set(items, { opacity: 1, y: 0 });
            gsap.set(root, { opacity: 1, y: 0, scale: 1 });
            return;
        }
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.fromTo(root, { opacity: 0, y: 28, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.9 }, 0.1)
          .fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.35);
        return () => { tl.kill(); };
    }, []);

    const showToastMsg = (msg: string) => {
        setToastMsg(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1400);
    };

    const handleCopyEmail = async () => {
        const email = 'adil.ghazali@six50.io';
        try {
            await navigator.clipboard.writeText(email);
            showToastMsg('Copied ✓');
            track('copy_email');
        } catch {
            window.prompt('Copy email:', email);
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: 'six50 — Adil Ghazali',
            text: 'Check out my digital card.',
            url: window.location.href
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                track('share_native');
            } catch {
                // user cancelled
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                showToastMsg('Link Copied ✓');
                track('share_copy');
            } catch {
                showToastMsg('Copy failed');
            }
        }
    };

    const actionBtn = 'flex items-center justify-center gap-2.5 rounded-[3px] border border-line-strong px-4 py-3.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-paper transition-colors hover:border-gold-500 hover:bg-gold-100 hover:text-gold-500';

    return (
        <div className="relative z-[2] flex min-h-svh items-center justify-center px-4 py-12" data-no-burst>
            <main ref={cardRef} className="w-full max-w-md opacity-0">
                <section className="overflow-hidden rounded-md border border-line-strong bg-ink-800/90 shadow-2xl shadow-black/60 backdrop-blur-md">

                    {/* ledger header */}
                    <div data-card-item className="flex items-baseline justify-between border-b border-line px-6 py-4">
                        <span className="font-mono text-lg font-medium tracking-[0.02em] text-paper">
                            six<span className="text-gold-500">50</span><span className="text-gold-500">.</span>
                        </span>
                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fog-2">
                            Principal card · <span className="text-gold-500">001</span>
                        </span>
                    </div>

                    <div className="px-6 py-7 sm:px-8">
                        {/* identity */}
                        <div data-card-item>
                            <h1 className="font-display text-[2rem] leading-tight">
                                Adil <em className="serif-accent text-gold-500">Ghazali</em>
                            </h1>
                            <p className="mt-1 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-fog">
                                Founder &amp; Principal · CPA
                            </p>
                        </div>

                        <div data-card-item className="mt-4 flex flex-wrap gap-2">
                            {['Fractional CFO', 'AI Strategy', 'Workflow Automation'].map((c) => (
                                <span key={c} className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] text-fog">
                                    {c}
                                </span>
                            ))}
                        </div>

                        <p data-card-item className="mt-5 border-l-2 border-gold-500 pl-4 text-sm leading-relaxed text-fog">
                            Big Four financial rigor and practical AI-driven automation for
                            founder-led and PE-backed businesses.
                        </p>

                        {/* QR + save */}
                        <div data-card-item className="mt-6 flex items-center gap-5 rounded-md border border-line bg-ink-900/70 p-4">
                            <div className="shrink-0 rounded-[6px] bg-paper p-2.5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/card/qr-contact.svg" alt="QR code — scan to save Adil Ghazali's contact details" width={128} height={128} className="block h-[116px] w-[116px] sm:h-[128px] sm:w-[128px]" />
                            </div>
                            <div className="min-w-0">
                                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-blue-500">
                                    Scan to save contact
                                </p>
                                <p className="mt-1.5 text-[0.82rem] leading-snug text-fog">
                                    Point your camera — the contact card opens instantly.
                                </p>
                                <a
                                    href="/card/adil-ghazali.vcf"
                                    download
                                    onClick={() => track('save_contact')}
                                    className="mt-3 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-paper underline decoration-line-strong underline-offset-4 transition-colors hover:text-gold-500 hover:decoration-gold-500"
                                >
                                    <Download className="h-3.5 w-3.5" /> or download .vcf
                                </a>
                            </div>
                        </div>

                        {/* actions */}
                        <div data-card-item className="mt-5 grid grid-cols-2 gap-3">
                            <Magnetic className="!block">
                                <a
                                    href="/card/adil-ghazali.vcf"
                                    download
                                    onClick={() => track('save_contact')}
                                    className="flex w-full items-center justify-center gap-2.5 rounded-[3px] bg-gold-500 px-4 py-3.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-ink-900 transition-colors hover:bg-gold-400"
                                >
                                    <Download className="h-4 w-4" /> Save Contact
                                </a>
                            </Magnetic>
                            <a className={actionBtn} href="mailto:adil.ghazali@six50.io" onClick={() => track('email')}>
                                <Mail className="h-4 w-4" /> Email
                            </a>
                            <a className={actionBtn} href="https://six50.io" target="_blank" rel="noopener noreferrer" onClick={() => track('visit_website')}>
                                <Globe className="h-4 w-4" /> Website
                            </a>
                            <a className={actionBtn} href="https://calendly.com/adil-ghazali-six50" target="_blank" rel="noopener noreferrer" onClick={() => track('book_call')}>
                                <Calendar className="h-4 w-4" /> Book a Call
                            </a>
                        </div>

                        {/* email row */}
                        <div data-card-item className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-5">
                            <div className="min-w-0">
                                <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-fog-2">Email</p>
                                <a className="block truncate text-sm font-medium text-paper hover:text-gold-500" href="mailto:adil.ghazali@six50.io" onClick={() => track('email_inline')}>
                                    adil.ghazali@six50.io
                                </a>
                            </div>
                            <button
                                className="flex shrink-0 items-center gap-2 rounded-[3px] border border-line-strong px-3.5 py-2 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-paper transition-colors hover:border-gold-500 hover:text-gold-500"
                                onClick={handleCopyEmail}
                                type="button"
                            >
                                <Copy className="h-3.5 w-3.5" /> Copy
                            </button>
                        </div>

                        {/* share (mobile) */}
                        <div data-card-item className="mt-5 md:hidden">
                            <button
                                className="flex w-full items-center justify-center gap-2.5 rounded-[3px] border border-line-strong px-4 py-3.5 font-mono text-[0.78rem] uppercase tracking-[0.08em] text-paper transition-colors hover:border-gold-500"
                                onClick={handleShare}
                                type="button"
                            >
                                <Share2 className="h-4 w-4" /> Share Card
                            </button>
                        </div>
                    </div>

                    {/* ledger footer */}
                    <div data-card-item className="flex items-center justify-between border-t border-line px-6 py-3.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fog-2">
                        <span>© {year} six50 solutions</span>
                        <span>Finance × Intelligence</span>
                    </div>
                </section>

                <p data-card-item className="mt-4 text-center font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fog-2">
                    Chicago, IL · six50.io
                </p>
            </main>

            <div
                className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-md border border-line-strong bg-ink-800/90 px-4 py-2.5 font-mono text-xs text-paper shadow-2xl shadow-black/60 backdrop-blur-md transition-all duration-200 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 pointer-events-none'}`}
            >
                {toastMsg}
            </div>
        </div>
    );
}
