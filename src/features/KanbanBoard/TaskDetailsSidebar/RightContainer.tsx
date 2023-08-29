import { ArchiveOutlined, CopyAll, DeleteOutline } from "@mui/icons-material";
import { SmallWideButton } from "./SmallWideButton";

export const RightContainer = () => {
  return (
    <div className="w-full max-w-[34%]">
      <div className="px-5 py-5 border-b border-border-dark-primary">top</div>
      <div className="mt-2 px-2">
        <SmallWideButton>
          <>
            <CopyAll color="inherit" className="text-icon-gray mr-2" />
            Copy link to task
          </>
        </SmallWideButton>
        <SmallWideButton>
          <>
            <ArchiveOutlined color="inherit" className="text-icon-gray mr-2" />
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
