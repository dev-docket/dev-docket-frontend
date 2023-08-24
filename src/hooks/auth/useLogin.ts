import { useState } from "react";
import { useAppDispatch } from "../storeHook";
import { addToken } from "../../store/slices/authSlice";
import { setUser } from "../../store/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Logging in...");

    try {
      const { data } = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      dispatch(addToken(data.token));
      dispatch(setUser(data.user));

      toast.update(toastId, {
        render: "You have successfully logged in",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      return data.token;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        toast.update(toastId, {
          render: "Invalid login or password",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setError("Invalid login or password");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, login };
};
