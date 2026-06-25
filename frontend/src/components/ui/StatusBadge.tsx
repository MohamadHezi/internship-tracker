import Badge from './Badge';
import { getStatusColor } from '../../utils/getStatusColor';

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <Badge color={getStatusColor(status)}>
      {status}
    </Badge>
  );
}

export default StatusBadge;