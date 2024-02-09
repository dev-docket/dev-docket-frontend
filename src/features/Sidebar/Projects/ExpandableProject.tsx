import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Team } from "../../../types/Team";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import axios from "axios";
import { closeMenuSidebar } from "../../../store/slices/globalSettingsSlice";

const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
  name?: string;
  slug?: string;
}

export const ExpandableProject = ({ name, slug }: Props) => {
  const token = useAppSelector((state) => state.auth.token);
  const { activeProject } = useAppSelector((state) => state.project);

  const [isExpanded, setIsExpanded] = useState(false);
  const [teamsInProject, setTeamsInProject] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [divHover, setDivHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  const dispatch = useAppDispatch();
  const nagivate = useNavigate();

  const handleNavigateToProjectDashboard = () => {
    nagivate(`/projects/${slug}/dashboard`);

    dispatch(closeMenuSidebar());
  };

  const fetchTeams = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/projects/${slug}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTeamsInProject(response.data);
    } catch (error) {
      setError("Failed to load teams.");
    }
  }, [slug, token]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  useEffect(() => {
    if (activeProject?.slug === slug) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [activeProject, slug]);

  if (!name || !slug) return null;
  return (
    <div className="w-full">
      <div
        onClick={handleNavigateToProjectDashboard}
        className={`flex cursor-pointer items-center rounded-md px-2 py-1 pl-4 ${
          divHover && !buttonHover ? "bg-[#262836]" : ""
        }`}
        onMouseEnter={() => setDivHover(true)}
        onMouseLeave={() => setDivHover(false)}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsExpanded((prev) => !prev);
          }}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          className={`mx-1 cursor-pointer rounded-md px-2 py-1 hover:bg-[#262836]`}
        >
          {isExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="m7 10l5 5l5-5H7Z"></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="m10 17l5-5l-5-5v10Z"></path>
            </svg>
          )}
        </button>

        {/* <Link to={`/projects/${slug}/dashboard`} role="menuitem"> */}
        <h2 className="truncate text-lg">{name}</h2>
        {/* </Link> */}
      </div>

      {isExpanded && (
        <div>
          <div className="flex flex-col pl-8">
            {error && <div className="text-xs opacity-70">{error}</div>}
            {teamsInProject.length === 0 ? (
              <div className="p-2 text-xs opacity-70">
                No teams in this project
              </div>
            ) : (
              teamsInProject.map((team) => (
                <Link
                  key={team.id}
                  to={`/projects/${slug}/teams/${team.id}/board`}
                  role="menuitem"
                  className="block w-full truncate rounded-md p-2 text-sm opacity-70 hover:cursor-pointer hover:bg-[#262836]"
                >
                  {team.name}
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
