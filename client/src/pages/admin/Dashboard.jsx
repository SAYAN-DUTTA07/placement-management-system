import { useEffect, useState } from "react";
import API from "../../services/api";
import AdminCharts from "../../components/AdminCharts";
import DepartmentChart from "../../components/DepartmentChart";

function Dashboard() {

  const [stats, setStats] = useState({});
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchDepartmentStats();
  }, []);

  const fetchStats = async () => {
    try {

      const response = await API.get("/admin/dashboard");

      console.log("Dashboard:", response.data);

      setStats(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchDepartmentStats = async () => {
    try {

      const response = await API.get("/admin/department-stats");

      console.log("Department Stats:", response.data);

      setDepartmentData(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  // Download Placement Report
  const downloadReport = async () => {

    try {

      const response = await API.get(
        "/admin/placement-report",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Placement_Report.xlsx"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (err) {

      console.log(err);

      alert("Failed to download report");

    }

  };

  const downloadPDF = async () => {

    try {

      const response = await API.get(
        "/admin/placement-pdf",
        {
          responseType: "blob"
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Placement_Report.pdf"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8 text-black dark:text-white">

        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={downloadReport}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Download Placement Report
          </button>

          <button
            onClick={downloadPDF}
            className="bg-red-600 text-white px-5 py-3 rounded-lg shadow hover:bg-red-700"
          >
            Download PDF Report
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-blue-600 text-white p-8 rounded-xl shadow">
          <h2 className="text-2xl">Total Students</h2>
          <p className="text-4xl mt-4">
            {stats.totalStudents}
          </p>
        </div>

        <div className="bg-green-600 text-white p-8 rounded-xl shadow">
          <h2 className="text-2xl">Total Recruiters</h2>
          <p className="text-4xl mt-4">
            {stats.totalRecruiters}
          </p>
        </div>

        <div className="bg-purple-600 text-white p-8 rounded-xl shadow">
          <h2 className="text-2xl">Total Companies</h2>
          <p className="text-4xl mt-4">
            {stats.totalCompanies}
          </p>
        </div>

        <div className="bg-yellow-500 text-white p-8 rounded-xl shadow">
          <h2 className="text-2xl">Total Jobs</h2>
          <p className="text-4xl mt-4">
            {stats.totalJobs}
          </p>
        </div>

        <div className="bg-red-600 text-white p-8 rounded-xl shadow">
          <h2 className="text-2xl">Total Applications</h2>
          <p className="text-4xl mt-4">
            {stats.totalApplications}
          </p>
        </div>

        <div className="bg-indigo-600 text-white p-8 rounded-xl shadow">
          <h2 className="text-2xl">Selected Students</h2>
          <p className="text-4xl mt-4">
            {stats.selectedStudents}
          </p>
        </div>

      </div>
      <div style={{marginTop:"10px"}}></div>
      <div>
        <AdminCharts stats={stats} />
      </div>
      <div style={{marginTop:"10px"}}></div>
      <div>
        <DepartmentChart data={departmentData} />
      </div>

    </div>

  );

}

export default Dashboard;