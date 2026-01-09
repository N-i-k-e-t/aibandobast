import CopilotClient from './CopilotClient';

export const metadata = {
    title: 'AI Copilot | AI BANDOBaST',
    description: 'AI-Assisted Bandobast Planning Assistant',
};

export default function CopilotPage() {
    return (
        <div className="h-[calc(100vh-64px)] overflow-hidden bg-white">
            <CopilotClient />
        </div>
    );
}
