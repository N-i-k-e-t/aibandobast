import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Planning Logic | JARVIS',
    description: 'Thresholds and Thumb Rules',
};

export default async function PlanningLogicPage() {
    const configs = await prisma.configThreshold.findMany({
        orderBy: { category: 'asc' }
    });

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Planning Logic & Thresholds</h1>
                <p className="text-gray-500">
                    These "Thumb Rules" drive the JARVIS automated planning engine.
                    Adjusting these values will update all resource calculations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {configs.map(conf => (
                    <div key={conf.id} className="card p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-6xl font-black text-gray-500">
                                {conf.category === 'RISK' ? '⚡' :
                                    conf.category === 'SUPPLY' ? '📦' :
                                        conf.category === 'STAFFING' ? '👮' : '⏱️'}
                            </span>
                        </div>

                        <div className="relative z-10">
                            <span className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-2 block">{conf.category} RULE</span>
                            <h3 className="font-mono text-sm text-blue-600 mb-2 truncate" title={conf.key}>{conf.key}</h3>

                            <div className="flex items-end gap-2 mb-3">
                                <span className="text-4xl font-bold text-gray-900">{conf.value}</span>
                                <span className="text-sm text-gray-500 font-medium mb-1">{conf.unit}</span>
                            </div>

                            <p className="text-sm text-gray-600 leading-snug">
                                {conf.description}
                            </p>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                                    Edit Value →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New */}
                <button className="card p-6 flex flex-col items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-300 border-dashed border-2 bg-transparent shadow-none hover:shadow-sm group transition-all">
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">+</span>
                    <span className="font-medium text-sm">Add New Thumb Rule</span>
                </button>
            </div>

            {/* Dependency Graph Placeholder */}
            <div className="mt-10">
                <h2 className="text-lg font-bold mb-4">Service Dependencies</h2>
                <div className="card p-8 text-center bg-slate-50 border-dashed">
                    <div className="max-w-md mx-auto">
                        <p className="text-gray-500 mb-4">
                            JARVIS tracks dependencies between <strong>Police, Fire, Medical, and Traffic</strong> departments.
                        </p>
                        <div className="flex justify-center gap-4 text-sm font-mono text-gray-400">
                            <span>[Police] → [Traffic]</span>
                            <span>[Ghat] → [Medical]</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
