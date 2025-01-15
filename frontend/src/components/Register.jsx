import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      login(data, data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center pt-16">
      <h2 className="text-3xl font-bold">Register</h2>
      <form
        className="flex flex-col gap-4 max-w-lg w-full"
        onSubmit={handleSubmit}
      >
        <input
          className="outline-none bg-slate-200 rounded px-6 py-2"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="outline-none bg-slate-200 rounded px-6 py-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="outline-none bg-slate-200 rounded px-6 py-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white rounded px-6 py-2 duration-200"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
