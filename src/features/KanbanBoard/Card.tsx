import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Task, TaskPriority } from "../../types/Task";
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
  const [label, setLabel] = useState("");

  const { teamId } = useParams<{ teamId: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT:
        setLabel("P0");
        break;
      case TaskPriority.HIGH:
        setLabel("P1");
        break;
      case TaskPriority.MEDIUM:
        setLabel("P2");
        break;
      case TaskPriority.LOW:
        setLabel("P3");
        break;
      default: // Dla NO_PRIORITY lub jakiejkolwiek niezdefiniowanej wartości
        setLabel("P4");
        break;
    }
  };

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

  useEffect(() => {
    getPriorityLabel(task.priority);
  }, [task.priority]);

  if (!enabled) {
    return null;
  }

  const priorityColorMap = {
    [TaskPriority.URGENT]: { bg: "bg-red-500", border: "border-red-400" },
    [TaskPriority.HIGH]: { bg: "bg-yellow-500", border: "border-yellow-400" },
    [TaskPriority.MEDIUM]: { bg: "bg-green-500", border: "border-green-400" },
    [TaskPriority.LOW]: { bg: "bg-blue-500", border: "border-blue-400" },
    [TaskPriority.NO_PRIORITY]: {
      bg: "bg-gray-500",
      border: "border-gray-400",
    },
  };

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

          <div
            className={`${priorityColorMap[task.priority].bg} 
                        ${priorityColorMap[task.priority]?.border}
                        w-fit rounded-2xl border-2 px-4 py-1 mt-2
          `}
          >
            <p className="text-xs font-bold">{label}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};
