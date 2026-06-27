interface BadgeProps {
  children: React.ReactNode;
  color: 'gray' | 'blue' | 'yellow' | 'green' | 'red' | 'purple';
}

function Badge({ children, color }: BadgeProps) {
  const colors = {
    gray: 'bg-neutral-100 text-neutral-600',
    blue: 'bg-blue-50 text-blue-700',
    yellow: 'bg-amber-50 text-amber-700',
    green: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-violet-50 text-violet-700',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
}

export default Badge;
