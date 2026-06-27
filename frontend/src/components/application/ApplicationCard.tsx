import { useNavigate } from 'react-router-dom';
import type { Application } from '../../types/application';
import { formatDate } from '../../utils/formatDate';
import StatusBadge from '../ui/StatusBadge';
import Button from '../ui/Button';

interface ApplicationCardProps {
  application: Application;
  onDelete: (id: number) => void;
}

function ApplicationCard({ application, onDelete }: ApplicationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-neutral-100 bg-white p-5 transition-all hover:border-neutral-200 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-neutral-900">{application.company}</h3>
        <p className="mt-0.5 text-sm text-neutral-500">{application.position}</p>
        {application.dateApplied && (
          <p className="mt-2 text-xs text-neutral-400">Applied {formatDate(application.dateApplied)}</p>
        )}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-neutral-50 pt-4 sm:border-0 sm:pt-0">
        <StatusBadge status={application.status || 'Applied'} />
        <div className="flex items-center gap-1.5">
          <Button variant="secondary" onClick={() => navigate(`/applications/${application.id}`)}>
            View
          </Button>
          <Button variant="danger" onClick={() => onDelete(application.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;
