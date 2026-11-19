import { useEffect, useState } from "react";
import API from "../../services/api";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const res = await API.get("/dashboard/recruiter");

        console.log(res.data);

        setDashboard(res.data);

      } catch (err) {

        console.log(err.response?.data);

      }

    };

    fetchDashboard();

  }, []);

  return (

    <div className="p-8 font-bold text-black dark:text-white">

      <h1 className="text-3xl font-bold">
        Recruiter Dashboard
      </h1>

      {dashboard && (

        <div className="grid grid-cols-4 gap-6 mt-8">

          <div className="bg-blue-500 text-white p-6 rounded-xl">
            <h2>Total Jobs</h2>
            <h1 className="text-3xl font-bold">
              {dashboard.totalJobs}
            </h1>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-xl">
            <h2>Applications</h2>
            <h1 className="text-3xl font-bold">
              {dashboard.totalApplications}
            </h1>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-xl">
            <h2>Interviews</h2>
            <h1 className="text-3xl font-bold">
              {dashboard.interviews}
            </h1>
          </div>

          <div className="bg-red-500 text-white p-6 rounded-xl">
            <h2>Selected</h2>
            <h1 className="text-3xl font-bold">
              {dashboard.selected}
            </h1>
          </div>

        </div>

      )}

    </div>

  );

}

export default Dashboard;