import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { removeTaskById } from "../../store/slices/taskSlice";
import { useAppDispatch } from "../storeHook";

const apiUrl = import.meta.env.VITE_API_URL;

export const useDeleteTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const deleteTask = async (userId: number, taskId: number, jwt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { status } = await axios.delete(
        `${apiUrl}/users/${userId}/tasks/${taskId}`,
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

      dispatch(removeTaskById(taskId));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error("We couldn't update project", {
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setError("We couldn't update project");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteTask };
};
