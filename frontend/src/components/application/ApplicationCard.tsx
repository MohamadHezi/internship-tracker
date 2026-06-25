import { useNavigate } from 'react-router-dom';
import type { Application } from '../../types/application';

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: number) => void;
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Applied':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Interview':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Offer':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'Rejected':
      return 'bg-red-100 text-red-700 border-red-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

function ApplicationCard({ application, onDelete}: ApplicationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 
          
          className="inline-block text-2xl font-bold tracking-tight text-gray-900 transition-colors"
        >
          {application.company}
        </h3>
        <p className="mt-1 text-base text-gray-600">{application.position}</p>
        {application.dateApplied && (
          <p className="mt-3 text-sm text-gray-500">
            📅 Applied{" "}
            {new Date(application.dateApplied).toLocaleDateString()}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
        <span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide ${getStatusColor(application.status || 'Applied')}`}>
          {application.status || 'Applied'}
        </span>

        <div className="flex items-center gap-2">

          <button
            onClick={() => navigate(`/applications/${application.id}`)}
            className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
          >
            View
          </button>
          <button
            onClick={() => onDelete(application.id)}
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-600 hover:text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;