import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Power({ toggleStart, setInput, setIsSleeping, setActionType }) {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleClick() {
    toggleStart();
    setIsDropdownOpen(false);
    setInput("close");
  }

  function handleShut() {
    setIsSleeping(true);
    setActionType("shutdown");
    toggleStart();
    setTimeout(() => {
      navigate("/");
    }, 2700);
  }

  function handleSleep() {
    setIsSleeping(true);
    toggleStart();
    setActionType("sleep");
    setIsDropdownOpen(!isDropdownOpen);
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="relative">
      <div
        className="flex justify-center items-center"
        onClick={toggleDropdown}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="rgba(0, 0, 0, 1);"
        >
          <path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"></path>
          <path d="M11 2h2v10h-2z"></path>
        </svg>
      </div>
      {isDropdownOpen && (
        <ul className="dropdown-content z-10 menu p-2 shadow rounded-box w-52 bg-neutral-800 border-black border-2 border-opacity-10 absolute top-full -mt-40 -ml-28">
          <li>
            <button onClick={handleSleep}>Sleep</button>
          </li>
          <li>
            <button onClick={handleShut}>Shut Down</button>
          </li>
          <li>
            <button onClick={handleClick}>Close The Window?</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Power;
