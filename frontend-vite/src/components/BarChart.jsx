import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

const BarChartComponent = ({ data, type }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="horizontal"
          margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

          <XAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            type="number"
            
            width={100}
            tick={{ fontSize: 12, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "12px",
              color: "#111827",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
            cursor={{ fill: "rgba(99,102,241,0.08)" }}
          />

          <Bar
            dataKey="value"
            fill="#6366f1"   
            radius={[8, 8, 8, 8]}
            barSize={12}
          >
            <LabelList
              dataKey="value"
              position="right"
              fontSize={11}
              fill="#374151"
              formatter={(val) => `₹${(val / 1000).toFixed(0)}K`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;