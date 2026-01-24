
export default function ScopePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Scope of Work</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-slate-700 leading-relaxed space-y-4">
                <p><strong>Engagement:</strong> AI Workflow Automation & Chatbot Implementation</p>
                <hr />
                <p><strong>Objective:</strong> To reduce manual administrative load by 40% and improve lead response time to &lt;5 minutes using autonomous agents.</p>
                <h3 className="text-xl font-bold text-slate-900 mt-6">Deliverables:</h3>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Custom Knowledge Chatbot:</strong> Trained on six50 methodology and services.</li>
                    <li><strong>Lead Routing System:</strong> Automated classification and email notification system.</li>
                    <li><strong>Client Portal:</strong> Secure access for tracking project progress and assets.</li>
                    <li><strong>Document Processing Agent:</strong> (Future Phase) Auto-parsing of incoming RFPs.</li>
                </ul>
            </div>
        </div>
    );
}
