import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "./InputField";

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

  const validate = () => {
    const newErrors = {};
    if (!/^[A-Za-z ]+$/.test(formData.name))
      newErrors.name = "Name must contain only alphabets";
    if (!/^[a-zA-Z0-9._-]+$/.test(formData.username))
      newErrors.username = "Username must be alphanumeric with ._- allowed";
    if (formData.password === formData.username)
      newErrors.password = "Password cannot be same as username";
    if (formData.password !== formData.confirm)
      newErrors.confirm = "Passwords do not match";
    if (!/^[\w.%+-]+@gmail\.com$/.test(formData.email))
      newErrors.email = "Email must be a valid Gmail address";
    if (!/^\+?[0-9]{10,15}$/.test(formData.phone))
      newErrors.phone = "Phone must include country code and valid number";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          error={errors.confirm}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;