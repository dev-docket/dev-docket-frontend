import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../storeHook";
import { addTasks } from "../../store/slices/taskSlice";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchTasks = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (!userId || !token) throw new Error("Please login first");

        const response = await axios.get(`${apiUrl}/users/${userId}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error("Something went wrong!");
        }

        const data = await response.data;
        dispatch(addTasks(data));
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }

        if (err instanceof AxiosError) {
          if (err.response?.status === 403) {
            toast.error(
              "You are not authorized to do that. Try to login again."
            );
            return;
          }
        }

        toast.error("You have failed to fetch tasks");
      }
      setIsLoading(false);
    };

    if (!userId) return;
    fetchTasks();
  }, [dispatch, token, userId]);

  return { isLoading, error };
};
