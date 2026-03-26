'use client';

import { useEffect, useState } from 'react';

export default function CardPage() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [toastMsg, setToastMsg] = useState('');
    const [showToast, setShowToast] = useState(false);

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
        } catch (e) {
            // ignore
        }
    };

    useEffect(() => {
        track('page_view');
        setYear(new Date().getFullYear());

        // Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/card/sw.js').catch(() => { });
        }
    }, []);

    const showToastMsg = (msg: string) => {
        setToastMsg(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 1400);
    };

    const handleCopyEmail = async () => {
        const email = "adil.ghazali@six50.io";
        try {
            await navigator.clipboard.writeText(email);
            showToastMsg("Copied ✓");
            track('copy_email');
        } catch (e) {
            window.prompt("Copy email:", email);
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
            } catch (err) {
                // User cancelled, mostly ignoring
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                showToastMsg("Link Copied ✓");
                track('share_copy');
            } catch (e) {
                showToastMsg("Copy failed");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 card-theme">
            <style jsx global>{`
        :root {
          --navy: #0B1F33;
          --gold: #D4AF37;
          --bg: #071522;
        }
        .card-theme {
          background:
            radial-gradient(1100px 700px at 50% -10%, rgba(212,175,55,0.10), transparent 60%),
            radial-gradient(900px 600px at 20% 10%, rgba(90,156,255,0.10), transparent 55%),
            linear-gradient(180deg, var(--bg, #071522), #050D16 65%, #040A12);
          color: rgba(255,255,255,0.92);
          font-family: sans-serif;
        }
        .glass {
          background: rgba(11,31,51,0.55);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .gold-ring {
          background: linear-gradient(90deg, rgba(212,175,55,0.55), rgba(212,175,55,0.10));
          border: 1px solid rgba(212,175,55,0.35);
        }
        .mark { letter-spacing: -0.03em; }
        .btn {
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          transition: transform .12s ease, background .12s ease, border-color .12s ease;
        }
        .btn:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.10);
          border-color: rgba(212,175,55,0.35);
        }
        .btn-primary {
          background: linear-gradient(135deg, rgba(212,175,55,0.95), rgba(212,175,55,0.55));
          color: rgba(11,31,51,0.98);
          border: 1px solid rgba(212,175,55,0.55);
        }
        .btn-primary:hover {
          transform: translateY(-1px);
          background: linear-gradient(135deg, rgba(212,175,55,1), rgba(212,175,55,0.62));
          border-color: rgba(212,175,55,0.75);
        }
        .muted { color: rgba(255,255,255,0.70); }
        .fine { color: rgba(255,255,255,0.62); }
        .divider { border-color: rgba(255,255,255,0.10); }
        .chip {
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.04);
        }
        .fade-in { animation: fadeIn .55s ease both; }
        @keyframes fadeIn { from{opacity:0; transform: translateY(6px);} to{opacity:1; transform:none;} }
        .toast {
          position: fixed;
          left: 50%;
          bottom: 18px;
          transform: translateX(-50%);
          padding: 10px 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(11,31,51,0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: rgba(255,255,255,0.92);
          font-size: 13px;
          box-shadow: 0 18px 48px rgba(0,0,0,0.55);
          opacity: 0;
          pointer-events: none;
          transition: opacity .18s ease, transform .18s ease;
          z-index: 50;
        }
        .toast.show { opacity: 1; transform: translateX(-50%) translateY(-4px); }
      `}</style>

            <main className="w-full max-w-md fade-in">
                <section className="glass rounded-3xl p-6 sm:p-7">
                    <header className="flex items-start gap-4">
                        <div className="gold-ring rounded-2xl p-2 shrink-0 bg-[#0B132B]">
                            <svg width="44" height="44" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id="goldGradientCard" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FCD34D" />
                                  <stop offset="50%" stopColor="#D4AF37" />
                                  <stop offset="100%" stopColor="#B45309" />
                                </linearGradient>
                                <linearGradient id="handGradientCard" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#FEF08A" />
                                  <stop offset="50%" stopColor="#FBBF24" />
                                  <stop offset="100%" stopColor="#D97706" />
                                </linearGradient>
                              </defs>
                              <circle cx="128" cy="128" r="96" fill="none" stroke="url(#goldGradientCard)" strokeWidth="12" />
                              <g fill="url(#goldGradientCard)">
                                <rect x="126" y="38" width="4" height="12" rx="2" transform="rotate(30 128 128)" />
                                <rect x="126" y="38" width="4" height="12" rx="2" transform="rotate(60 128 128)" />
                                <rect x="126" y="38" width="4" height="12" rx="2" transform="rotate(120 128 128)" />
                                <rect x="126" y="38" width="4" height="12" rx="2" transform="rotate(150 128 128)" />
                                <rect x="126" y="38" width="4" height="12" rx="2" transform="rotate(210 128 128)" />
                                <rect x="126" y="38" width="4" height="12" rx="2" transform="rotate(240 128 128)" />
                                <rect x="126" y="38" width="4" height="12" rx="2" transform="rotate(300 128 128)" />
                                <rect x="126" y="38" width="4" height="12" rx="2" transform="rotate(330 128 128)" />
                                <rect x="123" y="36" width="10" height="24" rx="3" transform="rotate(0 128 128)" />
                                <rect x="123" y="36" width="10" height="24" rx="3" transform="rotate(90 128 128)" />
                                <rect x="123" y="36" width="10" height="24" rx="3" transform="rotate(180 128 128)" />
                                <rect x="123" y="36" width="10" height="24" rx="3" transform="rotate(270 128 128)" />
                              </g>
                              <g>
                                <rect x="120" y="52" width="16" height="76" rx="8" fill="url(#handGradientCard)" transform="rotate(300 128 128)" />
                                <rect x="119" y="76" width="18" height="52" rx="9" fill="url(#handGradientCard)" transform="rotate(205 128 128)" />
                                <circle cx="128" cy="128" r="12" fill="#0B1F33" stroke="url(#handGradientCard)" strokeWidth="8" />
                              </g>
                            </svg>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h1 className="text-[32px] font-semibold tracking-[-0.03em]">
                                    six<span className="text-[#D4AF37]">50</span>
                                </h1>
                                <span className="chip text-[10px] px-2 py-0.5 rounded-full fine mt-1">six50.io</span>
                            </div>
                            <p className="mt-1 text-sm muted">Financial Expertise &amp; AI-Driven Automation</p>
                            <p className="mt-3 text-sm leading-6">
                                <span className="font-medium">Adil Ghazali</span>
                                <span className="fine"> • Founder & Principal</span>
                            </p>
                            <p className="mt-1 text-sm muted">Fractional CFO • AI Strategy • Workflow Automation</p>
                        </div>
                    </header>

                    <hr className="my-5 divider" />

                    <div className="grid grid-cols-2 gap-3">
                        <a className="btn-primary rounded-2xl px-4 py-3 text-sm font-semibold text-center flex items-center justify-center" href="/card/adil-ghazali.vcf" download onClick={() => track('save_contact')}>
                            Save Contact
                        </a>
                        <a className="btn rounded-2xl px-4 py-3 text-sm font-semibold text-center flex items-center justify-center" href="mailto:adil.ghazali@six50.io" onClick={() => track('email')}>
                            Email
                        </a>
                        <a className="btn rounded-2xl px-4 py-3 text-sm font-semibold text-center flex items-center justify-center" href="https://six50.io" target="_blank" rel="noopener noreferrer" onClick={() => track('visit_website')}>
                            Visit Website
                        </a>
                        <a className="btn rounded-2xl px-4 py-3 text-sm font-semibold text-center flex items-center justify-center" href="https://calendly.com/adil-ghazali-six50" target="_blank" rel="noopener noreferrer" onClick={() => track('book_call')}>
                            Book a Call
                        </a>
                    </div>

                    <div className="mt-5 rounded-2xl chip p-4">
                        <p className="text-sm muted">
                            Bringing Big Four financial rigor and practical AI-driven automation to founder-led and PE-backed businesses.
                        </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs fine">Email</p>
                            <a className="text-sm font-medium hover:underline" href="mailto:adil.ghazali@six50.io" onClick={() => track('email_inline')}>adil.ghazali@six50.io</a>
                        </div>
                        <button className="btn rounded-2xl px-4 py-2 text-sm font-semibold" onClick={handleCopyEmail} type="button">
                            Copy Email
                        </button>
                    </div>

                    {/* Share Button (Mobile Only) */}
                    <div className="mt-6 md:hidden">
                        <button className="btn rounded-2xl px-4 py-3 text-sm font-semibold w-full flex items-center justify-center" onClick={handleShare} type="button">
                            Share Card
                        </button>
                    </div>

                </section>

                <p className="mt-4 text-center text-xs fine">
                    © {year} six50 — Strategy & Consulting
                </p>
            </main>

            <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
                {toastMsg}
            </div>
        </div>
    );
}
