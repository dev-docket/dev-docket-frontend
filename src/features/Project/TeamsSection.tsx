import { Icon } from '@iconify/react';
import { TeamCard } from './CreateTeamModal';
import { FC } from 'react';
import { Team } from '../../types/Team';

interface TeamsSectionProps {
  teams: Team[];
  loading: boolean;
  onNavigateToTeamPage: (team: Team) => void;
  onOpenCreateTeamModal: () => void;
}

const TeamsSection: FC<TeamsSectionProps> = ({ teams, loading, onNavigateToTeamPage, onOpenCreateTeamModal }) => {

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Teams</h2>
          <p className="mt-1 text-sm text-gray-400">
            Create and manage teams to organize your work more effectively.
          </p>
        </div>
        
        <button
          onClick={onOpenCreateTeamModal}
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Icon icon="ph:plus-bold" className="mr-2 h-4 w-4" />
          New Team
        </button>
      </div>

      {loading ? (
        // Loading State
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg bg-[#1a1f2e] p-5">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-700" />
              <div className="mt-2 h-8 w-full animate-pulse rounded bg-gray-700" />
              <div className="mt-4 flex justify-between">
                <div className="h-6 w-16 animate-pulse rounded bg-gray-700" />
                <div className="h-6 w-16 animate-pulse rounded bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      ) : teams.length > 0 ? (
        // Teams Grid
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onClick={() => onNavigateToTeamPage(team)}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="rounded-lg border-2 border-dashed border-gray-700 p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Icon icon="ph:users-three" className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-white">No teams yet</h3>
            <p className="mt-2 text-sm text-gray-400">
              Get started by creating your first team to organize your work.
            </p>
            <button
              onClick={onOpenCreateTeamModal}
              className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Icon icon="ph:plus-bold" className="mr-2 h-4 w-4" />
              Create Team
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsSection;