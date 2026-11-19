import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
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

      await API.post("/auth/register", form);

      alert("Registration Successful");

      navigate("/login");

    }
    catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        err.message
      );

    }

  };

  return (

    <div className="flex justify-center items-center h-screen dark:bg-gray-900">

      <form className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded shadow w-96"
        onSubmit={submitHandler}
      >

        <h1 className="text-3xl mb-5 font-bold">
          Register
        </h1>

         <div className="h-1.5"></div>
        <input
          name="name"
          placeholder="Name"
          className="border p-2 mb-3 w-full bg-white dark:bg-gray-700 dark:text-white"
          onChange={changeHandler}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 mb-3 w-full"
          onChange={changeHandler}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 mb-3 w-full"
          onChange={changeHandler}
        />

        <select
          name="role"
          className="border p-2 mb-3 w-full text-black bg-white dark:bg-gray-700 dark:text-white"
          onChange={changeHandler}
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
          <option value="admin">Admin</option>
        </select>

        <div className="h-2"></div>
        <button className="bg-green-600 text-white w-full p-2 rounded">
          Register
        </button>

      </form>

    </div>

  );

}

export default Register;