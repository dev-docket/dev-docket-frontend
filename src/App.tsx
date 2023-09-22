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
import { useEffect } from "react";
import { useLogout } from "./hooks/auth/useLogout";
import { Team } from "./pages/Team";
import ProjectSettings from "./pages/ProjectSettings";

function App() {
  const token = useAppSelector((state) => state.auth.token);

  const { logoutUser } = useLogout();

  useEffect(() => {
    const isTokenExpired = (token: string) => {
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          return true;
        }
      }
      return false;
    };

    if (!token) return;

    if (!isTokenExpired(token)) return;

    logoutUser();
  }, [logoutUser, token]);

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

          <Route
            path="/projects/:projectSlug/dashboard"
            element={<Project />}
          />

          <Route
            path="/projects/:projectSlug/settings"
            element={<ProjectSettings />}
          />

          <Route
            path="/projects/:projectSlug/teams/:teamId/board"
            element={<Team />}
          />

          <Route
            path="/projects/:projectSlug/teams/:teamId/board/tasks/:taskId"
            element={<Team />}
          />

          {/* Route to auth feature */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Route to error feature */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
