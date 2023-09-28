import { ProjectMember } from "../../../types/Project";

interface Props {
  members: ProjectMember[];
}

export const MembersList = ({ members }: Props) => {
  return (
    <div className="flex items-center">
      {members && members.length > 0 ? (
        <>
          {members.map((member) => (
            <div
              key={member.userId}
              className="flex cursor-pointer items-center justify-center rounded-md p-2 text-white hover:bg-icon-gray hover:bg-opacity-30"
            >
              <p className="text-base">{member?.user?.email}</p>
            </div>
          ))}
        </>
      ) : (
        <div className="flex items-center justify-center rounded-md p-2 hover:bg-icon-gray hover:bg-opacity-30">
          <p className="text-sm">Members: 0</p>
        </div>
      )}
    </div>
  );
};
