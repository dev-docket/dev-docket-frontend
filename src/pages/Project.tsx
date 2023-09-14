import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { TaskDetailsSidebar } from "../features/KanbanBoard/TaskDetailsSidebar/TaskDetailsSidebar";
import { Navbar } from "../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { fetchTeamsByProjectSlug } from "../store/slices/actions/team";
import { TeamCard } from "../features/Project/TeamCard";
import { closeDetailsTaskSidebar } from "../store/slices/projectPageSlice";

// export type ColumnType = {
//   id: string;
//   title: string;
//   cards: Task[];
// };

// type BoardType = {
//   columns: ColumnType[];
// };

// const initialBoard: BoardType = {
//   columns: [
//     {
//       id: "1",
//       title: "Todo",
//       cards: [],
//     },
//     {
//       id: "2",
//       title: "In Progress",
//       cards: [],
//     },
//     {
//       id: "3",
//       title: "Done",
//       cards: [],
//     },
//   ],
// };

export const Project = () => {
  // const tasks = useAppSelector((state) => state.task.tasks);
  // const [board, setBoard] = useState<BoardType>({
  //   ...initialBoard,
  // });
  const { isDetailsTaskSidebarOpen, activeTask } = useAppSelector(
    (state) => state.projectPage,
  );

  const { teams, loading } = useAppSelector((state) => state.team);

  // const activeProject = useAppSelector((state) => state.project.activeProject);
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

  const handleNavigateToTeamPage = (teamId: number) => {
    navigate(`/projects/${projectSlug}/teams/${teamId}`);
  };

  // const teamCard = (name: string) => {
  //   return (
  //     <div className="flex h-[10rem] w-[13rem] flex-col rounded-2xl bg-[#242729] p-4 transition-colors hover:cursor-pointer hover:bg-zinc-950">
  //       {/* <p>members image</p> */}
  //       <p className="text-xl">{name}</p>
  //       <p className="mt-auto flex justify-end text-sm">
  //         Click to see your team
  //         <ArrowRightAlt />
  //       </p>
  //     </div>
  //   );
  // };

  useEffect(() => {
    if (!projectSlug) return;

    dispatch(fetchTeamsByProjectSlug(projectSlug));
  }, [dispatch, projectSlug]);

  // useEffect(() => {
  //   if (projectName !== activeProject?.name) {
  //     dispatch(setActiveProjectByName(projectName!));
  //   }
  // }, [activeProject?.name, dispatch, projectName]);

  // useEffect(() => {
  //   if (!projectName) return;

  //   dispatch(fetchAllUserTasks(projectName));
  // }, [dispatch, projectName]);

  // useEffect(() => {
  //   if (taskId) {
  //     const task = tasks.find((task) => task.id === parseInt(taskId));
  //     if (task) {
  //       dispatch(openDetailsTaskSidebar(task));
  //     }
  //   }
  // }, [dispatch, taskId, tasks]);

  // useEffect(() => {
  //   setBoard((prev) => ({
  //     ...prev,
  //     columns: [
  //       {
  //         ...prev.columns[0],
  //         cards: tasks.filter((task) => task.status === "TODO"),
  //       },
  //       {
  //         ...prev.columns[1],
  //         cards: tasks.filter((task) => task.status === "IN_PROGRESS"),
  //       },
  //       {
  //         ...prev.columns[2],
  //         cards: tasks.filter((task) => task.status === "DONE"),
  //       },
  //     ],
  //   }));
  // }, [tasks]);

  return (
    <div className="flex h-screen flex-col bg-dark-background text-white">
      <Navbar />
      {/* <div className="h-full overflow-x-auto bg-dark-background ">
        <div className="container mt-10">
          <div className="animate-resize px-5">
            <KanbanBoard columns={board.columns} setBoard={setBoard} />
          </div>
        </div>
      </div> */}

      <div className="flex justify-end">
        <div className="w-[80%] pl-2">
          <div className="mt-7">
            <div className="mt-10 flex gap-3 overflow-auto pb-4">
              {loading == "succeeded" ? (
                teams.map((team) => (
                  <div key={team.id} className="w-[13rem]">
                    <TeamCard
                      team={team}
                      onNavigateToTeamPage={handleNavigateToTeamPage}
                    />
                  </div>
                ))
              ) : (
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent pl-2 text-blue-600"
                  role="status"
                  aria-label="loading"
                />
              )}
            </div>
          </div>
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
