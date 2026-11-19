import { useState } from "react";
import API from "../../services/api";

function Company() {

  const [form, setForm] = useState({

    companyName: "",
    industry: "",
    description: "",
    packageOffered: "",
    website: ""

  });

  const changeHandler = (e) => {

    setForm({

      ...form,
      [e.target.name]: e.target.value

    });

  };

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      console.log(form);

      const response = await API.post("/company", form);

      console.log(response.data);

      alert("Company Created Successfully");

      setForm({
        companyName: "",
        industry: "",
        description: "",
        packageOffered: "",
        website: ""
      });

    } catch (err) {

      console.log(err.response);

      alert(err.response?.data?.message || "Failed to create company");

    }

  };

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Company Profile
      </h1>

      <form

        className="bg-white p-8 rounded-xl shadow max-w-xl"
        style={{marginTop:"8px"}}

        onSubmit={submitHandler}

      >

        <input

          type="text"

          name="companyName"

          placeholder="Company Name"

          className="border p-3 mb-4 w-full"

          value={form.companyName}

          onChange={changeHandler}

          required

        />

        <input

          type="text"

          name="industry"

          placeholder="Industry"

          className="border p-3 mb-4 w-full"

          value={form.industry}

          onChange={changeHandler}

        />

        <textarea

          name="description"

          placeholder="Description"

          className="border p-3 mb-4 w-full"

          value={form.description}

          onChange={changeHandler}

        />

        <input

          type="number"

          name="packageOffered"

          placeholder="Package Offered"

          className="border p-3 mb-4 w-full"

          value={form.packageOffered}

          onChange={changeHandler}

        />

        <input

          type="text"

          name="website"

          placeholder="Website"

          className="border p-3 mb-4 w-full"

          value={form.website}

          onChange={changeHandler}

        />
         <div className="h-2"></div>
        <button

          type="submit"

          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"

        >

          Save Company

        </button>

      </form>

    </div>

  );

}

export default Company;