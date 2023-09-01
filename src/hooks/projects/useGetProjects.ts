import { useEffect, useState } from "react";
import { useAppDispatch } from "../storeHook";
import axios from "axios";
import { toast } from "react-toastify";
import { addProjects } from "../../store/slices/projectSlice";

const apiUrl = import.meta.env.VITE_API_URL;

export const useGetProjects = (userId: number, jwt: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProjects = async (userId: number, jwt: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, status } = await axios.get(
          `${apiUrl}/users/${userId}/projects`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          },
        );

        if (status !== 200) {
          throw new Error("Something went wrong!");
        }
        
        dispatch(addProjects(data));
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error("We couldn't fetch project", {
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setError("We couldn't fetch project");
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getProjects(userId, jwt);
  }, [userId, jwt, dispatch]);

  return { isLoading, error };
};
