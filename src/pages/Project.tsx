import { useEffect, useState } from "react";
import { KanbanBoard } from "../features/KanbanBoard/KanbanBoard";
import { useAppDispatch, useAppSelector } from "../hooks/storeHook";
import { Task } from "../types/Task";
import { TaskDetailsSidebar } from "../features/KanbanBoard/TaskDetailsSidebar/TaskDetailsSidebar";
import {
  closeDetailsTaskSidebar,
  openDetailsTaskSidebar,
} from "../store/slices/projectPageSlice";
import { Navbar } from "../components/Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { setActiveProjectByName } from "../store/slices/projectSlice";
import { fetchAllUserTasks } from "../store/slices/actions/task";

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
  const tasks = useAppSelector((state) => state.task.tasks);
  const [board, setBoard] = useState<BoardType>({
    ...initialBoard,
  });
  const { isDetailsTaskSidebarOpen, activeTask } = useAppSelector(
    (state) => state.projectPage,
  );

  const activeProject = useAppSelector((state) => state.project.activeProject);
  const { projectName, taskId } = useParams<{
    projectName: string;
    taskId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleModalClose = () => {
    dispatch(closeDetailsTaskSidebar());
    navigate(`/projects/${projectName}/board`);
  };

  useEffect(() => {
    if (projectName !== activeProject?.name) {
      dispatch(setActiveProjectByName(projectName!));
    }
  }, [activeProject?.name, dispatch, projectName]);

  useEffect(() => {
    if (!projectName) return;

    dispatch(fetchAllUserTasks(projectName));
  }, [dispatch, projectName]);

  useEffect(() => {
    if (taskId) {
      const task = tasks.find((task) => task.id === parseInt(taskId));
      if (task) {
        dispatch(openDetailsTaskSidebar(task));
      }
    }
  }, [dispatch, taskId, tasks]);

  useEffect(() => {
    setBoard((prev) => ({
      ...prev,
      columns: [
        {
          ...prev.columns[0],
          cards: tasks.filter((task) => task.status === "TODO"),
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
