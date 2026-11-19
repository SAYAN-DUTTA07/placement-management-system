import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function VerifyOTP() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [otp, setOTP] = useState("");

  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/verify-otp", {

        email,
        otp

      });

      alert(res.data.message);

      navigate("/reset-password", {

        state: {
          email
        }

      });

    } catch (err) {

      alert(err.response.data.message);

    }

  };

  return (

    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={submitHandler}
        className="bg-white shadow-lg p-8 rounded w-96"
      >

        <h1 className="text-3xl font-bold mb-5">

          Verify OTP

        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="OTP"
          className="border p-3 w-full mb-4"
          value={otp}
          onChange={(e)=>setOTP(e.target.value)}
        />

        <button
          className="bg-green-600 text-white w-full py-3 rounded"
        >

          Verify OTP

        </button>

      </form>

    </div>

  );

}

export default VerifyOTP;