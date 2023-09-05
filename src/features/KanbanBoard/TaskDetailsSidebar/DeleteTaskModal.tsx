import { Close, ReportProblem } from "@mui/icons-material";

interface Props {
  taskName: string;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteTask: () => void;
}

export const DeleteTaskModal = ({
  taskName,
  onCloseModal,
  onDeleteTask,
}: Props) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white bg-opacity-10">
      <div className="rounded-lg bg-[#161b22] p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center text-lg font-medium">
            <ReportProblem className="mr-2 text-red-600" /> You entered the
            danger zone
          </h3>

          <Close
            onClick={() => onCloseModal(false)}
            className="rounded-full p-1 hover:cursor-pointer hover:bg-icon-gray"
            fontSize="medium"
          />
        </div>

        <div className="mt-2">
          <p className="text-base text-gray-400">
            Are you sure you want to delete the task forever?
          </p>
          <p className="text-base text-gray-400">
            You will delete task: <span className="font-bold">{taskName}</span>
          </p>
        </div>

        <button
          onClick={onDeleteTask}
          className=" mt-2 block rounded-md border-2 border-red-600 bg-button-hover-dark px-4 py-2 text-red-600 hover:bg-red-600 hover:text-white active:bg-red-700 disabled:bg-[#0d1117] disabled:opacity-30"
        >
          Delete task
        </button>
      </div>
    </div>
  );
};
