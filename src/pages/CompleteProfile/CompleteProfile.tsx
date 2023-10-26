import { TextField } from "@mui/material";
import { useState } from "react";
import { SmallButton } from "../../components/common/buttons/SmallButton";
import { useCompleteProfile } from "../../hooks/user/useCompleteProfile";
import { useAppSelector } from "../../hooks/storeHook";

export const CompleteProfile = () => {
  const userId = useAppSelector((state) => state.user.userId);

  const [username, setUsername] = useState("");

  const { completeProfile } = useCompleteProfile();

  const handleCompleteProfile = () => {
    if (!userId) return;

    if (!username) return;

    completeProfile(userId, username);
  };

  return (
    <div className="h-screen w-screen bg-background-primary text-white">
      <div className="flex flex-col items-center justify-center px-10">
        <h1 className="mt-10 text-3xl text-highlight-primary">
          Complete your profile
        </h1>
        <div className="mt-10 flex max-w-[20rem] flex-col gap-3">
          <h2>Provide your username</h2>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            fullWidth
            placeholder="e.g. Monkey"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCompleteProfile();
            }}
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
        </div>

        <div className="mt-10 max-w-[20rem]">
          <SmallButton title="Save" onClick={handleCompleteProfile} />
        </div>
      </div>
    </div>
  );
};
