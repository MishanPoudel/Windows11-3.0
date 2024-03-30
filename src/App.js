import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lockscreen from "./Pages/lockscreen";
import Main from "./Pages/main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lockscreen />} />
        <Route path="/:name" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
