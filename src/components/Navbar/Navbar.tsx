import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAppSelector } from "../../hooks/storeHook";
import { SmallButton } from "../common/buttons/SmallButton";

export const Navbar = () => {
  const userIsLoggedIn = useAppSelector((state) => state.auth.token !== null);

  const { logoutUser } = useLogout();

  return (
    <nav className="z-20 border-b border-b-border-dark-primary bg-header-background p-4 text-white">
      <div className="flex justify-between">
        <div className="flex space-x-4">
          <>
            {userIsLoggedIn ? (
              <SmallButton
                redirectPath="/login"
                title="Logout"
                onClick={logoutUser}
              />
            ) : (
              <SmallButton redirectPath="/login" title="Login" />
            )}

            <div className="flex items-center justify-center p-2">
              Dashboard
            </div>
            <div className="flex items-center justify-center">Projects</div>
          </>
        </div>
      </div>
    </nav>
  );
};
