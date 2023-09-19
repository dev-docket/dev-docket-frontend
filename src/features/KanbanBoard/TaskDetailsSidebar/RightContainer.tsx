import { CopyAll, DeleteOutline } from "@mui/icons-material";
import { SmallWideButton } from "./SmallWideButton";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { useEffect, useRef, useState } from "react";
import { displayStatus } from "../../../types/Task";
import { deleteTask } from "../../../store/slices/actions/task";
import { closeTaskDetailsSidebar } from "../../../store/slices/teamPageSlice";
import { useNavigate, useParams } from "react-router-dom";

export const RightContainer = () => {
  const activeTask = useAppSelector(
    (state) => state.teamPage.activeTaskInSidebar,
  );

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { projectSlug, teamId } = useParams<{
    projectSlug: string;
    teamId: string;
  }>();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };

  const handleDeleteTask = () => {
    dispatch(deleteTask());
    dispatch(closeTaskDetailsSidebar());

    navigate(`/projects/${projectSlug}/teams/${teamId}/board`);
    setIsDeleteTaskModalOpen(false);
  };

  const handleDivClick = () => {
    setIsDivVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsDivVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-[34%]">
      <div className="relative border-b border-border-dark-primary px-5 py-5">
        <div className="flex items-center justify-between">
          <dt>Status</dt>
          <dd
            onClick={handleDivClick}
            className="rounded-md p-2 text-sm hover:cursor-pointer hover:bg-button-hover-dark"
          >
            {displayStatus(activeTask?.status)}
          </dd>
        </div>
        {isDivVisible && (
          <div
            ref={divRef}
            className="absolute right-2 mt-2 w-3/4 origin-top-right rounded-md border border-icon-gray border-opacity-20 bg-dark-background px-2 py-2 shadow-lg shadow-black ring-1 ring-black ring-opacity-5"
          >
            <div className="bg-dark-background p-5">test</div>
          </div>
        )}
      </div>
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
          taskName={activeTask?.name ?? ""}
          onCloseModal={setIsDeleteTaskModalOpen}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};
