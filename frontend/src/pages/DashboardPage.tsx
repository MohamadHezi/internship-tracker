import StatCard from '../components/dashboard/StatCard';
import type { Status } from '../types/status';

const statuses: Status[] = [
  { title: 'Interested', count: 5 },
  { title: 'Applied', count: 10 },
  { title: 'OA (Online Assessment)', count: 3 },
  { title: 'Interview', count: 4 },
  { title: 'Offer', count: 1 },
  { title: 'Rejected', count: 1 },
];

function DashboardPage() {
  // 💡 Dynamically calculate the total sum of all status counts
  const totalApplications = statuses.reduce((sum, status) => sum + status.count, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Header Summary Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">
            Real-time stage metrics across your internship search pipelines.
          </p>
        </div>
        
        {/* Main Highlighted Total Metric Badge */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 flex items-center justify-between sm:justify-start gap-4">
          <span className="text-sm font-medium text-blue-700 uppercase tracking-wider">Total Pipelines</span>
          <span className="text-3xl font-bold text-blue-900">{totalApplications}</span>
        </div>
      </div>

      {/* 🚀 Beautiful 3-Column Utility Grid Shell replacing your old CSS file definitions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statuses.map((status) => (
          <StatCard
            key={status.title}
            title={status.title}
            value={status.count}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;