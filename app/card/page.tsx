'use client';

import { useEffect, useState, FormEvent } from 'react';

export default function CardPage() {
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [leadVisible, setLeadVisible] = useState(true);
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

    const handleLeadSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const leadEmail = fd.get('email');

        try {
            const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: leadEmail, source: 'six50_card', ts: Date.now() })
            });
            if (res.ok) {
                showToastMsg("Sent ✓");
                track('lead_submit');
                (e.target as HTMLFormElement).reset();
            } else {
                showToastMsg("Try Email");
                track('lead_submit_fail');
            }
        } catch (err) {
            showToastMsg("Try Email");
            track('lead_submit_err');
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

    const toggleLead = () => {
        const newVal = !leadVisible;
        setLeadVisible(newVal);
        track(newVal ? 'lead_show' : 'lead_hide');
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
        .shimmer {
          background-size: 220% 220%;
          background-image: linear-gradient(90deg, #0B1F33, #D4AF37, #2D70FF, #D4AF37, #0B1F33);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 4.8s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
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
        .input {
          width: 100%;
          border-radius: 16px;
          padding: 12px 12px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.92);
          outline: none;
        }
        .input:focus { border-color: rgba(212,175,55,0.45); }
      `}</style>

            <main className="w-full max-w-md fade-in">
                <section className="glass rounded-3xl p-6 sm:p-7">
                    <header className="flex items-start gap-4">
                        <div className="gold-ring rounded-2xl p-3 shrink-0">
                            <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <rect x="6" y="6" width="52" height="52" rx="16" fill="#0B1F33" />
                                <path d="M20 39c1.9 6 7 9.6 13.4 9.6 9 0 14.6-5.2 14.6-12.6 0-8.4-6.3-12.6-14.5-12.6-3.7 0-6.9 1-9 2.9l2-10.8h18.6v-5.8H26.2L22 31.2l5.8 1c2.1-2.7 4.4-4.3 8.1-4.3 4.7 0 8.1 3 8.1 8.1 0 5-3.3 8.1-8.1 8.1-3.6 0-6.6-1.6-7.8-5.1H20z" fill="#D4AF37" />
                            </svg>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                                <h1 className="text-3xl font-semibold mark">six<span className="shimmer font-semibold">50</span></h1>
                                <span className="chip text-xs px-2 py-1 rounded-full fine">six50.io</span>
                            </div>
                            <p className="mt-1 text-sm muted">Where clarity triggers transformation</p>
                            <p className="mt-3 text-sm leading-6">
                                <span className="font-medium">Adil Ghazali</span>
                                <span className="fine"> • Founder & Principal</span>
                            </p>
                            <p className="mt-1 text-sm muted">AI Strategy • Automation • Risk & Ops Transformation</p>
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
                            Helping organizations turn complex data, emerging technology, and operational constraints into trusted, measurable impact.
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

                    {/* Lead capture */}
                    <div className="mt-6 rounded-2xl chip p-4">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold">Get the six50 Playbook</p>
                                <p className="mt-1 text-sm muted">Drop your email — I’ll send a short AI transformation checklist.</p>
                            </div>
                            <button className="btn rounded-2xl px-3 py-2 text-xs font-semibold" onClick={toggleLead} type="button">
                                {leadVisible ? "Hide" : "Show"}
                            </button>
                        </div>

                        {leadVisible && (
                            <form className="mt-3" onSubmit={handleLeadSubmit}>
                                <input className="input" type="email" name="email" required placeholder="you@company.com" autoComplete="email" />
                                <div className="mt-3 flex gap-3">
                                    <button className="btn-primary rounded-2xl px-4 py-3 text-sm font-semibold flex-1" type="submit">Send it</button>
                                    <a className="btn rounded-2xl px-4 py-3 text-sm font-semibold text-center flex items-center justify-center" href="mailto:adil.ghazali@six50.io?subject=six50%20Playbook%20Request&body=Hi%20Adil%2C%20please%20send%20me%20the%20six50%20playbook." onClick={() => track('lead_mailto')}>Email me</a>
                                </div>
                                <p className="mt-2 text-xs fine">No spam. Unsubscribe anytime. (We just use this to follow up.)</p>
                            </form>
                        )}
                    </div>

                    {/* Share Button (Mobile Only) */}
                    <div className="mt-6 md:hidden">
                        <button className="btn rounded-2xl px-4 py-3 text-sm font-semibold w-full flex items-center justify-center" onClick={handleShare} type="button">
                            Share Card
                        </button>
                    </div>



                </section>

                <p className="mt-4 text-center text-xs fine">
                    © {year} six50 — clarity → transformation
                </p>
            </main>

            <div className={`toast ${showToast ? 'show' : ''}`} id="toast">
                {toastMsg}
            </div>
        </div>
    );
}
