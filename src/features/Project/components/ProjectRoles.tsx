import { ProjectMember } from "../../../types/Project";
import { AddMemberButton } from "./AddMemberButton";
import { MembersList } from "./MembersList";

interface Props {
  onAddMember: () => void;
  projectMembers: ProjectMember[];
}

export const ProjectRoles = ({ onAddMember, projectMembers }: Props) => {
  return (
    <div>
      <h3 className="text-2xl">Roles in project</h3>
      <p>Add members to your project to give them access to the project</p>
      <div className="mt-4 flex items-center">
        <AddMemberButton onAddMember={onAddMember} />
        <MembersList members={projectMembers} />
      </div>
    </div>
  );
};
