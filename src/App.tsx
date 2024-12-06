import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Project from "./pages/Project/Project";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { Team } from "./pages/Team";
import { Error } from "./pages/Error";
import { ProjectAcceptInvitation } from "./pages/Project/ProjectAcceptInvitation";
import CompleteProfile from "./pages/CompleteProfile/CompleteProfile";
import { Home } from "./pages/Home/Home";
import ProjectSettings from "./pages/Project/ProjectSettings";
import { AuthenticatedRoute } from "./route-guards/AuthenticatedRoute";
import { useAuthStore } from "./stores";

function App() {
    const { 
      token, 
      isAuthenticated, 
      isProfileCompleted, 
      checkTokenExpiration 
    } = useAuthStore()
  
    // Check token expiration on mount and token change
    useEffect(() => {
      const cleanup = checkTokenExpiration()
      return () => cleanup?.()
    }, [checkTokenExpiration])
  
    // Add periodic token check every minute
    useEffect(() => {
      console.log('Adding token check interval')
      console.log('Token:', token)
      if (!token) return
  
      const intervalId = setInterval(checkTokenExpiration, 60000)
      return () => clearInterval(intervalId)
    }, [token, checkTokenExpiration])

    console.log(isAuthenticated)

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
