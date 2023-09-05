export interface Task {
  id: number;
  name: string;
  description?: string;
  status?: TaskStatus;
}

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";
