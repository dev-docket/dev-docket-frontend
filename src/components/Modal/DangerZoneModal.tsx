import { Close, ReportProblem } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/storeHook";
import { deleteProject } from "../../store/slices/actions/project";

interface Props {
  projectName?: string;
  projectSlug?: string;
  closeModal: () => void;
}

export const DangerZoneModal = ({
  projectName,
  projectSlug,
  closeModal,
}: Props) => {
  const [value, setValue] = useState("");

  const dispach = useAppDispatch();

  const handleDeleteProject = async () => {
    if (value !== "delete the project irreversibly") return;

    if (!projectSlug) return;

    dispach(deleteProject({ projectSlug }));
    closeModal();
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white bg-opacity-10">
      <div className="rounded-lg bg-[#161b22] p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center text-lg font-medium">
            <ReportProblem className="mr-2 text-red-600" /> You entered the
            danger zone
          </h3>

          <Close
            onClick={closeModal}
            className="rounded-full p-1 hover:cursor-pointer hover:bg-icon-gray"
            fontSize="medium"
          />
        </div>

        <div className="mt-2">
          <p className="text-base text-gray-400">
            Are you sure you want to delete the project forever?
          </p>
          <p className="text-base text-gray-400">
            You will delete project: {projectName}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-xs">
            If so, write: "
            <span className="select-none font-bold">
              delete the project irreversibly
            </span>
            "
          </p>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-2 w-full rounded-md border-2 border-red-600 bg-[#0d1117] p-2 text-sm focus:border-indigo-500 focus:outline-none"
          />
          <button
            disabled={value !== "delete the project irreversibly"}
            onClick={handleDeleteProject}
            className=" mt-2 block rounded-md border-2 border-red-600 bg-button-hover-dark px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white active:bg-red-700 disabled:bg-[#0d1117] disabled:opacity-30"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
