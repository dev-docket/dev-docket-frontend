import { ChevronRight, ExpandMore } from "@mui/icons-material";
import { useState } from "react";

interface Props {
  isExpanded: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Header = ({ isExpanded, onClick }: Props) => {
  const [divHover, setDivHover] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);

  return (
    <button
      className={`w-full cursor-pointer rounded-md py-1 ${
        divHover && !buttonHover ? "bg-[#262836]" : ""
      }`}
      aria-expanded={isExpanded}
      onMouseEnter={() => setDivHover(true)}
      onMouseLeave={() => setDivHover(false)}
    >
      <div className="flex h-[2rem] items-center pl-2 text-sm">
        <div className="flex h-[2rem] w-[2rem] items-center justify-center">
          <div
            onClick={onClick}
            className={`cursor-pointer rounded-md ${
              buttonHover ? "bg-[#262836]" : ""
            }`}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
          >
            {isExpanded ? <ExpandMore /> : <ChevronRight />}
          </div>
        </div>
        <span className="pl-1">Your projects</span>
      </div>
    </button>
  );
};
