import { useEffect, useState } from "react";
import API from "../../services/api";
import RecruiterSidebar from "../../components/RecruiterSidebar";

function ManageInterviews() {

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {

    try {

      const res = await API.get("/interview/recruiter");

      setInterviews(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const markCompleted = async (id) => {

    try {

      await API.put(`/interview/${id}`, {
        status: "Completed"
      });

      alert("Interview Completed");

      fetchInterviews();

    } catch (err) {

      console.log(err);

    }

  };

  const deleteInterview = async (id) => {

    if (!window.confirm("Delete Interview?")) return;

    try {

      await API.delete(`/interview/${id}`);

      alert("Interview Deleted");

      fetchInterviews();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="flex">

      <RecruiterSidebar />

      <div className="flex-1 p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          Manage Interviews
        </h1>
        <div style={{ height: "10px" }}></div>
        {interviews.length === 0 ? (

          <h2>No Interviews Scheduled</h2>

        ) : (
          <table className="mt-6 w-full bg-white dark:bg-gray-800 rounded shadow">

            <thead className="bg-blue-600 text-white">

              <tr>

                <th className="p-3">Student</th>

                <th>Job</th>

                <th>Company</th>

                <th>Date</th>

                <th>Time</th>

                <th>&Mode</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {interviews.map(interview => (

                <tr
                  key={interview._id}
                  className="border-b border-gray-300 dark:border-gray-700 text-center text-black dark:text-white"
                >

                  <td className="p-3">
                    {interview.student?.user?.name}
                  </td>

                  <td>
                    {interview.job?.role}
                  </td>

                  <td>
                    {interview.company?.companyName}
                  </td>

                  <td>
                    {new Date(interview.date).toLocaleDateString()}
                  </td>

                  <td>
                    {interview.time}
                  </td>

                  <td>
                    {interview.mode}
                  </td>

                  <td>
                    {interview.status}
                  </td>

                  <td>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => markCompleted(interview._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded mr-8"
                      >
                        Complete
                      </button>

                      <button
                        onClick={() => deleteInterview(interview._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default ManageInterviews;