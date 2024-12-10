import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { generateProjectInvitationLink } from "../../../store/slices/actions/projectInvitations";
import { useAppDispatch } from "../../../hooks/storeHook";
import { useProjectStore, UserProjectMember } from "@/stores/projectStore";

const MemberCard = ({
  member,
  onShowActions,
}: {
  member: UserProjectMember;
  onShowActions: () => void;
}) => {
  return (
    <div
      onClick={onShowActions}
      className="group relative flex items-center space-x-3 rounded-lg bg-[#1E2235] p-3 hover:bg-[#252A40]"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20">
        <Icon icon="ph:user-circle-fill" className="h-6 w-6 text-blue-500" />
      </div>
      <div className="flex-1 truncate">
        <div className="flex items-center space-x-2">
          <h3 className="truncate text-sm font-medium text-white">
            {member.user.email}
          </h3>
          {/* {isCurrentUser && (
            <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400">
              You
            </span>
          )} */}
        </div>
        <p className="truncate text-sm text-gray-500">
          {member.role || "Member"}
        </p>
      </div>
      <Icon
        icon="ph:dots-three-outline-vertical-fill"
        className="h-5 w-5 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100"
      />
    </div>
  );
};

// Member Actions Modal
const MemberActionsModal = ({
  member,
  onClose,
}: {
  member: UserProjectMember | null;
  onClose: () => void;
}) => {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-80 rounded-lg bg-[#1E2235] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20">
              <Icon
                icon="ph:user-circle-fill"
                className="h-6 w-6 text-blue-500"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">{member.user.email}</h3>
              <p className="text-sm text-gray-500">{member.role || "Member"}</p>
            </div>
          </div>
        </div>

        <div className="p-2">
          <button className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left text-sm text-white hover:bg-[#252A40]">
            <Icon icon="ph:crown-simple" className="h-5 w-5 text-yellow-500" />
            <span>Make Admin</span>
          </button>

          <button className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left text-sm text-white hover:bg-[#252A40]">
            <Icon icon="ph:user-minus" className="h-5 w-5 text-orange-500" />
            <span>Remove from project</span>
          </button>

          <button className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-left text-sm text-red-400 hover:bg-[#252A40]">
            <Icon icon="ph:prohibit" className="h-5 w-5" />
            <span>Block user</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Invite Member Modal
interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSlug: string;
}

const InviteMemberModal = ({ isOpen, onClose, projectSlug }: InviteMemberModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleInvite = async () => {
    if (!email.trim() || !projectSlug) return;

    setIsLoading(true);
    try {
      const result = await dispatch(
        generateProjectInvitationLink({
          projectSlug,
          email: email.trim(),
        }),
      ).unwrap();

      if (result) {
        const inviteLink = `${window.location.origin}/projects/${projectSlug}/invitation?token=${result.token}`;
        await navigator.clipboard.writeText(inviteLink);
        toast.success("Invitation link copied to clipboard!");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to generate invitation link");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-[#1E2235] shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-700 p-4">
          <h2 className="text-lg font-medium text-white">Invite Team Member</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <Icon icon="ph:x-bold" className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-400">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full rounded-md bg-[#252A40] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="rounded-md bg-blue-500/10 p-3">
              <div className="flex">
                <Icon icon="ph:info" className="h-5 w-5 text-blue-500" />
                <div className="ml-3">
                  <p className="text-sm text-blue-500">
                    An invitation link will be generated and copied to your
                    clipboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-700 p-4">
          <button
            onClick={onClose}
            className="mr-3 rounded-md px-4 py-2 text-sm text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={!email.trim() || isLoading}
            className="flex items-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading && (
              <Icon icon="ph:spinner" className="mr-2 h-4 w-4 animate-spin" />
            )}
            Generate Invite Link
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProjectRolesProps {
  projectSlug: string;
}

// Main ProjectRoles Component
const ProjectRoles = ({ projectSlug }: ProjectRolesProps) => {
  const [selectedMember, setSelectedMember] = useState<UserProjectMember | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // const { projectMembers } = useAppSelector((state) => state.project);
  const {members} = useProjectStore();

  return (
    <div className="space-y-6 rounded-lg bg-[#1A1D2E] p-6">
      <div>
        <h2 className="text-lg font-medium text-white">Project Members</h2>
        <p className="mt-1 text-sm text-gray-400">
          Manage member access and roles for your project.
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex w-full items-center justify-center space-x-2 rounded-md border border-dashed border-gray-700 px-4 py-3 text-sm text-gray-400 hover:border-gray-600 hover:text-gray-300"
        >
          <Icon icon="ph:plus" className="h-5 w-5" />
          <span>Add new member</span>
        </button>

        {members.map((member) => (
          <MemberCard
            key={member.user.id}
            member={member}
            onShowActions={() => setSelectedMember(member)}
          />
        ))}
      </div>

      {selectedMember && (
        <MemberActionsModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      <InviteMemberModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        projectSlug={projectSlug}
      />
    </div>
  );
};

export default ProjectRoles;
