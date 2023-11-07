export interface Task {
  id: number;
  name: string;
  description?: string;
  status: TaskStatus;
}

export type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE";

const StatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE",
};

export function displayStatus(status?: TaskStatus) {
  if (!status) {
    return "Unknown";
  }

  switch (status) {
    case StatusEnum.BACKLOG:
      return "Backlog";
    case StatusEnum.TODO:
      return "To do";
    case StatusEnum.IN_PROGRESS:
      return "In progress";
    case StatusEnum.DONE:
      return "DONE";
    default:
      return status;
  }
}
