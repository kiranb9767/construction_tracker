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
    <ResponsiveContainer width="100%" height="100%" className={"bg-gray-300"}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 50, left: 0, bottom: 10 }}
      >
        <CartesianGrid stroke="#f0f0f0"  />
        <XAxis type="number" tick={{ fontSize: 10 }} />

        <YAxis
          type="category"
          dataKey="name"
          width={100}
          tick={{ fontSize: 12 }}
        />

        <Tooltip formatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
        contentStyle={{ borderRadius: "100px", outline: "2px dotted #403ae7"}}
        cursor={false} />

        <Bar
          dataKey="value"
          fill="#3a4ddd"
          radius={[0, 10, 10, 0]}
          barSize={10}
        >
          <LabelList dataKey="value" position="right" fontSize={12} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
