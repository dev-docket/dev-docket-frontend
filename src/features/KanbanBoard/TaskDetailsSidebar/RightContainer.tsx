import { CopyAll, DeleteOutline, WarningAmber } from "@mui/icons-material";
import { SmallWideButton } from "./SmallWideButton";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { useRef, useState } from "react";
import { deleteTask, patchTask } from "../../../store/slices/actions/task";
import {
  closeTaskDetailsSidebar,
  updateStatusOfActiveTask,
} from "../../../store/slices/teamPageSlice";
import { useNavigate, useParams } from "react-router-dom";
import { DropdownButton } from "./DropdownButton";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import IcOutlineCircle from "../../../assets/icons/IcOutlineCircle";
import { PhCircleDashed } from "../../../assets/icons/PhCircleDashed";
import AntDesignCheckCircleOutlined from "../../../assets/icons/AntDesignCheckCircleOutlined";
import MdiProgressHelper from "../../../assets/icons/MdiProgressHelper";
import {
  TaskPriority,
  displayStatus,
  getPriorityByIndex,
} from "../../../types/Task";

export const RightContainer = () => {
  const activeTask = useAppSelector(
    (state) => state.teamPage.activeTaskInSidebar,
  );

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  // Separate states for managing the visibility of each dropdown
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);

  // Separate refs for each dropdown menu
  const statusDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);

  const { projectSlug, teamId } = useParams<{
    projectSlug: string;
    teamId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Use hook to handle clicks outside of the dropdown menu
  useOnClickOutside(statusDropdownRef, () => setIsStatusDropdownOpen(false));

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask());
    dispatch(closeTaskDetailsSidebar());

    navigate(`/projects/${projectSlug}/teams/${teamId}/board`);
    setIsDeleteTaskModalOpen(false);
  };

  const handleUpdateStatus = (
    status: "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE",
  ) => {
    if (!activeTask?.id) return;
    if (!teamId) return;

    dispatch(
      patchTask({
        task: { id: activeTask.id, status },
        taskId: activeTask.id,
        teamId: Number(teamId),
      }),
    );
    dispatch(updateStatusOfActiveTask(status));
    setIsStatusDropdownOpen(false);
  };

  const handleUpdatePriority = (priority: TaskPriority) => {
    if (!activeTask?.id) return;
    if (!teamId) return;

    console.log(priority);

    // dispatch(
    //   patchTask({
    //     task: { id: activeTask.id, priority },
    //     taskId: activeTask.id,
    //     teamId: Number(teamId),
    //   }),
    // );
    // setIsPriorityDropdownOpen(false);
  };

  return (
    <div className="w-full max-w-[34%] max-md:max-w-full">
      <div className="flex flex-col gap-y-5 border-b border-border-dark-primary px-5 py-5 text-sm font-normal text-white text-opacity-80">
        <div className="flex items-center justify-between ">
          <span>Status</span>
          <div ref={statusDropdownRef}>
            <DropdownButton
              label={displayStatus(activeTask?.status)}
              options={[
                <div className="flex items-center">
                  <PhCircleDashed
                    color="inherit"
                    fontSize="18"
                    className="mr-2 text-icon-gray"
                  />
                  Backlog
                </div>,
                <div className="flex items-center">
                  <IcOutlineCircle
                    color="inherit"
                    fontSize="18"
                    className="mr-2 text-icon-gray"
                  />
                  Todo
                </div>,
                <div className="flex items-center">
                  <MdiProgressHelper
                    color="inherit"
                    fontSize="18"
                    className="mr-2 text-icon-gray"
                  />
                  In progress
                </div>,
                <div className="flex items-center">
                  <AntDesignCheckCircleOutlined
                    color="inherit"
                    fontSize="18"
                    className="mr-2 text-icon-gray"
                  />
                  Done
                </div>,
              ]}
              onSelect={(index) => {
                handleUpdateStatus(
                  index === 0
                    ? "BACKLOG"
                    : index === 1
                    ? "TODO"
                    : index === 2
                    ? "IN_PROGRESS"
                    : "DONE",
                );
                setIsStatusDropdownOpen(false);
              }}
              isDropdownOpen={isStatusDropdownOpen}
              setIsDropdownOpen={setIsStatusDropdownOpen}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span>Priority</span>
          <div ref={priorityDropdownRef}>
            <DropdownButton
              label="No priority"
              options={[
                <div className="flex items-center gap-2">
                  <span>...</span> No priority
                </div>,
                <div className="flex items-center gap-2">
                  <WarningAmber /> Urgent
                </div>,
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.3em"
                    height="1.3em"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M30 30h-8V4h8zm-10 0h-8V12h8zm-10 0H2V18h8z"
                    ></path>
                  </svg>
                  Hight
                </div>,
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.3em"
                    height="1.3em"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-10 0H2V18h8z"
                    ></path>
                  </svg>
                  Medium
                </div>,
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.3em"
                    height="1.3em"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M30 30h-8V4h8zm-6-2h4V6h-4zm-4 2h-8V12h8zm-6-2h4V14h-4zm-4 2H2V18h8z"
                    ></path>
                  </svg>
                  Low
                </div>,
              ]}
              onSelect={(index: number) => {
                const priority = getPriorityByIndex(index);

                priority && handleUpdatePriority(priority);
              }}
              isDropdownOpen={isPriorityDropdownOpen}
              setIsDropdownOpen={setIsPriorityDropdownOpen}
            />
          </div>
        </div>
        {/* <div className="flex items-center justify-between">
          <span>Assignee</span>
          <button>Unassigned</button>
        </div>
        <div className="flex items-center justify-between">
          <span>Labels</span>
          <button>Add label</button>
        </div> */}
      </div>
      <div className="mt-2 px-2">
        <SmallWideButton onClick={handleCopyUrl}>
          <>
            <CopyAll color="inherit" className="mr-2 text-icon-gray" />
            Copy link to task
          </>
        </SmallWideButton>

        <SmallWideButton
          onClick={() => setIsDeleteTaskModalOpen(true)}
          customHoverBgColor="red"
        >
          <>
            <DeleteOutline color="error" className="mr-1" />
            Delete task from project
          </>
        </SmallWideButton>
      </div>

      {isDeleteTaskModalOpen && (
        <DeleteTaskModal
          taskName={activeTask?.name ?? ""}
          onCloseModal={setIsDeleteTaskModalOpen}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};
