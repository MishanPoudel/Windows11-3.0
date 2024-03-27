import React, { useState } from "react";
import Register from "../auth/Register";
import Login from "../auth/Login";

function Lockscreen() {
  const [login, setLogin] = useState(true);

  const toggleLogin = () => {
    setLogin(!login);
  };

  return (
    <>
      <div
        className="absolute bg-black h-screen w-full blur-sm"
        style={{
          background:
            "url(https://img.wallpapersafari.com/desktop/1440/900/11/85/Ra8DH9.jpg)",
          backgroundSize: "100% 100%",
        }}
      ></div>
      <div className="absolute left-0 top-0 h-screen w-full flex flex-col items-center z-10">
        {login ? (
          <Login toggleLogin={toggleLogin} />
        ) : (
          <Register toggleLogin={toggleLogin} />
        )}
      </div>
    </>
  );
}

export default Lockscreen;
