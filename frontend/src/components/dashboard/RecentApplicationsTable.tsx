import { useNavigate } from 'react-router-dom';
import type { Application } from '../../types/application';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/formatDate';

interface RecentApplicationsTableProps {
  applications: Application[];
}

function RecentApplicationsTable({ applications }: RecentApplicationsTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-100 bg-white">
      <div className="border-b border-neutral-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">Recent Applications</h2>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-50 bg-neutral-50/60 text-left">
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400">Company</th>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400">Position</th>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400">Status</th>
            <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-neutral-400">Applied</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-50">
          {applications.map((application) => (
            <tr key={application.id} className="transition-colors hover:bg-neutral-50/50">
              <td className="px-5 py-3.5 text-sm font-medium text-neutral-900">{application.company}</td>
              <td className="px-5 py-3.5 text-sm text-neutral-500">{application.position}</td>
              <td className="px-5 py-3.5">
                <StatusBadge status={application.status} />
              </td>
              <td className="px-5 py-3.5 text-sm text-neutral-400">
                {application.dateApplied ? formatDate(application.dateApplied) : '—'}
              </td>
              <td className="px-5 py-3.5 text-right">
                <button
                  onClick={() => navigate(`/applications/${application.id}`)}
                  className="rounded-md border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
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
