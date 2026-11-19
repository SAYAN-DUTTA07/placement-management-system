import { useEffect, useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";

function ApplicationStatus() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {

    fetchApplications();

  }, []);

  const fetchApplications = async () => {

    try {

      const response = await API.get(
        "/application/myapplications"
      );

      setApplications(response.data);

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
          Application Status
        </h1>

        {

          applications.length === 0 ?

            <h2>No Applications Yet</h2>

            :

            applications.map((application) => (

              <div
                key={application._id}
                className="bg-white text-black p-6 rounded-xl shadow mb-6
dark:bg-gray-800 dark:text-white"
style={{marginTop:"10px",
  marginRight:"50%"
}}
              >

                <h2 className="text-2xl font-bold">

                  {application.job?.role}

                </h2>

                <p>

                  Company:

                  {" "}

                  {application.job?.company?.companyName}

                </p>

                <p>

                  Status:

                  {" "}

                  <span className="font-bold text-blue-600">

                    {application.status}

                  </span>

                </p>

              </div>

            ))

        }

      </div>

    </div>

  );

}

export default ApplicationStatus;