export interface Task {
  id: number;
  name: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE";

// const StatusEnum = {
//   BACKLOG: "BACKLOG",
//   TODO: "TODO",
//   IN_PROGRESS: "IN_PROGRESS",
//   DONE: "DONE",
// };

export enum TaskStatusEnum {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export function getStatusByIndex(index: number): TaskStatus | undefined {
  const statuses = Object.values(TaskStatusEnum);
  return statuses[index];
}

export enum TaskPriority {
  No_Priority = "NO_PRIORITY",
  URGENT = "URGENT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

export function getPriorityByIndex(index: number): TaskPriority | undefined {
  const priorities = Object.values(TaskPriority);
  return priorities[index];
}

export function displayStatus(status?: TaskStatus) {
  if (!status) {
    return "Unknown";
  }

  switch (status) {
    case TaskStatusEnum.BACKLOG:
      return "Backlog";
    case TaskStatusEnum.TODO:
      return "To do";
    case TaskStatusEnum.IN_PROGRESS:
      return "In progress";
    case TaskStatusEnum.DONE:
      return "DONE";
    default:
      return status;
  }
}

export function displayPriority(priority?: TaskPriority) {
  if (!priority) {
    return "Unknown";
  }

  switch (priority) {
    case TaskPriority.No_Priority:
      return "No Priority";
    case TaskPriority.LOW:
      return "Low";
    case TaskPriority.MEDIUM:
      return "Medium";
    case TaskPriority.HIGH:
      return "High";
    case TaskPriority.URGENT:
      return "Urgent";
    default:
      return priority;
  }
}
