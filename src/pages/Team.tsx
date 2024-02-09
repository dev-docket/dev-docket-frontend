import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { KanbanBoard } from "../features/KanbanBoard/KanbanBoard";
import { TaskDetailsSidebar } from "../features/KanbanBoard/TaskDetailsSidebar/TaskDetailsSidebar";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { closeTaskDetailsSidebar } from "../store/slices/teamPageSlice";
import { fetchTaskAndOpenDetailsSidebar } from "../store/slices/actions/task";
import { Sidebar } from "../features/Sidebar/Sidebar";
import { Header } from "../features/Sidebar/Header";

export const Team = () => {
  const { isTaskDetailsSidebarOpen, activeTaskInSidebar } = useAppSelector(
    (state) => state.teamPage,
  );
  const activeTeam = useAppSelector((state) => state.team?.activeTeam);

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
    <>
      <div className="flex bg-background-primary">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex h-screen w-screen flex-col overflow-hidden bg-background-primary transition-all">
          <Header
            setSidebarOpen={setIsSidebarOpen}
            isButtonDisabled={true}
            title={activeTeam?.name ?? ""}
            underTitle="Here you can manage your team"
          />

          <KanbanBoard />
        </div>
      </div>

      <TaskDetailsSidebar
        task={activeTaskInSidebar}
        show={isTaskDetailsSidebarOpen}
        onHide={handleModalClose}
      />
    </>
  );
};
