import { Menu } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

interface Props {
  isSidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}

export const Navbar = ({ setSidebarOpen }: Props) => {
  const isMdTailwindScreen = useMediaQuery("(max-width: 1280px)");

  return (
    <>
      {isMdTailwindScreen && (
        <div className="m-4 flex cursor-pointer items-center">
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSidebarOpen(true);
            }}
            className="grid place-items-center rounded-full p-2 hover:bg-link-primary"
          >
            <Menu />
          </div>
        </div>
      )}
    </>
  );
};
