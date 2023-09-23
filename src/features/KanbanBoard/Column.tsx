import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";
import { useState } from "react";
import { Add, Close } from "@mui/icons-material";
import { useAppDispatch } from "../../hooks/storeHook";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Task, TaskStatus } from "../../types/Task";
import { createTask } from "../../store/slices/actions/task";

type ColumnType = {
  id: string;
  title: string;
  cards: Task[];
};

interface Props {
  column: ColumnType;
}

export const Column = ({ column }: Props) => {
  const [isNewTaskInputActive, setIsNewTaskInputActive] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");

  const { teamId } = useParams<{ teamId: string }>();

  const dispatch = useAppDispatch();

  const handleAddNewTask = (taskStatus: string) => {
    if (!newTaskName.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }

    if (!teamId) {
      toast.error("Team id is not defined");
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
        teamId: Number(teamId),
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
    <div className="flex flex-col bg-secondary-background text-white">
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="h-full w-64 p-4"
          >
            <h2 className="mb-4 text-xl font-bold text-white">
              {column.title}
            </h2>
            {column.cards.map((task: Task, index: number) => (
              <Card key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isNewTaskInputActive ? (
        <div className="mb-4 flex w-full max-w-full flex-col px-4 ">
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
            className="mb-2 block max-w-full resize-none rounded-md border-none bg-dark-background"
          />
          <div className="flex justify-between">
            <button
              onClick={() => handleAddNewTask(column.title)}
              className="inline-flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-white"
            >
              Add new task
            </button>
            <button
              onClick={handleCancelNewTask}
              className="rounded-md px-4 py-2 hover:bg-gray-500 hover:bg-opacity-40"
            >
              <Close />
            </button>
          </div>
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
