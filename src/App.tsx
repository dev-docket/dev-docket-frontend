import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Project } from "./pages/Project";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Route to main feature */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:projectName/board" element={<Project />} />

          {/* Route to auth feature */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
