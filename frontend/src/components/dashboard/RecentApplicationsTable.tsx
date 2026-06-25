import { useNavigate } from 'react-router-dom';
import type { Application } from '../../types/application';
import StatusBadge from '../common/StatusBadge';

interface RecentApplicationsTableProps {
  applications: Application[];
}

function RecentApplicationsTable({
  applications,
}: RecentApplicationsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Applications
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm text-gray-500">
            <th className="px-6 py-3">Company</th>
            <th className="px-6 py-3">Position</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Applied</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody>
          {applications.map((application) => (
            <tr
              key={application.id}
              className="border-t border-gray-100 transition-colors hover:bg-gray-50"
            >
              <td className="px-6 py-4 font-medium">
                {application.company}
              </td>

              <td className="px-6 py-4">
                {application.position}
              </td>

              <td className="px-6 py-4">
                <StatusBadge
                  status={application.status}
                />
              </td>

              <td className="px-6 py-4">
                {application.dateApplied
                  ? new Date(
                      application.dateApplied
                    ).toLocaleDateString()
                  : '-'}
              </td>

              <td className="px-6 py-4 text-right">
                <button
                  onClick={() =>
                    navigate(
                      `/applications/${application.id}`
                    )
                  }
                  className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentApplicationsTable;