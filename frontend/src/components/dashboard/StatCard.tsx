interface StatCardProps {
  title: string;
  value: string | number;
}

function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold text-gray-900">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;