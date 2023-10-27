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
import ProjectSettings from "./pages/ProjectSettings";
import { Error } from "./pages/Error";
import { ProjectAcceptInvitation } from "./pages/Project/ProjectAcceptInvitation";
import { CompleteProfile } from "./pages/CompleteProfile/CompleteProfile";

function PrivateRoute({
  condition,
  redirectPath,
  children,
}: {
  condition: boolean;
  redirectPath: string;
  children: React.ReactNode;
}) {
  console.log(condition, redirectPath, children);
  return condition ? children : <Navigate to={redirectPath} />;
}

function App() {
  const token = useAppSelector((state) => state.auth.token);
  const isProfileCompleted = useAppSelector(
    (state) => state.user.isProfileCompleted,
  );

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
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                condition={isProfileCompleted || !token}
                redirectPath="/complete-profile"
                children={<Dashboard />}
              />
            }
          />

          <Route path="/complete-profile" element={<CompleteProfile />} />

          {/* Route to main feature */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />

          {/* Route to project feature */}
          <Route
            path="/projects/:projectSlug/dashboard"
            element={<Project />}
          />
          <Route
            path="/projects/:projectSlug/settings"
            element={<ProjectSettings />}
          />
          <Route
            path="/projects/:projectSlug/invitation"
            element={
              token ? <ProjectAcceptInvitation /> : <Navigate to="/login" />
            }
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
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
