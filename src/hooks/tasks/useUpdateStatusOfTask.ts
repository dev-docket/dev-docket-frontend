import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../storeHook";
import axios from "axios";
import { toast } from "react-toastify";

import { updateStatusOfTask as updateStatus } from "../../store/slices/taskSlice";
import { TaskStatus } from "../../types/Task";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateStatusOfTask = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useAppDispatch();

  const updateStatusOfTask = async (taskId: string, status: TaskStatus) => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await axios.patch(
        `${apiUrl}/users/${userId}/tasks/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }

      dispatch(updateStatus({ id: parseInt(taskId), status }));
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateStatusOfTask };
};
