import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from "recharts";

function DepartmentChart({ data }) {

  return (

    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Department-wise Placements
      </h2>

      <ResponsiveContainer width="100%" height={400}>

        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="department" />

          <YAxis allowDecimals={false} />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#2563EB"
            radius={[10, 10, 0, 0]}
          >
            <LabelList
              dataKey="count"
              position="top"
            />
          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}

export default DepartmentChart;