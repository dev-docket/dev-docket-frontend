import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "./Column";
import { ColumnType } from "../../pages/Home";
import { useUpdateStatusOfTask } from "../../hooks/tasks/useUpdateStatusOfTask";
import { TaskStatus } from "../../types/Task";

interface Props {
  columns: ColumnType[];
  setBoard: React.Dispatch<
    React.SetStateAction<{
      columns: ColumnType[];
    }>
  >;
}

export const KanbanBoard = ({ columns, setBoard }: Props) => {
  const { updateStatusOfTask } = useUpdateStatusOfTask();

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
    const newColumns = [...columns];

    // Find the source and destination columns
    const sourceColumn = newColumns.find(
      (column) => column.id === source.droppableId
    );
    const destinationColumn = newColumns.find(
      (column) => column.id === destination.droppableId
    );

    // Remove the card from the source column and insert it into the destination column
    let movedCard;
    if (sourceColumn) {
      [movedCard] = sourceColumn.cards.splice(source.index, 1);
    }

    if (destinationColumn && movedCard) {
      destinationColumn.cards.splice(destination.index, 0, movedCard);

      if (destinationColumn.id === "1") {
        movedCard = { ...movedCard, status: "OPEN" };
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

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-4">
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </DragDropContext>
  );
};
