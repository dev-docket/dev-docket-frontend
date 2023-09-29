import { Box, Modal } from "@mui/material";
import { ProjectMember } from "../../../types/Project";
import { useState } from "react";
import { Close, PermIdentitySharp } from "@mui/icons-material";
import { useAppDispatch } from "../../../hooks/storeHook";
import { deleteProjectMember } from "../../../store/slices/actions/project";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  members: ProjectMember[];
}

export const MembersList = ({ members }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ProjectMember | null>(
    null,
  );

  const dispatch = useAppDispatch();
  const { projectSlug } = useParams<{ projectSlug: string }>();

  const handleOpen = (member: ProjectMember) => {
    setOpen(true);
    setSelectedMember(member);
  };
  const handleClose = () => setOpen(false);

  const handleDeleteMember = () => {
    if (!projectSlug) return;

    if (!selectedMember?.user?.id) return;

    dispatch(
      deleteProjectMember({
        projectSlug,
        userIdToDelete: selectedMember.user?.id,
      }),
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Member deleted successfully");
      }
    });

    handleClose();
  };

  return (
    <div className="flex items-center">
      {members && members.length > 0 ? (
        <>
          {members.map((member) => (
            <div
              key={member.userId}
              onClick={() => {
                handleOpen(member);
              }}
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 transform border-none bg-background-primary text-white shadow-lg outline-none">
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full items-center justify-between border-b-2 border-white px-2 py-2">
              <div className="h-8 w-12" />
              <p className="text-2xl">Member Details</p>
              <div className="rounded-full p-2 hover:bg-link-primary">
                <Close className="h-8 w-8 cursor-pointer" />
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 text-center">
              <p className="border-b border-gray-300 p-2 text-xl">
                {selectedMember?.user?.email}
              </p>

              <div className="flex justify-center">
                <PermIdentitySharp />
                <p className="text-base">{selectedMember?.role}</p>
              </div>
              <button
                onClick={handleDeleteMember}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-transparent hover:outline hover:outline-red-500"
              >
                Delete Member
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
