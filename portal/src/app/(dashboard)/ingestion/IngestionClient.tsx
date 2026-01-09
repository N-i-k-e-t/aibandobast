'use client';

import { useState } from 'react';
import { uploadAndExtract, approveEntity } from '../../actions/ingestion';

export default function IngestionClient({ initialJobs }: { initialJobs: any[] }) {
    const [jobs, setJobs] = useState(initialJobs);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData(e.currentTarget);
        await uploadAndExtract(formData);

        // Refresh page mostly handled by server action revalidatePath, 
        // but typically would reload or update state here in real SPA.
        window.location.reload();
    };

    const handleApprove = async (id: string) => {
        await approveEntity(id);
        window.location.reload();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Data Ingestion & Extraction</h1>
            </div>

            {/* Upload Area */}
            <div className="card p-6 bg-slate-50 border-dashed border-2 border-slate-300">
                <h3 className="font-semibold mb-4">Upload Raw Files (PDF, DOCX)</h3>
                <form onSubmit={handleUpload} className="flex gap-4 items-center">
                    <input name="file" type="file" className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                    "/>
                    <button type="submit" disabled={uploading} className="btn btn-primary">
                        {uploading ? 'Extracting...' : 'Upload & Extract'}
                    </button>
                </form>
                <p className="text-xs text-gray-500 mt-2">
                    AI will automatically extract Units, Routes, and Risk data.
                </p>
            </div>

            {/* Jobs List */}
            <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Extraction Jobs</h3>

                {jobs.length === 0 && (
                    <div className="text-center py-10 bg-white rounded-xl border border-dashed text-gray-500">
                        No extraction jobs yet. Upload a file to start.
                    </div>
                )}

                {jobs.map((job) => (
                    <div key={job.id} className="card p-0 overflow-hidden">
                        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h4 className="font-medium text-gray-900">{job.file.title}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full ${job.status === 'NEEDS_REVIEW' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100'}`}>
                                    {job.status}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(job.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="p-4">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500">
                                        <th className="pb-2">Entity Type</th>
                                        <th className="pb-2">Extracted Data</th>
                                        <th className="pb-2">Confidence</th>
                                        <th className="pb-2 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {job.extractedEntities.map((ent: any) => (
                                        <tr key={ent.id}>
                                            <td className="py-3 font-medium">{ent.entityType}</td>
                                            <td className="py-3 text-gray-600 font-mono text-xs max-w-md truncate">
                                                {ent.extractedJson}
                                            </td>
                                            <td className="py-3">
                                                <div className="flex items-center gap-1">
                                                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${ent.confidence > 0.9 ? 'bg-green-500' : 'bg-amber-500'}`}
                                                            style={{ width: `${ent.confidence * 100}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs">{Math.round(ent.confidence * 100)}%</span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-right">
                                                {ent.approved ? (
                                                    <span className="text-xs text-green-600 font-medium">Approved</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleApprove(ent.id)}
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {job.extractedEntities.length === 0 && (
                                <p className="text-xs text-center text-gray-400 py-2">No entities found.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
