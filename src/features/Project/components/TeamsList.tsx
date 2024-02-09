import { Team } from "../../../types/Team";
import { NewTeamCard } from "./NewTeamCard";
import { TeamCard } from "./TeamCard";

interface Props {
  teams: Team[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  onNavigateToTeamPage: (team: Partial<Team>) => void;
  onOpenCreateTeamModal: () => void;
}

export const TeamsList = ({
  teams,
  loading,
  onNavigateToTeamPage,
  onOpenCreateTeamModal,
}: Props) => {
  if (loading !== "succeeded") {
    return (
      <div
        className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent pl-2 text-blue-600"
        role="status"
        aria-label="loading"
      />
    );
  }

  return (
    <div className="flex flex-wrap gap-3 overflow-auto bg-background-primary pb-4">
      {teams.map((team) => (
        <div key={team.id} className="w-[13rem]">
          <TeamCard team={team} onNavigateToTeamPage={onNavigateToTeamPage} />
        </div>
      ))}

      <NewTeamCard
        onClick={onOpenCreateTeamModal}
        isAnyTeam={teams.length > 0}
      />
    </div>
  );
};
