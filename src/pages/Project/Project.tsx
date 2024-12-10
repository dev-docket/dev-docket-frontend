import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateTeamModal } from "../../features/Project/CreateTeamModal";
import { Team } from "../../types/Team";
import { Navbar, Sidebar } from "../../features/Project/Navbar";
import ProjectInfo from "../../features/Project/ProjectInfo";
import TeamsSection from "../../features/Project/TeamsSection";
import { useProjectStore, useTeamStore } from "@/stores";

const Project = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);

  const { projectSlug } = useParams<{ projectSlug: string; taskId: string }>();
  const navigate = useNavigate();

  // Zustand stores
  const { teams, loading, fetchTeamsByProject, setActiveTeam } = useTeamStore();
  const { activeProject, fetchProjectBySlug, fetchProjectMembers } = useProjectStore();

  const handleNavigateToTeamPage = (team: Partial<Team>) => {
    navigate(`/projects/${projectSlug}/teams/${team.id}/board`);
    setActiveTeam(team as Team);
  };

  useEffect(() => {
    if (!projectSlug) return;
    
    // Fetch project data
    fetchProjectBySlug(projectSlug);
    fetchProjectMembers(projectSlug);
    fetchTeamsByProject(projectSlug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectSlug]);

  return (
    <div className="flex h-full min-h-screen bg-[#0f1219] text-white">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />

      <div className="w-full transition-all">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
          activeProject={activeProject}
        />

        <div className="px-6 py-4">
          {/* Compact Project Info */}
          {projectSlug && <ProjectInfo projectSlug={projectSlug} />}

          {/* Teams Section - Now More Prominent */}
          <div className="mt-6">
            <TeamsSection
              teams={teams}
              loading={loading.teams === "pending"}
              onNavigateToTeamPage={handleNavigateToTeamPage}
              onOpenCreateTeamModal={() => setIsCreateTeamModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateTeamModal
        isOpen={isCreateTeamModalOpen}
        onClose={() => setIsCreateTeamModalOpen(false)}
      />
    </div>
  );
};

export default Project;
