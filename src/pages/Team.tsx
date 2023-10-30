import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { KanbanBoard } from "../features/KanbanBoard/KanbanBoard";
import { TaskDetailsSidebar } from "../features/KanbanBoard/TaskDetailsSidebar/TaskDetailsSidebar";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { useEffect } from "react";
import { closeTaskDetailsSidebar } from "../store/slices/teamPageSlice";
import { fetchTaskAndOpenDetailsSidebar } from "../store/slices/actions/task";

export const Team = () => {
  const { isTaskDetailsSidebarOpen, activeTaskInSidebar } = useAppSelector(
    (state) => state.teamPage,
  );

  const isMenuSidebarOpen = useAppSelector(
    (state) => state.globalSettings.isMenuSidebarOpen,
  );

  const { projectSlug, teamId, taskId } = useParams<{
    projectSlug: string;
    teamId: string;
    taskId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    dispatch(closeTaskDetailsSidebar());
    navigate(`/projects/${projectSlug}/teams/${teamId}/board`);
  };

  useEffect(() => {
    if (!taskId) {
      dispatch(closeTaskDetailsSidebar());
      return;
    }

    dispatch(
      fetchTaskAndOpenDetailsSidebar({
        taskId: Number(taskId),
        dispatch,
      }),
    );
  }, [dispatch, taskId]);

  return (
    <div className="h-screen bg-background-primary text-white">
      <Navbar />

      <KanbanBoard />

      <TaskDetailsSidebar
        task={activeTaskInSidebar}
        show={isTaskDetailsSidebarOpen}
        onHide={handleModalClose}
      />
    </div>
  );
};
