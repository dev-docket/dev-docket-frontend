import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAppSelector } from "../../hooks/storeHook";
import { SmallButton } from "../common/buttons/SmallButton";
import { DropdownMenu } from "./DropdownMenu";

export const Navbar = () => {
  const userIsLoggedIn = useAppSelector((state) => state.auth.token !== null);

  const { logoutUser } = useLogout();

  return (
    <nav className="z-1 border-b border-b-border-dark-primary bg-header-background p-4 text-white">
      <div className="flex justify-between">
        <div className="flex w-full items-center justify-between space-x-4">
          <div>
            <Link
              to="/dashboard"
              className="px-4 py-2 hover:rounded-md hover:bg-icon-gray hover:bg-opacity-20"
            >
              Dasboard
            </Link>
            {/* <button className="p-2 hover:rounded-md hover:bg-icon-gray hover:bg-opacity-20">
              Projects <ArrowDropDownSharp />
            </button> */}

            <DropdownMenu title="Projects" />
          </div>

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
          </>
        </div>
      </div>
    </nav>
  );
};
