import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";
import { ColumnType } from "../../pages/Project";
import { useState } from "react";
import { Add, Close } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/storeHook";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { TaskStatus } from "../../types/Task";
import { createTask } from "../../store/slices/actions/task";

interface Props {
  column: ColumnType;
}

export const Column = ({ column }: Props) => {
  const [isNewTaskInputActive, setIsNewTaskInputActive] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const { projectName } = useParams<{ projectName: string }>();

  const dispatch = useAppDispatch();

  const handleAddNewTask = (taskStatus: string) => {
    if (!newTaskName.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    if (!projectName) {
      toast.error("Project name is empty");
      return;
    }

    const status: TaskStatus =
      taskStatus === "Todo"
        ? "TODO"
        : taskStatus === "In Progress"
        ? "IN_PROGRESS"
        : "DONE";

    dispatch(
      createTask({
        projectName,
        name: newTaskName,
        status,
      }),
    );

    handleCancelNewTask();
  };

  const handleCancelNewTask = () => {
    setIsNewTaskInputActive(false);
    setNewTaskName("");
  };

  return (
    <div className="bg-secondary-background text-white">
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-64 rounded p-4"
          >
            <h2 className="mb-4 text-xl font-bold text-white">
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
        <div className="mb-4 px-4">
          <textarea
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddNewTask(column.title);
              }
            }}
            placeholder="Enter title to new task"
            className="w-full resize-none rounded-md border-none bg-dark-background"
          />
          <button
            onClick={() => handleAddNewTask(column.title)}
            className="inline-flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-white"
          >
            Add new task
          </button>
          <button
            onClick={handleCancelNewTask}
            className="mx-2 rounded-md px-4 py-2 hover:bg-gray-500 hover:bg-opacity-40"
          >
            <Close />
          </button>
        </div>
      ) : (
        <div className="mx-4">
          <button
            onClick={() => setIsNewTaskInputActive(true)}
            className="text-md mb-1 w-full rounded-md px-2 py-1 text-start hover:bg-gray-500 hover:bg-opacity-40"
          >
            <Add fontSize="inherit" /> Create new task
          </button>
        </div>
      )}
    </div>
  );
};
