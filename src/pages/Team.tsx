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
    if (!teamId || !taskId) {
      return;
    }

    dispatch(
      fetchTaskAndOpenDetailsSidebar({
        teamId: Number(teamId),
        taskId: Number(taskId),
        dispatch,
      }),
    );
  }, [dispatch, taskId, teamId]);
  return (
    <div className="h-screen bg-background-primary text-white">
      <Navbar />

      <div className="flex h-full flex-col">
        <div
          className={`flex h-full flex-col ${
            isMenuSidebarOpen ? "ml-[20%] w-[80%]" : "ml-0 w-full"
          } overflow-auto p-4 transition-all`}
        >
          <KanbanBoard />
        </div>
      </div>

      <TaskDetailsSidebar
        task={activeTaskInSidebar}
        show={isTaskDetailsSidebarOpen}
        onHide={handleModalClose}
      />
    </div>
  );
};
