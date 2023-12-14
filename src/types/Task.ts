import { TaskActivity } from "../store/slices/teamPageSlice";
import { User } from "./User";

export interface Task {
  id: number;
  name: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  activities?: TaskActivity[];
  assignedUser: User;
}

export type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "DONE";
export type TaskPriority = "NO_PRIORITY" | "URGENT" | "HIGH" | "MEDIUM" | "LOW";

export enum TaskStatusEnum {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum TaskPriorityEnum {
  NO_PRIORITY = "NO_PRIORITY",
  URGENT = "URGENT",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
}

/**
 * Returns the status corresponding to the given index.
 * @param index The index of the status.
 * @returns The status as a string or undefined if the index is out of range.
 */
export function getStatusByIndex(index: number): TaskStatus | undefined {
  const statuses = Object.values(TaskStatusEnum);
  return statuses[index];
}

/**
 * Returns the priority corresponding to the given index.
 * @param index The index of the priority.
 * @returns The priority as a string or undefined if the index is out of range.
 */
export function getPriorityByIndex(
  index: number,
): TaskPriorityEnum | undefined {
  const priorities = Object.values(TaskPriorityEnum);
  return priorities[index];
}

const statusDisplayMapping: { [key in TaskStatus]?: string } = {
  BACKLOG: "Backlog",
  TODO: "To do",
  IN_PROGRESS: "In progress",
  DONE: "DONE",
};

/**
 * Returns a human-readable string for the given task status.
 * @param status The status of the task.
 * @returns A string representing the status.
 */
export function displayStatus(status: TaskStatus = "BACKLOG"): string {
  return statusDisplayMapping[status] || status;
}

const priorityDisplayMapping: { [key in TaskPriorityEnum]?: string } = {
  NO_PRIORITY: "No Priority",
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

/**
 * Returns a human-readable string for the given task priority.
 * @param priority The priority of the task.
 * @returns A string representing the priority.
 */
export function displayPriority(
  priority: TaskPriority = TaskPriorityEnum.NO_PRIORITY,
): string {
  return priorityDisplayMapping[priority] || priority;
}
