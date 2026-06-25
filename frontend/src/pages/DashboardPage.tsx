import { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardService';
import type { DashboardData } from '../types/dashboard';
import { APPLICATION_STATUSES } from '../constants/applicationStatuses';
import StatCard from '../components/dashboard/StatCard';
import ApplicationCard from '../components/application/ApplicationCard';

function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    loadDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="p-6 text-center text-gray-500 font-medium animate-pulse">
        Loading dashboard metrics...
      </div>
    );
  }

  const statusMap = Object.fromEntries(
    dashboard.statusCounts.map((row) => [row.status.toLowerCase(), Number(row.total)])
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-gray-500 mt-1">
            Real-time stage metrics across your internship search pipelines.
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-3 flex items-center justify-between sm:justify-start gap-4">
          <span className="text-sm font-medium text-blue-700 uppercase tracking-wider">Total Pipelines</span>
          <span className="text-3xl font-bold text-blue-900">{dashboard.totalApplications}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {APPLICATION_STATUSES.map((statusName) => {
          const key = statusName.startsWith('OA') ? 'oa' : statusName.toLowerCase();
          const countValue = statusMap[key] ?? 0;

          return (
            <StatCard
              key={statusName}
              title={statusName}
              value={countValue}
            />
          );
        })}
      </div>

      <div className="pt-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 tracking-tight">
          Recent Applications
        </h2>
        
        {dashboard.recentApplications.length === 0 ? (
          <p className="text-sm text-gray-500 italic bg-gray-50 rounded-xl p-6 border border-dashed border-gray-200">
            No recently updated applications found. Start applying to populate your activity log!
          </p>
        ) : (
          <div className="space-y-4">
            {dashboard.recentApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                onDelete={() => {}}
                onUpdate={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;