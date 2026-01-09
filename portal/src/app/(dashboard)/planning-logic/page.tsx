export default function PlanningLogicPage() {
    const thumbRules = [
        { key: "CROWD_TO_FORCE_RATIO", value: "1:200", unit: "Ratio", desc: "One police personnel for every 200 estimated crowd members at static points.", category: "STAFFING" },
        { key: "GHAT_SAFETY_THRESHOLD", value: "15", unit: "People/m²", desc: "If crowd density exceeds 15 people per meter square at immersions, emergency rerouting triggers.", category: "RISK" },
        { key: "EVACUATION_CORRIDOR_MIN", value: "4.5", unit: "Meters", desc: "Minimum width of secondary emergency lanes that must remain clear of mandals.", category: "SUPPLY" },
        { key: "HIGH_RISK_OVERLAP_LIMIT", value: "3", unit: "Units", desc: "No more than 3 High-Risk mandals should cross the same junction within a 2-hour window.", category: "TRAFFIC" }
    ];

    const architectureLayers = [
        { title: "Layer 1: Static Intelligence", content: "Historical crime data, repeat incident reports, and past deployment successes." },
        { title: "Layer 2: Spatial Logic", content: "GIS-based bottleneck detection, route overlap analysis, and proximity to critical infra." },
        { title: "Layer 3: Dynamic Scaling", content: "Adjusting resource demand based on the day of the festival (Day 1, 5, 7, 10 peak)." },
    ];

    return (
        <div className="page-container">
            <div className="mb-8">
                <h1 className="section-title text-[#1e3a5f]">Planning Logic & Thumb Rules</h1>
                <p className="text-gray-500 max-w-2xl">
                    The mathematical and logical foundations that drive the JARVIS engine. These thresholds define how resources are calculated and risks are flagged.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Core Thumb Rules</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {thumbRules.map((rule) => (
                            <div key={rule.key} className="card p-6 border-t-4 border-t-blue-600">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{rule.category}</span>
                                    <span className="text-2xl font-black text-gray-900">{rule.value}</span>
                                </div>
                                <h3 className="font-mono text-sm font-bold text-gray-800 mb-2 truncate" title={rule.key}>{rule.key}</h3>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {rule.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Architecture Layers</h2>
                        <div className="space-y-4">
                            {architectureLayers.map((layer, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">{layer.title}</h4>
                                        <p className="text-sm text-gray-600">{layer.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card bg-[#0f172a] text-white overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-white/5">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">Logic Manifest (JSON)</h3>
                        </div>
                        <div className="p-4">
                            <pre className="text-[10px] font-mono text-blue-100 overflow-x-auto">
                                {`{
  "engine": "JARVIS_V2.4",
  "weights": {
    "crowd": 0.4,
    "repeat_incidents": 0.3,
    "communal_sensitivity": 0.2,
    "topography": 0.1
  },
  "flags": {
    "auto_tier_high": [
        "L3_INCIDENT_HIST",
        "MERGE_POINT_CHOKE"
    ]
  }
}`}
                            </pre>
                        </div>
                    </div>

                    <div className="card p-6 bg-amber-50 border-amber-200">
                        <h3 className="text-amber-800 font-bold mb-2">💡 Note to Reviewers</h3>
                        <p className="text-xs text-amber-700 leading-relaxed">
                            These rules are assistive. The JARVIS engine suggests values, but the Final Authority remains with the Circle and Zone commanders to override based on ground situational awareness.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
