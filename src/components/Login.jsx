import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {UserProfile} from "./UserProfile";

function Login({ toggleLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      if (password === "demo") {
        // Redirect to "/main" with the name in the state
        navigate("/main", { state: { name } });
      } else {
        setError("Failed to log in. Please check your password.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to log in. Please check your password.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  return (
    <>
      {error && (
        <div
          role="alert"
          className="absolute top-0 left-0 w-full bg-red-500 text-white text-center py-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline-block mr-2 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={login}>
        <div className="relative left-0 top-72 h-screen w-full flex flex-col items-center z-10">
          <div className="aspect-square w-32 h-36">
            <UserProfile name={name} />
          </div>
          <input
            className="my-5 text-3xl text-white bg-transparent text-center outline-none"
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ caretColor: "transparent" }}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="input bg-opacity-30 w-full max-w-xs focus:outline-none border-[0.5px] border-b-white mt-4 placeholder-white opacity-100::placeholder"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="hidden btn bg-blue-500 text-white mt-4 px-4 py-2 rounded-md"
          >
            Login
          </button>
          <div
            className="text-white mt-3 text-sm btn btn-ghost hover:text-black"
            onClick={toggleLogin}
          >
            Don't have an account? <span className="underline">Register</span>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
