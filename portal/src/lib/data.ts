import fs from 'fs';
import path from 'path';

export interface ManifestEntry {
    file_id: string;
    relative_path: string;
    filename: string;
    year: number;
    police_station: string;
    category: string;
    stage_tag: string;
    tags: string[];
    preview_type: 'pdf' | 'docx' | 'image' | 'kml' | 'other';
}

export interface Metrics {
    totalFiles: number;
    filesByYear: Record<string, number>;
    filesByPS: Record<string, number>;
    filesByCategory: Record<string, number>;
    filesByStage: Record<string, number>;
}

export function getManifest(): ManifestEntry[] {
    try {
        const filePath = path.join(process.cwd(), 'data', 'manifest.json');
        if (!fs.existsSync(filePath)) return [];
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading manifest:', error);
        return [];
    }
}

export function getMetrics(): Metrics {
    try {
        const filePath = path.join(process.cwd(), 'data', 'metrics.json');
        if (!fs.existsSync(filePath)) {
            return {
                totalFiles: 0,
                filesByYear: {},
                filesByPS: {},
                filesByCategory: {},
                filesByStage: {}
            };
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading metrics:', error);
        return {
            totalFiles: 0,
            filesByYear: {},
            filesByPS: {},
            filesByCategory: {},
            filesByStage: {}
        };
    }
}
