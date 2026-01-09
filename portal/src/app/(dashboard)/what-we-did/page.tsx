export default function WhatWeDidPage() {
    const sections = [
        {
            title: "1. Massive Ground Data Collection",
            desc: "The AI BANDOBaST initiative began with the digitization of over 500 documents spanning 10 years of festival history. This included manual orders, hand-drawn maps, and legacy reports from 13 police stations.",
            icon: "📋",
            metrics: ["500+ Files Digitized", "13 Police Stations Covered", "10 Years of History"]
        },
        {
            title: "2. Structuring and Categorization",
            desc: "Using automated indexing, every file was tagged with its corresponding planning stage (Stage 1 to 7), year, and category. This created a searchable 'Institutional Memory' for the Nashik Police department.",
            icon: "🏷️",
            metrics: ["7-Stage Protocol", "Auto-Indexed Manifest", "Instant Searchable Archive"]
        },
        {
            title: "3. Strategic GIS Mapping",
            desc: "We implemented KML-based spatial planning. By overlaying mandal locations, routes, and hotspots on Google Maps, commanders can now see the 'Tactical Overlay' of the entire city in real-time.",
            icon: "🗺️",
            metrics: ["KML Overlay Support", "QR-Code Patrol Ready", "Hotspot Heatmaps"]
        },
        {
            title: "4. Risk-Based Resource Planning",
            desc: "By analyzing historical incident data and crowd peaks, we developed a logic-driven resource allocation model. This ensures that 'High Risk' units receive disproportionate but necessary personnel coverage.",
            icon: "🛡️",
            metrics: ["Rule-Based Deployment", "Ghat Capacity Math", "Confidence Scoring"]
        }
    ];

    return (
        <div className="page-container">
            <div className="mb-10 text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-black text-[#1e3a5f] mb-4 uppercase tracking-tight">What We Did</h1>
                <p className="text-lg text-gray-500 font-medium">
                    A comprehensive overview of the AI BANDOBaST implementation journey for Nashik City Police.
                </p>
            </div>

            <div className="space-y-12 max-w-5xl mx-auto pb-20">
                {sections.map((sec, i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-8 items-start group">
                        <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl shadow-sm border border-blue-100 group-hover:scale-110 transition-transform flex-shrink-0">
                            {sec.icon}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{sec.title}</h2>
                            <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                {sec.desc}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {sec.metrics.map((m, j) => (
                                    <span key={j} className="px-3 py-1 bg-[#1e3a5f]/5 text-[#1e3a5f] text-sm font-bold rounded-lg border border-[#1e3a5f]/10">
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mt-20 p-8 bg-[#1e3a5f] rounded-3xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 10V3L14 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 relative z-10">The Result</h2>
                    <p className="text-blue-100/80 leading-relaxed mb-6 relative z-10">
                        For the first time, the department has a unified 'Common Operating Picture'. Decisions are no longer taken in isolation but are backed by historical evidence and spatial logic.
                    </p>
                    <div className="flex gap-4 relative z-10">
                        <a href="/planning-flow" className="px-6 py-3 bg-white text-[#1e3a5f] font-bold rounded-xl hover:bg-blue-50 transition-colors">
                            Explore Planning Flow →
                        </a>
                        <a href="/evidence" className="px-6 py-3 bg-blue-500/20 text-white font-bold rounded-xl border border-white/20 hover:bg-blue-500/30 transition-colors">
                            View Evidence Library
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
