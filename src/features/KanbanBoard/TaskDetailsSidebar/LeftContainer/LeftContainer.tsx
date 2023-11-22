import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHook";
import { Task } from "../../../../types/Task";
import {
  setDescriptionInputActive,
  setDescriptionInputValue,
} from "../../../../store/slices/teamPageSlice";
import { useEffect } from "react";
import { fetchAllActivitiesInTask } from "../../../../store/slices/actions/taskActivity";
import { DateTime } from "luxon";
import ProfileWithEditButton from "./ProfileWithEditButton";
import TaskActivity from "./TaskActivity";
import Spinner from "./Spinner";
import { DescriptionEditMode } from "../DescriptionEditMode";

interface Props {
  task: Task;
}

export const LeftContainer = ({ task }: Props) => {
  const dispatch = useAppDispatch();
  const { isDescriptionInputActive, activeTaskInSidebar, taskActivity } =
    useAppSelector((state) => state.teamPage);

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

    if (activeTaskInSidebar?.id) {
      dispatch(fetchAllActivitiesInTask(activeTaskInSidebar.id));
    }
  }, [activeTaskInSidebar, dispatch]);

  const renderDescription = () => {
    if (isDescriptionInputActive) return <DescriptionEditMode />;

    return task.description ? (
      <>
        <ProfileWithEditButton
          onClick={() => dispatch(setDescriptionInputActive(true))}
        />
        <ReactMarkdown className="markdown-preview prose prose-slate text-white">
          {task.description}
        </ReactMarkdown>
      </>
    ) : (
      <>
        <ProfileWithEditButton
          onClick={() => dispatch(setDescriptionInputActive(true))}
        />
        <span className="text-sm italic text-gray-500">
          No description provided
        </span>
      </>
    );
  };

  return (
    <div className="w-[66%] border-r border-r-border-dark-primary bg-[#161b22] max-md:w-full">
      {task && task.id ? (
        <>
          <div className="w-full border-b border-b-border-dark-primary bg-[#0d1117] p-5">
            {renderDescription()}
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
