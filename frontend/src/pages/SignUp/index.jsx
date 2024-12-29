// Import dependencies
import React, { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const { signup } = useContext(AppContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: null,
    gender: "",
    dateOfBirth: "",
    profession: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "fullName",
      "email",
      "password",
      "phoneNumber",
      "gender",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out all fields! Missing: ${field}`, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          transition: Slide,
        });
        return;
      }
    }

    if (formData.phoneNumber.length !== 10) {
      toast.error("Number must be 10 digits long", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    try {
      const response = await signup(formData);
      console.log(response);
      toast.success("User SignUp Successful!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide,
      });
      setFormData({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: null,
        gender: "",
        dateOfBirth: "",
        profession: "",
        city: "",
        state: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Error During SignUp!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        transition: Slide,
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="w-full max-w-md p-8 bg-gradient-to-r from-gray-800 to-black rounded-2xl shadow-2xl hover:shadow-gray-800 transition-all duration-500">
        <h2 className="text-4xl font-extrabold text-center mb-6 tracking-widest">
          Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="relative">
            <label htmlFor="fullName" className="block text-lg font-semibold">
              Full Name
            </label>
            <div className="flex items-center mt-2">
              <FaUser className="absolute ml-3 text-gray-400" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={
                  formData.fullName.charAt(0).toUpperCase() +
                  formData.fullName.slice(1)
                }
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
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
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
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
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Create a password"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="relative">
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-semibold"
            >
              Phone Number
            </label>
            <div className="flex items-center mt-2">
              <FaPhoneAlt className="absolute left-3 text-gray-400" />
              <span className="pl-10 px-4 py-3 bg-gray-800 text-white rounded-l-lg border-r border-gray-600">
                +91
              </span>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="number"
                value={formData.phoneNumber}
                onChange={handleChange}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                style={{
                  appearance: "textfield",
                  MozAppearance: "textfield",
                  WebkitAppearance: "textfield",
                }}
                required
                className="w-full pl-12 px-4 py-3 bg-gray-800 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="relative">
            <label className="block text-lg font-semibold">Gender</label>
            <div className="flex items-center mt-2 space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-gradient-to-r from-gray-700 to-gray-900 text-lg font-bold rounded-lg shadow-md hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <a href="/" className="text-white font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
