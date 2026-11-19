import { useState, useEffect } from "react";
import API from "../../services/api";
import Sidebar from "../../components/Sidebar";

function Profile() {

  const [form, setForm] = useState({
    studentId: "",
    department: "",
    cgpa: "",
    backlogs: "",
    skills: "",
    projects: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const response = await API.get("/student/profile");

      if (response.data) {

        setForm({
          studentId: response.data.studentId || "",
          department: response.data.department || "",
          cgpa: response.data.cgpa || "",
          backlogs: response.data.backlogs || "",
          skills: response.data.skills?.join(",") || "",
          projects: response.data.projects?.join(",") || ""
        });

      }

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

      await API.put(
        "/student/profile",
        {
          ...form,
          skills: form.skills.split(","),
          projects: form.projects.split(",")
        }
      );

      alert("Profile Updated Successfully");

    }
    catch (err) {

      alert("Failed to update profile");

    }

  };

  return (
    <div className="flex">

      <Sidebar />

      <div
        className="p-8"
        style={{
          marginLeft: "16.3rem",
          //background:

        }}
      >

        <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
          Student Profile
        </h1>

        <form
          className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition min-h-[500px]"
          style={{marginRight:"50%"}}
          onSubmit={submitHandler}
        >

          <input
            type="text"
            name="studentId"
            value={form.studentId}
            placeholder="Student ID"
            className="border p-3 mb-4 w-full"
            onChange={changeHandler}
          />

          <input
            type="text"
            name="department"
            value={form.department}
            placeholder="Department"
            className="border p-3 mb-4 w-full"
            onChange={changeHandler}
          />

          <input
            type="number"
            name="cgpa"
            value={form.cgpa}
            placeholder="CGPA"
            className="border p-3 mb-4 w-full"
            onChange={changeHandler}
          />

          <input
            type="number"
            name="backlogs"
            value={form.backlogs}
            placeholder="Backlogs"
            className="border p-3 mb-4 w-full"
            onChange={changeHandler}
          />

          <input
            type="text"
            name="skills"
            value={form.skills}
            placeholder="Skills (comma separated)"
            className="border p-3 mb-4 w-full"
            onChange={changeHandler}
          />

          <input
            type="text"
            name="projects"
            value={form.projects}
            placeholder="Projects (comma separated)"
            className="border p-3 mb-4 w-full"
            onChange={changeHandler}
          />

          <div className="h-2"></div>

          <button
            type="submit"
            className="bg-blue-600 text-white text-xl px-10 py-4 rounded-lg"
          >
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;