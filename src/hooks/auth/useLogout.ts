import { toast } from "react-toastify";
import { removeToken } from "../../store/slices/authSlice";
import { removeTasks } from "../../store/slices/taskSlice";
import { removeUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../storeHook";

export const useLogout = () => {
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(removeToken());
    dispatch(removeUser());
    dispatch(removeTasks());

    toast.success("You have successfully logged out", { autoClose: 1000 });
  };

  return { logoutUser };
};
