import ReactMarkdown from "react-markdown";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { Task } from "../../../types/Task";
import { DescriptionEditMode } from "./DescriptionEditMode";
import {
  setDescriptionInputActive,
  setDescriptionInputValue,
} from "../../../store/slices/teamPageSlice";
import { useEffect } from "react";
import { fetchAllActivitiesInTask } from "../../../store/slices/actions/taskActivity";

interface Props {
  task: Task;
}

export const LeftContainer = ({ task }: Props) => {
  const { description } = task;

  const { isDescriptionInputActive, activeTaskInSidebar, taskActivity } =
    useAppSelector((state) => state.teamPage);

  const dispatch = useAppDispatch();

  const handleHowLongAgo = (date: string) => {
    const dateNow = new Date();
    const dateThen = new Date(date);

    const diff = dateNow.getTime() - dateThen.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 24) {
      return `${Math.floor(hours / 24)} days ago`;
    }

    if (hours > 0) {
      return `${hours} hours ago`;
    }

    if (minutes > 0) {
      return `${minutes} minutes ago`;
    }

    return `${seconds} seconds ago`;
  };

  useEffect(() => {
    if (!activeTaskInSidebar?.description) return;
    dispatch(setDescriptionInputValue(activeTaskInSidebar?.description));
  }, [activeTaskInSidebar, dispatch]);

  useEffect(() => {
    if (!activeTaskInSidebar?.id) return;

    dispatch(fetchAllActivitiesInTask(activeTaskInSidebar?.id));
  }, [activeTaskInSidebar, dispatch]);

  const profileWithEditButton = () => {
    return (
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">Description</h3>
        <button
          onClick={() => dispatch(setDescriptionInputActive(true))}
          className="rounded-md p-2 text-sm transition-colors ease-out hover:bg-button-hover-dark active:bg-slate-900"
        >
          Edit
        </button>
      </div>
    );
  };

  const conditionalDescription = () => {
    if (isDescriptionInputActive) {
      return <DescriptionEditMode />;
    }

    if (description) {
      return (
        <>
          {profileWithEditButton()}
          <ReactMarkdown className="markdown-preview prose prose-slate text-white">
            {`${description ?? ""}`}
          </ReactMarkdown>
        </>
      );
    }

    return (
      <>
        {profileWithEditButton()}
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
            {conditionalDescription()}
          </div>
          <div className="p-5">
            <h3 className="mb-4 text-xl font-semibold">Activity</h3>

            <div>
              {taskActivity?.length === 0 && (
                <span className="text-base italic text-gray-500">
                  No activity yet
                </span>
              )}

              {taskActivity &&
                taskActivity?.length > 0 &&
                taskActivity?.map((activity) => (
                  <div
                    key={activity.id}
                    className="mb-2 mt-4 flex items-center"
                  >
                    <div className="mr-2 h-6 w-6">
                      <img
                        src="https://avatars.githubusercontent.com/u/2918581?v=4"
                        alt="profile"
                        className="h-full w-full rounded-full"
                      />
                    </div>

                    <div className="flex items-center text-center text-sm">
                      <span className="mr-2 text-xl text-gray-400">
                        {activity.user?.username}
                      </span>{" "}
                      <span className="text-base">{activity.description}</span>
                      {/*  */}
                      <span className="mx-2 inline-block font-bold text-gray-400">
                        {"\u00B7"}
                      </span>
                      {/*  */}
                      <div>
                        <span className="text-gray-400">
                          {handleHowLongAgo(
                            new Date(activity.createdAt).toLocaleString(),
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent" />
      )}
    </div>
  );
};
