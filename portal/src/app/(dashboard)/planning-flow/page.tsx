export const metadata = {
    title: 'Planning Flow | JARVIS',
    description: '7-Stage Bandobast Planning Protocol',
};

const STAGES = [
    {
        id: 1,
        title: "Strategic Assessment",
        desc: "Analyze previous year debriefs, threat inputs, and calendar dates.",
        tasks: ["Review 2024 Archive", "Ingest Intelligence Reports", "Define Threat Levels"]
    },
    {
        id: 2,
        title: "Resource Baselining",
        desc: "Calculate baseline requirement for Manpower and Logistics based on thumb rules.",
        tasks: ["Run JARVIS Staffing Calculator", "Check Vehicle Availability", "Draft Budget"]
    },
    {
        id: 3,
        title: "Micro-Planning (Route & Unit)",
        desc: "Detailed survey of routes, ghats, and fixing of points.",
        tasks: ["Joint Route Survey", "Fix CCTV Points", "Ghat Safety Audit"]
    },
    {
        id: 4,
        title: "Deployment & Scheme",
        desc: "Drafting the actual deployment scheme ( Bandobast Scheme ).",
        tasks: ["Sector-wise Allocation", "Define Shifts", "Reserve Force Planning"]
    },
    {
        id: 5,
        title: "Briefing & Simulation",
        desc: "Table-top exercises and simulation of scenarios.",
        tasks: ["Run Scenario Simulations", "Senior Officer Briefing", "Force Briefing"]
    },
    {
        id: 6,
        title: "Execution & Monitoring",
        desc: "Live tracking during the event (CCTVs, GPS, Wireless).",
        tasks: ["Command Center Ops", "Hourly SitReps", "Crowd Flow Monitoring"]
    },
    {
        id: 7,
        title: "Debrief & Archive",
        desc: "Post-event analysis and data archival for next year.",
        tasks: ["Collect Field Feedback", "Incident Analysis", "Save to 10-Year Archive"]
    }
];

export default function PlanningFlowPage() {
    return (
        <div className="page-container">
            <h1 className="section-title">Bandobast Planning Protocol</h1>
            <p className="mb-8 text-gray-500 max-w-3xl">
                The planning process follows a rigid **7-Stage Protocol** to ensure comprehensive coverage.
                JARVIS assists at every stage with data-driven insights.
            </p>

            <div className="space-y-4">
                {STAGES.map((stage) => (
                    <div key={stage.id} className="relative pl-8 group">
                        {/* Connector Line */}
                        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 group-last:bottom-auto group-last:h-6"></div>

                        {/* Dot */}
                        <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center z-10 font-bold text-xs text-blue-600 shadow-sm">
                            {stage.id}
                        </div>

                        <div className="card p-5 transition-all hover:bg-slate-50">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{stage.title}</h3>
                                    <p className="text-gray-600 text-sm">{stage.desc}</p>
                                </div>
                                <button className="btn btn-sm btn-secondary self-start whitespace-nowrap">
                                    Open Tools →
                                </button>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {stage.tasks.map((task, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                        {task}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
