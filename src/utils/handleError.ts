import { toast } from "react-toastify";

export const handleError = (error: unknown): void => {
  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error("An unknown error occurred.");
};
