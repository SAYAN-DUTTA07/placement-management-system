import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function MyJobs() {

  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const response = await API.get(
        "/jobs/myjobs"
      );

      setJobs(response.data);

    }
    catch (err) {

      console.log(err);

    }

  };

  const deleteJob = async (id) => {

    try {

      await API.delete(
        `/jobs/${id}`
      );

      alert("Job Deleted Successfully");

      fetchJobs();

    }
    catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed to delete job"
      );

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Jobs
      </h1>

      {

        jobs.length === 0 ?

          <h2 className="text-xl">
            No Jobs Posted Yet
          </h2>

          :

          jobs.map((job) => (

            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow mb-6"
            >

              <h2 className="text-2xl font-bold">
                {job.role}
              </h2>

              <p className="mt-2 text-gray-700">
                Company: {job.company?.companyName}
              </p>

              <p className="text-gray-700">
                Minimum CGPA: {job.minCGPA}
              </p>

              <p className="text-gray-700">
                Branches: {job.branches?.join(", ")}
              </p>

              <p className="text-gray-700">
                Skills: {job.requiredSkills?.join(", ")}
              </p>

              <p className="text-gray-700">
                Deadline: {new Date(job.deadline).toLocaleDateString()}
              </p>

              <div className="mt-5">

                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-4"
                  onClick={() =>
                    navigate(
                      `/recruiter/edit-job/${job._id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded ml-4"
                  onClick={() =>
                    navigate(`/recruiter/applicants/${job._id}`)
                  }
                >
                  View Applicants
                </button>

              </div>

            </div>

          ))

      }

    </div>

  );

}

export default MyJobs;