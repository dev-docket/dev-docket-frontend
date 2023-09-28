import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import { createTeam } from "../../../store/slices/actions/team";
import { useAppDispatch } from "../../../hooks/storeHook";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  closeModal: () => void;
}

export const CreateNewTeamModal = ({ closeModal }: Props) => {
  const [name, setName] = useState("");

  const { projectSlug } = useParams<{ projectSlug: string }>();

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleCreateTeam = () => {
    if (!projectSlug) return;

    dispatch(createTeam({ name, projectSlug, navigation }));
  };

  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="xl" fullScreen>
      <DialogTitle className="border-b border-white border-opacity-30 bg-background-primary text-white">
        <div className="flex items-center justify-between">
          Create New Team
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
            <h2 className="py-4 text-2xl">Team Templates</h2>
            <div className="flex flex-col items-center justify-center">
              <p>There is no template available at the moment.</p>
            </div>
          </Box>
          <Box width="50%" p={2}>
            <h1 className="text-2xl">Create New Team</h1>
            <p className="mb-4 text-sm">
              Teams are a structure that allows you to divide the project into
              smaller parts according to teams. You may have, for example, a
              team of graphic designers, programmers, etc.
            </p>
            <TextField
              id="projectName"
              label="Name"
              variant="outlined"
              fullWidth
              placeholder="e.g. Graphic design"
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
        <Button variant="contained" color="primary" onClick={handleCreateTeam}>
          Create Team
        </Button>
      </DialogActions>
    </Dialog>
  );
};
