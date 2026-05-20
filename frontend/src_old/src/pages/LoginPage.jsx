import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/authService";

import Logo from "../asset/Site_Logo.png";
import BgImage from "../asset/construction-background.svg";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, []);

  const [form, setForm] = useState({
    name: "",
    password: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrorMessage("");

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setErrorMessage("Name is required");
      return false;
    }

    if (!form.company.trim()) {
      setErrorMessage("Company name is required");
      return false;
    }

    if (!form.password.trim()) {
      setErrorMessage("Password is required");
      return false;
    }

    if (form.password.length < 4) {
      setErrorMessage("Password must be at least 4 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (isSignIn) {
      login(form)
        .then((response) => {
          localStorage.setItem("token", response.token);
          navigate("/");
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data?.message || "Login failed");
        });
    } else {
      signup(form)
        .then(() => {
          setErrorMessage("");
          setIsSignIn(true);

          setForm({
            name: "",
            password: "",
            company: "",
          });
        })
        .catch((error) => {
          setErrorMessage(error?.response?.data?.message || "Signup failed");
        });
    }
  };

  const handleSignup = () => {
    setErrorMessage("");

    setIsSignIn(!isSignIn);

    setForm({
      name: "",
      password: "",
      company: "",
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/60 shadow-2xl rounded-3xl p-8 text-white"
      >
        <div className="flex flex-col items-center mb-6">

          <h2 className="text-3xl font-bold tracking-wide">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="text-sm text-gray-200 mt-2 text-center">
            Construction Site Expense Tracker
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 bg-red-500/20 border border-red-400 text-red-100 text-sm p-3 rounded-xl">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-2">Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">Company Name</label>

          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={form.company}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-200 mt-6">
          {isSignIn ? "New user?" : "Already have an account?"}

          <span
            onClick={handleSignup}
            className="ml-2 text-blue-300 hover:text-blue-200 cursor-pointer font-medium"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
