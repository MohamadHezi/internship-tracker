interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    Applied: 'bg-blue-100 text-blue-700',
    Interview: 'bg-yellow-100 text-yellow-700',
    Offer: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
    Interested: 'bg-gray-100 text-gray-700',
    'OA (Online Assessment)': 'bg-purple-100 text-purple-700',
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status as keyof typeof styles] ??
        'bg-gray-100 text-gray-700'
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;