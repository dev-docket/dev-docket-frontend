import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import KanbanBoard  from "../features/KanbanBoard/KanbanBoard";
import { Navbar, Sidebar } from "@/features/Project/Navbar";
import { useProjectStore } from "@/stores";

export const Team = () => {
  // const { isTaskDetailsSidebarOpen, activeTaskInSidebar } = useAppSelector(
  //   (state) => state.teamPage,
  // );
  // const activeTeam = useAppSelector((state) => state.team?.activeTeam);

  const { fetchProjectBySlug } = useProjectStore();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { projectSlug} = useParams<{
    projectSlug: string;
    teamId: string;
    taskId: string;
  }>();

  useEffect(() => {
    if (!projectSlug) return;

    fetchProjectBySlug(projectSlug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectSlug]);

  return (
    <div className="min-h-screen bg-[#0f1219]">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setIsSidebarOpen} />
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />
      <div className="flex bg-background-primary">
        {/* <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        /> */}


        <div className="flex h-screen w-screen flex-col overflow-hidden bg-background-primary transition-all">
          {/* <Header
            setSidebarOpen={setIsSidebarOpen}
            isButtonDisabled={true}
            title={activeTeam?.name ?? ""}
            underTitle="Here you can manage your team"
          /> */}

          <KanbanBoard />
        </div>
      </div>

      {/* <TaskDetailsSidebar
        task={activeTaskInSidebar}
        show={isTaskDetailsSidebarOpen}
        onHide={handleModalClose}
      /> */}
    </div>
  );
};
