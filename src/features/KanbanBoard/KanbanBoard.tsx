import { DragDropContext, DragUpdate, DropResult } from "react-beautiful-dnd";
import { Column } from "./Column";
import { Task, TaskStatus } from "../../types/Task";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import {
  fetchAllTasksInTeam,
  patchTask,
} from "../../store/slices/actions/task";
import { useParams } from "react-router-dom";

export type ColumnType = {
  id: string;
  title: string;
  subheading: string;
  cards: Task[];
};

type BoardType = {
  columns: ColumnType[];
};

const initialBoard: BoardType = {
  columns: [
    {
      id: "0",
      title: "Backlog",
      subheading: "Tasks that are not yet started",
      cards: [],
    },
    {
      id: "1",
      title: "Todo",
      subheading: "Tasks that are ready to be worked on",
      cards: [],
    },
    {
      id: "2",
      title: "In Progress",
      subheading: "This is actively being worked on",
      cards: [],
    },
    {
      id: "3",
      title: "Done",
      subheading: "Tasks that are completed",
      cards: [],
    },
  ],
};

export const KanbanBoard = () => {
  const tasks = useAppSelector((state) => state.task.tasks);
  const [board, setBoard] = useState<BoardType>({
    ...initialBoard,
  });

  const [placeholderIndex, setPlaceholderIndex] = useState<number | null>(null);
  const [placeholderColumnId, setPlaceholderColumnId] = useState<string | null>(
    null,
  );

  const { teamId } = useParams<{ teamId: string }>();

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

      if (destinationColumn.id === "0") {
        movedCard = { ...movedCard, status: "BACKLOG" };
      }

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

      dispatch(
        patchTask({
          taskId,
          teamId: Number(teamId),
          task: {
            status: taskStatus,
          },
        }),
      );
    }

    // Update the columns state
    setBoard((prev) => {
      return {
        ...prev,
        columns: newColumns,
      };
    });

    setPlaceholderIndex(null);
    setPlaceholderColumnId(null);
  };

  const onDragUpdate = (update: DragUpdate) => {
    const { destination } = update;

    if (destination) {
      setPlaceholderIndex(destination.index);
      setPlaceholderColumnId(destination.droppableId);
    } else {
      setPlaceholderIndex(null);
      setPlaceholderColumnId(null);
    }
  };

  useEffect(() => {
    setBoard((prev) => ({
      ...prev,
      columns: [
        {
          ...prev.columns[0],
          cards: tasks.filter((task) => task.status === "BACKLOG"),
        },
        {
          ...prev.columns[1],
          cards: tasks.filter((task) => task.status === "TODO"),
        },
        {
          ...prev.columns[2],
          cards: tasks.filter((task) => task.status === "IN_PROGRESS"),
        },
        {
          ...prev.columns[3],
          cards: tasks.filter((task) => task.status === "DONE"),
        },
      ],
    }));
  }, [tasks]);

  useEffect(() => {
    dispatch(fetchAllTasksInTeam(Number(teamId)));
  }, [dispatch, teamId]);

  return (
    <div className="h-full overflow-x-auto pb-5">
      <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={onDragUpdate}>
        <div className="flex min-h-[50%] space-x-4">
          {board.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              placeholderIndex={
                placeholderColumnId === column.id ? placeholderIndex : null
              }
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
