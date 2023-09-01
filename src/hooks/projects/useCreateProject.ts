import { useState } from "react";
import { useAppDispatch } from "../storeHook";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../store/slices/projectSlice";

const apiUrl = import.meta.env.VITE_API_URL;

export const useCreateProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createProject = async (userId: number, jwt: string, name: string) => {
    setIsLoading(true);
    setError(null);
    const toastId = toast.loading("Creating project...");

    try {
      const { data, status } = await axios.post(
        `${apiUrl}/users/${userId}/projects`,
        {
          name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        },
      );

      if (status !== 201) {
        throw new Error("Something went wrong!");
      }

      toast.update(toastId, {
        render: "You have successfully created project",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });

      dispatch(addProject(data));
      navigate(`/projects/${data.name}/board`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.update(toastId, {
          render: "We couldn't create project",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
        setError("We couldn't create project");
      } else {
        setError("Something went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createProject };
};
