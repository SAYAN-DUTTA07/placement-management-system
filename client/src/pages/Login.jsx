import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (response.data.user.role === "student") {

        navigate("/student/dashboard");

      }
      else if (response.data.user.role === "recruiter") {

        navigate("/recruiter/dashboard");

      }
      else {

        navigate("/admin/dashboard");

      }

    }
    catch (err) {

      alert(
        err.response?.data?.message || "Login Failed"
      );

    }

  };

  return (

    <div className="flex justify-center items-center h-screen dark:bg-gray-900">

      <form className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded shadow w-96"
        onSubmit={submitHandler}
      >
        <h2 className="text-3xl mb-5 font-bold">
          Login
        </h2>
        <div className="h-2"></div>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 mb-4 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-4 w-full bg-white dark:bg-gray-700 dark:text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end mb-4">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline text-sm"
          >
            Forgot Password
          </Link>
        </div>
         <div className="h-1.5"></div>
        <button
          className="bg-blue-600 text-white p-2 w-full rounded"
        >
          Login
        </button>

      </form>

    </div>

  );

}

export default Login;