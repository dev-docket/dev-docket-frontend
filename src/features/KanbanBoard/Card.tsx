import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Task";
import { useAppDispatch } from "../../hooks/storeHook";
import { openDetailsTaskSidebar } from "../../store/slices/projectPageSlice";

interface Props {
  task: Task;
  index: number;
}

export const Card = ({ task, index }: Props) => {
  const [enabled, setEnabled] = useState(false);

  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(openDetailsTaskSidebar(task));
  };

  useEffect(() => {
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
          onClick={toggleSidebar}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 rounded bg-dark-background p-2 shadow"
        >
          <h3 className="text-md mb-1 border-b-2 border-blue-600 border-transparent font-semibold text-white transition-colors ease-in-out hover:cursor-pointer hover:border-b-2 hover:border-blue-600 hover:text-blue-600">
            {task.title}
          </h3>
        </div>
      )}
    </Draggable>
  );
};
