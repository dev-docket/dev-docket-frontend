import { useState } from "react";
import { useAppSelector } from "../storeHook";
import { ProjectMember } from "../../types/Project";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchProjectMembers = () => {
  const auth = useAppSelector((state) => state.auth);

  const [members, setMembers] = useState<ProjectMember[]>([]);

  const fetchProjectMembers = async (projectSlug: string) => {
    const response = await axios.get<ProjectMember[]>(
      `${apiUrl}/projects/${projectSlug}/members`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    );
    const data = response.data;
    setMembers(data);
  };

  return {
    members,
    fetchProjectMembers,
  };
};
