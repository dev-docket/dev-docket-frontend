import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import InviteMemberModal from "./InviteMemberModal"; // Import the new modal component
import { useProjectStore } from "@/stores";

const ProjectInfo = ({ projectSlug }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  // const { members } = useAppSelector((state) => state.project);
  const {members} = useProjectStore();

  return (
    <div className="mb-6 flex items-start justify-between">
      {/* Left side - Members */}
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          {members.slice(0, 3).map((member, index) => (
            <div
              key={member.id}
              className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600/20 ring-2 ring-[#0f1219]"
              title={member.email}
            >
              <Icon icon="ph:user" className="h-4 w-4 text-blue-500" />
              {member.isOwner && (
                <div className="absolute -right-0.5 -top-0.5 rounded-full bg-yellow-500 p-1">
                  <Icon
                    icon="ph:crown-simple"
                    className="h-2 w-2 text-[#0f1219]"
                  />
                </div>
              )}
            </div>
          ))}
          {members.length > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700/50 text-xs text-white ring-2 ring-[#0f1219]">
              +{members.length - 3}
            </div>
          )}
          <button
            onClick={() => setShowAddMember(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700/30 text-gray-400 ring-2 ring-[#0f1219] hover:bg-gray-700/50 hover:text-white"
          >
            <Icon icon="ph:plus" className="h-4 w-4" />
          </button>
        </div>
        <Link
          to={`/projects/${projectSlug}/settings`}
          className="ml-2 flex items-center rounded-md px-2 py-1 text-sm text-gray-400 hover:bg-gray-700/30 hover:text-white"
        >
          <Icon icon="ph:gear" className="mr-1 h-4 w-4" />
          Settings
        </Link>
      </div>

      {/* Add Member Modal */}
      <InviteMemberModal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        projectSlug={projectSlug}
      />
    </div>
  );
};

export default ProjectInfo;