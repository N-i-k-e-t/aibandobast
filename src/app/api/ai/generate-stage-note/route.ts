import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/db';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const stageDescriptions: Record<string, string> = {
    STAGE_1: 'Ground Reality & Inputs - Initial data collection and ground surveys',
    STAGE_2: 'Risk-Based Thinking - Risk assessment and classification',
    STAGE_3: 'Spatial & Jurisdictional Mapping (GIS) - GIS-based area mapping',
    STAGE_4: 'Route & Time Window Logic - Procession route planning',
    STAGE_5: 'Ghat & Terminal Planning - Immersion point logistics',
    STAGE_6: 'Resource & Bandobast Planning - Personnel and resource allocation',
    STAGE_7: 'Outputs & Documentation - Final documentation and reports',
};

export async function POST(request: NextRequest) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        const { stage, evidenceIds } = await request.json();

        if (!stage) {
            return NextResponse.json(
                { error: 'Stage is required' },
                { status: 400 }
            );
        }

        // Get evidence files if provided
        let evidenceContext = '';
        if (evidenceIds && evidenceIds.length > 0) {
            const evidence = await prisma.evidenceFile.findMany({
                where: { id: { in: evidenceIds } },
            });
            evidenceContext = evidence.map(e => `- ${e.title} (${e.category}): ${e.description || 'No description'}`).join('\n');
        }

        const stageDescription = stageDescriptions[stage] || stage;

        const prompt = `You are an AI assistant helping with administrative documentation for a government bandobast (security arrangement) portal.

Generate a draft decision note for the following planning stage:

Stage: ${stageDescription}

${evidenceContext ? `Related Evidence:\n${evidenceContext}\n` : ''}

Generate a structured decision note with the following sections:
1. WHAT WE HAD: Describe the inputs and data available at this stage
2. WHAT WE CONSIDERED: List the factors and considerations evaluated
3. WHY WE DECIDED: Explain the rationale for decisions made at this stage
4. AI/GIS ASSISTANCE: Brief note on how AI and GIS tools assisted (remember: assistive only, all decisions by officers)

Keep each section to 2-3 sentences. Be professional and suitable for government documentation.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an administrative assistant helping document bandobast planning. Provide clear, professional content suitable for government documentation. Always emphasize that AI provides assistance only - all decisions are made by authorized officers.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 800,
            temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content || '';

        // Parse the response into structured sections
        const sections = {
            whatWeHad: '',
            whatWeConsidered: '',
            whyWeDecided: '',
            aiGisAssistNote: '',
        };

        // Simple parsing (in production, use more robust parsing)
        const lines = content.split('\n');
        let currentSection = '';

        for (const line of lines) {
            if (line.includes('WHAT WE HAD')) currentSection = 'whatWeHad';
            else if (line.includes('WHAT WE CONSIDERED')) currentSection = 'whatWeConsidered';
            else if (line.includes('WHY WE DECIDED')) currentSection = 'whyWeDecided';
            else if (line.includes('AI/GIS ASSISTANCE')) currentSection = 'aiGisAssistNote';
            else if (currentSection && line.trim()) {
                sections[currentSection as keyof typeof sections] += line.trim() + ' ';
            }
        }

        return NextResponse.json({
            success: true,
            stage,
            draft: sections,
            disclaimer: 'This is an AI-generated draft for review. All content must be verified and approved by authorized officers.'
        });
    } catch (error) {
        console.error('Error generating stage note:', error);
        return NextResponse.json(
            { error: 'Failed to generate stage note' },
            { status: 500 }
        );
    }
}
