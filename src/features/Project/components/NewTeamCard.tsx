import { Add } from "@mui/icons-material";

interface Props {
  isAnyTeam: boolean;
  onClick: () => void;
}

export const NewTeamCard = ({ isAnyTeam, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex h-[10rem] w-[13rem] cursor-pointer flex-col rounded-2xl bg-highlight-primary p-4 transition-colors hover:bg-zinc-950`}
    >
      <p className="text-xl">
        {isAnyTeam ? "Create another one" : "Create your first team"}
      </p>
      <p className="mt-auto flex justify-end text-sm">
        {isAnyTeam ? "Create new team" : "You don't have any team"}
        <Add />
      </p>
    </div>
  );
};
