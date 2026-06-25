import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface ChartData {
  status: string;
  total: number;
}

interface StatusPieChartProps {
  data: ChartData[];
}

const COLORS = [
  '#2563EB',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#6B7280',
];

function StatusPieChart({
  data,
}: StatusPieChartProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Status Distribution
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overall breakdown of application stages.
        </p>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="status"
              outerRadius={85}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={24}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatusPieChart;