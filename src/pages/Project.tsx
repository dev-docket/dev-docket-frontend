import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { Navbar } from "../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTeamsByProjectSlug } from "../store/slices/actions/team";
import { TeamCard } from "../features/Project/TeamCard";
import { SmallButton } from "../components/common/buttons/SmallButton";
import { CreateNewTeamModal } from "../features/Project/CreateNewTeam/CreateNewTeamModal";

export const Project = () => {
  const { teams, loading } = useAppSelector((state) => state.team);
  const isSidebarOpen = useAppSelector(
    (state) => state.globalSettings.isMenuSidebarOpen,
  );

  const [isCreateNewTeamModalOpen, setIsCreateNewTeamModalOpen] =
    useState(false);

  const { projectSlug } = useParams<{
    projectSlug: string;
    taskId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateToTeamPage = (teamId: number) => {
    navigate(`/projects/${projectSlug}/teams/${teamId}`);
  };

  useEffect(() => {
    if (!projectSlug) return;

    dispatch(fetchTeamsByProjectSlug(projectSlug));
  }, [dispatch, projectSlug]);

  return (
    <div className="flex h-screen flex-col bg-dark-background text-white">
      <Navbar />
      <div
        className={`mt-4  ${
          isSidebarOpen ? "ml-[20%]" : "w-[100%]"
        } px-4 transition-all max-md:w-full`}
      >
        <div className="flex w-full justify-between">
          <div>
            <h1 className="text-2xl">Your work</h1>
            <h2 className="text-sm">You can find your teams here in project</h2>
          </div>
          <div className="w-[8rem]">
            <SmallButton
              title="Create new team"
              onClick={() => setIsCreateNewTeamModalOpen(true)}
            />
          </div>
        </div>

        <div className="mt-7">
          <div className="mt-10 flex gap-3 overflow-auto pb-4">
            {loading == "succeeded" ? (
              teams.map((team) => (
                <div key={team.id} className="w-[13rem]">
                  <TeamCard
                    team={team}
                    onNavigateToTeamPage={handleNavigateToTeamPage}
                  />
                </div>
              ))
            ) : (
              <div
                className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent pl-2 text-blue-600"
                role="status"
                aria-label="loading"
              />
            )}
          </div>
        </div>
      </div>

      {isCreateNewTeamModalOpen && (
        <CreateNewTeamModal
          closeModal={() => setIsCreateNewTeamModalOpen(false)}
        />
      )}
    </div>
  );
};
