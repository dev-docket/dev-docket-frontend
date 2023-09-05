import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../storeHook";
import { addTask } from "../../store/slices/taskSlice";
import axios, { AxiosError } from "axios";
import { Task } from "../../types/Task";

const apiUrl = import.meta.env.VITE_API_URL;

export const useCreateTaskFromName = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const createTask = async (
    userId: number,
    token: string,
    task: Task,
    projectName: string,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!userId || !token) throw new Error("Please login first");

      if (!task.name || !task.name.trim()) throw new Error("Name is required");

      const { data, status } = await axios.post(
        `${apiUrl}/users/${userId}/projects/${projectName}/tasks`,
        {
          name: task.name,
          status: task.status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (status !== 201) {
        throw new Error("Something went wrong!");
      }

      dispatch(addTask(data));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      }

      if (err instanceof AxiosError) {
        err.response?.status === 400 && toast.error("Invalid data");
        err.response?.status === 401 && toast.error("Please login first");
        err.response?.status === 403 && toast.error("You are not authorized");
        err.response?.status === 404 && toast.error("User not found");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createTask };
};
