import { useState } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";

function Resume() {

  const [file, setFile] = useState(null);

  const uploadResume = async () => {

    if (!file) {

      alert("Select a PDF file");

      return;

    }

    const formData = new FormData();

    formData.append(
      "resume",
      file
    );

    try {

      const response = await API.post(
        "/student/upload-resume",formData,{
          headers:{
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Resume Uploaded Successfully");

      console.log(response.data);

    }
    catch (err) {

      console.log(err);

      alert("Upload Failed");

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
          Resume Upload
        </h1>

        <div className="bg-white p-8 rounded-xl shadow max-w-md"
        style={{marginTop:"10px"}}>

          <input
            type="file"
            accept=".pdf"
            className="border p-3 w-full"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full"
            onClick={uploadResume}
          >
            Upload Resume
          </button>

        </div>

      </div>

    </div>

  );

}

export default Resume;