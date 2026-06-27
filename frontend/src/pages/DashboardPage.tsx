import { useEffect, useState } from 'react';
import { getDashboard } from '../services/dashboardService';
import type { DashboardData } from '../types/dashboard';
import StatCard from '../components/dashboard/StatCard';
import RecentApplicationsTable from '../components/dashboard/RecentApplicationsTable';
import StatusBarChart from '../components/dashboard/StatusBarChart';
import StatusPieChart from '../components/dashboard/StatusPieChart';

function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    }
    loadDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="animate-pulse text-sm text-neutral-400">Loading...</p>
      </div>
    );
  }

  const chartData = dashboard.statusCounts.map((row) => ({
    status: row.status,
    total: Number(row.total),
  }));

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">Track your internship search and monitor progress.</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard title="Total" value={dashboard.totalApplications} />
        <StatCard title="This Month" value={dashboard.applicationsThisMonth} />
        <StatCard title="Interviews" value={dashboard.interviews} />
        <StatCard title="Offers" value={dashboard.offers} />
        <StatCard title="Success Rate" value={`${dashboard.successRate}%`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <StatusBarChart data={chartData} />
        </div>
        <div>
          <StatusPieChart data={chartData} />
        </div>
      </div>

      {/* Recent Applications */}
      {dashboard.recentApplications.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-200 p-10 text-center">
          <p className="text-sm text-neutral-400">No recent applications yet.</p>
        </div>
      ) : (
        <RecentApplicationsTable applications={dashboard.recentApplications} />
      )}
    </div>
  );
}

export default DashboardPage;
