
import { Download, FileText } from "lucide-react";

export default function DocumentsPage() {
    const docs = [
        { name: "Service Agreement v1.2.pdf", date: "Jan 10, 2026", size: "2.4 MB" },
        { name: "Discovery Audit Report.pdf", date: "Jan 15, 2026", size: "5.1 MB" },
        { name: "Technical Architecture Diagram.png", date: "Jan 20, 2026", size: "1.2 MB" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Date Uploaded</th>
                            <th className="px-6 py-4">Size</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {docs.map((doc) => (
                            <tr key={doc.name} className="hover:bg-slate-50 transition-colors group">
                                <td className="px-6 py-4 flex items-center gap-3 font-medium text-slate-900">
                                    <FileText size={16} className="text-slate-400 group-hover:text-gold-500 transition-colors" />
                                    {doc.name}
                                </td>
                                <td className="px-6 py-4 text-slate-500">{doc.date}</td>
                                <td className="px-6 py-4 text-slate-500">{doc.size}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-700 font-medium text-xs flex items-center justify-end gap-1">
                                        <Download size={14} /> Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
