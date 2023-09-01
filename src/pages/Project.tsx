import { useEffect, useState } from "react";
import { KanbanBoard } from "../features/KanbanBoard/KanbanBoard";
import { useFetchTasks } from "../hooks/tasks/useGetTasks";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { Task } from "../types/Task";
import { TaskDetailsSidebar } from "../features/KanbanBoard/TaskDetailsSidebar/TaskDetailsSidebar";
import { closeDetailsTaskSidebar } from "../store/slices/projectPageSlice";
import { Navbar } from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { setActiveProjectByName } from "../store/slices/projectSlice";

export type ColumnType = {
  id: string;
  title: string;
  cards: Task[];
};

type BoardType = {
  columns: ColumnType[];
};

const initialBoard: BoardType = {
  columns: [
    {
      id: "1",
      title: "Todo",
      cards: [],
    },
    {
      id: "2",
      title: "In Progress",
      cards: [],
    },
    {
      id: "3",
      title: "Done",
      cards: [],
    },
  ],
};

export const Project = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);
  const tasks = useAppSelector((state) => state.task.tasks);
  const [board, setBoard] = useState<BoardType>({
    ...initialBoard,
  });
  const { isDetailsTaskSidebarOpen, activeTask } = useAppSelector(
    (state) => state.projectPage,
  );

  const activeProject = useAppSelector((state) => state.project.activeProject);
  const { projectName } = useParams<{ projectName: string }>();

  useFetchTasks(userId!, token!, projectName!);
  const dispatch = useAppDispatch();

  const handleModalClose = () => {
    dispatch(closeDetailsTaskSidebar());
  };

  useEffect(() => {
    if (projectName !== activeProject?.name) {
      dispatch(setActiveProjectByName(projectName!));
    }
  }, [activeProject?.name, dispatch, projectName]);

  useEffect(() => {
    setBoard((prev) => ({
      ...prev,
      columns: [
        {
          ...prev.columns[0],
          cards: tasks.filter((task) => task.status === "OPEN"),
        },
        {
          ...prev.columns[1],
          cards: tasks.filter((task) => task.status === "IN_PROGRESS"),
        },
        {
          ...prev.columns[2],
          cards: tasks.filter((task) => task.status === "DONE"),
        },
      ],
    }));
  }, [tasks]);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-1 bg-dark-background">
        <div className="container mt-10 px-8">
          <div className="animate-resize w-full max-w-lg">
            <KanbanBoard columns={board.columns} setBoard={setBoard} />
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
