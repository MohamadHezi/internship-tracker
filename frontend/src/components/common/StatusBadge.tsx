interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Interested: 'bg-neutral-100 text-neutral-600',
    Applied: 'bg-blue-50 text-blue-700',
    OA: 'bg-violet-50 text-violet-700',
    'OA (Online Assessment)': 'bg-violet-50 text-violet-700',
    Interview: 'bg-amber-50 text-amber-700',
    Offer: 'bg-emerald-50 text-emerald-700',
    Rejected: 'bg-red-50 text-red-600',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        styles[status] ?? 'bg-neutral-100 text-neutral-600'
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
