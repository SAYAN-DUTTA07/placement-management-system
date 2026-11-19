import { useEffect, useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";

function MyInterviews() {

  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {

    try {

      const response = await API.get(
        "/interview/myinterviews"
      );

      setInterviews(response.data);
      console.log("Interviews:", response.data);

    }
    catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 p-8"
      style={{
        marginLeft:"16.3rem"
      }}>

        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          My Interviews
        </h1>

        {interviews.map(interview => (

          <div
            key={interview._id}
            className="bg-white p-6 rounded-xl shadow mb-4"
            style={{marginTop:"10px",
              marginRight:"50%"
            }}
          >

            <h2 className="text-2xl font-semibold">
              {interview.company?.name}
            </h2>

            <p>
              Company: {interview.company?.companyName}
            </p>

            <p>
              Job: {interview.job?.role}
            </p>

            <p>
              Date: {new Date(interview.date).toLocaleDateString()}
            </p>

            <p>
              Time: {interview.time}
            </p>

            <p>
              Mode: {interview.mode}
            </p>

            {interview.meetingLink && (
              <p>
                Link: {interview.meetingLink}
              </p>
            )}

            {interview.venue && (
              <p>
                Venue: {interview.venue}
              </p>
            )}

          </div>

        ))}

      </div>

    </div>

  );

}

export default MyInterviews;