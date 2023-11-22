import React from "react";

interface ProfileWithEditButtonProps {
  onClick: () => void;
}

const ProfileWithEditButton: React.FC<ProfileWithEditButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-xl font-semibold">Description</h3>
      <button
        onClick={onClick}
        className="rounded-md p-2 text-sm transition-colors ease-out hover:bg-button-hover-dark active:bg-slate-900"
        aria-label="Edit Description"
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileWithEditButton;
