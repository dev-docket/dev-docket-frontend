import { ProjectMember } from "../../../types/Project";

interface Props {
  projectMembers: ProjectMember[];
}

export const Access = ({ projectMembers }: Props) => {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-medium">Project members</h3>
      {projectMembers.map((member, index) => (
        <div key={index} className="mt-2 flex items-center">
          <span className="ml-2">{member.user?.username}</span>
        </div>
      ))}
    </div>
  );
};
