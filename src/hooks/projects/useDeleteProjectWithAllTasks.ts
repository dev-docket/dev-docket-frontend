import { useState } from "react";
import { useAppDispatch } from "../storeHook";
import { toast } from "react-toastify";
import axios from "axios";
import { removeProjectbyName } from "../../store/slices/projectSlice";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDeleteProjectWithAllTasks = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const deleteProject = async (userId: number, jwt: string, name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { status } = await axios.delete(
        `${apiUrl}/users/${userId}/projects/${name}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      if (status !== 204) {
        throw new Error("Something went wrong!");
      }

      dispatch(removeProjectbyName(name));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error("We couldn't create project", {
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setError("We couldn't create project");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteProject };
};
