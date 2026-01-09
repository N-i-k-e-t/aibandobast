export default function AboutPage() {
    return (
        <div className="page-container flex flex-col items-center py-12">
            <div className="max-w-3xl w-full text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-3xl mx-auto flex items-center justify-center text-5xl mb-8 shadow-inner border border-blue-100">
                    🛡️
                </div>
                <h1 className="text-4xl font-black text-[#1e3a5f] mb-4">AI BANDOBaST</h1>
                <p className="text-lg text-gray-500 mb-10">
                    A Unified Internal Administrative Portal for High-Stakes Event Planning.
                </p>

                <div className="card p-10 text-left mb-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                        Executive Credits
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Architect & Lead Engineer</p>
                            <p className="text-xl font-bold text-[#1e3a5f]">Niket Patil</p>
                            <p className="text-sm text-gray-500">Full-Stack Engineer + UX Architect</p>
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Contact for Admin Access</p>
                            <a href="mailto:niketpatil1624@gmail.com" className="text-blue-600 font-bold hover:underline">
                                niketpatil1624@gmail.com
                            </a>
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Collaborating Authority</p>
                            <p className="text-sm text-gray-900 font-medium">Nashik City Police Commissionerate</p>
                            <p className="text-[10px] text-gray-500 leading-tight mt-1 uppercase">INTERNAL USE ONLY. DISTRIUBTION PROHIBITED.</p>
                        </div>
                    </div>
                </div>

                <div className="card p-8 bg-slate-50 border-slate-200 text-left">
                    <h3 className="font-bold text-gray-800 mb-4">Project Disclaimer</h3>
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                        "AI BANDOBaST is an internal administrative support portal intended for planning review, documentation transparency, evaluation, and institutional learning. It does not issue commands, approvals, or enforcement instructions. All decisions are taken by authorized officers. AI and GIS are used only for assistance, analysis, and visualization."
                    </p>
                    <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>VERSION 1.0.0 (STABLE)</span>
                        <span>BUILD: 2026.01.10</span>
                        <span>DEPLOYED VIA VERCEL</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
