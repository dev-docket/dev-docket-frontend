import { Close } from "@mui/icons-material";
import { useState } from "react";
import { createTeam } from "../../../store/slices/actions/team";
import { useAppDispatch } from "../../../hooks/storeHook";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  closeModal: () => void;
}

export const CreateNewTeamModal = ({ closeModal }: Props) => {
  const [name, setName] = useState("");

  const { projectSlug } = useParams<{ projectSlug: string }>();

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleCreateTeam = () => {
    if (!projectSlug) return;

    dispatch(createTeam({ name, projectSlug, navigation }));
  };

  return (
    <div className="absolute left-0 top-0 z-50 flex h-screen w-screen bg-background-primary text-white max-md:flex-col">
      <div className="flex h-full w-2/4 flex-col bg-dark-background p-4 max-md:h-1/2 max-md:w-full">
        <Close
          onClick={closeModal}
          fontSize="large"
          className="ml-2 p-1 hover:cursor-pointer hover:rounded-full hover:bg-icon-gray hover:bg-opacity-40"
        />
        <h2 className="py-4 pl-4 text-2xl">Team templates</h2>
        <div className="flex flex-grow flex-col items-center justify-center pl-4">
          <p>There is no template available at the moment.</p>
        </div>
      </div>

      <div className="w-full p-4">
        <h1 className="text-2xl">Create new team</h1>
        <p className="text-sm">
          Teams are a structure that allows you to divide the project into
          smaller parts according to teams. You may have, for example, a team of
          graphic designers, programmers, etc.
        </p>

        <div className="mt-4">
          <label htmlFor="projectName">Name</label>
          <input
            id="projectName"
            className="mt-1 w-full bg-secondary-background p-2 text-white"
            type="text"
            placeholder="e.g. Graphic design"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleCreateTeam}
            className="text-md mt-4 rounded-md bg-[#2ea043] px-3 py-2 hover:bg-[#3ab450]"
          >
            Create team
          </button>
        </div>
      </div>
    </div>
  );
};
