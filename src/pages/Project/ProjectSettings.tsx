import { useState } from "react";
import { Sidebar } from "../../features/Sidebar/Sidebar";
import { Header } from "../../features/Project/components/Header";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { Settings } from "@mui/icons-material";
import { General } from "../../features/Project/ProjectSettings/General";
import { Project } from "../../types/Project";
import { SmallButton } from "../../components/common/buttons/SmallButton";
import { updateProject } from "../../store/slices/actions/project";
import { useNavigate } from "react-router-dom";
import { Access } from "../../features/Project/ProjectSettings/Access";

export const ProjectSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { activeProject, projectMembers } = useAppSelector(
    (state) => state.project,
  );
  const [activeTab, setActiveTab] = useState<"general" | "access">("general");
  const [newProject, setNewProject] = useState<Project | undefined>(
    activeProject,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdateProject = () => {
    if (!newProject) return;

    dispatch(updateProject({ project: newProject })).then((action) => {
      if (updateProject.fulfilled.match(action)) {
        navigate(`/projects/${action.payload.slug}/settings`);
      }
    });
  };

  return (
    <div className="flex h-screen bg-dark-background text-white">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />
      <div className="w-full pt-4 transition-all">
        <Header
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
          activeProject={activeProject}
          isButtonDisabled={true}
          underDescription="You can edit your project settings here"
        />

        <div className="flex w-full">
          <ul className="mr-8 flex w-[15rem] flex-col items-center border-r-2 border-white border-opacity-30 px-4">
            <li
              onClick={() => setActiveTab("general")}
              className={`w-fit cursor-pointer rounded-md p-2 hover:bg-button-hover-dark ${
                activeTab === "general" && "border-l-2 border-highlight-primary"
              }`}
            >
              <Settings />
              <span className="ml-2 text-sm">General</span>
            </li>
            <li
              onClick={() => setActiveTab("access")}
              className={`flex w-fit cursor-pointer items-center rounded-md p-2 hover:bg-button-hover-dark ${
                activeTab === "access" && "border-l-2 border-highlight-primary"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                className="mr-2" // Add some margin to the right of the icon
              >
                <path
                  fill="#ffffff"
                  d="M117.25 157.92a60 60 0 1 0-66.5 0a95.83 95.83 0 0 0-47.22 37.71a8 8 0 1 0 13.4 8.74a80 80 0 0 1 134.14 0a8 8 0 0 0 13.4-8.74a95.83 95.83 0 0 0-47.22-37.71M40 108a44 44 0 1 1 44 44a44.05 44.05 0 0 1-44-44m210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16a44 44 0 1 0-16.34-84.87a8 8 0 1 1-5.94-14.85a60 60 0 0 1 55.53 105.64a95.83 95.83 0 0 1 47.22 37.71a8 8 0 0 1-2.33 11.07"
                />
              </svg>
              <span className="text-sm">Access</span>
            </li>
          </ul>
          <div className="w-2/3">
            <h2 className="border-b border-white border-opacity-30 pb-2 text-xl">
              Project settings
            </h2>

            {activeTab === "general" && (
              <General project={newProject} setNewProject={setNewProject} />
            )}
            {activeTab === "access" && (
              <Access projectMembers={projectMembers || []} />
            )}

            <div className="mt-4 w-fit">
              <SmallButton title="Save changes" onClick={handleUpdateProject} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
