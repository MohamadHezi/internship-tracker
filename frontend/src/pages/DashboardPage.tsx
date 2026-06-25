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

  const chartData = dashboard.statusCounts.map((row) => ({
    status: row.status,
    total: Number(row.total),
  }));

  return (
    <div className="space-y-6">
      {/* ✨ Refactored Header Layout */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-3 text-base text-gray-500">
          Track your internship search and monitor your progress.
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
        <StatCard
          title="Total Applications"
          value={dashboard.totalApplications}
        />

        <StatCard
          title="Applications This Month"
          value={dashboard.applicationsThisMonth}
        />

        <StatCard
          title="Interviews"
          value={dashboard.interviews}
        />

        <StatCard
          title="Offers"
          value={dashboard.offers}
        />

        <StatCard
          title="Success Rate"
          value={`${dashboard.successRate}%`}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <StatusBarChart data={chartData} />
        </div>

        <div>
          <StatusPieChart data={chartData} />
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="pt-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900 tracking-tight">
          Recent Applications
        </h2>
        
        {dashboard.recentApplications.length === 0 ? (
          <p className="text-sm text-gray-500 italic bg-gray-50 rounded-xl p-6 border border-dashed border-gray-200">
            No recently updated applications found.
          </p>
        ) : (
          <RecentApplicationsTable
            applications={dashboard.recentApplications}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;