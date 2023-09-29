import { SmallButton } from "../../../components/common/buttons/SmallButton";
import { Project } from "../../../types/Project";

interface Props {
  activeProject?: Project;
  onOpenCreateTeamModal: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  isDropDownProjectSettingsOpen: boolean;
  onToggleDropDown: () => void;
}

export const Header = ({
  activeProject,
  onOpenCreateTeamModal,
  dropdownRef,
}: Props) => {
  return (
    <div className="mb-4 flex justify-between border-b border-white border-opacity-30 px-4 pb-2">
      <div className="flex">
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
