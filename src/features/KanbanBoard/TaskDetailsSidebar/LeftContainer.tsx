import ReactMarkdown from "react-markdown";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { Task } from "../../../types/Task";
import { DescriptionEditMode } from "./DescriptionEditMode";
import {
  setDescriptionInputActive,
  setDescriptionInputValue,
} from "../../../store/slices/teamPageSlice";
import { useEffect } from "react";

interface Props {
  task?: Task;
}

export const LeftContainer = (props: Props) => {
  const { task } = props;
  const {
    isDescriptionInputActive,
    descriptionInputValue,
    activeTaskInSidebar,
  } = useAppSelector((state) => state.teamPage);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!activeTaskInSidebar?.description) return;
    dispatch(setDescriptionInputValue(activeTaskInSidebar?.description));
  }, [activeTaskInSidebar, dispatch]);

  const profileWithEditButton = () => {
    return (
      <div className="mb-4 flex items-center justify-between border-b border-b-icon-gray border-opacity-30">
        <div>
          {/* TODO: Profile image, profile name and time of last edited task. */}
          profile
        </div>
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

    if (descriptionInputValue) {
      return (
        <>
          {profileWithEditButton()}
          <ReactMarkdown className="markdown-preview prose prose-slate text-white">
            {`${descriptionInputValue ?? ""}`}
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
        <div className="w-full border-b border-b-border-dark-primary bg-[#0d1117] p-5">
          {conditionalDescription()}
        </div>
      ) : (
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent" />
      )}
    </div>
  );
};
