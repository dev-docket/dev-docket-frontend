import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { KanbanBoard } from "../features/KanbanBoard/KanbanBoard";
import { TaskDetailsSidebar } from "../features/KanbanBoard/TaskDetailsSidebar/TaskDetailsSidebar";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { closeDetailsTaskSidebar } from "../store/slices/projectPageSlice";

export const Team = () => {
  const { isDetailsTaskSidebarOpen, activeTask } = useAppSelector(
    (state) => state.projectPage,
  );

  const { projectSlug } = useParams<{
    projectSlug: string;
    taskId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    dispatch(closeDetailsTaskSidebar());
    navigate(`/projects/${projectSlug}/board`);
  };
  return (
    <div className="h-screen bg-background-primary text-white">
      <Navbar />

      <div className="flex h-full flex-col">
        <div className="ml-[20%] w-[80%] flex-grow overflow-auto p-4 transition-all max-md:ml-0 max-md:w-full">
          <KanbanBoard />
        </div>
      </div>

      <TaskDetailsSidebar
        task={activeTask}
        show={isDetailsTaskSidebarOpen}
        onHide={handleModalClose}
      />
    </div>
  );
};
