import IngestionClient from './IngestionClient';
import { getJobs } from '../../actions/ingestion';

export const metadata = {
    title: 'Ingestion & Extraction | AI BANDOBaST',
    description: 'Upload files and run AI extraction',
};

export default async function IngestionPage() {
    const jobs = await getJobs();
    return (
        <div className="page-container">
            <IngestionClient initialJobs={jobs} />
        </div>
    );
}
