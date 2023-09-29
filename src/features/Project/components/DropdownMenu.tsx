import { Security } from "@mui/icons-material";

interface Props {
  isOpen: boolean;
}

export const DropdownMenu = ({ isOpen }: Props) => {
  return (
    <div
      className={`transform-[translateY(100%)] ${
        isOpen ? "" : "opacity-0"
      } absolute bottom-0
          left-0 h-full w-[290px] max-w-[600px] translate-x-8 translate-y-0 rounded-md border border-white border-opacity-30 bg-background-primary bg-opacity-90 p-2 transition-all duration-300 group-hover:opacity-100
        `}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center rounded-md px-2 py-1 text-lg hover:cursor-pointer hover:bg-icon-dark-gray hover:bg-opacity-30">
          <Security fontSize="inherit" className="mr-2" />
          <p className="inline-block text-base font-normal">
            Check permission of project
          </p>
        </div>
      </div>
    </div>
  );
};
