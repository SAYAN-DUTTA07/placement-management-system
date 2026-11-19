import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";
import RecruiterSidebar from "../../components/RecruiterSidebar";

function Applicants() {

  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [interviewData, setInterviewData] = useState({
    date: "",
    time: "",
    mode: "Online",
    meetingLink: "",
    venue: "",
    remarks: ""
  });

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {

    try {

      const response = await API.get(`/application/job/${jobId}`);

      setApplications(response.data);

    } catch (err) {

      console.log(err);

    }

  };

  const updateStatus = async (applicationId, status) => {

    try {

      await API.put(`/application/${applicationId}`, {
        status
      });

      alert("Application Status Updated Successfully");

      fetchApplicants();

    } catch (err) {

      console.log(err);

      alert("Failed to Update Status");

    }

  };

  const openInterviewModal = (application) => {

    setSelectedApplication(application);

    setInterviewData({
      date: "",
      time: "",
      mode: "Online",
      meetingLink: "",
      venue: "",
      remarks: ""
    });

    setShowInterviewModal(true);

  };

  const scheduleInterview = async () => {

    try {

      await API.post("/interview",{

application:selectedApplication._id,

student:selectedApplication.student._id,

job:selectedApplication.job._id,

company:selectedApplication.job.company._id,

date:interviewData.date,

time:interviewData.time,

mode:interviewData.mode,

meetingLink:interviewData.meetingLink,

venue:interviewData.venue,

remarks:interviewData.remarks

});

      alert("Interview Scheduled Successfully");

      setShowInterviewModal(false);

      fetchApplicants();

    } catch (err) {

      console.log(err);

      alert("Failed to Schedule Interview");

    }

  };

  return (

    <div className="flex">

      <RecruiterSidebar />

      <div className="flex-1 bg-gray-100 min-h-screen p-8">

        <h1 className="text-4xl font-bold mb-8">
          Applicants
        </h1>

        {applications.length === 0 ? (

          <h2 className="text-xl text-gray-600">
            No Applicants Yet
          </h2>

        ) : (

          applications.map((app) => (

            <div
              key={app._id}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >

              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {app.student?.user?.name}
              </h2>

              <p><strong>Email:</strong> {app.student?.user?.email}</p>

              <p><strong>Student ID:</strong> {app.student?.studentId}</p>

              <p><strong>Department:</strong> {app.student?.department}</p>

              <p><strong>CGPA:</strong> {app.student?.cgpa}</p>

              <p>
                <strong>Skills:</strong>{" "}
                {app.student?.skills?.length
                  ? app.student.skills.join(", ")
                  : "N/A"}
              </p>

              <p>
                <strong>Projects:</strong>{" "}
                {app.student?.projects?.length
                  ? app.student.projects.join(", ")
                  : "N/A"}
              </p>

              <div className="mt-4">

                <strong>Resume:</strong>{" "}

                {app.student?.resume ? (

                  <a
                    href={`http://localhost:5000${app.student.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded ml-3"
                  >
                    View Resume
                  </a>

                ) : (

                  <span className="text-red-500 ml-2">
                    Resume Not Uploaded
                  </span>

                )}

              </div>

              <hr className="my-5" />

              <p><strong>Job:</strong> {app.job?.role}</p>

              <p><strong>Company:</strong> {app.job?.company?.companyName}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="font-bold text-blue-600">
                  {app.status}
                </span>
              </p>

              <div className="flex flex-wrap gap-4 mt-6">

                <button
                  onClick={() => updateStatus(app._id, "Shortlisted")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded"
                >
                  Shortlist
                </button>

                <button
                  onClick={() => openInterviewModal(app)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
                >
                  Interview
                </button>

                <button
                  onClick={() => updateStatus(app._id, "Selected")}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                >
                  Select
                </button>

                <button
                  onClick={() => updateStatus(app._id, "Rejected")}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded"
                >
                  Reject
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {showInterviewModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-8 w-[500px]">

            <h2 className="text-2xl font-bold mb-6">
              Schedule Interview
            </h2>

            <input
              type="date"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  date: e.target.value
                })
              }
            />

            <input
              type="time"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  time: e.target.value
                })
              }
            />

            <select
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  mode: e.target.value
                })
              }
            >
              <option>Online</option>
              <option>Offline</option>
            </select>

            <input
              placeholder="Meeting Link"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  meetingLink: e.target.value
                })
              }
            />

            <input
              placeholder="Venue"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  venue: e.target.value
                })
              }
            />

            <textarea
              placeholder="Remarks"
              rows="4"
              className="border p-3 w-full mb-4"
              onChange={(e) =>
                setInterviewData({
                  ...interviewData,
                  remarks: e.target.value
                })
              }
            />

            <div className="flex justify-end gap-4">

              <button
                className="bg-gray-500 text-white px-5 py-2 rounded"
                onClick={() => setShowInterviewModal(false)}
              >
                Cancel
              </button>

              <button
                className="bg-blue-600 text-white px-5 py-2 rounded"
                onClick={scheduleInterview}
              >
                Schedule
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Applicants;