
import { Activity, Clock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    const metrics = [
        { label: "Processes Automated", value: "3", change: "+1 this week", icon: Activity, color: "text-blue-500" },
        { label: "Est. Manual Hours Reduced", value: "120h", change: "Annualized", icon: Clock, color: "text-purple-500" },
        { label: "Projected ROI", value: "3.5x", change: "Year 1", icon: TrendingUp, color: "text-green-500" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Welcome back, Adil.</h1>
                <p className="text-slate-500 mt-2">Here's an overview of your engagement with six50.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((m) => (
                    <div key={m.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg bg-slate-50 ${m.color}`}>
                                <m.icon size={20} />
                            </div>
                            <span className="text-xs font-medium text-slate-400">{m.change}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{m.value}</h3>
                        <p className="text-sm text-slate-500">{m.label}</p>
                    </div>
                ))}
            </div>

            {/* Upcoming Actions / Status */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="font-semibold text-slate-900">Current Status: Execution Phase</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                        <div className="flex-col items-center hidden sm:flex">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">✓</div>
                            <div className="w-0.5 h-full bg-slate-100 my-2"></div>
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-900">Phase 1: Discovery & Audit</h4>
                            <p className="text-sm text-slate-500 mt-1">Completed audit of internal knowledge base and current response workflows.</p>
                            <p className="text-xs text-slate-400 mt-2">Completed Jan 15, 2026</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-col items-center hidden sm:flex">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold animate-pulse">2</div>
                            <div className="w-0.5 h-full bg-slate-100 my-2"></div>
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-900">Phase 2: Implementation (Current)</h4>
                            <p className="text-sm text-slate-500 mt-1">Building out the initial chatbot agent and configuring email routing logic.</p>
                            <div className="mt-3 flex gap-2">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">In Progress</span>
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">Est. Completion: Jan 30</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 opacity-50">
                        <div className="flex-col items-center hidden sm:flex">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">3</div>
                        </div>
                        <div>
                            <h4 className="font-medium text-slate-900">Phase 3: Verification & Handover</h4>
                            <p className="text-sm text-slate-500 mt-1">Testing all workflows and training internal team on new tools.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
