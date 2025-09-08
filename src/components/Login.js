import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    // Username: Alphanumeric + . _ - allowed
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.username)) {
      newErrors.username =
        "Username must be alphanumeric with . _ - allowed";
    }

    // Password: Same rule as username + not equal to username
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.password)) {
      newErrors.password =
        "Password must be alphanumeric with . _ - allowed";
    } else if (formData.password === formData.username) {
      newErrors.password = "Password cannot be same as username";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Live validation clear per field
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Login successful!");
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#cde0dc] p-4 sm:p-8">
      <div className="w-full max-w-lg bg-white rounded-md shadow-lg">
        {/* Header */}
        <div className="bg-[#0c6b5f] text-center py-6 rounded-t-md">
          <h2 className="text-2xl font-mono font-semibold text-white">Login</h2>
          <p className="text-sm text-white mt-1">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Username */}
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-xs font-semibold text-[#0c6b5f] mb-1 uppercase"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-[#0c6b5f] outline-none py-1 text-gray-700"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-[#0c6b5f] mb-1 uppercase"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 focus:border-[#0c6b5f] outline-none py-1 text-gray-700 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-6 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-[#0c6b5f] text-white py-2 rounded-sm hover:bg-[#095348] transition"
          >
            LOGIN
          </button>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have Account?{" "}
            <Link
              to="/signup"
              className="text-[#0c6b5f] font-semibold hover:underline"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
