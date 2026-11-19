import { useState, useEffect } from "react";
import API from "../../services/api";
import RecruiterSidebar from "../../components/RecruiterSidebar";

function ScheduleInterview() {

  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [form, setForm] = useState({
    student: "",
    job: "",
    company: "",
    date: "",
    time: "",
    mode: "Online",
    meetingLink: "",
    venue: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const studentsRes = await API.get(
        "/interview/students"
      );

      const jobsRes = await API.get(
        "/interview/jobs"
      );

      const companiesRes = await API.get(
        "/interview/companies"
      );

      setStudents(studentsRes.data);
      setJobs(jobsRes.data);
      setCompanies(companiesRes.data);

    }
    catch (err) {

      console.log(err);

    }

  };

  const changeHandler = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      await API.post("/interview", form);

      alert(
        "Interview Scheduled Successfully"
      );

    }
    catch (err) {

      console.log(err);

      alert(
        "Failed to Schedule Interview"
      );

    }

  };

  return (

    <div className="flex">

      <RecruiterSidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Schedule Interview
        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >

          <select
            name="student"
            className="border p-3 w-full"
            onChange={changeHandler}
          >

            <option value="">
              Select Student
            </option>

            {students.map(student => (

              <option
                key={student._id}
                value={student._id}
              >
                {student.user?.name} ({student.studentId})
              </option>

            ))}

          </select>

          <select
            name="job"
            className="border p-3 w-full"
            onChange={changeHandler}
          >

            <option value="">
              Select Job
            </option>

            {jobs.map(job => (

              <option
                key={job._id}
                value={job._id}
              >
                {job.role}
              </option>

            ))}

          </select>

          <select
            name="company"
            className="border p-3 w-full"
            onChange={changeHandler}
          >

            <option value="">
              Select Company
            </option>

            {companies.map(company => (

              <option
                key={company._id}
                value={company._id}
              >
                {company.companyName}
              </option>

            ))}

          </select>

          <input
            type="date"
            name="date"
            className="border p-3 w-full"
            onChange={changeHandler}
          />

          <input
            type="time"
            name="time"
            className="border p-3 w-full"
            onChange={changeHandler}
          />

          <select
            name="mode"
            className="border p-3 w-full"
            onChange={changeHandler}
          >
            <option value="Online">
              Online
            </option>

            <option value="Offline">
              Offline
            </option>
          </select>

          <input
            name="meetingLink"
            placeholder="Meeting Link"
            className="border p-3 w-full"
            onChange={changeHandler}
          />

          <input
            name="venue"
            placeholder="Venue"
            className="border p-3 w-full"
            onChange={changeHandler}
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Schedule Interview
          </button>

        </form>

      </div>

    </div>

  );

}

export default ScheduleInterview;