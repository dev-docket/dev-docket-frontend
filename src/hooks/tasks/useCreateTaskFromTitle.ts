import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../storeHook";
import { addTask } from "../../store/slices/taskSlice";
import { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const useCreateTaskFromTitle = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const createTask = async (
    title: string,
    token: string | null,
    userId?: number
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!userId || !token) throw new Error("Please login first");

      if (!title || !title.trim()) throw new Error("Title is required");

      const response = await fetch(`${apiUrl}/users/${userId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      if (response.status !== 201) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
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
