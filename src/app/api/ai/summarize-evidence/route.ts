import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { prisma } from '@/lib/db';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            );
        }

        const { fileId } = await request.json();

        if (!fileId) {
            return NextResponse.json(
                { error: 'File ID is required' },
                { status: 400 }
            );
        }

        // Get the evidence file
        const evidence = await prisma.evidenceFile.findUnique({
            where: { id: fileId },
        });

        if (!evidence) {
            return NextResponse.json(
                { error: 'Evidence file not found' },
                { status: 404 }
            );
        }

        const prompt = `You are an AI assistant helping with administrative documentation for a government bandobast (security arrangement) portal. 

Please summarize the following evidence document for administrative review:

Title: ${evidence.title}
Category: ${evidence.category}
Stage: ${evidence.stageTag}
Description: ${evidence.description || 'No description provided'}

Generate a concise summary (2-3 paragraphs) that:
1. Explains what this document contains
2. Identifies key information relevant for bandobast planning
3. Notes any action items or follow-ups if applicable

Important: This summary is for assistive purposes only. All final decisions are made by authorized officers.`;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are an administrative assistant helping document bandobast planning. Provide clear, professional summaries suitable for government documentation.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        const summary = completion.choices[0]?.message?.content || 'Unable to generate summary';

        return NextResponse.json({
            success: true,
            summary,
            disclaimer: 'This summary is AI-generated for assistive purposes only. All decisions are made by authorized officers.'
        });
    } catch (error) {
        console.error('Error summarizing evidence:', error);
        return NextResponse.json(
            { error: 'Failed to generate summary' },
            { status: 500 }
        );
    }
}
