import { DeleteForever, MoreHorizSharp } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { Project } from "../../types/Project";

interface Props {
  openDangerZoneModal: (project?: Project) => void;
}

export const DashboardSettingDropdown = ({ openDangerZoneModal }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleOpenSettingDropdown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div
      onClick={(e) => {
        handleOpenSettingDropdown(e);
      }}
      className="relative rounded-full p-1 text-white hover:bg-gray-600"
    >
      <MoreHorizSharp />

      {isDropdownOpen && (
        <div
          ref={sidebarRef}
          className="absolute right-0 top-0 z-30 mt-12 w-48 rounded-md border border-icon-gray border-opacity-20 bg-dark-background py-2 shadow-xl"
        >
          <div className="mx-2 block rounded-md px-4 py-2 text-red-600 transition-colors hover:bg-red-600 hover:text-white">
            <div
              className="flex items-center"
              onClick={() => openDangerZoneModal()}
            >
              <DeleteForever className="mr-2" /> Delete
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
