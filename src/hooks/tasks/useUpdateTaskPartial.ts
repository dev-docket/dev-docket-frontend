import { useState } from "react";
import { useAppDispatch } from "../storeHook";
import { toast } from "react-toastify";
import axios from "axios";
import { Task } from "../../types/Task";
import { updateTask } from "../../store/slices/taskSlice";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateTaskPartial = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const updateTaskPartial = async (
    userId: number,
    taskId: number,
    jwt: string,
    task: Task,
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, status } = await axios.patch(
        `${apiUrl}/users/${userId}/tasks/${taskId}`,
        {
          ...task,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      if (status !== 200) {
        throw new Error("Something went wrong!");
      }

      dispatch(updateTask(data));
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

  return { isLoading, error, updateTaskPartial };
};
