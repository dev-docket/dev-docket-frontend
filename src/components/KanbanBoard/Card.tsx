import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Task";

interface Props {
  task: Task;
  index: number;
}

export const Card = ({ task, index }: Props) => {
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-dark-background p-2 rounded mb-2 shadow"
        >
          <h3 className="text-md text-white font-semibold mb-1">
            {task.title}
          </h3>
          <p className="text-sm text-gray-400">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};
