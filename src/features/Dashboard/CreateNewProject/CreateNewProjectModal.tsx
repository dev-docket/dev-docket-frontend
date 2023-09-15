import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/storeHook";
import { createProject } from "../../../store/slices/actions/project";
import { useNavigate } from "react-router-dom";

interface Props {
  closeModal: () => void;
}

export const CreateNewProjectModal = ({ closeModal }: Props) => {
  const [name, setName] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateProject = () => {
    dispatch(createProject({ projectName: name, navigate }));
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
          Projects are where you manage your work. The contain teams and other
          structures that help you organize your work.
        </p>

        <div className="mt-4">
          <label htmlFor="projectName">Name</label>
          <input
            id="projectName"
            className="mt-1 w-full bg-secondary-background p-2 text-white"
            type="text"
            placeholder="e.g. Unicorn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleCreateProject}
            className="text-md mt-4 rounded-md bg-[#2ea043] px-3 py-2 hover:bg-[#3ab450]"
          >
            Create project
          </button>
        </div>
      </div>
    </div>
  );
};
