
export default function TimelinePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Project Timeline</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 group-[.is-active]:bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            ✓
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-sm">
                            <div className="flex items-center justify-between space-x-2 mb-1">
                                <div className="font-bold text-slate-900">Kickoff & Discovery</div>
                                <div className="text-slate-500 text-xs">Jan 1 - Jan 15</div>
                            </div>
                            <div className="text-slate-500 text-sm">Initial stakeholder interviews and access provisioning.</div>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            2
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
                            <div className="flex items-center justify-between space-x-2 mb-1">
                                <div className="font-bold text-slate-900">Development</div>
                                <div className="text-blue-600 text-xs font-bold">Current</div>
                            </div>
                            <div className="text-slate-500 text-sm">Building core agents and integrations.</div>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            3
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded border border-slate-200 shadow-sm opacity-60">
                            <div className="flex items-center justify-between space-x-2 mb-1">
                                <div className="font-bold text-slate-900">UAT & Launch</div>
                                <div className="text-slate-500 text-xs">Feb 1 - Feb 15</div>
                            </div>
                            <div className="text-slate-500 text-sm">User acceptance testing and final deployment.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
