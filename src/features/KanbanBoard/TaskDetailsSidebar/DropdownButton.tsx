import { ReactNode, useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

interface Props {
  label: string;
  options: ReactNode[];
  onSelect: (index: number) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
}

export const DropdownButton = ({
  label,
  options,
  onSelect,
  isDropdownOpen,
  setIsDropdownOpen,
}: Props) => {
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className="relative">
      <button
        className="flex items-center rounded-md px-2 py-1 hover:cursor-pointer hover:bg-[#262836]"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        {label}
      </button>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 mt-2 w-44 rounded-md bg-[#1f2130] shadow-lg"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md px-4 py-2 hover:bg-[#313240]"
              onClick={() => {
                onSelect(index);
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
