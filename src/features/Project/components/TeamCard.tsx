import { ArrowRightAlt } from "@mui/icons-material";
import { Team } from "../../../types/Team";

interface Props {
  team: Partial<Team>;
  onNavigateToTeamPage: (team: Partial<Team>) => void;
}

export const TeamCard = ({ team, onNavigateToTeamPage }: Props) => {
  const { id, name } = team;

  const handleNavigateToTeamPage = () => {
    if (!id) return;

    onNavigateToTeamPage(team);
  };
  return (
    <div
      onClick={handleNavigateToTeamPage}
      className="flex h-[10rem] w-[13rem] flex-col rounded-2xl bg-[#242729] p-4 transition-colors cursor-pointer hover:bg-zinc-950"
    >
      {/* <p>members image</p> */}
      <p className="text-xl">{name}</p>
      <p className="mt-auto flex justify-end text-sm">
        Click to see your team
        <ArrowRightAlt />
      </p>
    </div>
  );
};
