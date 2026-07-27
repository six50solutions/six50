"use client";

import React from 'react';

// Design notes for whoever touches this next:
//
// 1. This page has its OWN content and does not rely on the global nav for
//    anything except top clearance — no fixed header lives here anymore. The
//    old version had a `fixed top-0` bar with its own "six50 Playbook" mark
//    and Download PDF button, which was fine before the site had a
//    persistent global nav. Once that nav shipped, both rendered stacked on
//    top of each other. Don't reintroduce a fixed header here.
//
// 2. Every color on screen now comes from the site's actual dark palette
//    (#0B1F33 navy, #D4AF37 gold — pulled from what was already hardcoded
//    elsewhere in this file, since that's the real current brand). The old
//    version mixed those with default Tailwind grays (text-gray-900,
//    bg-gray-50, bg-white) that assume a light page — that mismatch was the
//    "ghosted, unreadable text" bug. If you add a new section, match the
//    tokens below rather than reaching for bg-white / text-gray-900.
//
// 3. Print is intentionally NOT dark. Nobody wants a navy PDF that burns
//    through printer ink, and dark-on-dark doesn't even work as ink on paper.
//    Every print: override below forces white background, black text — the
//    print stylesheet's job is to undo the screen theme, not match it.

const NAVY = '#0B1F33';
const GOLD = '#D4AF37';

export default function PlaybookPage() {
  return (
    <div className="min-h-screen bg-[#0B1F33] text-[#F4F1E9] font-sans selection:bg-[#D4AF37] selection:text-[#0B1F33] pb-20 print:bg-white print:text-black print:pb-0">
      <style jsx global>{`
        @media print {
          @page { margin: 1.5cm; }
          .no-print { display: none !important; }
          body { background: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          a { text-decoration: none; color: inherit; }
        }
      `}</style>

      {/* pt-16 clears the site's persistent global nav — adjust if that nav's
          height ever changes. No fixed element of our own here anymore. */}
      <div className="max-w-[800px] mx-auto pt-16 px-6 sm:px-8 print:pt-0 print:px-0">

        {/* Header */}
        <header className="border-b-4 pb-6 mb-10 flex justify-between items-end gap-6" style={{ borderColor: NAVY }}>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-[#F4F1E9] print:text-black">
              Client Delivery Playbook
            </h1>
            <p className="text-lg sm:text-xl font-medium" style={{ color: GOLD }}>
              <span className="print:hidden">From Insight to Impact</span>
              <span className="hidden print:inline text-gray-700">From Insight to Impact</span>
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="no-print flex-none rounded-lg px-4 py-2.5 font-semibold flex items-center gap-2 transition-colors"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </header>

        {/* Purpose */}
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 border-l-4 pl-3 py-1 text-[#F4F1E9] print:text-black"
              style={{ borderColor: GOLD }}>
            Purpose of This Playbook
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-[#F4F1E9]/80 print:text-gray-700">
            This playbook outlines how six50 partners with clients to identify opportunities, design
            solutions, and deliver measurable outcomes using AI, automation, and modern operating models.
          </p>
          <div className="p-6 rounded-lg border" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}>
            <p className="font-semibold mb-3 text-[#F4F1E9] print:text-black">It answers three questions clients always ask:</p>
            <ul className="list-disc pl-5 space-y-2 text-[#F4F1E9]/80 print:text-gray-700">
              <li><span className="font-medium" style={{ color: GOLD }}>What exactly will you do?</span></li>
              <li><span className="font-medium" style={{ color: GOLD }}>How long will it take?</span></li>
              <li><span className="font-medium" style={{ color: GOLD }}>How will this actually move my business forward?</span></li>
            </ul>
          </div>
        </section>

        {/* Engagement Philosophy */}
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-6 border-l-4 pl-3 py-1 text-[#F4F1E9] print:text-black"
              style={{ borderColor: GOLD }}>
            Our Engagement Philosophy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border print:border-gray-300" style={{ backgroundColor: NAVY, borderColor: NAVY }}>
              <ul className="space-y-3 font-medium text-[#F4F1E9] print:text-black">
                <li className="flex items-start gap-2"><span style={{ color: GOLD }} className="mt-1">&#10003;</span> Outcome-driven (not tool-driven)</li>
                <li className="flex items-start gap-2"><span style={{ color: GOLD }} className="mt-1">&#10003;</span> Fast, pragmatic, and iterative</li>
                <li className="flex items-start gap-2"><span style={{ color: GOLD }} className="mt-1">&#10003;</span> Built for operators, not slideware</li>
                <li className="flex items-start gap-2"><span style={{ color: GOLD }} className="mt-1">&#10003;</span> Designed to scale with your business</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center text-lg italic border-l-4 pl-6 text-[#F4F1E9]/70 print:text-gray-600"
                 style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <p>&ldquo;We don&rsquo;t sell AI for AI&rsquo;s sake. We solve real operational problems with clear ROI.&rdquo;</p>
            </div>
          </div>
        </section>

        {/* Engagement Overview */}
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-6 border-l-4 pl-3 py-1 text-[#F4F1E9] print:text-black"
              style={{ borderColor: GOLD }}>
            Engagement Overview
          </h2>
          <p className="mb-6 text-[#F4F1E9]/80 print:text-gray-700">Most engagements follow a 4-phase model, with flexibility based on client maturity.</p>

          <div className="overflow-hidden border rounded-lg mb-8 print:border-gray-300" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm uppercase tracking-wide print:text-black" style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                  <th className="p-4 font-bold w-16 text-[#F4F1E9] print:text-black">Phase</th>
                  <th className="p-4 font-bold text-[#F4F1E9] print:text-black">Focus</th>
                  <th className="p-4 font-bold text-right text-[#F4F1E9] print:text-black">Typical Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y print:divide-gray-200" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                {[
                  ['1', 'Diagnose & Prioritize', '1\u20132 weeks'],
                  ['2', 'Design & Blueprint', '1\u20132 weeks'],
                  ['3', 'Build & Implement', '2\u20136 weeks'],
                  ['4', 'Optimize & Scale', 'Ongoing / Optional'],
                ].map(([n, focus, dur], i) => (
                  <tr key={n} style={{ backgroundColor: i % 2 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td className="p-4 font-bold" style={{ color: GOLD }}>{n}</td>
                    <td className="p-4 font-medium text-[#F4F1E9] print:text-gray-800">{focus}</td>
                    <td className="p-4 text-right text-[#F4F1E9]/80 print:text-gray-600">{dur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Phases 1-4 */}
        {[
          {
            n: '1', title: 'Diagnose & Prioritize',
            objective: 'Identify where AI, automation, or process redesign will create the most value now.',
            doCol: ['Stakeholder interviews (owners, operators)', 'Process walkthroughs (current-state mapping)', 'Data & system inventory', 'Pain-point and risk identification', 'Quick ROI and feasibility scoring'],
            deliverCol: ['Opportunity Heatmap', 'Top 5\u201310 Use Case Shortlist', 'Quick-Win vs. Strategic Initiative Split', 'High-level ROI assumptions'],
            breakBefore: false, accent: NAVY,
          },
          {
            n: '2', title: 'Design & Blueprint',
            objective: 'Turn prioritized ideas into an executable plan.',
            doCol: ['Future-state process design', 'AI & automation architecture selection', 'Tool selection (buy vs. build vs. integrate)', 'Data flow and control design'],
            avoids: 'Over-engineering, tool sprawl, vendor-driven solutions',
            deliverCol: ['Solution Blueprint', 'Process Maps (Before / After)', 'Tech Stack Recommendation', 'Implementation Plan & Timeline', 'Cost & ROI Model'],
            breakBefore: false, accent: NAVY,
          },
          {
            n: '3', title: 'Build & Implement',
            objective: 'Make it real \u2014 fast, stable, and usable.',
            doCol: ['Automation build (workflows, agents)', 'AI model configuration', 'System integrations (finance, ops, CRM)', 'User testing and iteration'],
            howWeWork: 'Weekly demos, rapid feedback loops, minimal disruption',
            deliverCol: ['Live, working solution', 'User documentation', 'Control & exception handling', 'Training session(s)'],
            breakBefore: true, accent: NAVY,
          },
          {
            n: '4', title: 'Optimize & Scale',
            objective: 'Improve performance and expand impact over time.',
            doCol: ['Performance monitoring', 'Accuracy and efficiency tuning', 'New use-case expansion', 'Advanced analytics and dashboards'],
            deliverLabel: 'Example Add-Ons',
            deliverCol: ['AI forecasting', 'Intelligent alerts', 'Financial & operational dashboards', 'Autonomous agents for repetitive tasks'],
            breakBefore: false, accent: '#4B5563',
          },
        ].map((phase) => (
          <React.Fragment key={phase.n}>
            {phase.breakBefore && <div className="break-before-page" />}
            <section className="mb-10 break-inside-avoid">
              <h3 className="text-xl font-bold px-4 py-2 inline-block rounded-t-lg mb-0 uppercase tracking-wider text-[#F4F1E9] print:text-white"
                  style={{ backgroundColor: phase.accent }}>
                Phase {phase.n}: {phase.title}
              </h3>
              <div className="p-6 rounded-b-lg rounded-tr-lg border print:border-gray-300"
                   style={{ borderColor: phase.accent, marginTop: '-1px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <p className="italic mb-6 pb-4 border-b text-[#F4F1E9]/70 print:text-gray-600"
                   style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                  Objective: {phase.objective}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
                  <div>
                    <h4 className="font-bold uppercase text-xs tracking-wider mb-3" style={{ color: GOLD }}>What We Do</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-[#F4F1E9]/80 print:text-gray-700">
                      {phase.doCol.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    {phase.avoids && (
                      <div className="mt-4 p-3 rounded text-xs border" style={{ backgroundColor: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.3)', color: '#FCA5A5' }}>
                        <span className="font-bold">Avoids:</span> {phase.avoids}
                      </div>
                    )}
                    {phase.howWeWork && (
                      <p className="mt-3 text-xs text-[#F4F1E9]/60 print:text-gray-500">
                        <span className="font-semibold text-[#F4F1E9] print:text-black">How We Work: </span>{phase.howWeWork}
                      </p>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-xs tracking-wider mb-3" style={{ color: GOLD }}>
                      {phase.deliverLabel ?? 'Client Deliverables'}
                    </h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm text-[#F4F1E9]/80 print:text-gray-700">
                      {phase.deliverCol.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        ))}

        {/* Use Cases & Success */}
        <div className="break-before-page" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 print:grid-cols-2">
          <section>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider border-b pb-2 text-[#F4F1E9] print:text-black"
                style={{ borderColor: GOLD }}>
              Common Use Cases
            </h2>
            <ul className="space-y-2 text-sm text-[#F4F1E9]/80 print:text-gray-700">
              {['Transaction classification & bookkeeping', 'Invoice processing & collections', 'Inventory and supply-chain tracking', 'Customer intake & routing', 'Reporting and dashboard automation'].map((u) => (
                <li key={u} className="flex items-start gap-2"><span style={{ color: GOLD }} className="font-bold">&rsaquo;</span> {u}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold mb-4 uppercase tracking-wider border-b pb-2 text-[#F4F1E9] print:text-black"
                style={{ borderColor: GOLD }}>
              How We Measure Success
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm font-medium">
              {['Hours saved', 'Cost reduction', 'Error-rate reduction', 'Cash flow improvement'].map((m) => (
                <div key={m} className="p-2 rounded text-center border text-[#F4F1E9] print:text-black print:border-gray-300"
                     style={{ backgroundColor: 'rgba(212,175,55,0.08)', borderColor: 'rgba(212,175,55,0.3)' }}>
                  {m}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-[#F4F1E9]/60 print:text-gray-500 print:border-gray-300"
             style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <p className="mb-2 font-bold text-[#F4F1E9] print:text-black">
            Why six50? Operator mindset &middot; Finance + tech fluency &middot; AI grounded in business reality
          </p>
          <p>www.six50.io &middot; adil.ghazali@six50.io</p>
        </div>

      </div>
    </div>
  );
}
