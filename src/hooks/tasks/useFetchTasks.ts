import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../storeHook";
import { addTasks } from "../../store/slices/taskSlice";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const useFetchTasks = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const token = useAppSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);


  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status !== 200) {
          throw new Error("Something went wrong!");
        }

        const data = await response.data;
        // const tasks = data.map((task: { title: string }) => task.title);
        dispatch(addTasks(data));
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      }
      setIsLoading(false);
    };

    fetchTasks();
  }, [dispatch, token, userId]);

  return { isLoading, error };
};
