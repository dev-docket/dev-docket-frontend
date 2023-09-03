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
import { ProjectSettingDropdown } from "../features/Dashboard/ProjectSettingDropdown";
import { DangerZoneModal } from "../components/Modal/DangerZoneModal";

export const Dashboard = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);
  const projects = useAppSelector((state) => state.project.projects);

  const [isCreateNewProjectModalOpen, setIsCreateNewProjectModalOpen] =
    useState(false);
  const [isDangerZoneModalOpen, setIsDangerZoneModalOpen] = useState(false);
  const [projectNameToDelete, setProjectNameToDelete] = useState<string>("");

  const { isLoading } = useGetProjects(userId!, token!);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenBoard = (projectName?: string) => {
    if (!projectName) return;

    const project = projects.find((p) => p.name === projectName);

    if (!project) return;

    dispatch(removeTasks());
    dispatch(setActiveProject(project));
    navigate(`/projects/${projectName}/board`);
  };

  const handleOpenDangerZoneModal = (projectName?: string) => {
    setProjectNameToDelete(projectName ?? "");
    setIsDangerZoneModalOpen(true);
  };

  return (
    <div className="flex h-screen flex-col bg-dark-background text-white">
      <Navbar />
      <div className="mt-7 px-7">
        <div className="animate-resize flex w-full justify-between">
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
              onClick={() => handleOpenBoard(project.name)}
              className="flex items-center justify-between border-t-2 border-icon-gray px-4 py-3 first:border-0 hover:cursor-pointer hover:bg-icon-gray"
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
                <ProjectSettingDropdown
                  openDangerZoneModal={() =>
                    handleOpenDangerZoneModal(project?.name)
                  }
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
          projectNameToDelete={projectNameToDelete}
          closeModal={() => setIsDangerZoneModalOpen(false)}
        />
      )}
    </div>
  );
};
