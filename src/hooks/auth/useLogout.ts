import { toast } from "react-toastify";
import { removeToken } from "../../store/slices/authSlice";
import { removeTasks } from "../../store/slices/taskSlice";
import { removeUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../storeHook";
import { removeProjects } from "../../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(removeToken());
    dispatch(removeUser());
    dispatch(removeTasks());
    dispatch(removeProjects());

    toast.success("You have successfully logged out", { autoClose: 1000 });
    navigate("/login");
  };

  return { logoutUser };
};
