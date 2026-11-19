import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function AdminCharts({ stats }) {

  const data = [
    {
      name: "Selected",
      value: stats.selectedStudents || 0,
    },
    {
      name: "Others",
      value: Math.max(
        (stats.totalApplications || 0) -
        (stats.selectedStudents || 0),
        0
      ),
    },
  ];

  const COLORS = ["#10B981", "#F97316"];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold mb-6 text-center">
        Placement Analytics
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={140}
            innerRadius={70}
            paddingAngle={5}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            height={36}
          />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AdminCharts;