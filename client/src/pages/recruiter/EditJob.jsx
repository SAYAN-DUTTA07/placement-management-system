import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";

function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({

    role: "",
    description: "",
    minCGPA: "",
    branches: "",
    requiredSkills: "",
    deadline: ""

  });

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob = async () => {

    try {

      const response = await API.get(
        `/jobs/${id}`
      );

      setForm({

        role: response.data.role,
        description: response.data.description,
        minCGPA: response.data.minCGPA,
        branches: response.data.branches.join(","),
        requiredSkills: response.data.requiredSkills.join(","),
        deadline: response.data.deadline?.substring(0,10)

      });

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

        `/jobs/${id}`,

        {

          role: form.role,
          description: form.description,
          minCGPA: form.minCGPA,
          branches: form.branches.split(","),
          requiredSkills: form.requiredSkills.split(","),
          deadline: form.deadline

        }

      );

      alert("Job Updated Successfully");

      navigate("/recruiter/my-jobs");

    }
    catch (err) {

      alert("Update Failed");

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl mb-8">
        Edit Job
      </h1>

      <form
        className="bg-white p-8 rounded shadow max-w-xl"
        onSubmit={submitHandler}
      >

        <input
          className="border p-3 mb-4 w-full"
          name="role"
          value={form.role}
          onChange={changeHandler}
        />

        <textarea
          className="border p-3 mb-4 w-full"
          name="description"
          value={form.description}
          onChange={changeHandler}
        />

        <input
          className="border p-3 mb-4 w-full"
          name="minCGPA"
          value={form.minCGPA}
          onChange={changeHandler}
        />

        <input
          className="border p-3 mb-4 w-full"
          name="branches"
          value={form.branches}
          onChange={changeHandler}
        />

        <input
          className="border p-3 mb-4 w-full"
          name="requiredSkills"
          value={form.requiredSkills}
          onChange={changeHandler}
        />

        <input
          type="date"
          className="border p-3 mb-4 w-full"
          name="deadline"
          value={form.deadline}
          onChange={changeHandler}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">

          Update Job

        </button>

      </form>

    </div>

  );

}

export default EditJob;