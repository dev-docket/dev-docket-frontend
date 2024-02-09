import { Navigate } from "react-router-dom";

/**
 * AuthenticatedRoute is a higher order component that wraps around routes that require authentication.
 * It checks if the user is authenticated and if their profile is completed.
 * If the user is not authenticated, they are redirected to the "/login" route.
 * If the user is authenticated but their profile is not completed, they are redirected to the "/complete-profile" route.
 * If the user is authenticated and their profile is completed, the children (the wrapped routes) are rendered.
 *
 * @param {object} props The component props.
 * @param {boolean} props.isAuthenticated Indicates whether the user is authenticated.
 * @param {boolean} props.isProfileCompleted Indicates whether the user's profile is completed.
 * @param {React.ReactNode} props.children The routes to render if the user is authenticated and their profile is completed.
 * @returns {React.ReactNode} The children if the user is authenticated and their profile is completed, otherwise a redirection to either "/login" or "/complete-profile".
 */

export const AuthenticatedRoute = ({
  isAuthenticated,
  isProfileCompleted,
  children,
}: {
  isAuthenticated: boolean;
  isProfileCompleted: boolean;
  children: React.ReactNode;
}): React.ReactNode => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!isProfileCompleted) {
    return <Navigate to="/complete-profile" />;
  }

  return <>{children}</>;
};
