import { Add } from "@mui/icons-material";

interface Props {
  onClick: () => void;
  isAnyTeam: boolean;
}

export const NewTeamCard = ({ onClick, isAnyTeam }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex h-[10rem] w-[13rem] flex-col rounded-2xl ${
        isAnyTeam ? "bg-highlight-primary" : "bg-[#242729]"
      }  cursor-pointer p-4 transition-colors hover:bg-zinc-950`}
    >
      {/* <p>members image</p> */}
      <p className="text-xl">
        {isAnyTeam ? "Create another one" : "You don't have any team"}
      </p>
      <p className="mt-auto flex justify-end text-sm">
        {isAnyTeam ? "Create new team" : "Create your first team"}
        <Add />
      </p>
    </div>
  );
};
