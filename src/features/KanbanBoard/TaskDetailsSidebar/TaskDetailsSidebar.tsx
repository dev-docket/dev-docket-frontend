import React, { useCallback, useEffect, useState, useRef } from "react";
import { Task } from "../../../types/Task";
import CloseIcon from "@mui/icons-material/Close";
import { LeftContainer } from "./LeftContainer/LeftContainer";
import { RightContainer } from "./RightContainer/RightContainer";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { motion } from "framer-motion";

import { useParams } from "react-router-dom";
import { updateActiveTeam } from "../../../store/slices/actions/team";
import { patchTask } from "../../../store/slices/actions/task";

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
  const [isInputTaskNameActive, setIsInputTaskNameActive] =
    useState<boolean>(false);
  const { teamId, taskId } = useParams<{ teamId: string; taskId: string }>();
  const dispatch = useAppDispatch();
  const sidebarRef = useRef<HTMLDivElement>(null);

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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onHide]);

  const handleUpdateTaskName = useCallback(() => {
    if (taskName && taskId && teamId) {
      dispatch(
        patchTask({
          taskId: Number(taskId),
          task: { id: Number(taskId), name: taskName },
          teamId: Number(teamId),
        }),
      );

      setIsInputTaskNameActive(false);
    }
  }, [dispatch, taskId, taskName, teamId]);

  const toggleTaskNameEdit = () => {
    if (isInputTaskNameActive) handleUpdateTaskName();
    setIsInputTaskNameActive(!isInputTaskNameActive);
  };

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
  };

  return (
    <motion.div
      ref={sidebarRef}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={sidebarVariants}
      transition={{
        type: "easeInOut",
        duration: 0.3,
        stiffness: 100,
        damping: 30,
      }}
      className={`fixed right-0 top-0 h-screen w-[60%] overflow-auto bg-[#0d1117] text-white shadow-md transition-all duration-300 ease-in-out max-xl:w-[80%] max-lg:w-full`}
    >
      <div className="mt-5 border-b border-gray-600">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-sm">
            {activeProject?.name} {">"} {activeTeam?.name}
          </h2>
          <CloseIcon className="cursor-pointer" onClick={onHide} />
        </div>

        <div className="flex items-center justify-between px-5">
          <div className="py-2">
            {isInputTaskNameActive ? (
              <input
                autoFocus
                value={taskName ?? ""}
                onChange={(e) => setTaskName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUpdateTaskName()}
                className="w-full rounded-md border border-highlight-secondary bg-transparent px-2 py-1 text-sm"
              />
            ) : (
              <h2 className="mb-4 text-xl font-bold">{taskName}</h2>
            )}
          </div>
          <button
            onClick={toggleTaskNameEdit}
            className="rounded-md px-2 py-1 text-sm hover:bg-icon-gray hover:bg-opacity-20"
          >
            {isInputTaskNameActive ? "Save name" : "Edit name"}
          </button>
        </div>
      </div>

      <div className="flex w-full max-md:flex-col-reverse">
        {task && <LeftContainer task={task} />}
        <RightContainer />
      </div>
    </motion.div>
  );
};
