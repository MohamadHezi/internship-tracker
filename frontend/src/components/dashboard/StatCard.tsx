interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-5 transition-colors hover:border-neutral-200">
      <p className="text-xs font-medium uppercase tracking-widest text-neutral-400">{title}</p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-900">{value}</p>
    </div>
  );
}

export default StatCard;
