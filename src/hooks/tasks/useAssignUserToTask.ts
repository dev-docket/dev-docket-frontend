import axios, { AxiosError } from "axios";
import { useAppSelector } from "../storeHook";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const useAssignUserToTask = () => {
  const auth = useAppSelector((state) => state.auth);

  const assignUserToTask = async (taskId: string, userId: number) => {
    try {
      const response = await axios.post(
        `${apiUrl}/tasks/${taskId}/assign-user`,
        {
          userId,
          taskId: Number(taskId),
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        },
      );

      if (response.status !== 200) {
        toast.error("Unable to assign user to task");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast.error(`${error.response?.data.message}`);
      }
    }
  };

  return {
    assignUserToTask,
  };
};
