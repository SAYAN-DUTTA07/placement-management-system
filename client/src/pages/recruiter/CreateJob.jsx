import { useState, useEffect } from "react";
import API from "../../services/api";

function CreateJob() {

  const [companyId, setCompanyId] = useState("");

  const [form, setForm] = useState({
    role: "",
    description: "",
    minCGPA: "",
    branches: "",
    requiredSkills: "",
    passoutYear: "",
    deadline: "",
    location: ""
  });

  useEffect(() => {

    fetchCompany();

  }, []);

  const fetchCompany = async () => {

    try {

      const response = await API.get(
        "/company/mycompany"
      );

      console.log("Company Response:", response.data);

      if (response.data) {

        setCompanyId(response.data._id);

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
    console.log("Company ID =", companyId);
    console.log(form);

    try {

      await API.post("/jobs", {
        company: companyId,
        role: form.role,
        description: form.description,
        minCGPA: form.minCGPA,
        branches: form.branches.split(",").map(branch => branch.trim()),
        requiredSkills: form.requiredSkills.split(",").map(skill => skill.trim()),
        passoutYear: form.passoutYear,
        deadline: form.deadline,
        location: form.location
      });

      alert("Job Created Successfully");

    }
    catch (err) {

      alert(
        err.response?.data?.message ||
        "Failed to create job"
      );

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Create Job
      </h1>

      <form
        className="bg-white p-8 rounded-xl shadow max-w-xl"
        onSubmit={submitHandler}
      >

        <input
          type="text"
          name="role"
          placeholder="Job Role"
          className="border p-3 mb-4 w-full"
          onChange={changeHandler}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-3 mb-4 w-full"
          onChange={changeHandler}
        />

        <input
          type="number"
          name="minCGPA"
          placeholder="Minimum CGPA"
          className="border p-3 mb-4 w-full"
          onChange={changeHandler}
        />

        <input
          type="text"
          name="branches"
          placeholder="Eligible Branches (Comma Separated)"
          className="border p-3 mb-4 w-full"
          onChange={changeHandler}
        />

        <input
          type="text"
          name="requiredSkills"
          placeholder="React,Node,MongoDB"
          className="border p-3 mb-4 w-full"
          onChange={changeHandler}
        />

        <input
          type="date"
          name="deadline"
          className="border p-3 mb-4 w-full"
          onChange={changeHandler}
        />

        <input
          type="number"
          name="passoutYear"
          placeholder="Passout Year"
          onChange={changeHandler}
        />

        <input
          type="text"
          name="location"
          placeholder="Job Location"
          className="border p-3 mb-4 w-full"
          onChange={changeHandler}
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Create Job
        </button>

      </form>

    </div>

  );

}

export default CreateJob;