"use client";

import React from 'react';

export default function PlaybookPage() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#D4AF37] selection:text-white pb-20 print:pb-0">
            <style jsx global>{`
        @media print {
          @page { margin: 1.5cm; }
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          a { text-decoration: none; color: inherit; }
        }
      `}</style>

            {/* Navigation / Actions - Hidden in Print */}
            <div className="fixed top-0 left-0 right-0 bg-[#0B1F33] text-white p-4 flex justify-between items-center z-50 no-print shadow-lg">
                <div className="font-semibold text-lg tracking-tight">six50 <span className="text-[#D4AF37]">Playbook</span></div>
                <button
                    onClick={() => window.print()}
                    className="bg-[#D4AF37] text-[#0B1F33] px-4 py-2 rounded-lg font-semibold hover:bg-[#b5952f] transition-colors flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download PDF
                </button>
            </div>

            <div className="max-w-[800px] mx-auto pt-24 px-8 print:pt-0 print:px-0">

                {/* Header */}
                <header className="border-b-4 border-[#0B1F33] pb-6 mb-12">
                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="text-4xl font-bold text-[#0B1F33] tracking-tight mb-2">Client Delivery Playbook</h1>
                            <p className="text-xl text-[#D4AF37] font-medium">From Insight to Impact</p>
                        </div>
                        <div className="text-right">
                            <div className="bg-[#0B1F33] text-white font-bold text-xl px-4 py-2 inline-block">six50</div>
                        </div>
                    </div>
                </header>

                {/* Purpose */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#0B1F33] mb-4 uppercase tracking-wider text-sm border-l-4 border-[#D4AF37] pl-3 py-1">Purpose of This Playbook</h2>
                    <p className="text-lg leading-relaxed text-gray-700 mb-6">
                        This playbook outlines how six50 partners with clients to identify opportunities, design solutions, and deliver measurable outcomes using AI, automation, and modern operating models.
                    </p>
                    <div className="bg-gray-50 p-6 border border-gray-100 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-3">It answers three questions clients always ask:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                            <li><span className="font-medium text-[#0B1F33]">What exactly will you do?</span></li>
                            <li><span className="font-medium text-[#0B1F33]">How long will it take?</span></li>
                            <li><span className="font-medium text-[#0B1F33]">How will this actually move my business forward?</span></li>
                        </ul>
                    </div>
                </section>

                {/* Engagement Philosophy */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#0B1F33] mb-6 uppercase tracking-wider text-sm border-l-4 border-[#D4AF37] pl-3 py-1">Our Engagement Philosophy</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-[#0B1F33] text-white p-6 rounded-lg shadow-sm print:bg-white print:text-black print:border print:border-gray-200">
                            <ul className="space-y-3 font-medium">
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">✓</span> Outcome-driven (not tool-driven)</li>
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">✓</span> Fast, pragmatic, and iterative</li>
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">✓</span> Built for operators, not slideware</li>
                                <li className="flex items-start gap-2"><span className="text-[#D4AF37] mt-1">✓</span> Designed to scale with your business</li>
                            </ul>
                        </div>
                        <div className="flex flex-col justify-center text-lg italic text-gray-600 border-l-4 border-gray-200 pl-6">
                            <p>“We don’t sell AI for AI’s sake. We solve real operational problems with clear ROI.”</p>
                        </div>
                    </div>
                </section>

                {/* Break Page for Print if needed */}
                <div className="break-inside-avoid-page"></div>

                {/* Engagement Overview */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-[#0B1F33] mb-6 uppercase tracking-wider text-sm border-l-4 border-[#D4AF37] pl-3 py-1">Engagement Overview</h2>
                    <p className="mb-6 text-gray-700">Most engagements follow a 4-phase model, with flexibility based on client maturity.</p>

                    <div className="overflow-hidden border border-gray-200 rounded-lg mb-8">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[#0B1F33] border-b border-gray-200 text-sm uppercase tracking-wide">
                                    <th className="p-4 font-bold w-16">Phase</th>
                                    <th className="p-4 font-bold">Focus</th>
                                    <th className="p-4 font-bold text-right">Typical Duration</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                <tr className="bg-white">
                                    <td className="p-4 font-bold text-[#D4AF37]">1</td>
                                    <td className="p-4 font-medium">Diagnose & Prioritize</td>
                                    <td className="p-4 text-right">1–2 weeks</td>
                                </tr>
                                <tr className="bg-gray-50/50">
                                    <td className="p-4 font-bold text-[#D4AF37]">2</td>
                                    <td className="p-4 font-medium">Design & Blueprint</td>
                                    <td className="p-4 text-right">1–2 weeks</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="p-4 font-bold text-[#D4AF37]">3</td>
                                    <td className="p-4 font-medium">Build & Implement</td>
                                    <td className="p-4 text-right">2–6 weeks</td>
                                </tr>
                                <tr className="bg-gray-50/50">
                                    <td className="p-4 font-bold text-[#D4AF37]">4</td>
                                    <td className="p-4 font-medium">Optimize & Scale</td>
                                    <td className="p-4 text-right">Ongoing / Optional</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Phase 1 */}
                <div className="break-before-page"></div>
                <section className="mb-10">
                    <h3 className="text-xl font-bold text-white bg-[#0B1F33] px-4 py-2 inline-block rounded-t-lg mb-0 text-transform uppercase tracking-wider">Phase 1: Diagnose & Prioritize</h3>
                    <div className="border border-[#0B1F33] p-6 rounded-b-lg rounded-tr-lg shadow-sm mt-[-1px] bg-white">
                        <p className="text-gray-700 italic mb-6 border-b border-gray-100 pb-4">Objective: Identify where AI, automation, or process redesign will create the most value now.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
                            <div>
                                <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-wider mb-3">What We Do</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                    <li>Stakeholder interviews (owners, operators)</li>
                                    <li>Process walkthroughs (current-state mapping)</li>
                                    <li>Data & system inventory</li>
                                    <li>Pain-point and risk identification</li>
                                    <li>Quick ROI and feasibility scoring</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-wider mb-3">Client Deliverables</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                    <li>Opportunity Heatmap</li>
                                    <li>Top 5–10 Use Case Shortlist</li>
                                    <li>Quick-Win vs. Strategic Initiative Split</li>
                                    <li>High-level ROI assumptions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Phase 2 */}
                <section className="mb-10 break-inside-avoid">
                    <h3 className="text-xl font-bold text-white bg-[#0B1F33] px-4 py-2 inline-block rounded-t-lg mb-0 text-transform uppercase tracking-wider">Phase 2: Design & Blueprint</h3>
                    <div className="border border-[#0B1F33] p-6 rounded-b-lg rounded-tr-lg shadow-sm mt-[-1px] bg-white">
                        <p className="text-gray-700 italic mb-6 border-b border-gray-100 pb-4">Objective: Turn prioritized ideas into an executable plan.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
                            <div>
                                <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-wider mb-3">What We Do</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                    <li>Future-state process design</li>
                                    <li>AI & automation architecture selection</li>
                                    <li>Tool selection (buy vs. build vs. integrate)</li>
                                    <li>Data flow and control design</li>
                                </ul>
                                <div className="mt-4 bg-red-50 p-3 rounded text-xs text-red-800 border border-red-100">
                                    <span className="font-bold">Avoids:</span> Over-engineering, Tool sprawl, Vendor-driven solutions
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-wider mb-3">Client Deliverables</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                    <li>Solution Blueprint</li>
                                    <li>Process Maps (Before / After)</li>
                                    <li>Tech Stack Recommendation</li>
                                    <li>Implementation Plan & Timeline</li>
                                    <li>Cost & ROI Model</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Phase 3 */}
                <div className="break-before-page"></div>
                <section className="mb-10 break-inside-avoid">
                    <h3 className="text-xl font-bold text-white bg-[#0B1F33] px-4 py-2 inline-block rounded-t-lg mb-0 text-transform uppercase tracking-wider">Phase 3: Build & Implement</h3>
                    <div className="border border-[#0B1F33] p-6 rounded-b-lg rounded-tr-lg shadow-sm mt-[-1px] bg-white">
                        <p className="text-gray-700 italic mb-6 border-b border-gray-100 pb-4">Objective: Make it real — fast, stable, and usable.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
                            <div>
                                <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-wider mb-3">What We Do</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                    <li>Automation build (workflows, agents)</li>
                                    <li>AI model configuration</li>
                                    <li>System integrations (finance, ops, CRM)</li>
                                    <li>User testing and iteration</li>
                                </ul>
                                <p className="mt-3 text-xs text-gray-500"><span className="font-semibold text-[#0B1F33]">How We Work:</span> Weekly demos, Rapid feedback loops, Minimal disruption</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-wider mb-3">Client Deliverables</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                    <li>Live, working solution</li>
                                    <li>User documentation</li>
                                    <li>Control & exception handling</li>
                                    <li>Training session(s)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Phase 4 */}
                <section className="mb-12 break-inside-avoid">
                    <h3 className="text-xl font-bold text-white bg-gray-500 px-4 py-2 inline-block rounded-t-lg mb-0 text-transform uppercase tracking-wider">Phase 4: Optimize & Scale</h3>
                    <div className="border border-gray-300 p-6 rounded-b-lg rounded-tr-lg shadow-sm mt-[-1px] bg-white">
                        <p className="text-gray-700 italic mb-6 border-b border-gray-100 pb-4">Objective: Improve performance and expand impact over time.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:grid-cols-2">
                            <div>
                                <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-wider mb-3">What We Do</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                    <li>Performance monitoring</li>
                                    <li>Accuracy and efficiency tuning</li>
                                    <li>New use-case expansion</li>
                                    <li>Advanced analytics and dashboards</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-[#D4AF37] uppercase text-xs tracking-wider mb-3">Example Add-Ons</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                                    <li>AI forecasting</li>
                                    <li>Intelligent alerts</li>
                                    <li>Financial & operational dashboards</li>
                                    <li>Autonomous agents for repetitive tasks</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases & Success */}
                <div className="break-before-page"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 print:grid-cols-2">
                    <section>
                        <h2 className="text-lg font-bold text-[#0B1F33] mb-4 uppercase tracking-wider border-b border-[#D4AF37] pb-2">Common Use Cases</h2>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2"><span className="text-[#D4AF37] font-bold">›</span> Transaction classification & bookkeeping</li>
                            <li className="flex items-start gap-2"><span className="text-[#D4AF37] font-bold">›</span> Invoice processing & collections</li>
                            <li className="flex items-start gap-2"><span className="text-[#D4AF37] font-bold">›</span> Inventory and supply-chain tracking</li>
                            <li className="flex items-start gap-2"><span className="text-[#D4AF37] font-bold">›</span> Customer intake & routing</li>
                            <li className="flex items-start gap-2"><span className="text-[#D4AF37] font-bold">›</span> Reporting and dashboard automation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-[#0B1F33] mb-4 uppercase tracking-wider border-b border-[#D4AF37] pb-2">How We Measure Success</h2>
                        <div className="grid grid-cols-2 gap-3 text-sm font-medium text-gray-800">
                            <div className="bg-green-50 p-2 rounded text-center border border-green-100">Hours saved</div>
                            <div className="bg-green-50 p-2 rounded text-center border border-green-100">Cost reduction</div>
                            <div className="bg-green-50 p-2 rounded text-center border border-green-100">Error-rate reduction</div>
                            <div className="bg-green-50 p-2 rounded text-center border border-green-100">Cash flow improvement</div>
                        </div>
                    </section>
                </div>

                {/* Footer info */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
                    <p className="mb-2 font-bold text-[#0B1F33]">Why six50? Operator mindset • Finance + tech fluency • AI grounded in business reality</p>
                    <p>www.six50.io • adil.ghazali@six50.io</p>
                </div>

            </div>
        </div>
    );
}
