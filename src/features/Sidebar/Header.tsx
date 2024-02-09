import { Menu } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { SmallButton } from "../../components/common/buttons/SmallButton";

interface Props {
  setSidebarOpen: (value: boolean) => void;
  onOpenCreateTeamModal?: () => void;
  dropdownRef?: React.RefObject<HTMLDivElement>;
  isButtonDisabled?: boolean;
  title: string;
  underTitle: string;
}

export const Header = ({
  setSidebarOpen,
  onOpenCreateTeamModal,
  dropdownRef,
  isButtonDisabled = false,
  title,
  underTitle,
}: Props) => {
  const isMdTailwindScreen = useMediaQuery("(max-width: 1280px)");

  return (
    <div className="mb-4 mt-4 flex justify-between border-b border-white border-opacity-30 px-4 pb-2 text-white">
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
          <h1 className="text-3xl">{title}</h1>
          <h3 className="text-sm">{underTitle}</h3>
        </div>
        <div ref={dropdownRef} className="relative">
          {/* <ArrowDropDown
            onClick={onToggleDropDown}
            className="hover:cursor-pointer"
          /> */}
          {/* <DropdownMenu isOpen={isDropDownProjectSettingsOpen} /> */}
        </div>
      </div>
      {!isButtonDisabled && (
        <div className="w-[8rem]">
          <SmallButton
            title="Create new team"
            onClick={onOpenCreateTeamModal}
          />
        </div>
      )}
    </div>
  );
};
