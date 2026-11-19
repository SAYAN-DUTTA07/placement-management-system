import { useState, useEffect } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");
  const [company, setCompany] = useState("");
  const [cgpa, setCgpa] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [search, branch, company, cgpa, page]);

  // Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await API.get(
        `/jobs?search=${search}&branch=${branch}&company=${company}&cgpa=${cgpa}&page=${page}`
      );

      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Applied Jobs
  const fetchApplications = async () => {
    try {
      const res = await API.get("/application/myapplications");

      if (Array.isArray(res.data)) {
        setAppliedJobs(
          res.data
            .filter((app) => app.job)
            .map((app) => app.job._id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Apply Job
  const applyJob = async (jobId) => {
    try {
      await API.post("/application", {
        job: jobId,
      });

      alert("Applied Successfully");

      fetchApplications();
    } catch (err) {
      alert(err.response?.data?.message || "Application Failed");
    }
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8"
      style={{
        marginLeft:"16.3rem"
      }}>

        <h1 className="text-4xl font-bold mb-8 dark:text-white">
          Available Jobs
        </h1>

        {/* Search */}

        <input
          type="text"
          placeholder="Search by Role or Skill..."
          className="border p-3 mb-6 w-full rounded-lg shadow bg-white dark:bg-gray-700 text-black dark:text-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        {/* Filters */}

        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <select
            className="border p-3 mb-6 w-full rounded-lg shadow bg-white dark:bg-gray-700 text-black dark:text-white"
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Branches</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EE">EE</option>
            <option value="ME">ME</option>
            <option value="AIML">AIML</option>
            <option value="CST">CST</option>
            <option value="DS">DS</option>
            <option value="CSBS">CSBS</option>
            <option value="CE">CE</option>
          </select>

          <input
            type="text"
            placeholder="Company Name"
            className="border p-3 mb-6 w-full rounded-lg shadow bg-white dark:bg-gray-700 text-black dark:text-white"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              setPage(1);
            }}
          />

          <input
            type="number"
            placeholder="Minimum CGPA"
            className="border p-3 mb-6 w-full rounded-lg shadow bg-white dark:bg-gray-700 text-black dark:text-white"
            value={cgpa}
            onChange={(e) => {
              setCgpa(e.target.value);
              setPage(1);
            }}
          />

        </div>

        {/* Jobs */}

        {jobs.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold dark:text-white">
              No Jobs Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing your filters.
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition"
            >

              <h2 className="text-2xl font-bold text-blue-600">
                {job.role}
              </h2>

              <div className="grid md:grid-cols-2 gap-3 mt-4">

                <p>
                  <strong>Company:</strong>{" "}
                  {job.company?.companyName || "N/A"}
                </p>

                <p>
                  <strong>Package:</strong>{" "}
                  ₹
                  {job.company?.packageOffered?.toLocaleString() ||
                    "Not Disclosed"}
                </p>

                <p>
                  <strong>Minimum CGPA:</strong>{" "}
                  {job.minCGPA}
                </p>

                <p>
                  <strong>Branches:</strong>{" "}
                  {job.branches?.join(", ") || "N/A"}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {job.location || "N/A"}
                </p>

                <p>
                  <strong>Deadline:</strong>{" "}
                  {job.deadline
                    ? new Date(job.deadline).toLocaleDateString()
                    : "N/A"}
                </p>

              </div>

              <p className="mt-4">
                {job.description}
              </p>

              <button
                onClick={() => applyJob(job._id)}
                disabled={appliedJobs.includes(job._id)}
                className={`mt-6 w-full py-3 rounded-lg text-white ${
                  appliedJobs.includes(job._id)
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {appliedJobs.includes(job._id)
                  ? "Applied ✓"
                  : "Apply Now"}
              </button>

            </div>
          ))
        )}

        {/* Pagination */}

        <div className="flex justify-center items-center gap-6 mt-10">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          <span className="font-bold dark:text-white">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>
    </div>
  );
}

export default Jobs;