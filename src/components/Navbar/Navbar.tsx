import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAppSelector } from "../../hooks/storeHook";
import { SmallButton } from "../common/buttons/SmallButton";
import { DropdownMenu } from "./DropdownMenu";
import { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";

export const Navbar = () => {
  const userIsLoggedIn = useAppSelector((state) => state.auth.token !== null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const { logoutUser } = useLogout();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <>
      <nav className="z-1 ml-[20%] w-[80%] border-b border-white border-opacity-30 bg-header-background p-4 text-white transition-all max-md:ml-0 max-md:w-full">
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

      <div
        className="fixed left-0 top-0 h-screen w-[20%] max-w-[20%] border-r border-r-white border-opacity-30 bg-[#161819] transition-all max-md:w-[6rem] max-md:max-w-none"
        style={{
          width: isSidebarOpen ? "20%" : "0",
          display: isSidebarOpen ? "block" : "none",
        }}
      >
        <div className="flex items-center justify-between p-4">
          <div className="flex w-full justify-between">
            <p>your side menu </p>
            <Close
              onClick={() => setIsSidebarOpen(false)}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </>
  );
};
