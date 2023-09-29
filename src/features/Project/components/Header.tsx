import { Menu } from "@mui/icons-material";
import { SmallButton } from "../../../components/common/buttons/SmallButton";
import { Project } from "../../../types/Project";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";

interface Props {
  isSidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  activeProject?: Project;
  onOpenCreateTeamModal: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  isDropDownProjectSettingsOpen: boolean;
  onToggleDropDown: () => void;
}

export const Header = ({
  setSidebarOpen,
  activeProject,
  onOpenCreateTeamModal,
  dropdownRef,
}: Props) => {
  const isMdTailwindScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isMdTailwindScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMdTailwindScreen, setSidebarOpen]);

  return (
    <div className="mb-4 flex justify-between border-b border-white border-opacity-30 px-4 pb-2">
      <div className="flex">
        {isMdTailwindScreen && (
          <div className="mr-4 flex cursor-pointer items-center">
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
        <div>
          <h1 className="text-3xl">{activeProject?.name}</h1>
          <h3 className="text-sm">You can find your teams here in project</h3>
        </div>
        <div ref={dropdownRef} className="relative">
          {/* <ArrowDropDown
            onClick={onToggleDropDown}
            className="hover:cursor-pointer"
          /> */}
          {/* <DropdownMenu isOpen={isDropDownProjectSettingsOpen} /> */}
        </div>
      </div>
      <div className="w-[8rem]">
        <SmallButton title="Create new team" onClick={onOpenCreateTeamModal} />
      </div>
    </div>
  );
};
