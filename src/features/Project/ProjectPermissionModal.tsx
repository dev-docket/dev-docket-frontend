import { Autorenew, Close, CopyAll, Delete } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteProjectInvitation,
  fetchProjectInvitations,
  generateProjectInvitationLink,
} from "../../store/slices/actions/projectInvitations";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { ProjectInvitation } from "../../types/Project";

interface Props {
  showModal: boolean;
  onCloseModal: (state: boolean) => void;
}

export const ProjectPermissionModal = ({ showModal, onCloseModal }: Props) => {
  const { activeProject, projectInvitation, projectInvitations } =
    useAppSelector((state) => state.project);

  const [shouldRemove, setShouldRemove] = useState(false);
  const [emailToInvite, setEmailToInvite] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const dispatch = useAppDispatch();

  const handleTransitionEnd = () => {
    if (!showModal) {
      setShouldRemove(true);
    }
  };

  const closeModal = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        (dropdownRef.current === target ||
          !dropdownRef.current.contains(target))
      ) {
        onCloseModal(false);
      }
    },
    [onCloseModal],
  );

  const handleGenerateLink = () => {
    if (!projectSlug) {
      return;
    }

    if (!emailToInvite) {
      setEmailError("Email cannot be empty!");
      return;
    }

    setEmailToInvite("");
    dispatch(
      generateProjectInvitationLink({ projectSlug, email: emailToInvite }),
    ).then((userData) => {
      if (userData.meta.requestStatus === "fulfilled") {
        toast.success("Invitation link generated!", { autoClose: 1000 });
      }
      if (userData.meta.requestStatus === "rejected") {
        console.log(userData.payload);
        setEmailError(userData.payload);
      }
    });
  };

  const handleDeleteInvitation = (inviation: ProjectInvitation) => {
    if (!inviation.token) {
      return;
    }

    dispatch(deleteProjectInvitation({ token: inviation.token })).then(
      (userData) => {
        if (userData.meta.requestStatus === "fulfilled") {
          toast.success("Invitation deleted!", { autoClose: 1000 });
        }
      },
    );
  };

  const handleCopyLinkToInvitation = (token?: string) => {
    if (!token) {
      return;
    }

    toast.success("Link copied to clipboard!", { autoClose: 1000 });
    navigator.clipboard.writeText(
      `${window.location.origin}/projects/invitation?token=${token}`,
    );
  };

  useEffect(() => {
    if (shouldRemove) {
      onCloseModal(false);
    }

    return () => {
      setShouldRemove(false);
    };
  }, [shouldRemove, onCloseModal]);

  useEffect(() => {
    window.addEventListener("mousedown", closeModal);

    return () => {
      window.removeEventListener("mousedown", closeModal);
    };
  }, [closeModal]);

  useEffect(() => {
    if (!projectSlug) return;

    dispatch(fetchProjectInvitations({ projectSlug }));
  }, [dispatch, projectSlug]);

  if (shouldRemove) {
    return null;
  }

  return (
    <div
      ref={dropdownRef}
      onTransitionEnd={handleTransitionEnd}
      className={`fixed inset-0 flex items-center justify-center bg-white bg-opacity-10 text-white transition-opacity ${
        showModal ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-[500px] rounded-md bg-background-primary">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-2xl">Share "{activeProject?.name}"</h3>
          <div
            onClick={() => onCloseModal(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-opacity-30 p-4 text-2xl hover:cursor-pointer hover:bg-link-primary"
          >
            <Close fontSize="inherit" />
          </div>
        </div>
        <div className="p-4">
          <p>Invite project member via email:</p>
          <div className="rounded-md border border-white border-opacity-30 p-2">
            <div className="mt-2 flex items-center gap-4">
              <div className="flex w-full items-center justify-center text-sm">
                <p className="">Email:</p>
                <div className="ml-2 w-full">
                  <input
                    value={emailToInvite}
                    onFocus={() => setEmailError(null)}
                    onChange={(e) => setEmailToInvite(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGenerateLink();
                      }
                    }}
                    className="w-full rounded-md bg-transparent text-sm outline-none"
                    type="text"
                  />
                  {emailError && (
                    <div className="mt-2 text-xs text-red-500">
                      {emailError}
                    </div>
                  )}
                </div>
              </div>

              <div
                onClick={handleGenerateLink}
                className="flex w-fit items-center justify-center rounded-md bg-opacity-30 p-2 text-2xl hover:cursor-pointer hover:bg-link-primary"
              >
                <Autorenew fontSize="inherit" />
                <p className="whitespace-nowrap text-sm">Generate link</p>
              </div>
            </div>
            {projectInvitation?.token && (
              <>
                <p className="mt-4">Send this link to you friend:</p>
                <div className="mt-2 flex items-center gap-4">
                  <div className="flex w-full items-center justify-center text-sm">
                    <input
                      value={`${window.location.origin}/projects/invitation?token=${projectInvitation.token}`}
                      className="ml-2 w-full rounded-md bg-transparent text-sm outline-none"
                      type="text"
                      disabled
                    />
                    <div
                      onClick={() =>
                        handleCopyLinkToInvitation(projectInvitation.token)
                      }
                      className="ml-4 flex w-fit items-center justify-center rounded-md bg-opacity-30 p-2 text-2xl hover:cursor-pointer hover:bg-link-primary"
                    >
                      <CopyAll fontSize="inherit" />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="mt-2">
              <List dense sx={{ width: "100%" }}>
                {projectInvitations.map((invitation: ProjectInvitation) => {
                  const labelId = `checkbox-list-secondary-label-${invitation.token}`;
                  return (
                    <ListItem
                      key={invitation.token}
                      secondaryAction={
                        <Tooltip title="Delete invitation" arrow>
                          <IconButton
                            onClick={() => handleDeleteInvitation(invitation)}
                            aria-label="comment"
                          >
                            <Delete className="text-red-500" />
                          </IconButton>
                        </Tooltip>
                      }
                      disablePadding
                    >
                      <ListItemButton>
                        <ListItemText
                          disableTypography
                          id={labelId}
                          onClick={() => {
                            handleCopyLinkToInvitation(invitation.token);
                          }}
                          className="rounded-md p-4 hover:bg-white hover:bg-opacity-10"
                          primary={
                            <Typography variant="body1" className="text-white">
                              {invitation.user?.email}
                            </Typography>
                          }
                          // secondary={
                          //   <Typography
                          //     variant="body2"
                          //     style={{ color: "#FFFFFF" }}
                          //   >
                          //     {invitation.token}
                          //   </Typography>
                          // }
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
