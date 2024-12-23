import { DateTime } from "luxon";
import { User } from "./User";


export interface TaskActivity {
  id: string;
  description: string;
  createdAt: string;
  createdAtFormatted: DateTime;
  user: {
    id: string;
    name: string;
  };
  task: {
    id: string;
  };
}

/**
 * Represents the status of a task in the system.
 */
export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

/**
 * Represents the priority level of a task.
 */
export enum TaskPriority {
  NO_PRIORITY = "NO_PRIORITY",
  URGENT = "URGENT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

/**
 * Defines the structure of a task entity within the application.
 */
export interface Task {
  id: number;
  name: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  activities?: TaskActivity[];
  assignedUser: User;
}

/**
 * Gets the status of a task by its index.
 * @param index The index of the status.
 * @returns The corresponding TaskStatus.
 */
export function getStatusByIndex(index: number): TaskStatus {
  const statuses = Object.values(TaskStatus);
  return statuses[index] as TaskStatus;
}

export function getPriorityByIndex(index: number): TaskPriority {
  const priorities = Object.values(TaskPriority);
  return priorities[index] as TaskPriority;
}