import React, { useContext, useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { toast, Slide } from "react-toastify";

const Login = () => {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await login(data);
      console.log(response);
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid credentials!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gradient-to-r from-gray-800 to-black rounded-2xl shadow-2xl hover:shadow-gray-800 transition-all duration-500">
        <h2 className="text-4xl font-extrabold text-center mb-6 tracking-widest animate-bounce">
          Login
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="email" className="block text-lg font-semibold">
              Email
            </label>
            <div className="flex items-center mt-2">
              <FaEnvelope className="absolute ml-3 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-lg font-semibold">
              Password
            </label>
            <div className="flex items-center mt-2">
              <FaLock className="absolute ml-3 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-gray-700 to-gray-900 text-lg font-bold rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-white font-semibold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
