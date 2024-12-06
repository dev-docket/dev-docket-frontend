export interface Team {
  id?: number;
  name: string;
  description?: string;
  tasksCount: number;
  projectId: number;
}

export interface TeamMember {
  userId: number;
  teamId: number;
  role: string;
}
