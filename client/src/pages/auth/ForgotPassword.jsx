import { useState } from "react";
import API from "../../services/api";

function ForgotPassword() {

  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/forgot-password", {
        email
      });

      alert(res.data.message);

    } catch (err) {

      console.log(err);

      alert(err.response?.data?.message || "Something went wrong");

    }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="border p-3 w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          className="bg-blue-600 text-white w-full py-3 rounded"
        >
          Send OTP
        </button>

      </form>

    </div>
  );

}

export default ForgotPassword;