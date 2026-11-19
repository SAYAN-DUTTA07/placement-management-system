import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import NotificationBell from "../../components/NotificationBell";
import DashboardCard from "../../components/DashboardCard";
import API from "../../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);
  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      // Dashboard Data
      const dashboardRes = await API.get("/dashboard/student");
      setDashboard(dashboardRes.data);

      // Student Applications
      const applicationRes = await API.get("/application/myapplications");
      setApplications(applicationRes.data);

      const interviewRes = await API.get("/interview/myinterviews");
      setInterviews(interviewRes.data);

    }

    catch (err) {

      console.log(err);

    }

  };

  const pieData = [

    { name: "Pending", value: dashboard?.pending || 0 },

    { name: "Selected", value: dashboard?.selected || 0 },

    { name: "Rejected", value: dashboard?.rejected || 0 }

  ];

  const barData = [

    {
      name: "Applications",
      value: dashboard?.totalApplications || 0
    },

    {
      name: "Interviews",
      value: dashboard?.interviews || 0
    },

    {
      name: "Selected",
      value: dashboard?.selected || 0
    }

  ];

  const COLORS = [

    "#FBBF24",

    "#10B981",

    "#EF4444"

  ];

  return (

    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar />

      <main
        className="flex-1 p-8 overflow-x-hidden"
        style={{
          marginLeft: "17rem",
        }}
      >

        <div className="flex justify-between items-center mb-8">

          <div className="ml-6">

            <h1 className="text-4xl font-bold text-black dark:text-white">
              👋 Welcome Back
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Track your placement progress here.
            </p>

          </div>

          <NotificationBell />

        </div>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

          <DashboardCard
            title="Applications"
            value={dashboard?.totalApplications || 0}
            icon="📄"
            color="#3B82F6"
          />

          <DashboardCard
            title="Pending"
            value={dashboard?.pending || 0}
            icon="🟡"
            color="#FBBF24"
          />

          <DashboardCard
            title="Selected"
            value={dashboard?.selected || 0}
            icon="🟢"
            color="#10B981"
          />

          <DashboardCard
            title="Rejected"
            value={dashboard?.rejected || 0}
            icon="🔴"
            color="#EF4444"
          />

          <DashboardCard
            title="Interviews"
            value={dashboard?.interviews || 0}
            icon="📅"
            color="#8B5CF6"
          />

        </div>

        {/* Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 min-h-[420px]">

            <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">

              Application Status

            </h2>

            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label
                  >

                    {

                      pieData.map((entry, index) => (

                        <Cell

                          key={index}

                          fill={COLORS[index]}

                        />

                      ))

                    }

                  </Pie>

                  <Tooltip />

                  <Legend
                    layout="horizontal"
                    align="center"
                    verticalAlign="bottom"
                    iconType="square"
                    wrapperStyle={{
                      paddingTop: "10px",
                      transform: "translateX(5px) translateY(-20px)",
                      fontSize: "16px",
                    }} />

                </PieChart>

              </ResponsiveContainer>
            </div>

          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 min-w-0">

            <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">

              Placement Overview

            </h2>

            <div className="w-full max-w-2xl">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={barData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid
                    stroke="transparent"
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#D1D5DB", fontSize: 14 }}
                  />

                  <YAxis
                    tick={{ fill: "#D1D5DB", fontSize: 14 }}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      color: "#fff",
                    }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />

                  <Bar
                    dataKey="value"
                    fill="#3B82F6"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

        {/* Bottom Section */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          style={{marginTop:"10px"}}>

            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">

              Recent Applications

            </h2>

            <table className="w-full bg-white dark:bg-gray-800 dark:text-white">

              <thead className="text-black dark:text-white">
                <tr className="border-b border-gray-300 dark:border-gray-600">
                  <th className="text-center py-3 px-6 w-1/3">
                    Company
                  </th>

                  <th className="text-left py-3 px-8 w-1/3">
                    Job Role
                  </th>

                  <th className="text-left py-3 px-6 w-1/9">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>

                {applications.length === 0 ? (

                  <tr>

                    <td
                      colSpan="3"
                      className="text-center py-5 text-gray-500"
                    >

                      No Applications Yet

                    </td>

                  </tr>

                ) : (

                  applications.map((app) => (

                    <tr
                      key={app._id}
                      className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >

                      <td className="py-3 px-6 text-center">
                        {app.job.company.companyName}
                      </td>

                      <td className="py-3 px-8 text-left">
                        {app.job.role}
                      </td>

                      <td className="py-3 px-6 text-left">

                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm
${app.status === "Pending"
                              ? "bg-yellow-500"
                              : app.status === "Selected"
                                ? "bg-green-600"
                                : "bg-red-600"}

`}
                        >

                          {app.status}

                        </span>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 min-w-0"
          style={{marginTop:"10px"}}>

            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">

              Upcoming Interviews

            </h2>

            {interviews.length === 0 ? (

              <p className="text-gray-600 dark:text-gray-300">
                No Upcoming Interviews
              </p>

            ) : (

              interviews.map((interview) => (

                <div
                  key={interview._id}
                  className="border rounded-lg p-4 mb-4 hover:shadow-md transition"
                  style={{marginTop:"10px"}}
                >

                  <h3 className="font-bold text-lg dark:text-white">

                    {interview.job?.company?.companyName}

                  </h3>

                  <p className="text-blue-600 dark:text-blue-400">

                    {interview.job?.role}

                  </p>

                  <p className="mt-2 text-gray-500 dark:text-gray-200">

                    📅 {new Date(interview.date).toLocaleDateString()}

                  </p>

                  <p className="text-gray-600 dark:text-gray-300">

                    🕒 {interview.time}

                  </p>

                  <p className="text-gray-600 dark:text-gray-300">

                    📍 {interview.mode === "Online"
                      ? interview.meetingLink
                      : interview.venue}

                  </p>

                  <span
                    className={`inline-flex items-center justify-center
  min-w-[80px]
  h-7
  rounded-full
  bg-blue-600
  text-white
  text-[14px]`}
                  >
                    {interview.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

    </div >

  );

}

export default Dashboard;