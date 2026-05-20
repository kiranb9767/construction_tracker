import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/authService";
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
      className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-10 premium-input glass-card text-slate-800"
      >
        <div className="flex flex-col items-center mb-6">

          <h2 className="text-4xl font-bold tracking-tight text-slate-800">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h2>

          <p className="mt-2 text-sm text-center text-slate-500">
            Construction Site Expense Tracker
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 mb-5 text-sm text-red-100 border border-red-400 bg-red-500/20 rounded-xl">
            {errorMessage}
          </div>
        )}

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 placeholder-gray-800 border rounded-2xl bg-black/40 border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={form.company}
            onChange={handleChange}
            className="w-full px-4 py-3 placeholder-gray-800 border rounded-xl bg-black/40 border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 placeholder-gray-800 border rounded-xl bg-black/40 border-black/40 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold transition-all duration-300 bg-blue-600 shadow-lg premium-input rounded-xl hover:bg-blue-700"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>

        <p className="mt-6 text-sm text-center text-gray-800">
          {isSignIn ? "New user?" : "Already have an account?"}

          <span
            onClick={handleSignup}
            className="ml-2 font-medium text-blue-400 cursor-pointer hover:text-blue-800"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
