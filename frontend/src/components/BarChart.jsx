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
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} 
            bargap={2}
          barcategorygap="5"
          bordersize={1}
          margin={{top:20,right: 30, left: 20, bottom: 60 }}
          >
        <CartesianGrid strokeLinejoin="10 10" />
        <XAxis dataKey="name" hide />
        <YAxis hide/>
        <Tooltip cursor={false} 
        formatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
        contentStyle={{ borderRadius: "100px", borderColor: "#c3474d" }}
        />
        <Bar
          dataKey="value"
          fill="#c3474d"
          radius={[15,15,0,0]}
          label={{ position: "top", fill: "#000", fontSize: 12 }}
          barSize={30}
          position="top"
         activeBar={{ fill: "#eda2a2", radius: 10 }}
        >
         <LabelList dataKey="name" position="left" fill="#120303" fontSize={10} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
