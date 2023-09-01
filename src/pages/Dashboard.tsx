import { useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { SmallButton } from "../components/common/buttons/SmallButton";
import { CreateNewProjectModal } from "../features/Dashboard/CreateNewProject/CreateNewProjectModal";
import { useGetProjects } from "../hooks/projects/useGetProjects";
import { useAppSelector } from "../hooks/storeHook";
import { Project } from "../types/Project";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);
  const projects = useAppSelector((state) => state.project.projects);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useGetProjects(userId!, token!);
  const navigate = useNavigate();

  const handleOpenBoard = (projectName?: string) => {
    projectName && navigate(`/projects/${projectName}/board`);
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
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
        <table className="mt-5 w-full text-xl">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: Project) => (
              <tr
                key={project.id}
                onClick={() => handleOpenBoard(project.name)}
                className="hover:cursor-pointer hover:bg-icon-gray"
              >
                <td className="flex px-2 py-1">{project.name}</td>
                <td>{project?.description}</td>
                {/* <td>{project?.createdAt}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <CreateNewProjectModal closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
