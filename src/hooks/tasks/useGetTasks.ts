import { useEffect, useState } from "react";
import { useAppDispatch } from "../storeHook";
import { addTasks, removeTasks } from "../../store/slices/taskSlice";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchTasks = (
  userId: number,
  token: string,
  projectName: string,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!userId || !token) throw new Error("Please login first");

        ("/:userId/projects/:projectName/tasks");

        const response = await axios.get(
          `${apiUrl}/users/${userId}/projects/${projectName}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        if (response.status !== 200) {
          throw new Error("Something went wrong!");
        }

        const data = await response.data;
        dispatch(removeTasks());
        dispatch(addTasks(data));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }

        if (err instanceof AxiosError) {
          if (err.response?.status === 403) {
            toast.error(
              "You are not authorized to do that. Try to login again.",
            );
            return;
          }
        }

        toast.error("You have failed to fetch tasks");
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, [dispatch, projectName, token, userId]);

  return { isLoading, error };
};
