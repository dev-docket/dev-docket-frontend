import { CopyAll, DeleteOutline } from "@mui/icons-material";
import { SmallWideButton } from "./SmallWideButton";
import { toast } from "react-toastify";
import { useDeleteTask } from "../../../hooks/tasks/useDeleteTask";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { closeDetailsTaskSidebar } from "../../../store/slices/projectPageSlice";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { useState } from "react";

export const RightContainer = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const taskId = useAppSelector((state) => state.projectPage.activeTask?.id);
  const title = useAppSelector((state) => state.projectPage.activeTask?.name);
  const jwt = useAppSelector((state) => state.auth.token);

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { deleteTask } = useDeleteTask();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };

  const handleDeleteTask = () => {
    deleteTask(userId!, taskId!, jwt!);
    dispatch(closeDetailsTaskSidebar());
    setIsDeleteTaskModalOpen(false);
  };

  return (
    <div className="w-full max-w-[34%]">
      <div className="border-b border-border-dark-primary px-5 py-5">top</div>
      <div className="mt-2 px-2">
        <SmallWideButton onClick={handleCopyUrl}>
          <>
            <CopyAll color="inherit" className="mr-2 text-icon-gray" />
            Copy link to task
          </>
        </SmallWideButton>

        <SmallWideButton
          onClick={() => setIsDeleteTaskModalOpen(true)}
          customHoverBgColor="red"
        >
          <>
            <DeleteOutline color="error" className="mr-1" />
            Delete task from project
          </>
        </SmallWideButton>
      </div>

      {isDeleteTaskModalOpen && (
        <DeleteTaskModal
          taskName={title ?? ""}
          onCloseModal={setIsDeleteTaskModalOpen}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};
