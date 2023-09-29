import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import { useUser } from "../../hooks/user/useUser";
import { User } from "../../types/User";
import {
  acceptProjectInvitation,
  fetchProjectInvitation,
} from "../../store/slices/actions/projectInvitations";
import { SmallButton } from "../../components/common/buttons/SmallButton";

export const ProjectAcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const projectInvitation = useAppSelector(
    (state) => state.project.projectInvitation,
  );

  const [invitationCreator, setInvitationCreator] = useState<User | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { fetchUser } = useUser();

  const handleAcceptInvitation = () => {
    if (!projectInvitation?.token) {
      return;
    }

    dispatch(
      acceptProjectInvitation({
        token: projectInvitation?.token,
      }),
    ).then(() => {
      navigate(`/projects/${projectInvitation?.project.slug}/dashboard`);
    });
  };

  const handleFetchUser = useCallback(
    async (creatorId: number) => {
      const user = await fetchUser(creatorId);
      setInvitationCreator(user);
    },
    [fetchUser],
  );

  useEffect(() => {
    if (projectInvitation?.creatorId && !invitationCreator) {
      handleFetchUser(projectInvitation.creatorId);
    }
  }, [projectInvitation?.creatorId, handleFetchUser, invitationCreator]);

  useEffect(() => {
    if (token) {
      dispatch(
        fetchProjectInvitation({
          token,
        }),
      );

      // Remove the token param from the URL
      searchParams.delete("token");
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  }, [dispatch, navigate, searchParams, token]);

  return (
    <div className="h-screen w-screen bg-background-primary text-white">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="mb-10 text-6xl">Invitation to project</h1>

        <div className="flex flex-col justify-center rounded-md bg-secondary-background p-4 text-center text-lg">
          {/* <p className="text-white">{projectInvitation?.token}</p> */}

          <p>
            You've been invited by {invitationCreator?.email} to join project:{" "}
            <span className="font-bold">{projectInvitation?.project.name}</span>
          </p>
          <p>Would you like to accept the invite?</p>

          <div className="border-b border-white border-opacity-30 pt-4" />

          <div className="mt-4 flex w-[11rem] justify-between self-center">
            <button className="rounded-md p-2 transition-colors hover:cursor-pointer hover:bg-button-hover-dark">
              Decline
            </button>
            {/* <button className="">Accept</button> */}
            <div>
              <SmallButton title="Accept" onClick={handleAcceptInvitation} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
