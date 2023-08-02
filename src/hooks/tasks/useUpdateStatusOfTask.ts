import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../storeHook";
import axios from "axios";

import { updateStatusOfTask as updateStatus } from "../../store/slices/taskSlice";
import { TaskStatus } from "../../types/Task";
import { handleError } from "../../utils/handleError";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUpdateStatusOfTask = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);
  const [state, setState] = useState({
    isLoading: false,
    error: null as string | null,
  });

  const dispatch = useAppDispatch();

  const updateStatusOfTask = async (taskId: number, status: TaskStatus) => {
    try {
      setState({ ...state, isLoading: true, error: null });
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
        throw new Error(response.data.message);
      }

      dispatch(updateStatus({ id: taskId, status }));
    } catch (err: unknown) {
      // if (err instanceof Error) {
      //   setState({ ...state, error: err.message });
      //   toast.error(err.message);
      // } else {
      //   setState({ ...state, error: "An unknown error occurred." });
      //   toast.error("An unknown error occurred.");
      // }

      handleError(err);
    } finally {
      setState({ ...state, isLoading: false });
    }
  };

  return { isLoading: state.isLoading, error: state.error, updateStatusOfTask };
};
