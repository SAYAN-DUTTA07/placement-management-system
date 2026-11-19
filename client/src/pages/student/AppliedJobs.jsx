import { useEffect, useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";

function AppliedJobs() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await API.get("/application");
      setApplications(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div
        className="flex-1 p-8"
        style={{ marginLeft: "16.3rem" }}
      >
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Applied Jobs
        </h1>

        {/* Cards Container */}
        <div
          className="space-y-6"
          style={{ marginTop: "12px",
            marginRight:"50%"
           }}
        >
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-black dark:text-white">
                {application.job?.role}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Company: {application.job?.company?.companyName}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                Status: {application.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;