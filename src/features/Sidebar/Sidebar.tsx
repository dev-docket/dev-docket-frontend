import { Dashboard, Login, Logout } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { SvgIcon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { ExpandableProjectList } from "./Projects/ExpandableProjectList";
import { useAppSelector } from "../../hooks/storeHook";
import { useLogout } from "../../hooks/auth/useLogout";

type IconType = typeof SvgIcon;

interface SidebarItem {
  icon: IconType;
  text: string;
  redirect: string;
}

interface Props {
  isSidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export const Sidebar = ({ isSidebarOpen, setSidebarOpen }: Props) => {
  const userIsLoggedIn = useAppSelector((state) => state.auth.token !== null);

  const navigate = useNavigate();
  const isMdTailwindScreen = useMediaQuery("(max-width: 1280px)");
  const sidebarRef = useRef<HTMLDivElement>(null);

  const { logoutUser } = useLogout();

  const items: SidebarItem[] = [
    { icon: Dashboard, text: "Dashboard", redirect: "/dashboard" },
    // { icon: Settings, text: "Settings", redirect: "/dashboard/settings" },
  ];

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const buttonVariants = {
    hover: { scale: 1.1 }, // Powiększ przycisk podczas najechania
    tap: { scale: 0.9 }, // Zmniejsz przycisk podczas kliknięcia
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMdTailwindScreen &&
        isSidebarOpen &&
        !sidebarRef.current?.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside); // Usuń listener przy unmounting
    };
  }, [isMdTailwindScreen, isSidebarOpen, setSidebarOpen]);

  useEffect(() => {
    if (isMdTailwindScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMdTailwindScreen, setSidebarOpen]);

  return (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.div
          ref={sidebarRef}
          className={`flex pt-4 h-screen w-[220px] flex-col items-start overflow-y-auto border-r border-white border-opacity-30 bg-background-primary max-xl:fixed max-md:left-0`}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full pl-4">
            {isMdTailwindScreen && (
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                onClick={() => setSidebarOpen(false)}
                className="mt-4 grid place-items-center rounded-full bg-opacity-30 p-2 text-2xl hover:cursor-pointer hover:bg-link-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275L12 13.4Z"
                  ></path>
                </svg>
              </motion.button>
            )}
            <div className="pr-4">
              {items.map((item, index) => (
                <Link
                  to={item.redirect}
                  className="flex w-full rounded-full bg-opacity-30 px-2 py-2 hover:cursor-pointer hover:bg-link-primary"
                  key={index}
                >
                  <div className="flex items-center justify-center">
                    <item.icon className="mr-2 opacity-20" />
                    <span>{item.text}</span>
                  </div>
                </Link>
              ))}
            </div>

            <ExpandableProjectList />
          </div>
          <div className="mb-4 flex h-full w-full flex-col-reverse px-4">
            <div className="w-full rounded-full bg-opacity-30 p-2 hover:cursor-pointer hover:bg-link-primary">
              {userIsLoggedIn ? (
                <div onClick={handleLogout}>
                  <Logout className="mr-2 opacity-20" />
                  <span>Logout</span>
                </div>
              ) : (
                <Link to={"/login"}>
                  <Login className="mr-2 opacity-20" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
