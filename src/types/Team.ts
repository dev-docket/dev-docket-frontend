export interface Team {
  id?: number;
  name: string;
  projectId: number;
}

export interface TeamMember {
  userId: number;
  teamId: number;
  role: string;
}
