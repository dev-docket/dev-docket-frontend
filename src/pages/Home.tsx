import { useEffect, useState } from "react";
import { KanbanBoard } from "../components/KanbanBoard/KanbanBoard";
import { useFetchTasks } from "../hooks/tasks/useFetchTasks";
import { useAppSelector } from "../hooks/storeHook";
import { Task } from "../types/Task";
import { SmallButton } from "../components/common/buttons/SmallButton";
import { useLogout } from "../hooks/auth/useLogout";

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
      title: "To Do",
      cards: [
        { id: 1, title: "Task 1", description: "Description for Task 1" },
        { id: 2, title: "Task 2", description: "Description for Task 2" },
      ],
    },
    {
      id: "2",
      title: "In Progress",
      cards: [
        { id: 3, title: "Task 3", description: "Description for Task 3" },
      ],
    },
    {
      id: "3",
      title: "Done",
      cards: [
        { id: 4, title: "Task 4", description: "Description for Task 4" },
      ],
    },
  ],
};

export const Home = () => {
  const userIsLoggedIn = useAppSelector((state) => state.auth.token !== null);
  const tasks = useAppSelector((state) => state.task.tasks);
  const [board, setBoard] = useState<BoardType>({
    ...initialBoard,
  });

  useFetchTasks();
  const { logoutUser } = useLogout();

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
    <div className="flex flex-col h-screen">
      <nav className="bg-header-background p-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {userIsLoggedIn ? (
              <SmallButton
                redirectPath="/"
                title="Logout"
                onClick={logoutUser}
              />
            ) : (
              <SmallButton redirectPath="/login" title="Login" />
            )}
          </div>
        </div>
      </nav>
      <div className="flex-1 bg-dark-background">
        <div className="container px-8 mt-10 mx-auto">
          <div className="w-full max-w-lg mx-auto animate-resize">
            <KanbanBoard columns={board.columns} setBoard={setBoard} />
          </div>
        </div>
      </div>
    </div>
  );
};
