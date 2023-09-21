import React, { useCallback, useEffect, useRef, useState } from "react";
import { Task } from "../../../types/Task";
import { Close } from "@mui/icons-material";
import { LeftContainer } from "./LeftContainer";
import { RightContainer } from "./RightContainer";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { patchTask } from "../../../store/slices/actions/task";
import { useParams } from "react-router-dom";
import { updateActiveTeam } from "../../../store/slices/actions/team";

interface TaskDetailsSidebarProps {
  task?: Task;
  show: boolean;
  onHide: () => void;
}

export const TaskDetailsSidebar: React.FC<TaskDetailsSidebarProps> = ({
  task,
  show,
  onHide,
}) => {
  const { name } = task || {};

  const activeProject = useAppSelector((state) => state.project.activeProject);
  const activeTeam = useAppSelector((state) => state.team.activeTeam);

  const [taskName, setTaskName] = useState<string | undefined>(name);
  const [isInputTaskNameActive, setIsInputTaskNameActive] = useState(false);

  const { teamId, taskId } = useParams<{ teamId: string; taskId: string }>();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleUpdateTaskName = useCallback(() => {
    dispatch(
      patchTask({
        taskId: Number(taskId),
        task: {
          id: Number(taskId),
          name: taskName,
        },
      }),
    );
    setIsInputTaskNameActive(false);
  }, [dispatch, taskId, taskName]);

  useEffect(() => {
    if (!activeTeam) {
      dispatch(updateActiveTeam(Number(teamId)));
    }
  }, [activeTeam, dispatch, teamId]);

  useEffect(() => {
    setTaskName(name);
  }, [name]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onHide();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onHide]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed right-0 top-[72px] h-full w-[60%] transform bg-[#0d1117] text-white shadow-md transition-all duration-300 ease-in-out max-xl:w-[80%] max-lg:w-full ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="mt-5 border-b border-gray-600">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-sm">
            {activeProject?.name} {">"} {activeTeam?.name}
          </h2>

          <Close className="cursor-pointer" onClick={onHide} />
        </div>

        <div className="flex items-center justify-between px-5">
          <div className="py-2">
            {isInputTaskNameActive ? (
              <input
                autoFocus
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUpdateTaskName();
                }}
                className="w-full rounded-md border border-highlight-secondary bg-transparent px-2 py-1 text-sm"
              />
            ) : (
              <h2 className="mb-4 text-xl font-bold">{taskName}</h2>
            )}
          </div>
          <button
            onClick={() =>
              setIsInputTaskNameActive((prev) => {
                if (prev) {
                  handleUpdateTaskName();
                }
                return !prev;
              })
            }
            className="rounded-md px-2 py-1 text-sm hover:bg-icon-gray hover:bg-opacity-20"
          >
            {isInputTaskNameActive ? "Save name" : "Edit name"}
          </button>
        </div>
      </div>

      <div className="flex h-full w-full max-md:flex-col">
        <LeftContainer task={task} />

        <RightContainer />
      </div>
    </div>
  );
};
