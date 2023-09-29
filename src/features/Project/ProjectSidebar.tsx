import { Close, Dashboard } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

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

export const ProjectSidebar = ({ isSidebarOpen, setSidebarOpen }: Props) => {
  const isMdScreen = useMediaQuery("(max-width: 1280px)");
  const isMdTailwindScreen = useMediaQuery("(max-width: 768px)");

  const sidebarRef = useRef<HTMLDivElement>(null);

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

  return (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.div
          ref={sidebarRef}
          className={`flex h-screen w-[11%] flex-col items-start border-r border-white border-opacity-30 bg-background-primary max-xl:w-16 max-md:fixed max-md:left-0`}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto">
            {isMdTailwindScreen && (
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                onClick={() => setSidebarOpen(false)}
                className="mt-4 grid place-items-center rounded-full bg-opacity-30 p-2 text-2xl hover:cursor-pointer hover:bg-link-primary"
              >
                <Close fontSize="inherit" />
              </motion.button>
            )}
            {items.map((item, index) => (
              <Link
                to={item.redirect}
                className="my-4 flex items-start rounded-md p-2 hover:cursor-pointer hover:bg-link-primary"
                key={index}
              >
                {isMdScreen ? (
                  <item.icon className="opacity-40" />
                ) : (
                  <div className="flex items-center justify-center">
                    <item.icon className="mr-2 opacity-20" />
                    <span>{item.text}</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
