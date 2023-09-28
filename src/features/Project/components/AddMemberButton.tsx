import { AddCircleRounded } from "@mui/icons-material";

interface Props {
  onAddMember: () => void;
}

export const AddMemberButton = ({ onAddMember }: Props) => {
  return (
    <div className="flex items-center">
      <div
        onClick={onAddMember}
        className="flex items-center justify-center rounded-md p-2 hover:cursor-pointer hover:bg-icon-gray hover:bg-opacity-30"
      >
        <AddCircleRounded className="mr-2" /> Add new member
      </div>
    </div>
  );
};
