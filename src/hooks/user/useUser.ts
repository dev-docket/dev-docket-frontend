import axios from "axios";
import { toast } from "react-toastify";
import { useAppSelector } from "../storeHook";

const apiUrl = import.meta.env.VITE_API_URL;

export const useUser = () => {
  const auth = useAppSelector((state) => state.auth);

  const fetchUser = async (userId: number) => {
    if (!auth?.token) {
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return {
    fetchUser,
  };
};
