import React, { useRef, useState } from "react";
import { DropdownButton } from "../DropdownButton";
import useOnClickOutside from "../../../../hooks/useOnClickOutside";

interface TaskAttributeDropdownProps {
  label: string;
  options: string[];
  dropdownLabel: string;
  onSelect: (index: number) => void;
}

export const TaskAttributeDropdown: React.FC<TaskAttributeDropdownProps> = ({
  label,
  dropdownLabel,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <div ref={dropdownRef}>
        <DropdownButton
          label={dropdownLabel}
          options={options}
          onSelect={(index) => {
            onSelect(index);
            setIsOpen(false);
          }}
          isDropdownOpen={isOpen}
          setIsDropdownOpen={setIsOpen}
        />
      </div>
    </div>
  );
};
