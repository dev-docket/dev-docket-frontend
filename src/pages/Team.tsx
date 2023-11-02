import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import { KanbanBoard } from "../features/KanbanBoard/KanbanBoard";
import { TaskDetailsSidebar } from "../features/KanbanBoard/TaskDetailsSidebar/TaskDetailsSidebar";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { closeTaskDetailsSidebar } from "../store/slices/teamPageSlice";
import { fetchTaskAndOpenDetailsSidebar } from "../store/slices/actions/task";
import { Sidebar } from "../features/Sidebar/Sidebar";

export const Team = () => {
  const { isTaskDetailsSidebarOpen, activeTaskInSidebar } = useAppSelector(
    (state) => state.teamPage,
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="flex h-screen bg-background-primary text-white">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />

      <div className="w-full pt-4 transition-all">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />

        <KanbanBoard />
        <TaskDetailsSidebar
          task={activeTaskInSidebar}
          show={isTaskDetailsSidebarOpen}
          onHide={handleModalClose}
        />
      </div>
    </div>
  );
};
