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

function StatusBarChart({ data }: StatusBarChartProps) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-neutral-900">Applications by Status</h2>
        <p className="mt-1 text-xs text-neutral-400">Distribution across hiring stages</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0ee" />
            <XAxis
              dataKey="status"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#a3a3a3' }}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: '#a3a3a3' }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                fontSize: 12,
                padding: '8px 12px',
              }}
              cursor={{ fill: '#f9f9f8' }}
            />
            <Bar dataKey="total" radius={[6, 6, 0, 0]} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatusBarChart;
