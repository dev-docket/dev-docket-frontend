import axios, { AxiosError } from "axios";
import { useAppDispatch } from "../storeHook";
import { setProfileComplete } from "../../store/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export const useCompleteProfile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const completeProfile = async (id: number, username: string) => {
    try {
      const { status } = await axios.post(`${apiUrl}/users/complete-profile`, {
        user: {
          id,
          username,
        },
      });

      if (status !== 200) throw new Error("Error completing profile");

      dispatch(setProfileComplete(true));
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      }
    }
  };

  return { completeProfile };
};
