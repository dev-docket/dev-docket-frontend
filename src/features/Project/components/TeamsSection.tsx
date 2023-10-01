import { Team } from "../../../types/Team";
import { TeamsList } from "./TeamsList";

interface Props {
  teams: Team[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  onNavigateToTeamPage: (team: Partial<Team>) => void;
  onOpenCreateTeamModal: () => void;
}

const TeamsSection = ({
  teams,
  loading,
  onNavigateToTeamPage,
  onOpenCreateTeamModal,
}: Props) => {
  return (
    <div className="my-8">
      <h3 className="mb-2 text-2xl">Teams in project</h3>
      <div className="flex gap-3 pb-4">
        <TeamsList
          teams={teams}
          loading={loading}
          onNavigateToTeamPage={onNavigateToTeamPage}
          onOpenCreateTeamModal={onOpenCreateTeamModal}
        />
      </div>
    </div>
  );
};

export default TeamsSection;
