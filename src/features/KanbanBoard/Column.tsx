import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";
import React, { useState } from "react";
import { Add, Close } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Task, getStatusByIndex } from "../../types/Task";
import { createTask } from "../../store/slices/actions/task";
import Spinner from "./TaskDetailsSidebar/LeftContainer/Spinner";

type ColumnType = {
  id: string;
  title: string;
  cards: Task[];
};

interface Props {
  column: ColumnType;
  placeholderIndex: number | null;
}

export const Column = ({ column, placeholderIndex }: Props) => {
  const [isNewTaskInputActive, setIsNewTaskInputActive] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const fetchAllTasksInTeam = useAppSelector(
    (state) => state.task.loading.fetchAllTasksInTeam,
  );

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

    const status = getStatusByIndex(Number(taskStatus));

    if (!status) return;

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
    <div className="flex w-[300px] min-w-[300px] flex-col bg-secondary-background text-white">
      <Droppable droppableId={column.id} type="task">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-4`}
          >
            <h3>{column.title}</h3>
            {fetchAllTasksInTeam === "pending" && <Spinner />}
            {column.cards.map((task, index) => (
              <React.Fragment key={task.id}>
                {index === placeholderIndex && (
                  <div className="mb-2 border bg-gray-400 px-2 py-5">
                    {/* Miejsce na zadanie */}
                  </div>
                )}
                <Card task={task} index={index} />
              </React.Fragment>
            ))}
            {column.cards.length === placeholderIndex && (
              <div className="mb-2 border bg-gray-400 px-2 py-4">
                {/* Miejsce na zadanie */}
              </div>
            )}

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
                handleAddNewTask(column.id);
              }
            }}
            placeholder="Enter title to new task"
            className="mb-2 block max-w-full resize-none rounded-md border-none bg-dark-background"
          />
          <div className="flex justify-between">
            <button
              onClick={() => handleAddNewTask(column.id)}
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
