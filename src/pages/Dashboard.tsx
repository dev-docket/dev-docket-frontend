import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { setActiveProject } from "../store/slices/projectSlice";
import { toast } from "react-toastify";
import { Navbar, Sidebar } from "../features/Project/Navbar";
import { useProjectStore } from "@/stores/projectStore";

const CreateProjectModal = ({ isOpen, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {createProject} = useProjectStore();

  const handleCreateProject = async () => {
    if (!projectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    setIsLoading(true);
    try {

      const newProject = await createProject(projectName.trim())

      if (newProject) {
        onClose();
      }
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-[#1a1f2e] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">
            Create New Project
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={isLoading}
          >
            <Icon icon="ph:x-bold" className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Project Name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500"
              placeholder="Enter project name"
              disabled={isLoading}
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="rounded-md px-4 py-2 text-gray-300 hover:bg-gray-800"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              disabled={isLoading || !projectName.trim()}
              className="flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading && (
                <Icon icon="ph:spinner" className="mr-2 h-5 w-5 animate-spin" />
              )}
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  const { setActiveProject } = useProjectStore();

  const handleProjectClick = () => {
    setActiveProject(project);
    navigate(`/projects/${project.slug}/dashboard`);
  };

  return (
    <div
      onClick={handleProjectClick}
      className="group relative rounded-lg bg-[#1a1f2e] p-4 transition-all hover:cursor-pointer hover:bg-[#212736]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon icon="ph:folder-simple" className="h-6 w-6 text-blue-500" />
          <div>
            <h3 className="text-lg font-medium text-white">{project.name}</h3>
            <p className="text-sm text-gray-400">
              {project.description || "No description"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const {projects, activeProject, fetchProjects} = useProjectStore();
  
  // const { projects, fetchProjects, setActiveProject, activeProject } = useProjectStore();
  // const { isMenuSidebarOpen } = useAppSelector(state => state.globalSettings);

  useEffect(() => {
    fetchProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setActiveProject(undefined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1219]">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />
       <Navbar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
          activeProject={activeProject}
        />
      <div
        className={`mx-auto max-w-7xl px-4 py-8 ${
          "w-full"
        } transition-all duration-300 max-md:ml-0 max-md:w-full`}
      >
       
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            <Icon icon="ph:plus-bold" className="mr-2 h-5 w-5" />
            New Project
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={() => {}} // Handle is internal to card now
            />
          ))}

          {projects.length === 0 && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex h-48 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 text-gray-400 transition-colors hover:border-blue-500 hover:text-blue-500"
            >
              <Icon icon="ph:folder-simple-plus" className="mb-2 h-8 w-8" />
              <span>Create your first project</span>
            </button>
          )}
        </div>
      </div>

      <CreateProjectModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default Dashboard;
