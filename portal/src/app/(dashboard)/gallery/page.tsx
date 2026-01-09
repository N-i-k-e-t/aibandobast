'use client';

import { useState, useEffect } from 'react';

interface EvidenceFile {
    id: string;
    title: string;
    description: string | null;
    category: string;
    stageTag: string;
    fileUrl: string;
    fileType: string;
    tags: string;
    uploadedAt: string;
    policeStation?: { psName: string } | null;
}

export default function GalleryPage() {
    const [images, setImages] = useState<EvidenceFile[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<EvidenceFile | null>(null);

    useEffect(() => {
        fetch('/api/evidence')
            .then(r => r.ok ? r.json() : [])
            .then((data: any[]) => {
                const imgOnly = data.filter(e => e.fileType.includes('image') || e.title.match(/\.(jpg|jpeg|png|gif|svg)$/i));
                setImages(imgOnly);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">Media Gallery</h1>
                <p className="section-subtitle">
                    Visual evidence, field photos, and dashboard captures
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="aspect-square bg-gray-200 animate-pulse rounded-xl" />
                    ))}
                </div>
            ) : images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map(img => (
                        <div
                            key={img.id}
                            className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all"
                            onClick={() => setSelectedImage(img)}
                        >
                            <img
                                src={img.fileUrl}
                                alt={img.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                <p className="text-white text-xs font-medium truncate">{img.title}</p>
                                <p className="text-white/60 text-[10px]">{img.policeStation?.psName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card text-center py-20">
                    <p className="text-gray-500">No images found in the library.</p>
                </div>
            )}

            {/* Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedImage(null)}
                >
                    <button className="absolute top-6 right-6 text-white text-2xl">×</button>
                    <div className="max-w-5xl w-full flex flex-col items-center">
                        <img
                            src={selectedImage.fileUrl}
                            alt={selectedImage.title}
                            className="max-h-[80vh] object-contain shadow-2xl rounded"
                        />
                        <div className="mt-6 text-center text-white">
                            <h2 className="text-xl font-bold">{selectedImage.title}</h2>
                            <p className="text-white/60 text-sm mt-1">{selectedImage.policeStation?.psName} • {selectedImage.stageTag.replace('_', ' ')}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
