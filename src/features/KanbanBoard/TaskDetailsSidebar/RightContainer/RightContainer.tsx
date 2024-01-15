import { CopyAll, DeleteOutline } from "@mui/icons-material";
import { SmallWideButton } from "../SmallWideButton";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../hooks/storeHook";
import { DeleteTaskModal } from "../DeleteTaskModal";
import { useEffect, useState } from "react";
import { deleteTask, patchTask } from "../../../../store/slices/actions/task";
import {
  closeTaskDetailsSidebar,
  updateAssigneedUserInActiveTask,
  updateTask,
} from "../../../../store/slices/teamPageSlice";
import { useNavigate, useParams } from "react-router-dom";
import {
  Task,
  TaskPriority,
  TaskStatus,
  displayPriority,
  displayStatus,
  getPriorityByIndex,
} from "../../../../types/Task";
import { TaskAttributeDropdown } from "./TaskAttributeDropdown";
import { useFetchProjectMembers } from "../../../../hooks/projects/useFetchProjectMembers";
import { useAssignUserToTask } from "../../../../hooks/tasks/useAssignUserToTask";

export const RightContainer = () => {
  const activeTask = useAppSelector(
    (state) => state.teamPage.activeTaskInSidebar,
  );

  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const { projectSlug, teamId, taskId } = useParams<{
    projectSlug: string;
    teamId: string;
    taskId: string;
  }>();

  const { members, fetchProjectMembers } = useFetchProjectMembers();
  const { assignUserToTask } = useAssignUserToTask();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!projectSlug) return;
    fetchProjectMembers(projectSlug);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectSlug]);

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

  const handleUpdateStatus = (status: TaskStatus) => {
    if (!activeTask?.id) return;
    if (!teamId) return;

    dispatch(
      patchTask({
        task: { id: activeTask.id, status },
        taskId: activeTask.id,
        teamId: Number(teamId),
      }),
    );
    dispatch(updateTask({ status } as Task));
  };

  const handleUpdatePriority = (priority: TaskPriority) => {
    if (!activeTask?.id) return;
    if (!teamId) return;

    dispatch(
      patchTask({
        task: { id: activeTask.id, priority },
        taskId: activeTask.id,
        teamId: Number(teamId),
      }),
    );
    dispatch(updateTask({ priority } as Task));
  };

  const handleAssigneeChange = async (userId: number) => {
    if (!taskId) return;
    const assignedTask = await assignUserToTask(taskId, userId);
    assignedTask &&
      dispatch(updateAssigneedUserInActiveTask(assignedTask.user));
  };

  return (
    <div className="w-full max-w-[34%] max-md:max-w-full">
      <div className="flex flex-col gap-y-5 border-b border-border-dark-primary px-5 py-5 text-sm font-normal text-white text-opacity-80">
        <TaskAttributeDropdown
          label="Status"
          dropdownLabel={displayStatus(activeTask?.status)}
          options={["Backlog", "Todo", "In progress", "Done"]}
          onSelect={(index) => {
            handleUpdateStatus(
              index === 0
                ? "BACKLOG"
                : index === 1
                ? "TODO"
                : index === 2
                ? "IN_PROGRESS"
                : "DONE",
            );
          }}
        />
        <TaskAttributeDropdown
          label="Priority"
          dropdownLabel={displayPriority(activeTask?.priority)}
          options={["No priority", "Urgent", "High", "Medium", "Low"]}
          onSelect={(index: number) => {
            const priority = getPriorityByIndex(index);

            priority && handleUpdatePriority(priority);
          }}
        />
        <TaskAttributeDropdown
          label="Assignee"
          dropdownLabel={activeTask?.assignedUser?.username ?? "Unassigned"}
          options={[
            "Unassigned",
            ...members.map((member) => {
              return member.user?.username || "";
            }),
          ]}
          onSelect={(index: number) => {
            if (index === 0) {
              handleAssigneeChange(0);
            } else {
              const userId = members[index - 1].user?.id;
              userId && handleAssigneeChange(userId);
            }
          }}
        />
      </div>
      <div className="mt-2 border-b border-border-dark-primary px-2 pb-2">
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
