export default function AboutPage() {
    return (
        <div className="page-container">
            <div className="mb-6">
                <h1 className="section-title">About</h1>
                <p className="section-subtitle">
                    AI BANDOBaST Portal Information
                </p>
            </div>

            <div className="max-w-3xl">
                {/* Main About Card */}
                <div className="card mb-6">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-16 h-16 bg-[#1e3a5f] rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-1">AI BANDOBaST</h2>
                            <p className="text-gray-500">AI-Assisted Bandobast Planning & Decision Transparency Portal</p>
                        </div>
                    </div>

                    <div className="prose prose-sm max-w-none text-gray-600">
                        <p className="text-base leading-relaxed">
                            AI BANDOBaST is an <strong>internal administrative decision-transparency portal</strong> that documents
                            how bandobast planning decisions were taken, supported by AI-assisted analysis and GIS visualization.
                        </p>

                        <p className="text-base leading-relaxed mt-4">
                            This portal serves as a comprehensive evidence repository and decision documentation system,
                            enabling authorized personnel to review the complete planning process, understand the rationale
                            behind each decision, and access historical data for institutional learning.
                        </p>
                    </div>
                </div>

                {/* Purpose Section */}
                <div className="card mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Purpose</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">📋 Documentation</h4>
                            <p className="text-sm text-gray-600">Record all planning decisions with complete audit trail</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">🔍 Transparency</h4>
                            <p className="text-sm text-gray-600">Enable review and evaluation by oversight bodies</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">📚 Institutional Learning</h4>
                            <p className="text-sm text-gray-600">Preserve knowledge for future planning cycles</p>
                        </div>
                        <div className="p-4 bg-amber-50 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">⚖️ Accountability</h4>
                            <p className="text-sm text-gray-600">Document decision rationale for accountability</p>
                        </div>
                    </div>
                </div>

                {/* Credits Section */}
                <div className="card mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Credits</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-[#1e3a5f] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            NP
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">Niket Patil</h4>
                            <a
                                href="mailto:niketpatil1624@gmail.com"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                niketpatil1624@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Version Info */}
                <div className="card mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500">Version</span>
                            <span className="font-medium text-gray-900">1.0.0</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500">Event</span>
                            <span className="font-medium text-gray-900">Ganpati Utsav 2025</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span className="text-gray-500">City</span>
                            <span className="font-medium text-gray-900">Nashik</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="text-gray-500">Framework</span>
                            <span className="font-medium text-gray-900">Next.js + Prisma + TailwindCSS</span>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="card border-l-4 border-l-red-500">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-red-500">⚠️</span>
                        Important Disclaimer
                    </h3>
                    <div className="text-sm text-gray-600 space-y-3">
                        <p>
                            AI BANDOBaST is an <strong>internal administrative support portal</strong> intended solely for
                            planning review, documentation transparency, evaluation, and institutional learning.
                        </p>
                        <p>
                            The system <strong>does not issue commands, approvals, or enforcement instructions</strong>.
                            All decisions are taken by authorized officers. AI and GIS are used only for assistance,
                            analysis, and visualization.
                        </p>
                        <p>
                            This portal is <strong>not accessible to the public</strong> and is restricted to authorized
                            government personnel only.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
