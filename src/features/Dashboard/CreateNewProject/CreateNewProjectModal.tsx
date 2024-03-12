import { Close } from "@mui/icons-material";
import { useState } from "react";
import { useAppDispatch } from "../../../hooks/storeHook";
import { createProject } from "../../../store/slices/actions/project";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Props {
  closeModal: () => void;
}

export const CreateNewProjectModal = ({ closeModal }: Props) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    setIsLoading(true);

    if (!name) {
      toast.error("Please enter a project name");
      setIsLoading(false);
      return;
    }

    await dispatch(createProject({ projectName: name, navigate })).then(
      (result) => {
        if (result.meta.requestStatus === "fulfilled") {
          setIsLoading(false);
        }
      },
    );

    setIsLoading(false);
  };

  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="xl" fullScreen>
      <DialogTitle className="border-b border-white border-opacity-30 bg-background-primary text-white">
        <div className="flex items-center justify-between">
          Create New Project
          <Close
            onClick={closeModal}
            fontSize="large"
            className="cursor-pointer rounded-full p-1 hover:bg-icon-gray hover:bg-opacity-40"
          />
        </div>
      </DialogTitle>
      <DialogContent dividers className="bg-background-primary text-white">
        <Box display="flex" height="100%" width="100%">
          <Box
            width="50%"
            p={2}
            className="border-r border-white border-opacity-30"
          >
            <h2 className="py-4 text-2xl">Project Templates</h2>
            <div className="flex flex-col items-center justify-center">
              <p>There is no template available at the moment.</p>
            </div>
          </Box>
          <Box width="50%" p={2}>
            <h1 className="text-2xl">Create New Project</h1>
            <p className="mb-4 text-sm">
              Projects are where you manage your work. The contain teams and
              other structures that help you organize your work.
            </p>
            <TextField
              id="projectName"
              label="Name"
              variant="outlined"
              fullWidth
              placeholder="e.g. Minecraft Clone"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{ style: { color: "white" } }}
              InputLabelProps={{ style: { color: "white" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="border-t border-white border-opacity-30 bg-background-primary text-white">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateProject}
          disabled={isLoading}
        >
          Create Team
        </Button>
      </DialogActions>
    </Dialog>
  );
};
