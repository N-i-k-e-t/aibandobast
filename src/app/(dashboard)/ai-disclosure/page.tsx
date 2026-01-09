'use client';

import { useState, useEffect } from 'react';

const aiTools = [
    'ChatGPT-4', 'Claude', 'Gemini Pro', 'Perplexity AI', 'GitHub Copilot',
    'Notion AI', 'Grammarly', 'DeepL', 'Whisper', 'DALL-E 3',
    'Midjourney', 'Adobe Firefly', 'Canva Magic', 'Otter.ai', 'Descript',
    'Beautiful.ai', 'Gamma', 'Tome', 'Jasper', 'Copy.ai',
    'Writesonic', 'Quillbot', 'Wordtune', 'Simplified', 'Lumen5',
    'Runway ML', 'Stability AI', 'Hugging Face', 'Cohere', 'Anthropic Claude'
];

const mlTechniques = [
    {
        name: 'Pattern Recognition',
        description: 'Identifying recurring patterns in crowd behavior, incident reports, and historical data',
        usage: 'Used to identify similar event characteristics across years'
    },
    {
        name: 'Rule-Based Classification',
        description: 'Applying predefined rules to categorize risk levels based on multiple factors',
        usage: 'Risk tier assignment (LOW/MEDIUM/HIGH) based on crowd size, history, location'
    },
    {
        name: 'Trend Analysis',
        description: 'Analyzing historical trends to inform planning decisions',
        usage: 'Year-over-year comparison of crowd sizes, incidents, resource needs'
    },
    {
        name: 'Consistency Validation',
        description: 'Cross-checking data across multiple sources for accuracy',
        usage: 'Validating mandal information against official records'
    },
    {
        name: 'Spatial Clustering (Visual)',
        description: 'Grouping nearby locations for efficient resource allocation',
        usage: 'Identifying clusters of high-risk mandals for patrol route optimization'
    },
    {
        name: 'Anomaly Flagging',
        description: 'Detecting unusual patterns that warrant human review',
        usage: 'Flagging mandals with unusual crowd estimates or new locations'
    }
];

const safeguards = [
    {
        icon: '👤',
        title: 'Human Verification',
        description: 'Every AI-generated output is reviewed and verified by authorized officers before use'
    },
    {
        icon: '📋',
        title: 'Version Control',
        description: 'All changes are tracked with full audit trail and rollback capability'
    },
    {
        icon: '🔒',
        title: 'No Autonomous Actions',
        description: 'AI cannot issue commands, approve permits, or make enforcement decisions'
    },
    {
        icon: '📊',
        title: 'Audit Readiness',
        description: 'Complete documentation trail for all AI-assisted analyses'
    },
    {
        icon: '⚠️',
        title: 'Clear Limitations',
        description: 'AI outputs are clearly marked as "assistive" and "for review"'
    },
    {
        icon: '🔄',
        title: 'Feedback Loop',
        description: 'Officers can flag incorrect AI suggestions for continuous improvement'
    }
];

export default function AIDisclosurePage() {
    const [explainMode, setExplainMode] = useState(false);

    useEffect(() => {
        const handleExplainModeChange = (e: CustomEvent) => {
            setExplainMode(e.detail);
        };
        window.addEventListener('explainModeChange', handleExplainModeChange as EventListener);
        return () => window.removeEventListener('explainModeChange', handleExplainModeChange as EventListener);
    }, []);

    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">AI & ML Disclosure</h1>
                <p className="section-subtitle">
                    Transparency about AI tools, techniques, and governance safeguards
                </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="card text-center">
                    <div className="text-4xl font-bold text-[#1e3a5f] mb-2">30</div>
                    <div className="text-sm text-gray-600">AI Tools Used</div>
                </div>
                <div className="card text-center">
                    <div className="text-4xl font-bold text-[#1e3a5f] mb-2">Multiple</div>
                    <div className="text-sm text-gray-600">AI Models (LLMs)</div>
                </div>
                <div className="card text-center">
                    <div className="text-4xl font-bold text-[#1e3a5f] mb-2">6</div>
                    <div className="text-sm text-gray-600">Core ML Techniques</div>
                </div>
            </div>

            {/* What AI Did NOT Do */}
            <div className="card mb-6 border-l-4 border-l-red-500">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-red-500">⛔</span>
                    What AI Did NOT Do
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                        'Issue any operational commands',
                        'Approve permits or permissions',
                        'Make enforcement decisions',
                        'Authorize deployments',
                        'Override officer decisions',
                        'Access or modify sensitive records directly'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="text-red-500">✗</span>
                            {item}
                        </div>
                    ))}
                </div>
                {explainMode && (
                    <div className="explain-block mt-4">
                        <div className="explain-block-title">Why This Matters</div>
                        <p className="text-sm text-gray-600">
                            AI systems in government contexts must be clearly bounded. This portal uses AI only for
                            analysis, documentation, and visualization. All decisions, approvals, and commands
                            remain the sole responsibility of authorized officers.
                        </p>
                    </div>
                )}
            </div>

            {/* AI Tools Used */}
            <div className="card mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">30 AI Tools Used</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2">
                    {aiTools.map((tool, i) => (
                        <div key={i} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 text-center">
                            {tool}
                        </div>
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">
                    These tools were used for documentation assistance, summarization, translation, and content structuring.
                </p>
            </div>

            {/* ML Techniques */}
            <div className="card mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Core ML Techniques (Assistive Only)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mlTechniques.map((technique, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-medium text-gray-900 mb-2">{technique.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{technique.description}</p>
                            <p className="text-xs text-gray-500 italic">Usage: {technique.usage}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* OpenAI Integration */}
            <div className="card mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span>🤖</span>
                    OpenAI Integration
                </h2>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-700">
                        OpenAI models (GPT-4) are used server-side for <strong>documentation intelligence</strong>:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                        <li>• Summarizing evidence documents</li>
                        <li>• Structuring decision notes</li>
                        <li>• Generating comparison narratives across years</li>
                        <li>• Drafting stage-wise planning documentation</li>
                    </ul>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    OPENAI_API_KEY is stored server-side only and never exposed to the browser
                </div>
            </div>

            {/* Governance Safeguards */}
            <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Governance Safeguards</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {safeguards.map((safeguard, i) => (
                        <div key={i} className="p-4 border border-gray-200 rounded-lg">
                            <div className="text-2xl mb-2">{safeguard.icon}</div>
                            <h3 className="font-medium text-gray-900 mb-1">{safeguard.title}</h3>
                            <p className="text-sm text-gray-600">{safeguard.description}</p>
                        </div>
                    ))}
                </div>

                {explainMode && (
                    <div className="explain-block mt-6">
                        <div className="explain-block-title">Responsible AI Framework</div>
                        <p className="text-sm text-gray-600">
                            This portal follows responsible AI principles: transparency (disclosing all AI usage),
                            accountability (human verification of all outputs), and safety (preventing AI from
                            taking autonomous actions). The AI acts as an assistant to officers, never as an authority.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
