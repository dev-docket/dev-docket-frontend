import { Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import {
  setDescriptionInputActive,
  setDescriptionInputValue,
} from "../../../store/slices/projectPageSlice";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { Task } from "../../../types/Task";
import { patchTask } from "../../../store/slices/actions/task";

export const DescriptionEditMode = () => {
  const taskId = useAppSelector((state) => state.projectPage.activeTask?.id);

  const { isDescriptionInputActive, descriptionInputValue } = useAppSelector(
    (state) => state.projectPage,
  );

  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const dispatch = useAppDispatch();

  const handleUpdateTaskDescription = () => {
    if (!taskId) return;

    const task: Partial<Task> = {
      description: descriptionInputValue,
    };
    dispatch(patchTask({ taskId, task }));
    dispatch(setDescriptionInputActive(false));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div
          onClick={() => setIsPreviewActive((prev) => !prev)}
          className="flex items-center justify-center rounded-md p-2 text-sm transition-colors hover:cursor-pointer hover:bg-icon-gray hover:bg-opacity-20"
        >
          {isPreviewActive ? (
            <>
              <Edit className="mr-2" /> Edit
            </>
          ) : (
            <>
              <RemoveRedEyeOutlined className="mr-2" /> Preview
            </>
          )}
        </div>
      </div>

      {isPreviewActive ? (
        <ReactMarkdown className="markdown-preview prose prose-slate text-white">
          {`${descriptionInputValue ?? ""}`}
        </ReactMarkdown>
      ) : (
        <textarea
          disabled={!isDescriptionInputActive}
          autoFocus
          onFocus={(e) => {
            const { target } = e;
            setTimeout(() => {
              target.selectionStart = target.value.length;
              target.selectionEnd = target.value.length;
            }, 0);
          }}
          value={descriptionInputValue ?? ""}
          onChange={(e) => dispatch(setDescriptionInputValue(e.target.value))}
          className="m-0 h-4 min-h-[7rem] w-full rounded-md border-b border-none border-[#2f81f7d9] bg-transparent p-2"
        />
      )}

      <div className="flex justify-between">
        <div className="flex items-center">
          <a
            href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
            target="_blank"
            className="flex items-center rounded-md p-2 hover:cursor-pointer hover:bg-button-hover-dark"
          >
            <svg
              className="mr-1.5 text-icon-gray"
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3ZM9 11V5H7L5.5 7 4 5H2v6h2V8l1.5 1.92L7 8v3Zm2.99.5L14.5 8H13V5h-2v3H9.5Z"></path>
            </svg>
            <span className="text-xs">Markdown is supported</span>
          </a>
          <div className="mx-2 h-full border-l border-icon-gray border-opacity-40" />
        </div>
        <div>
          <button
            onClick={() => dispatch(setDescriptionInputActive(false))}
            className="rounded-md px-2 py-1 text-sm opacity-50 hover:bg-button-hover-dark hover:opacity-100"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateTaskDescription}
            className="ml-2 rounded-md bg-[#2ea043] px-2 py-1 text-sm hover:bg-[#3ab450]"
          >
            Update description
          </button>
        </div>
      </div>
    </div>
  );
};
