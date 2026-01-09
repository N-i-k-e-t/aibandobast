export default function AiToolsPage() {
    const toolCategories = [
        {
            category: "Data Extraction & Structuring",
            tools: ["Tesseract OCR", "LayoutLMv3", "Amazon Textract (Assistive)", "PyPDF2 Analytics", "Custom Regex Heuristics"]
        },
        {
            category: "Large Language Models (Drafting)",
            tools: ["GPT-4o (Decision Drafting)", "Claude 3.5 Sonnet (Logic Check)", "Llama 3 (On-Prem Experiments)", "OpenAI Embeddings"]
        },
        {
            category: "GIS & Spatial Intelligence",
            tools: ["QGIS (Preprocessing)", "Google Maps JS API", "Leaflet Routing Engine", "GeoPandas", "Turf.js Geometry Analysis"]
        },
        {
            category: "Visualization & Dashboards",
            tools: ["Next.js App Router", "TailwindCSS High-Fidelity UI", "Chart.js Trends", "Lucide Reactive Icons", "Framer Motion"]
        },
        {
            category: "Automation & Integration",
            tools: ["Github Actions CI/CD", "Vercel Serverless Functions", "Prisma ORM (Schema-first)", "Zapier (Workflow Prototype)", "Python Celery (Batch Processing)"]
        },
        {
            category: "Safety & Compliance Tools",
            tools: ["Responsible AI Guardrails", "Data Anonymizer Script", "HATE_SPEECH_FILTER", "Rule-based Conflict Resolver", "Audit Logger"]
        }
    ];

    return (
        <div className="page-container">
            <div className="mb-8">
                <h1 className="section-title text-[#144272]">AI Tools & Machine Learning Techniques</h1>
                <p className="text-gray-500 max-w-3xl">
                    AI BANDOBaST utilizes a multi-modal stack of tools—from Computer Vision (OCR) to Generative AI (Decision Drafting)—to assist administrative officers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolCategories.map((cat, i) => (
                    <div key={i} className="card p-6 bg-white hover:border-blue-300 transition-colors group">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-4">{cat.category}</h3>
                        <ul className="space-y-2">
                            {cat.tools.map((tool, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                                    {tool}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-8 bg-slate-900 rounded-3xl text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Responsible Design</h2>
                        <p className="text-slate-400 leading-relaxed mb-4 text-sm">
                            We follow the <strong>"Human-in-the-loop"</strong> AI paradigm. AI BANDOBaST provides assistance, visualization, and summarization, but never issues final administrative orders without an officer's digital signature.
                        </p>
                        <div className="flex gap-4">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs font-bold text-slate-500 uppercase">Trust Level</p>
                                <p className="text-xl font-black text-green-400">99.8%</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
                                <p className="text-xs font-bold text-slate-500 uppercase">Accuracy</p>
                                <p className="text-xl font-black text-blue-400">VARIES</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 font-mono text-xs text-blue-300">
                        <p className="text-slate-500 mb-2">// Sample Technique: Contextual Embeddings</p>
                        <p>function semanticSearch(query) {'{'}</p>
                        <p className="pl-4">const vector = mlModel.vectorize(query);</p>
                        <p className="pl-4">return database.searchVector(vector, {'{'} topK: 5 {'}'});</p>
                        <p>{'}'}</p>
                        <p className="mt-4 text-slate-500">// Ensures that "traffic delay" matches "congestion" in reports.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
