import { ArchiveOutlined, CopyAll, DeleteOutline } from "@mui/icons-material";
import { SmallWideButton } from "./SmallWideButton";
import { toast } from "react-toastify";

export const RightContainer = () => {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="w-full max-w-[34%]">
      <div className="border-b border-border-dark-primary px-5 py-5">top</div>
      <div className="mt-2 px-2">
        <SmallWideButton onClick={handleCopyUrl}>
          <>
            <CopyAll color="inherit" className="mr-2 text-icon-gray" />
            Copy link to task
          </>
        </SmallWideButton>
        <SmallWideButton>
          <>
            <ArchiveOutlined color="inherit" className="mr-2 text-icon-gray" />
            Archive task
          </>
        </SmallWideButton>

        <SmallWideButton customHoverBgColor="red">
          <>
            <DeleteOutline color="error" className="mr-1" />
            Delete task from project
          </>
        </SmallWideButton>
      </div>
    </div>
  );
};
