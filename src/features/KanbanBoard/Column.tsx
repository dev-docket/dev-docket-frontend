import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";
import { ColumnType } from "../../pages/Home";
import { useState } from "react";
import { Add, Close } from "@mui/icons-material";
import { useCreateTaskFromTitle } from "../../hooks/tasks/useCreateTaskFromTitle";
import { useAppSelector } from "../../hooks/storeHook";
import { toast } from "react-toastify";

interface Props {
  column: ColumnType;
}

export const Column = ({ column }: Props) => {
  const [isNewTaskInputActive, setIsNewTaskInputActive] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);

  const { createTask } = useCreateTaskFromTitle();

  const handleAddNewTask = () => {
    if (!newTaskTitle) {
      toast.error("Task title cannot be empty");
      return;
    }

    createTask(newTaskTitle, token, userId);

    handleCancelNewTask();
  };

  const handleCancelNewTask = () => {
    setIsNewTaskInputActive(false);
    setNewTaskTitle("");
  };

  return (
    <div className="bg-secondary-background text-white">
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-64 p-4 rounded"
          >
            <h2 className="text-xl text-white font-bold mb-4">
              {column.title}
            </h2>
            {column.cards.map((task, index) => (
              <Card key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isNewTaskInputActive ? (
        <div className="px-4 mb-4">
          <textarea
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter title to new task"
            className="bg-dark-background w-full border-none rounded-md resize-none"
          />
          <button
            onClick={handleAddNewTask}
            className="inline-flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add new task
          </button>
          <button
            onClick={handleCancelNewTask}
            className="mx-2 px-4 py-2 rounded-md hover:bg-gray-500 hover:bg-opacity-40"
          >
            <Close />
          </button>
        </div>
      ) : (
        <div className="mx-4">
          <button
            onClick={() => setIsNewTaskInputActive(true)}
            className="mb-1 px-2 py-1 w-full text-start text-md hover:bg-gray-500 hover:bg-opacity-40 rounded-md"
          >
            <Add fontSize="inherit" /> Create new task
          </button>
        </div>
      )}
    </div>
  );
};
