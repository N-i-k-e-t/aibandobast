import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getManifest } from '@/lib/data';

export async function GET(
    request: NextRequest,
    { params }: { params: { file_id: string } }
) {
    // 1. Basic Auth Check (In real app, check session)
    const adminUser = process.env.ADMIN_USER;
    if (!adminUser) {
        // Just checking if env is set, session check should be in middleware
    }

    const { file_id } = await params;
    const manifest = getManifest();
    const entry = manifest.find(m => m.file_id === file_id);

    if (!entry) {
        return new NextResponse('File not found', { status: 404 });
    }

    const filePath = path.join(process.cwd(), entry.relative_path);

    if (!fs.existsSync(filePath)) {
        return new NextResponse('File not found on disk', { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(entry.filename).toLowerCase();

    let contentType = 'application/octet-stream';
    if (ext === '.pdf') contentType = 'application/pdf';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.kml') contentType = 'application/vnd.google-earth.kml+xml';

    return new NextResponse(fileBuffer, {
        headers: {
            'Content-Type': contentType,
            'Content-Disposition': `inline; filename="${entry.filename}"`,
        },
    });
}
