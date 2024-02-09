import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Project } from "./pages/Project/Project";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { useAppSelector } from "./hooks/storeHook";
import { useEffect } from "react";
import { useLogout } from "./hooks/auth/useLogout";
import { Team } from "./pages/Team";
import { Error } from "./pages/Error";
import { ProjectAcceptInvitation } from "./pages/Project/ProjectAcceptInvitation";
import { CompleteProfile } from "./pages/CompleteProfile/CompleteProfile";
import { Home } from "./pages/Home/Home";
import { ProjectSettings } from "./pages/Project/ProjectSettings";
import { AuthenticatedRoute } from "./route-guards/AuthenticatedRoute";

function App() {
  const token = useAppSelector((state) => state.auth.token);
  const isProfileCompleted =
    useAppSelector((state) => state.user.isProfileCompleted) || false;

  const isAuthenticated = !!token;

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

    if (token) {
      if (isTokenExpired(token)) {
        logoutUser();
      }
    }
  }, [logoutUser, token]);

  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Route to home feature */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home />}
          />

          {/* Route to complete profile feature */}
          <Route
            path="/complete-profile"
            element={
              isAuthenticated ? <CompleteProfile /> : <Navigate to="/login" />
            }
          />

          {/* Route to dashboard feature */}
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute
                isAuthenticated={isAuthenticated}
                isProfileCompleted={isProfileCompleted}
              >
                <Dashboard />
              </AuthenticatedRoute>
            }
          />

          {/* Route to project feature */}
          <Route
            path="/projects/:projectSlug/dashboard"
            element={
              <AuthenticatedRoute
                isAuthenticated={isAuthenticated}
                isProfileCompleted={isProfileCompleted}
              >
                <Project />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/projects/:projectSlug/invitation"
            element={
              <AuthenticatedRoute
                isAuthenticated={isAuthenticated}
                isProfileCompleted={isProfileCompleted}
              >
                <ProjectAcceptInvitation />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/projects/:projectSlug/settings"
            element={
              <AuthenticatedRoute
                isAuthenticated={isAuthenticated}
                isProfileCompleted={isProfileCompleted}
              >
                <ProjectSettings />
              </AuthenticatedRoute>
            }
          />

          {/* Route to team feature */}
          <Route
            path="/projects/:projectSlug/teams/:teamId/board"
            element={
              <AuthenticatedRoute
                isAuthenticated={isAuthenticated}
                isProfileCompleted={isProfileCompleted}
              >
                <Team />
              </AuthenticatedRoute>
            }
          />

          {/* Route to task feature */}
          <Route
            path="/projects/:projectSlug/teams/:teamId/board/tasks/:taskId"
            element={
              <AuthenticatedRoute
                isAuthenticated={isAuthenticated}
                isProfileCompleted={isProfileCompleted}
              >
                <Team />
              </AuthenticatedRoute>
            }
          />

          {/* Route to auth feature */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <Register />
            }
          />

          {/* Route to error feature */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
