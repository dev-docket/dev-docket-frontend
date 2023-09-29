import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTeamsByProjectSlug } from "../../store/slices/actions/team";
import { CreateNewTeamModal } from "../../features/Project/CreateNewTeam/CreateNewTeamModal";
import { setActiveTeam } from "../../store/slices/teamSlice";
import { Team } from "../../types/Team";
import { ProjectSidebar } from "../../features/Project/ProjectSidebar";
import {
  fetchProjectBySlugAndSetAsActive,
  fetchProjectMembersByProjectSlug,
} from "../../store/slices/actions/project";
import { ProjectPermissionModal } from "../../features/Project/ProjectPermissionModal";
import { Header } from "../../features/Project/components/Header";
import { ProjectRoles } from "../../features/Project/components/ProjectRoles";
import TeamsSection from "../../features/Project/components/TeamsSection";

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

  useEffect(() => {
    if (!projectSlug) return;

    dispatch(
      fetchProjectBySlugAndSetAsActive({
        projectSlug,
      }),
    );
  }, [dispatch, projectSlug]);

  return (
    <>
      <div className="flex h-screen bg-dark-background text-white">
        <ProjectSidebar />

        <div className="w-full pt-4 transition-all">
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
            <ProjectRoles
              onAddMember={() => setIsProjectPermissionModalOpen(true)}
              projectMembers={projectMembers}
            />

            <TeamsSection
              teams={teams}
              loading={loading}
              onNavigateToTeamPage={handleNavigateToTeamPage}
              onOpenCreateTeamModal={() => setIsCreateNewTeamModalOpen(true)}
            />
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
