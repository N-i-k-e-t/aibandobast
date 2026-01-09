'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getJobs() {
    return await prisma.extractionJob.findMany({
        include: {
            file: true,
            extractedEntities: true
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function uploadAndExtract(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) return { success: false, error: "No file uploaded" };

    try {
        // 1. Create Evidence File Record
        const evidence = await prisma.evidenceFile.create({
            data: {
                eventId: (await getLatestEventId()) || '',
                title: file.name,
                category: inferCategory(file.name),
                stageTag: inferStage(file.name),
                fileUrl: '#', // Placeholder, would be Vercel Blob URL
                fileType: file.type,
                tags: JSON.stringify(inferTags(file.name)),
            }
        });

        // 2. Create Extraction Job
        const job = await prisma.extractionJob.create({
            data: {
                fileId: evidence.id,
                extractorVersion: 'v1.0.0-openai-gpt4',
                status: 'RUNNING'
            }
        });

        // 3. Simulate Extraction (Mocking OpenAI delay and response)
        // In production: const text = await parsePdfOrDocx(file);
        // const entities = await callOpenAI(text);

        await new Promise(resolve => setTimeout(resolve, 1500)); // Fake processing time

        const mockEntities = generateMockEntities(file.name, job.id);

        for (const ent of mockEntities) {
            await prisma.extractedEntity.create({
                data: ent
            });
        }

        await prisma.extractionJob.update({
            where: { id: job.id },
            data: { status: 'NEEDS_REVIEW' }
        });

        revalidatePath('/ingestion');
        return { success: true };

    } catch (e) {
        console.error(e);
        return { success: false, error: "Extraction failed" };
    }
}

export async function approveEntity(entityId: string) {
    // Move from extracted to official
    const entity = await prisma.extractedEntity.findUnique({ where: { id: entityId } });
    if (!entity || entity.approved) return;

    try {
        const data = JSON.parse(entity.extractedJson);
        const eventId = await getLatestEventId();

        // Write to official table based on type
        if (entity.entityType === 'UNIT') {
            await prisma.eventUnit.create({
                data: {
                    eventId: eventId!,
                    psId: await getPsId(data.psName),
                    unitName: data.unitName,
                    unitType: 'MANDAL',
                    riskTier: data.riskTier || 'LOW',
                    crowdMax: data.crowdMax || 0,
                    address: data.address || 'Unknown'
                }
            });
        }
        else if (entity.entityType === 'ROUTE') {
            await prisma.route.create({
                data: {
                    eventId: eventId!,
                    psId: await getPsId(data.psName || ''),
                    routeName: data.routeName,
                    routeType: 'PROCESSION',
                    startLabel: data.startLabel,
                    endLabel: data.endLabel,
                    timeStart: data.timeWindow?.split('-')[0] || '10:00',
                    timeEnd: data.timeWindow?.split('-')[1] || '22:00',
                }
            });
        }
        else if (entity.entityType === 'GHAT') {
            await prisma.ghat.create({
                data: {
                    eventId: eventId!,
                    ghatName: data.ghatName,
                    latitude: 19.9975,
                    longitude: 73.7898,
                    capacityEst: data.capacity || 1000
                }
            });
        }
        else if (entity.entityType === 'ZONE') {
            await prisma.zone.create({
                data: {
                    eventId: eventId!,
                    psId: await getPsId(data.psName || ''),
                    zoneName: data.zoneName,
                    zoneType: 'SECURITY',
                    riskTier: data.riskTier || 'MEDIUM',
                    polygonGeojson: '{}'
                }
            });
        }

        await prisma.extractedEntity.update({
            where: { id: entityId },
            data: {
                approved: true,
                needsReview: false,
                mappedTable: entity.entityType
            }
        });

        revalidatePath('/ingestion');
        return { success: true };
    } catch (e) {
        console.error(e);
        return { success: false, error: "Approval failed" };
    }
}

// Helpers
async function getLatestEventId() {
    const event = await prisma.event.findFirst();
    return event?.id;
}

async function getPsId(name: string) {
    const ps = await prisma.policeStation.findFirst({ where: { psName: { contains: name } } });
    // Fallback to first if not found for demo
    if (!ps) {
        const first = await prisma.policeStation.findFirst();
        return first?.id || '';
    }
    return ps.id;
}

function inferCategory(filename: string) {
    if (filename.toLowerCase().includes('report')) return 'REPORT';
    if (filename.toLowerCase().includes('list')) return 'LIST';
    if (filename.toLowerCase().includes('map')) return 'MAP';
    return 'OTHER';
}

function inferStage(filename: string) {
    // Simple mock logic
    if (filename.includes('Route')) return 'STAGE_4';
    if (filename.includes('Risk')) return 'STAGE_2';
    return 'STAGE_1';
}

function inferTags(filename: string) {
    const tags = [];
    if (filename.includes('2025')) tags.push('2025');
    if (filename.includes('PS')) tags.push('Police Station');
    return tags;
}

function generateMockEntities(filename: string, jobId: string) {
    // generate relevant entities based on filename keywords
    if (filename.toLowerCase().includes('mandal') || filename.toLowerCase().includes('unit')) {
        return [
            {
                jobId,
                entityType: 'UNIT',
                extractedJson: JSON.stringify({
                    unitName: 'Navshakti Tarun Mandal',
                    psName: 'Panchavati',
                    riskTier: 'HIGH',
                    crowdMax: 5000,
                    address: 'Near Old Market'
                }),
                confidence: 0.95,
                needsReview: true
            },
            {
                jobId,
                entityType: 'UNIT',
                extractedJson: JSON.stringify({
                    unitName: 'Bal Ganesh Mitra Mandal',
                    psName: 'Adgaon',
                    riskTier: 'MEDIUM',
                    crowdMax: 2000,
                    address: 'Adgaon Naka'
                }),
                confidence: 0.88,
                needsReview: true
            }
        ];
    }
    if (filename.toLowerCase().includes('route')) {
        return [
            {
                jobId,
                entityType: 'ROUTE',
                extractedJson: JSON.stringify({
                    routeName: 'Main Bazar Procession',
                    startLabel: 'Dindori Naka',
                    endLabel: 'Ramkund',
                    timeWindow: '18:00-22:00'
                }),
                confidence: 0.92,
                needsReview: true
            }
        ];
    }

    // Default fallback
    return [{
        jobId,
        entityType: 'INCIDENT',
        extractedJson: JSON.stringify({
            type: 'Past Incident',
            desc: 'Minor clash in 2023',
            severity: 'LOW'
        }),
        confidence: 0.75,
        needsReview: true
    }];
}
