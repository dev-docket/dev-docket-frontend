import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTeamsByProjectSlug } from "../../store/slices/actions/team";
import { TeamCard } from "../../features/Project/TeamCard";
import { CreateNewTeamModal } from "../../features/Project/CreateNewTeam/CreateNewTeamModal";
import { setActiveTeam } from "../../store/slices/teamSlice";
import { Team } from "../../types/Team";
import { NewTeamCard } from "../../features/Project/NewTeamCard";
import { ProjectSidebar } from "../../features/Project/ProjectSidebar";
import { fetchProjectMembersByProjectSlug } from "../../store/slices/actions/project";
import { ProjectPermissionModal } from "../../features/Project/ProjectPermissionModal";
import { AddMemberButton } from "../../features/Project/components/AddMemberButton";
import { Header } from "../../features/Project/components/Header";

export const Project = () => {
  const { teams, loading } = useAppSelector((state) => state.team);
  const { activeProject, projectMembers } = useAppSelector(
    (state) => state.project,
  );

  const [isCreateNewTeamModalOpen, setIsCreateNewTeamModalOpen] =
    useState(false);

  const [isProjectPermissionModalOpen, setIsProjectPermissionModalOpen] =
    useState(false);
  const [isDropDownProjectSettingsOpen, setIsDropDownProjectSettingsOpen] =
    useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { projectSlug } = useParams<{
    projectSlug: string;
    taskId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigateToTeamPage = (team: Partial<Team>) => {
    navigate(`/projects/${projectSlug}/teams/${team.id}/board`);

    dispatch(setActiveTeam(team as Team));
  };

  const closeMenu = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropDownProjectSettingsOpen(false);
      }
    },
    [dropdownRef],
  );

  useEffect(() => {
    window.addEventListener("mousedown", closeMenu);

    return () => {
      window.removeEventListener("mousedown", closeMenu);
    };
  }, [closeMenu]);

  useEffect(() => {
    if (!projectSlug) return;

    dispatch(fetchProjectMembersByProjectSlug({ projectSlug }));
  }, [dispatch, projectSlug]);

  useEffect(() => {
    if (!projectSlug) return;

    dispatch(fetchTeamsByProjectSlug(projectSlug));
  }, [dispatch, projectSlug]);

  return (
    <>
      <div className="flex h-screen bg-dark-background text-white">
        <ProjectSidebar />

        <div className="mt-4 w-full transition-all max-md:w-full">
          <Header
            activeProject={activeProject}
            onOpenCreateTeamModal={() => setIsCreateNewTeamModalOpen(true)}
            dropdownRef={dropdownRef}
            isDropDownProjectSettingsOpen={isDropDownProjectSettingsOpen}
            onToggleDropDown={() =>
              setIsDropDownProjectSettingsOpen((prev) => !prev)
            }
          />

          <div className="pl-4">
            <div>
              <>
                <h3 className="text-2xl">Roles in project</h3>
                <p>
                  Add members to your project to give them access to the project
                </p>
              </>

              <div className="mt-4 flex items-center">
                <AddMemberButton
                  onAddMember={() => setIsProjectPermissionModalOpen(true)}
                />

                <div className="flex items-center">
                  {projectMembers && projectMembers?.length > 0 ? (
                    <>
                      {projectMembers.map((member) => (
                        <div
                          key={member.userId}
                          className="flex cursor-pointer items-center justify-center rounded-md p-2 text-white hover:bg-icon-gray hover:bg-opacity-30"
                        >
                          <p className="text-base">{member?.user?.email}</p>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex items-center justify-center rounded-md p-2 hover:bg-icon-gray hover:bg-opacity-30">
                      <p className="text-sm">Members: 0</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="my-8">
              <h3 className="mb-2 text-2xl">Teams in project</h3>
              <div className="flex gap-3 overflow-auto pb-4">
                {loading == "succeeded" ? (
                  teams.length > 0 ? (
                    teams.map((team) => (
                      <div key={team.id} className="w-[13rem]">
                        <TeamCard
                          team={team}
                          onNavigateToTeamPage={handleNavigateToTeamPage}
                        />
                      </div>
                    ))
                  ) : (
                    <NewTeamCard
                      onClick={() => setIsCreateNewTeamModalOpen(true)}
                    />
                  )
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
        </div>
      </div>

      {isProjectPermissionModalOpen && (
        <ProjectPermissionModal
          showModal={isProjectPermissionModalOpen}
          onCloseModal={setIsProjectPermissionModalOpen}
        />
      )}

      {isCreateNewTeamModalOpen && (
        <CreateNewTeamModal
          closeModal={() => setIsCreateNewTeamModalOpen(false)}
        />
      )}
    </>
  );
};
