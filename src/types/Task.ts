export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: TaskStatus;
}

export type TaskStatus = "OPEN" | "IN_PROGRESS" | "DONE";
