import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Project } from "./pages/Project";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { useAppSelector } from "./hooks/storeHook";

function App() {
  const token = useAppSelector((state) => state.auth.token);
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Route to main feature */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/projects/:projectName/board" element={<Project />} />
          <Route
            path="/projects/:projectName/board/tasks/:taskId"
            element={<Project />}
          />

          {/* Route to auth feature */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
