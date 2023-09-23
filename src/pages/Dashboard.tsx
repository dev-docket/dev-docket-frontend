import { useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { SmallButton } from "../components/common/buttons/SmallButton";
import { CreateNewProjectModal } from "../features/Dashboard/CreateNewProject/CreateNewProjectModal";
import { useGetProjects } from "../hooks/projects/useGetProjects";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { Project } from "../types/Project";
import { useNavigate } from "react-router-dom";
import { setActiveProject } from "../store/slices/projectSlice";
import { removeTasks } from "../store/slices/taskSlice";
import { BackpackOutlined, CreateNewFolder } from "@mui/icons-material";
import { DangerZoneModal } from "../components/Modal/DangerZoneModal";
import { DashboardSettingDropdown } from "../features/Dashboard/DashboardSettingDropdown";

export const Dashboard = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);
  const projects = useAppSelector((state) => state.project.projects);
  const isMenuSidebarOpen = useAppSelector(
    (state) => state.globalSettings.isMenuSidebarOpen,
  );

  const [isCreateNewProjectModalOpen, setIsCreateNewProjectModalOpen] =
    useState(false);
  const [isDangerZoneModalOpen, setIsDangerZoneModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project>();

  const { isLoading } = useGetProjects(userId!, token!);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenBoard = (project: Project) => {
    dispatch(removeTasks());
    dispatch(setActiveProject(project));
    navigate(`/projects/${project.slug}/dashboard`);
  };

  const handleOpenDangerZoneModal = (project?: Project) => {
    setProjectToDelete(project);
    setIsDangerZoneModalOpen(true);
  };

  return (
    <div className="flex h-screen flex-col bg-dark-background text-white">
      <Navbar />
      <div
        className={`${
          isMenuSidebarOpen ? "ml-[20%]" : "w-full"
        } mt-4 px-4 max-md:ml-0 max-md:w-full`}
      >
        <div className="flex w-full justify-between">
          <h1 className="mr-5 min-w-fit text-2xl">Your projects</h1>
          <div className="w-[8rem]">
            <SmallButton
              title="Create new project"
              onClick={() => setIsCreateNewProjectModalOpen(true)}
            />
          </div>
        </div>

        <div className="mt-5 rounded-md border-2 border-icon-gray">
          {!projects.length && (
            <div
              onClick={() => setIsCreateNewProjectModalOpen(true)}
              className="rounded-md"
            >
              <div className="flex items-center justify-between px-2 py-3 first:border-0 hover:cursor-pointer hover:bg-icon-gray">
                <div>
                  <CreateNewFolder className="mr-2" />
                  <span className="mr-4 text-xl">No projects yet</span>
                  <span className="text-sm">Create a new project</span>
                </div>
              </div>
            </div>
          )}

          {projects.map((project: Project) => (
            <div
              key={project.id}
              onClick={() => handleOpenBoard(project)}
              className="flex items-center justify-between border-t-2 border-icon-gray px-4 py-3 first:border-0 focus-within:bg-slate-600 hover:cursor-pointer hover:bg-icon-gray"
            >
              <div>
                {isLoading ? (
                  <div
                    className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent pl-2 text-blue-600"
                    role="status"
                    aria-label="loading"
                  />
                ) : (
                  <>
                    <BackpackOutlined className="mr-2" />
                    <span className="text-xl">{project.name}</span>
                    <span className="text-sm">{project.description}</span>
                  </>
                )}
              </div>
              <>
                <DashboardSettingDropdown
                  openDangerZoneModal={() => handleOpenDangerZoneModal(project)}
                />
              </>
            </div>
          ))}
        </div>
      </div>

      {isCreateNewProjectModalOpen && (
        <CreateNewProjectModal
          closeModal={() => setIsCreateNewProjectModalOpen(false)}
        />
      )}
      {isDangerZoneModalOpen && (
        <DangerZoneModal
          projectName={projectToDelete?.name}
          projectSlug={projectToDelete?.slug}
          closeModal={() => setIsDangerZoneModalOpen(false)}
        />
      )}
    </div>
  );
};
