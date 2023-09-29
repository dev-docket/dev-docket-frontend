import { User } from "./User";

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  slug?: string;
}

export interface ProjectMember {
  userId?: number;
  projectId?: number;
  role?: string;
  user?: User;
}

export interface ProjectInvitation {
  token?: string;
  projectId?: number;
  creatorId?: number;
  project: Project;
  user: User;
  // expiry?:
}
