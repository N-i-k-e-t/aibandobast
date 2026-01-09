import { NextResponse } from 'next/server';
import { getManifest } from '@/lib/data';

export async function GET() {
    try {
        const manifest = getManifest();
        // Transform manifest to shape expected by the frontend
        const evidence = manifest.map(m => ({
            id: m.file_id,
            title: m.filename,
            description: `Historical data for ${m.police_station} (${m.year})`,
            category: m.category,
            stageTag: m.stage_tag,
            fileUrl: `/api/files/${m.file_id}`,
            fileType: m.preview_type === 'pdf' ? 'application/pdf' : m.preview_type === 'image' ? 'image/jpeg' : 'other',
            tags: m.tags.join(','),
            uploadedAt: new Date().toISOString(),
            policeStation: { psName: m.police_station }
        }));
        return NextResponse.json(evidence);
    } catch (error) {
        console.error('Error fetching evidence:', error);
        return NextResponse.json([]);
    }
}
