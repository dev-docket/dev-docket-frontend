import { Close } from "@mui/icons-material";
import { useAppSelector } from "../../../hooks/storeHook";
import { useState } from "react";
import { useCreateProject } from "../../../hooks/projects/useCreateProject";

interface Props {
  closeModal: () => void;
}

export const CreateNewProjectModal = ({ closeModal }: Props) => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const jwt = useAppSelector((state) => state.auth.token);
  const [name, setName] = useState("");

  const { createProject } = useCreateProject();

  const handleCreateTask = async () => {
    await createProject(userId!, jwt!, name);
  };

  return (
    <div className="absolute z-30 flex h-screen w-screen bg-secondary-background max-md:flex-col">
      <div className="flex h-full w-1/4 flex-col bg-dark-background p-4 max-md:h-1/2 max-md:w-full">
        <Close
          onClick={closeModal}
          fontSize="large"
          className="ml-2 p-1 hover:cursor-pointer hover:rounded-full hover:bg-icon-gray hover:bg-opacity-40"
        />
        <h2 className="py-4 pl-4 text-2xl">Project templates</h2>
        <div className="flex flex-grow flex-col items-center justify-center pl-4">
          <p>There is no template available at the moment.</p>
        </div>
      </div>
      <div className="w-full p-4">
        <h1 className="text-2xl">Create new project</h1>
        <p className="text-sm">
          Projects are where you manage your work. They’re made up of
          issues—tasks and ideas to discuss.
        </p>

        <div className="mt-4">
          <label htmlFor="projectName">Name</label>
          <input
            id="projectName"
            className="mt-1 w-full bg-secondary-background p-2 text-white"
            type="text"
            placeholder="e.g. Project Unicorn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleCreateTask}
            className="text-md mt-4 rounded-md bg-[#2ea043] px-3 py-2 hover:bg-[#3ab450]"
          >
            Create project
          </button>
        </div>
      </div>
    </div>
  );
};
