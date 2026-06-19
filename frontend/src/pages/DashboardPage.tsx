import StatusCard from '../components/StatusCard';
import type { Status } from '../types/status';
import './DashboardPage.css';

const statuses: Status[] = [
  { title: 'Interested', count: 5 },
  { title: 'Applied', count: 10 },
  { title: 'OA', count: 3 },
  { title: 'Interview', count: 4 },
  { title: 'Offer', count: 1 },
  { title: 'Rejected', count: 1 },
];

function DashboardPage() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <h2>Total Applications: 24</h2>

      <div className="status-grid">
        {statuses.map((status) => (
          <StatusCard
            key={status.title}
            title={status.title}
            count={status.count}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;