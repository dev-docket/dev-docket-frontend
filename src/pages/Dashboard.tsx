import { useState } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { SmallButton } from "../components/common/buttons/SmallButton";
import { CreateNewProjectModal } from "../features/Dashboard/CreateNewProject/CreateNewProjectModal";

export const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-dark-background text-white">
      <Navbar />
      <div className="mt-7 px-7">
        <div className="animate-resize flex w-full justify-between">
          <h1 className="mr-5 min-w-fit text-2xl">Your projects</h1>
          <div className="w-[8rem]">
            <SmallButton
              title="Create new project"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {isModalOpen && <CreateNewProjectModal />}
    </div>
  );
};
