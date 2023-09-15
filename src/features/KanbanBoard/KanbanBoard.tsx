import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "./Column";
import { useUpdateStatusOfTask } from "../../hooks/tasks/useUpdateStatusOfTask";
import { Task, TaskStatus } from "../../types/Task";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { fetchAllTasksInTeam } from "../../store/slices/actions/task";
import { useParams } from "react-router-dom";

export type ColumnType = {
  id: string;
  title: string;
  cards: Task[];
};

type BoardType = {
  columns: ColumnType[];
};

const initialBoard: BoardType = {
  columns: [
    {
      id: "1",
      title: "Todo",
      cards: [],
    },
    {
      id: "2",
      title: "In Progress",
      cards: [],
    },
    {
      id: "3",
      title: "Done",
      cards: [],
    },
  ],
};

export const KanbanBoard = () => {
  const tasks = useAppSelector((state) => state.task.tasks);
  const [board, setBoard] = useState<BoardType>({
    ...initialBoard,
  });

  const { teamId } = useParams<{ teamId: string }>();

  const { updateStatusOfTask } = useUpdateStatusOfTask();

  const dispatch = useAppDispatch();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Ignore if the item is dropped outside of any column or dropped in the same position
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // Create a copy of the columns state
    const newColumns = [...board.columns];

    // Find the source and destination columns
    const sourceColumn = newColumns.find(
      (column) => column.id === source.droppableId,
    );
    const destinationColumn = newColumns.find(
      (column) => column.id === destination.droppableId,
    );

    // Remove the card from the source column and insert it into the destination column
    let movedCard;
    if (sourceColumn) {
      [movedCard] = sourceColumn.cards.splice(source.index, 1);
    }

    if (destinationColumn && movedCard) {
      destinationColumn.cards.splice(destination.index, 0, movedCard);

      if (destinationColumn.id === "1") {
        movedCard = { ...movedCard, status: "TODO" };
      }

      if (destinationColumn.id === "2") {
        movedCard = { ...movedCard, status: "IN_PROGRESS" };
      }

      if (destinationColumn.id === "3") {
        movedCard = { ...movedCard, status: "DONE" };
      }

      const taskId = movedCard.id;
      const taskStatus = movedCard.status as TaskStatus;

      updateStatusOfTask(taskId, taskStatus);
    }

    // Update the columns state
    setBoard((prev) => {
      return {
        ...prev,
        columns: newColumns,
      };
    });
  };

  useEffect(() => {
    setBoard((prev) => ({
      ...prev,
      columns: [
        {
          ...prev.columns[0],
          cards: tasks.filter((task) => task.status === "TODO"),
        },
        {
          ...prev.columns[1],
          cards: tasks.filter((task) => task.status === "IN_PROGRESS"),
        },
        {
          ...prev.columns[2],
          cards: tasks.filter((task) => task.status === "DONE"),
        },
      ],
    }));
  }, [tasks]);

  useEffect(() => {
    console.log("teamId", Number(teamId));
    dispatch(fetchAllTasksInTeam(Number(teamId)));
  }, [dispatch, teamId]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4">
        {board.columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
};
