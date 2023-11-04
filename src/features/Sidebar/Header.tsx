import { ChevronRight, ExpandMore } from "@mui/icons-material";

interface Props {
  isExpanded: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Header = ({ isExpanded, onClick }: Props) => (
  <button
    onClick={onClick}
    className="w-full rounded-md py-1 hover:cursor-pointer hover:bg-[#262836]"
    aria-expanded={isExpanded}
  >
    <div className="flex h-[2rem] items-center pl-2 text-sm">
      <span className="pl-1">Your projects</span>
      <div className="flex h-[2rem] w-[2rem] items-center justify-center">
        {isExpanded ? <ExpandMore /> : <ChevronRight />}
      </div>
    </div>
  </button>
);
