import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const metadata = {
    title: 'Scenario Library | JARVIS',
    description: 'Pre-planned response protocols',
};

export default async function ScenarioPage() {
    const scenarios = await prisma.scenarioPlan.findMany();

    return (
        <div className="page-container">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="section-title mb-1">Scenario Library</h1>
                    <p className="text-gray-500 text-sm">Pre-approved response protocols for crisis management</p>
                </div>
                <button className="btn btn-primary">
                    + Create New Scenario
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {scenarios.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed">
                        No scenarios found. Please seed the database.
                    </div>
                )}

                {scenarios.map((sc) => {
                    const steps = JSON.parse(sc.responseSteps);
                    const checklist = JSON.parse(sc.resourceChecklist);

                    return (
                        <div key={sc.id} className="card p-6 border-l-4 border-l-blue-600">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-bold text-gray-900">{sc.title}</h3>
                                        <span className={`badge ${sc.severity === 'L3' ? 'badge-high' : 'badge-medium'}`}>
                                            Severity {sc.severity}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-mono">Type: {sc.scenarioType}</p>
                                </div>
                                <button className="btn btn-sm btn-secondary">Simulate</button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Triggers */}
                                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                                    <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                                        <span>⚡</span> Triggers
                                    </h4>
                                    <p className="text-sm text-amber-900 leading-relaxed">
                                        {sc.triggers}
                                    </p>
                                </div>

                                {/* Response Steps */}
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                        <span>🛡️</span> Response Protocol
                                    </h4>
                                    <ol className="list-decimal list-inside text-sm text-blue-900 space-y-1">
                                        {steps.map((step: string, i: number) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                    </ol>
                                </div>

                                {/* Resource Checklist */}
                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <span>📦</span> Resource Checklist
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                        {checklist.map((item: string, i: number) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
