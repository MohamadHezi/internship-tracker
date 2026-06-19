import StatusCard from '../components/StatusCard';
import type { Status } from '../types/status';

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
    <div>
      <h1>Dashboard</h1>
      <h2>Total Applications: 24</h2>

      {statuses.map((status) => (
        <StatusCard
            key={status.title}
            title={status.title}
            count={status.count}
        />
        ))}
    </div>
  );
}

export default DashboardPage;