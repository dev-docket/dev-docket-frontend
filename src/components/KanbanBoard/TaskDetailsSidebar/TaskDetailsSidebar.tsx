import React, { useEffect, useRef, useState } from "react";
import { Task } from "../../../types/Task";
import { Close } from "@mui/icons-material";
import { LeftContainer } from "./LeftContainer";

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
    description ?? ""
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
      <div className="border-b border-gray-600 mt-5">
        <div className="flex justify-between items-center px-5">
          <h2 className="text-sm">Bookshelf #24</h2>

          <Close className="cursor-pointer" onClick={onHide} />
        </div>

        <div className="flex justify-between items-center px-5">
          <h2 className="text-xl font-bold mb-4">
            {title ? title : "Loading ..."}
          </h2>

          <button>Edit title</button>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-[72px] right-0 w-3/4 max-md:w-full h-full
      bg-[#0d1117] text-white shadow-md transition-transform duration-300 ease-in-out transform ${
        show ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {sidebarHeader()}

      <div className="flex w-full h-full">
        <LeftContainer
          task={task}
          isInputEnabled={isInputEnabled}
          setDescriptionInput={setDescriptionInput}
          descriptionInput={descriptionInput}
          setIsInputEnabled={setIsInputEnabled}
        />

        <div className="w-[33%] p-5">test</div>
      </div>
    </div>
  );
};
