import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHook";
import {
  acceptProjectInvitation,
  fetchProjectInvitation,
} from "../../store/slices/actions/projectInvitations";
import { SmallButton } from "../../components/common/buttons/SmallButton";

export const ProjectAcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { projectSlug } = useParams<{ projectSlug: string }>();

  const projectInvitation = useAppSelector(
    (state) => state.project.projectInvitation,
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAcceptInvitation = () => {
    if (!projectInvitation?.token) {
      return;
    }

    if (!projectSlug) {
      return;
    }

    dispatch(
      acceptProjectInvitation({
        token: projectInvitation?.token,
        projectSlug,
      }),
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate(`/projects/${projectInvitation?.project.slug}/dashboard`);
      }
    });
  };

  useEffect(() => {
    if (token && projectSlug) {
      dispatch(
        fetchProjectInvitation({
          token,
          projectSlug,
        }),
      );

      // Remove the token param from the URL
      searchParams.delete("token");
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  }, [dispatch, navigate, projectSlug, searchParams, token]);

  return (
    <div className="h-screen w-screen bg-background-primary text-white">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="mb-10 text-6xl">Invitation to project</h1>

        <div className="flex flex-col justify-center rounded-md bg-secondary-background p-4 text-center text-lg">
          {/* <p className="text-white">{projectInvitation?.token}</p> */}

          <p>
            You've been invited by{" "}
            <span className="font-bold">{projectInvitation?.user.email}</span>{" "}
            to join project:{" "}
            <span className="font-bold">
              {projectInvitation?.project?.name}
            </span>
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
