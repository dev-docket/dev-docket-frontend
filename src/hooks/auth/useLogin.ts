import { useState } from "react";
import { useAppDispatch } from "../storeHook";
import { addToken } from "../../store/slices/authSlice";
import { setProfileComplete, setUser } from "../../store/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
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

      dispatch(addToken(data.access_token));
      dispatch(setUser(data.user));
      dispatch(setProfileComplete(data.user.isProfileCompleted));

      toast.update(toastId, {
        render: "You have successfully logged in",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      navigate("/dashboard");

      return data.access_token;
    } catch (err) {
      if (axios.isAxiosError(err)) {
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
