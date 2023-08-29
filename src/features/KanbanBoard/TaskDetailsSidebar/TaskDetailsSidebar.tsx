import React, { useEffect, useRef, useState } from "react";
import { Task } from "../../../types/Task";
import { Close } from "@mui/icons-material";
import { LeftContainer } from "./LeftContainer";
import { RightContainer } from "./RightContainer";

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
  // task = {} as Task;
  const { title, description } = task || {};
  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isInputEnabled, setIsInputEnabled] = useState(false);
  const [descriptionInput, setDescriptionInput] = useState<string>(
    description ?? "",
  );

  useEffect(() => {
    setDescriptionInput(description ?? "");
  }, [description]);

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

  const sidebarHeader = () => {
    return (
      <div className="mt-5 border-b border-gray-600">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-sm">Bookshelf #24</h2>

          <Close className="cursor-pointer" onClick={onHide} />
        </div>

        <div className="flex items-center justify-between px-5">
          <h2 className="mb-4 text-xl font-bold">
            {title ? title : "Loading ..."}
          </h2>

          <button className="rounded-md px-2 py-1 text-sm hover:bg-icon-gray hover:bg-opacity-20">
            Edit title
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed right-0 top-[72px] h-full w-[60%] transform bg-[#0d1117] text-white shadow-md transition-all duration-300 ease-in-out max-xl:w-[80%] max-lg:w-full ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {sidebarHeader()}

      <div className="flex h-full w-full">
        <LeftContainer
          task={task}
          isInputEnabled={isInputEnabled}
          setDescriptionInput={setDescriptionInput}
          descriptionInput={descriptionInput}
          setIsInputEnabled={setIsInputEnabled}
        />

        <RightContainer />
      </div>
    </div>
  );
};
