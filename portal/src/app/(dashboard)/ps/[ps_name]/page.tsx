import { getManifest } from '@/lib/data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PsPage({ params }: { params: { ps_name: string } }) {
    const { ps_name } = await params;
    const manifest = getManifest();

    const psFiles = manifest.filter(m => m.police_station.toLowerCase() === decodeURIComponent(ps_name).toLowerCase());

    const psStats = {
        totalFiles: psFiles.length,
        yearsCovered: Array.from(new Set(psFiles.map(f => f.year))).sort(),
        topCategory: psFiles.reduce((acc: any, f) => {
            acc[f.category] = (acc[f.category] || 0) + 1;
            return acc;
        }, {})
    };

    return (
        <div className="page-container">
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-[#1e3a5f] rounded-2xl flex items-center justify-center text-white text-xl font-black">
                        {decodeURIComponent(ps_name).charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-[#1e3a5f] uppercase tracking-tight">{decodeURIComponent(ps_name)} Police Station</h1>
                        <p className="text-gray-500 font-medium tracking-wide">Sector Analysis & Evidence Dashboard</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                <div className="card p-6 border-b-4 border-b-blue-600">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Evidence</p>
                    <p className="text-4xl font-black text-gray-900">{psStats.totalFiles}</p>
                    <p className="text-[10px] text-gray-500 mt-1">Archived documents indexed.</p>
                </div>
                <div className="card p-6 border-b-4 border-b-purple-600">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Timeline Coverage</p>
                    <p className="text-lg font-bold text-gray-900">{psStats.yearsCovered.join(', ')}</p>
                </div>
                <div className="card p-6 border-b-4 border-b-amber-600">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Primary Data</p>
                    <p className="text-xl font-bold text-gray-900">
                        {Object.entries(psStats.topCategory).sort((a: any, b: any) => b[1] - a[1])[0]?.[0] || 'N/A'}
                    </p>
                </div>
                <div className="card p-6 bg-[#1e3a5f] text-white">
                    <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Tactical Tools</p>
                    <div className="space-y-2">
                        <Link href="/maps" className="btn btn-primary w-full text-xs py-2 bg-blue-500 border-none hover:bg-blue-400">
                            Show Area on Map
                        </Link>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Indexed Files for this Station</h2>
                    <span className="text-xs text-gray-400 font-mono">MANIFEST SOURCE: v1.0.jarvis</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs text-gray-500 font-black uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Filename</th>
                                <th className="px-6 py-4">Year</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Stage</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {psFiles.map(file => (
                                <tr key={file.file_id} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 truncate max-w-xs">{file.filename}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{file.year}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-1 rounded font-bold uppercase">
                                            {file.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="stage-indicator text-[10px] px-2 py-0.5">
                                            {file.stage_tag.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <a
                                            href={`/api/files/${file.file_id}`}
                                            target="_blank"
                                            className="text-blue-600 font-bold text-xs hover:underline"
                                        >
                                            View Archive
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
