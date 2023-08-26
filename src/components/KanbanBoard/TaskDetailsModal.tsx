import React from "react";
import { Task } from "../../types/Task";
import { Close } from "@mui/icons-material";

interface TaskDetailsModalProps {
  task: Task;
  show: boolean;
  onHide: () => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  show,
  onHide,
}) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto top-[72px] ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="flex items-start justify-end h-full">
        <div className="fixed inset-0 bg-[#6e7681d9] opacity-40"></div>
        <div className="relative bg-dark-background rounded-l-lg overflow-hidden shadow-xl transform transition-all h-full w-1/2 max-sm:w-full">
          <div className="bg-[#0d1117]  px-4 py-3 border-b border-gray-600 flex justify-between">
            <h3 className="text-lg font-medium text-white">{task.title}</h3>
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              onClick={onHide}
            >
              <Close />
            </button>
          </div>
          <div className="px-4 py-3">
            <p className="text-gray-700">{task.description}</p>
            {/* <p className="text-gray-700">Due date: {task.dueDate}</p> */}
            {/* <p className="text-gray-700">Priority: {task.priority}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
