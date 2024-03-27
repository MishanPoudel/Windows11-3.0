import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Lockscreen from "./Pages/lockscreen";
import Main from "./Pages/main";

function App() {
  return (
    <Router>
      <Routes>
        {loggedIn === false && (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
        <Route path="/" element={<Lockscreen />} />
        {loggedIn === true && <Route path="/main" element={<Main />} />}
      </Routes>
    </Router>
  );
}

export default App;
