import axios, { AxiosError } from "axios";
import { useAppSelector } from "../storeHook";
import { toast } from "react-toastify";
import { User } from "../../types/User";

const apiUrl = import.meta.env.VITE_API_URL;

interface IData {
  user: User;
}

export const useAssignUserToTask = () => {
  const auth = useAppSelector((state) => state.auth);

  const assignUserToTask = async (taskId: string, userId: number) => {
    try {
      const { data, status } = await axios.post<IData>(
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

      if (status !== 201) {
        toast.error("Unable to assign user to task");
      }

      return data;
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
