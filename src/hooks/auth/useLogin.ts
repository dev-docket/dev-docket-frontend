import { useState } from "react";
import { useAppDispatch } from "../storeHook";
import { addToken } from "../../store/slices/authSlice";
import axios from "axios";
import { setUser } from "../../store/slices/userSlice";
import { handleError } from "../../utils/handleError";

const apiUrl = import.meta.env.VITE_API_URL;

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      if (response.status !== 200) {
        throw new Error("Something went wrong!");
      }
      const data = await response.data;

      dispatch(addToken(data.token));
      dispatch(setUser(data.user));
      return data.token;
    } catch (err) {
      // setError(err.message);
      // toast.error(err.message);

      if (err instanceof Error) {
        setError(err.message);
      }
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, login };
};
