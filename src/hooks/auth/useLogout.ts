import { persistor } from "../../store/store";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores";

export const useLogout = () => {
  // const dispatch = useAppDispatch();
  const {logout} = useAuthStore();

  const logoutUser = async () => {
    try {
      logout();
      // Clear all persisted state
      await persistor.purge();
      // Optional: Clear any other stored data
      localStorage.clear();
      sessionStorage.clear();
      // navigate("/login");

      toast.success("Logged out successfully",{
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { logoutUser };
};
