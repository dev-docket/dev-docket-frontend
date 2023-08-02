import { Droppable } from "react-beautiful-dnd";
import { Card } from "./Card";
import { ColumnType } from "../../pages/Home";

interface Props {
  column: ColumnType;
}

export const Column = ({ column }: Props) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="w-64 bg-secondary-background p-4 rounded"
        >
          <h2 className="text-xl text-white font-bold mb-4">{column.title}</h2>
          {column.cards.map((task, index) => (
            <Card key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
