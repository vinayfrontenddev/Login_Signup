import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors = {};

    // a. Name: Only alphabets allowed
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z ]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only alphabets";
    }

    // b. Username: Alphanumeric + ._- allowed
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.username)) {
      newErrors.username =
        "Username must be alphanumeric with . _ - allowed";
    }

    // e. Email: must be Gmail
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w.%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = "Email must be a valid Gmail address";
    }

    // f. Phone: Country code + number
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone must include country code and valid number (10–15 digits)";
    }

    // c. Password: Alphanumeric + ._- allowed, not same as username
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.password)) {
      newErrors.password =
        "Password must be alphanumeric with . _ - allowed";
    } else if (formData.password === formData.username) {
      newErrors.password = "Password cannot be same as username";
    }

    // d. Confirm: Must match password
    if (!formData.confirm.trim()) {
      newErrors.confirm = "Confirm Password is required";
    } else if (formData.password !== formData.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Live validation per field
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[name]; // clear error when user types
      return updatedErrors;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Signup successful! Please login.");
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#cde0dc] p-4 sm:p-8">
      <div className="w-full max-w-3xl bg-white rounded-md shadow-lg">
        {/* Header */}
        <div className="bg-[#0c6b5f] text-center py-6 rounded-t-md">
          <h2 className="text-lg font-mono font-semibold text-white">
            Create New Account
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8">
          {/* Row 1: Name + Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-[#0c6b5f] mb-1 uppercase">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-[#0c6b5f] outline-none py-1 text-gray-700"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-[#0c6b5f] mb-1 uppercase">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-[#0c6b5f] outline-none py-1 text-gray-700"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
          </div>

          {/* Row 2: Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-[#0c6b5f] mb-1 uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-[#0c6b5f] outline-none py-1 text-gray-700"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#0c6b5f] mb-1 uppercase">
                Phone No.
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-[#0c6b5f] outline-none py-1 text-gray-700"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Row 3: Password + Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Password */}
            <div className="relative">
              <label className="block text-xs font-semibold text-[#0c6b5f] mb-1 uppercase">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
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

            {/* Confirm Password */}
            <div className="relative">
              <label className="block text-xs font-semibold text-[#0c6b5f] mb-1 uppercase">
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm"
                value={formData.confirm}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 focus:border-[#0c6b5f] outline-none py-1 text-gray-700 pr-10"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-2 top-6 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
              {errors.confirm && (
                <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#0c6b5f] text-white px-6 py-2 rounded-sm hover:bg-[#095348] transition"
            >
              SIGN UP
            </button>
          </div>

          {/* Already have account */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have Account?{" "}
            <Link
              to="/"
              className="text-[#0c6b5f] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
