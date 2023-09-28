import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTeamsByProjectSlug } from "../store/slices/actions/team";
import { TeamCard } from "../features/Project/TeamCard";
import { SmallButton } from "../components/common/buttons/SmallButton";
import { CreateNewTeamModal } from "../features/Project/CreateNewTeam/CreateNewTeamModal";
import { setActiveTeam } from "../store/slices/teamSlice";
import { Team } from "../types/Team";
import { NewTeamCard } from "../features/Project/NewTeamCard";
import { ProjectSidebar } from "../features/Project/ProjectSidebar";
import { AddCircleRounded, ArrowDropDown, Security } from "@mui/icons-material";
import { fetchProjectMembersByProjectSlug } from "../store/slices/actions/project";
import { ProjectPermissionModal } from "../features/Project/ProjectPermissionModal";

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
          <div className="mb-4 flex justify-between border-b border-white border-opacity-30 px-4 pb-2">
            <div className="flex">
              <div>
                <h1 className="text-3xl">{activeProject?.name}</h1>
                <h3 className="text-sm">
                  You can find your teams here in project
                </h3>
              </div>
              <div ref={dropdownRef} className="relative">
                <ArrowDropDown
                  onClick={() => setIsDropDownProjectSettingsOpen(true)}
                  className="hover:cursor-pointer"
                />

                <div
                  className={`transform-[translateY(100%)] ${
                    isDropDownProjectSettingsOpen ? "" : "opacity-0"
                  } absolute bottom-0
                left-0 h-full w-[290px] max-w-[600px] translate-x-8 translate-y-0 rounded-md border border-white border-opacity-30 bg-background-primary bg-opacity-90 p-2 transition-all duration-300 group-hover:opacity-100
              `}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center rounded-md px-2 py-1 text-lg hover:cursor-pointer hover:bg-icon-dark-gray hover:bg-opacity-30">
                      <Security fontSize="inherit" className="mr-2" />
                      <p className="inline-block text-base font-normal">
                        Check permission of project
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[8rem]">
              <SmallButton
                title="Create new team"
                onClick={() => setIsCreateNewTeamModalOpen(true)}
              />
            </div>
          </div>

          {/* <div className="flex w-full justify-between pl-4">
          <div>
            <h2 className="text-2xl">Your work</h2>
            <h3 className="text-sm">You can find your teams here in project</h3>
          </div>
          <div className="w-[8rem]">
            <SmallButton
              title="Create new team"
              onClick={() => setIsCreateNewTeamModalOpen(true)}
            />
          </div>
        </div> */}

          <div className="pl-4">
            <div>
              <>
                <h3 className="text-2xl">Roles in project</h3>
                <p>
                  Add members to your project to give them access to the project
                </p>
              </>

              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  <div
                    onClick={() => setIsProjectPermissionModalOpen(true)}
                    className="flex items-center justify-center rounded-md p-2 hover:cursor-pointer hover:bg-icon-gray hover:bg-opacity-30"
                  >
                    <AddCircleRounded className="mr-2" /> Add new member
                  </div>
                </div>

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
