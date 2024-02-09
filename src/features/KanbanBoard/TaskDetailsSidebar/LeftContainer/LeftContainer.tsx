import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHook";
import { Task } from "../../../../types/Task";
import {
  setDescriptionInputActive,
  setDescriptionInputValue,
} from "../../../../store/slices/teamPageSlice";
import { useEffect } from "react";
import { fetchAllActivitiesInTask } from "../../../../store/slices/actions/taskActivity";
import { DateTime } from "luxon";
import TaskActivity from "./TaskActivity";
import Spinner from "./Spinner";
import { TaskDescription } from "./TaskDescription";

interface Props {
  task: Task;
}

export const LeftContainer = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const {
    isDescriptionInputActive,
    activeTaskInSidebar,
    taskActivity,
    isTaskDetailsSidebarOpen,
  } = useAppSelector((state) => state.teamPage);

  const handleHowLongAgo = useMemo(
    () => (parsedDate: DateTime) => {
      const now = DateTime.local();
      const diff = now.diff(parsedDate, "minutes").minutes;

      if (diff < 1) {
        return "just now";
      }

      return parsedDate.toRelative({ base: DateTime.now() });
    },
    [],
  );

  useEffect(() => {
    if (activeTaskInSidebar?.description) {
      dispatch(setDescriptionInputValue(activeTaskInSidebar.description));
    }
  }, [activeTaskInSidebar, dispatch, isTaskDetailsSidebarOpen]);

  useEffect(() => {
    if (activeTaskInSidebar?.id && isTaskDetailsSidebarOpen) {
      dispatch(fetchAllActivitiesInTask(activeTaskInSidebar.id));
    }
  }, [activeTaskInSidebar?.id, dispatch, isTaskDetailsSidebarOpen]);

  return (
    <div className="flex w-[66%] flex-1 flex-col border-r border-r-border-dark-primary bg-[#161b22] max-md:w-full">
      {task && task.id ? (
        <>
          <div className="w-full border-b border-b-border-dark-primary bg-[#0d1117] p-5">
            <TaskDescription
              isDescriptionInputActive={isDescriptionInputActive ?? false}
              taskDescription={task?.description}
              onEditClick={() => dispatch(setDescriptionInputActive(true))}
            />
          </div>
          <TaskActivity
            activities={taskActivity}
            handleHowLongAgo={handleHowLongAgo}
          />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
