import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/shared/LoadingSpinner";

// Lazy-load route pages to reduce initial bundle size
const Lockscreen = lazy(() => import("./Pages/lockscreen"));
const Main = lazy(() => import("./Pages/main"));

function App() {
  useEffect(() => {
    const handler = (e) => {
      
      let el = e.target;
      while (el) {
        if (el.getAttribute && el.getAttribute("data-allow-context") === "true") return;
        el = el.parentElement;
      }
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><LoadingSpinner /></div>}>
        <Routes>
          <Route path="/" element={<Lockscreen />} />
          <Route path="/:name" element={<Main />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
