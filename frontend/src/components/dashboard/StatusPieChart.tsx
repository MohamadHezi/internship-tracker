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

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#a3a3a3'];

function StatusPieChart({ data }: StatusPieChartProps) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-neutral-900">Status Distribution</h2>
        <p className="mt-1 text-xs text-neutral-400">Breakdown of application stages</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="status"
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                fontSize: 12,
                padding: '8px 12px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12, paddingTop: 16 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StatusPieChart;
