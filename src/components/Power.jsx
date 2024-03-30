import React from "react";
import { useNavigate } from "react-router-dom";

function Power({ toggleStart }) {
  const navigate = useNavigate();
  function handleClick() {
    toggleStart();
  }
  function handleSleep() {
    setTimeout(() => {
      navigate("/");
      
    }, 1000);
  }

  return (
    <div className="dropdown dropdown-top">
      <button className="flex justify-center items-center" tabIndex={0}>
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
      </button>
      <ul className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-neutral-800 border-black border-2 border-opacity-10">
        <li>
          <button onClick={handleSleep}>Sleep</button>
        </li>
        <li>
          <button onClick={handleClick}>Shut Down</button>
        </li>
        <li>
          <button onClick={handleClick}>Restart</button>
        </li>
      </ul>
    </div>
  );
}

export default Power;
