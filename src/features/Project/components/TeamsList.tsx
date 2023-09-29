import { Team } from "../../../types/Team";
import { NewTeamCard } from "../NewTeamCard";
import { TeamCard } from "../TeamCard";

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
  return (
    <div className="flex gap-3 overflow-auto pb-4">
      {loading === "succeeded" ? (
        teams.length > 0 ? (
          teams.map((team) => (
            <div key={team.id} className="w-[13rem]">
              <TeamCard
                team={team}
                onNavigateToTeamPage={onNavigateToTeamPage}
              />
            </div>
          ))
        ) : (
          <NewTeamCard onClick={onOpenCreateTeamModal} />
        )
      ) : (
        <div
          className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent pl-2 text-blue-600"
          role="status"
          aria-label="loading"
        />
      )}
    </div>
  );
};
