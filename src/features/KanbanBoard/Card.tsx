import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task } from "../../types/Task";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { useNavigate, useParams } from "react-router-dom";
import { openTaskDetailsSidebar } from "../../store/slices/teamPageSlice";

interface Props {
  task: Task;
  index: number;
}

export const Card = ({ task, index }: Props) => {
  const activeProject = useAppSelector((state) => state.project.activeProject);

  const [enabled, setEnabled] = useState(false);

  const { teamId } = useParams<{ teamId: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    dispatch(openTaskDetailsSidebar(task));
    navigate(
      `/projects/${activeProject?.slug}/teams/${teamId}/board/tasks/${task.id}`,
    );
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
          className="mb-2 rounded bg-[#161B22] p-2 shadow"
        >
          <h3
            className="mb-1 border-b-2 border-blue-600 border-transparent text-base font-normal text-white
                      transition-colors ease-in-out hover:cursor-pointer hover:border-b-2
                      hover:border-blue-600 hover:text-blue-600"
            style={{ overflowWrap: "break-word", wordBreak: "break-word" }}
          >
            {task.name}
          </h3>
        </div>
      )}
    </Draggable>
  );
};
