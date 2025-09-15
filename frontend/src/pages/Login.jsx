import React, { useContext, useState } from "react";
import { dataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const { serverUrl, setUser } = useContext(dataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        serverUrl + "/api/login",
        { email, password },
        { withCredentials: true }
      );

      // Save user in context and localStorage
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // redirect to home
    } catch (err) {
      console.log("Login Error:", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-tr from-purple-800 via-indigo-800 to-blue-900 flex justify-center items-center">
      <div className="w-[90%] max-w-[400px] bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col items-center gap-6 shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-300 text-center mb-4">
          Login to access your MindCare dashboard and premium features.
        </p>

        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col items-center gap-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-4/5 h-12 px-4 rounded-xl outline-none bg-white/30 text-white placeholder-white/70 border border-white/30 focus:bg-white/50 focus:text-black focus:placeholder-gray-500 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-4/5 h-12 px-4 rounded-xl outline-none bg-white/30 text-white placeholder-white/70 border border-white/30 focus:bg-white/50 focus:text-black focus:placeholder-gray-500 transition-all duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-4/5 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            Login
          </button>
        </form>

        <p className="text-gray-300 mt-2">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:underline cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
