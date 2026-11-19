import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api";

function ResetPassword() {

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/reset-password", {
        email,
        password
      });

      alert(res.data.message);

      navigate("/login");

    } catch (err) {

      alert(err.response?.data?.message);

    }

  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6">

          Reset Password

        </h1>

        <input
          type="password"
          placeholder="New Password"
          className="border p-3 w-full mb-4"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <button
          className="bg-blue-600 text-white w-full py-3 rounded"
        >

          Reset Password

        </button>

      </form>

    </div>

  );

}

export default ResetPassword;