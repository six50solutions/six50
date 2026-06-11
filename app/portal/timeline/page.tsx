
export default function TimelinePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-paper">Project Timeline</h1>
            <div className="bg-ink-800 p-8 rounded-xl shadow-sm border border-line">
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 group-[.is-active]:bg-green-500 text-paper shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            ✓
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-ink-800 p-4 rounded border border-line shadow-sm">
                            <div className="flex items-center justify-between space-x-2 mb-1">
                                <div className="font-bold text-paper">Kickoff & Discovery</div>
                                <div className="text-fog text-xs">Jan 1 - Jan 15</div>
                            </div>
                            <div className="text-fog text-sm">Initial stakeholder interviews and access provisioning.</div>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-paper shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            2
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-ink-800 p-4 rounded border border-line shadow-sm border-l-4 border-l-blue-600">
                            <div className="flex items-center justify-between space-x-2 mb-1">
                                <div className="font-bold text-paper">Development</div>
                                <div className="text-blue-600 text-xs font-bold">Current</div>
                            </div>
                            <div className="text-fog text-sm">Building core agents and integrations.</div>
                        </div>
                    </div>
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-fog shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            3
                        </div>
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-ink-800 p-4 rounded border border-line shadow-sm opacity-60">
                            <div className="flex items-center justify-between space-x-2 mb-1">
                                <div className="font-bold text-paper">UAT & Launch</div>
                                <div className="text-fog text-xs">Feb 1 - Feb 15</div>
                            </div>
                            <div className="text-fog text-sm">User acceptance testing and final deployment.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
