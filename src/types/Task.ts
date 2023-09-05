export interface Task {
  id: number;
  name: string;
  description?: string;
  status?: TaskStatus;
}

export type TaskStatus = "OPEN" | "IN_PROGRESS" | "DONE";
