import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_API_URL;

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = async (
    email: string,
    password: string,
    redirectPath = "/login"
  ) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Registering user...");

    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        email,
        password,
      });

      if (response.status !== 201) {
        throw new Error("Something went wrong!");
      }

      toast.update(toastId, {
        render: "You have successfully registered",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      navigate(redirectPath);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }

      toast.update(toastId, {
        render: "You have failed to register",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, register };
};
