import { Dashboard, Settings } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { SvgIcon } from "@mui/material";
import { Link } from "react-router-dom";

type IconType = typeof SvgIcon;

interface SidebarItem {
  icon: IconType;
  text: string;
  redirect: string;
}

export const ProjectSidebar = () => {
  const isMdScreen = useMediaQuery("(max-width: 1280px)");

  const items: SidebarItem[] = [
    { icon: Dashboard, text: "Dashboard", redirect: "/dashboard" },
    { icon: Settings, text: "Settings", redirect: "/dashboard/settings" },
  ];

  return (
    <div className="flex h-screen w-[11%] flex-col items-start border-r border-white border-opacity-30 bg-background-primary max-xl:w-16 max-md:fixed max-md:left-0">
      <div className="mx-auto">
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
    </div>
  );
};
