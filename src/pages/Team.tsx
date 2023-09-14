import { Navbar } from "../components/Navbar/Navbar";
import { KanbanBoard } from "../features/KanbanBoard/KanbanBoard";

export const Team = () => {
  return (
    <div className="bg-background-primary h-screen text-white">
      <Navbar />

      <div className="flex justify-end">
        <div className="w-[80%] p-4">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};
