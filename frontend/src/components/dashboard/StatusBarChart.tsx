import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  status: string;
  total: number;
}

interface StatusBarChartProps {
  data: ChartData[];
}

function StatusBarChart({
  data,
}: StatusBarChartProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Applications by Status
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Distribution of your applications across hiring stages.
        </p>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="status"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="total"
              radius={[8, 8, 0, 0]}
              fill="#2563EB"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatusBarChart;