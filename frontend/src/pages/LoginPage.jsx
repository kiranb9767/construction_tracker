import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../services/authService";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    password: "",
    company: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);

    if (isSignIn) {
      console.log("Login form data:", form);
      login(form)
        .then((response) => {
          console.log("Login successful:", response);
          localStorage.setItem("token", response.token);
          navigate("/");
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    } else {
      console.log("Signup form data:", form);
      signup(form)
        .then((response) => {
          console.log("Signup successful:", response);
          setIsSignIn(true);
        })
        .catch((error) => {
          console.error("Signup error:", error);
        });
    }
  };

  const handleSignup = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        <div className="mb-4 text-left">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 text-left">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password || ""}
            onChange={handleChange}
          />
        </div>

        {!isSignIn && (
          <div className="mb-6 text-left">
            <label className="block text-sm font-medium mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              placeholder="Enter your company name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.company || ""}
              onChange={handleChange}
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          {isSignIn ? "New user?" : "Already a user?"}{" "}
          <span
            onClick={handleSignup}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
