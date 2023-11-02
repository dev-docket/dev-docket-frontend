import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Team } from "../../../types/Team";
import { useAppSelector } from "../../../hooks/storeHook";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface Props {
  name?: string;
  slug?: string;
}

export const ExpandableProject = ({ name, slug }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [teamsInProject, setTeamsInProject] = useState<Team[]>([]);
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get(`${apiUrl}/projects/${slug}/teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      setTeamsInProject(response.data);
    };

    fetchTeams();
  }, [slug, token]);

  if (!name || !slug) return null;

  return (
    <div className="w-full">
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsExpanded((prev) => !prev);
        }}
        className="flex items-center rounded-md px-2 py-1 pl-4 hover:cursor-pointer hover:bg-[#262836]"
      >
        <Link to={`/projects/${slug}/dashboard`} role="menuitem">
          {name}
        </Link>

        <div className="flex h-[2rem] w-[2rem] items-center pl-1">
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
        </div>
      </div>

      {isExpanded && (
        <div>
          <div className="flex flex-col pl-8">
            {teamsInProject.length === 0 ? (
              <div className="text-xs opacity-70">No teams in this project</div>
            ) : (
              teamsInProject.map((team) => (
                <Link
                  key={team.id}
                  to={`/projects/${slug}/teams/${team.id}/board`}
                  role="menuitem"
                  className="rounded-md p-2 text-sm opacity-70 hover:cursor-pointer hover:bg-[#262836]"
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
