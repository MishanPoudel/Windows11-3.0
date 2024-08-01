import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../user/UserProfile";

function Login({ toggleLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  localStorage.setItem("name", name);

  async function login(e) {
    e.preventDefault();
    try {
      setLoading(true);
      // Simulating a delay for demonstration purposes
      setTimeout(() => {
        navigate(`/${name}`);
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to log in. Please try again later.");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
    }
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 top-36">
          <div className="inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent h-8 w-8">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!loading && error && (
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
          <div>{error}</div>
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
            required
          />

          {!loading && (
            <>
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
              <div
                className="text-white mt-3 text-sm btn btn-ghost hover:text-black tooltip tooltip-bottom flex w-auto"
                onClick={toggleLogin}
                data-tip="You can log in by typing anything into the input fields and pressing enter—no credentials needed!"
              >
                I forgot my PIN
              </div>
            </>
          )}

          <button
            type="submit"
            className="hidden btn bg-blue-500 text-white mt-4 px-4 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
      <div className="absolute flex gap-9 text-white bottom-5 right-12 select-none">
        <span className="material-symbols-outlined text-3xl">wifi</span>
        <span className="material-symbols-outlined text-3xl">
          accessibility
        </span>
        <span className="material-symbols-outlined text-3xl">
          power_settings_new
        </span>
      </div>
    </>
  );
}

export default Login;
