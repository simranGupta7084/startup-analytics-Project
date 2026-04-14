import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueGrowthData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 16000 },
  { month: "Mar", revenue: 21000 },
  { month: "Apr", revenue: 24000 },
  { month: "May", revenue: 30000 },
  { month: "Jun", revenue: 34500 },
];

const startupStageData = [
  { name: "Seed", value: 30 },
  { name: "Series A", value: 25 },
  { name: "Series B", value: 20 },
  { name: "Growth", value: 15 },
  { name: "Late Stage", value: 10 },
];

const fundingByIndustryData = [
  { industry: "AI & ML", funding: 32 },
  { industry: "Fintech", funding: 24 },
  { industry: "Health", funding: 18 },
  { industry: "SaaS", funding: 27 },
  { industry: "Climate", funding: 14 },
];

const donutColors = ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"];
const barColors = ["#22d3ee", "#60a5fa", "#c084fc", "#34d399", "#fbbf24"];

const chartContainerClass =
  "rounded-3xl border border-gray-800 bg-gray-900/80 p-5 shadow-glow transition duration-300 hover:border-gray-700";

const tooltipStyle = {
  backgroundColor: "#111827",
  border: "1px solid #1f2937",
  borderRadius: "16px",
  color: "#f9fafb",
};

function Charts() {
  return (
    <div className="grid gap-6 xl:grid-cols-5">
      <div className={`${chartContainerClass} xl:col-span-3`}>
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Revenue Growth</h3>
          <p className="text-sm text-gray-400">Monthly trend from January to June</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueGrowthData}>
              <XAxis dataKey="month" stroke="#9ca3af" tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#22d3ee"
                strokeWidth={3}
                dot={{ r: 4, fill: "#22d3ee" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${chartContainerClass} xl:col-span-2`}>
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Startup Stage Distribution</h3>
          <p className="text-sm text-gray-400">Portfolio spread by lifecycle stage</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={startupStageData}
                innerRadius={70}
                outerRadius={105}
                paddingAngle={4}
                dataKey="value"
              >
                {startupStageData.map((entry, index) => (
                  <Cell key={entry.name} fill={donutColors[index % donutColors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: "#d1d5db" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${chartContainerClass} xl:col-span-5`}>
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Funding by Industry</h3>
          <p className="text-sm text-gray-400">Capital allocation across leading sectors</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={fundingByIndustryData}>
              <XAxis dataKey="industry" stroke="#9ca3af" tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`$${value}M`, "Funding"]} />
              <Bar dataKey="funding" radius={[14, 14, 0, 0]}>
                {fundingByIndustryData.map((entry, index) => (
                  <Cell key={entry.industry} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Charts;
