import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { yearA, yearB } = await request.json();

        if (!yearA || !yearB) {
            return NextResponse.json(
                { error: 'Both years are required' },
                { status: 400 }
            );
        }

        // Get archive data for both years
        const [dataA, dataB] = await Promise.all([
            prisma.archiveYear.findUnique({ where: { year: yearA } }),
            prisma.archiveYear.findUnique({ where: { year: yearB } }),
        ]);

        if (!dataA || !dataB) {
            return NextResponse.json(
                { error: 'Archive data not available for one or both years' },
                { status: 404 }
            );
        }

        const prompt = `You are an AI assistant helping with administrative documentation for a government bandobast (security arrangement) portal.

Compare the following two years of bandobast planning data and generate a narrative comparison:

Year ${yearA}:
- Event Units: ${dataA.totalUnits}
- Routes: ${dataA.totalRoutes}
- Ghats: ${dataA.totalGhats}
- Police Stations: ${dataA.totalPoliceStations}
- Estimated Crowd: ${dataA.estimatedCrowd.toLocaleString()}
- Incidents Reported: ${dataA.incidentsReported}
- Resources Deployed: ${dataA.resourcesDeployed}

Year ${yearB}:
- Event Units: ${dataB.totalUnits}
- Routes: ${dataB.totalRoutes}
- Ghats: ${dataB.totalGhats}
- Police Stations: ${dataB.totalPoliceStations}
- Estimated Crowd: ${dataB.estimatedCrowd.toLocaleString()}
- Incidents Reported: ${dataB.incidentsReported}
- Resources Deployed: ${dataB.resourcesDeployed}

Generate a 2-3 paragraph narrative comparison that:
1. Highlights key differences between the two years
2. Notes trends (improvements or areas of concern)
3. Provides insights for future planning

Keep the tone professional and suitable for government documentation.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an administrative assistant helping with bandobast planning analysis. Provide clear, factual comparisons suitable for government documentation.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 600,
            temperature: 0.7,
        });

        const comparison = completion.choices[0]?.message?.content || 'Unable to generate comparison';

        return NextResponse.json({
            success: true,
            yearA,
            yearB,
            comparison,
            disclaimer: 'This comparison is AI-generated for assistive purposes only. All conclusions and decisions are made by authorized officers.'
        });
    } catch (error) {
        console.error('Error comparing years:', error);
        return NextResponse.json(
            { error: 'Failed to generate comparison' },
            { status: 500 }
        );
    }
}
