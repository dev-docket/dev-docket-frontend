import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook";
import { setDescriptionInputActive } from "../../../store/slices/homeSlice";
import { Task } from "../../../types/Task";
import { DescriptionEditMode } from "./DescriptionEditMode";

interface Props {
  task?: Task;
}

export const LeftContainer = (props: Props) => {
  const { task } = props;
  const { isDescriptionInputActive, descriptionInputValue } = useAppSelector(
    (state) => state.home,
  );

  const dispatch = useAppDispatch();

  const profileWithEditButton = () => {
    return (
      <div className="flex items-center justify-between">
        <div>
          {/* TODO: Profile image, profile name and time of last edited task. */}
          profile
        </div>
        <button
          onClick={() => dispatch(setDescriptionInputActive(true))}
          className="rounded-md p-2 text-sm transition-colors ease-out hover:bg-button-hover-dark active:bg-slate-900"
        >
          Edit
        </button>
      </div>
    );
  };

  const conditionalDescription = () => {
    if (isDescriptionInputActive) {
      return <DescriptionEditMode />;
    }

    if (descriptionInputValue) {
      return (
        <>
          {profileWithEditButton()}
          <p className="text-gray-300">{descriptionInputValue}</p>
        </>
      );
    }

    return (
      <>
        {profileWithEditButton()}
        <span className="text-sm italic text-gray-500">
          No description provided
        </span>
      </>
    );
  };

  return (
    <div className="w-[66%] border-r border-r-border-dark-primary bg-[#161b22]">
      {task && task.id ? (
        <div className="w-full border-b border-b-border-dark-primary bg-[#0d1117] p-5">
          {conditionalDescription()}
        </div>
      ) : (
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent" />
      )}
    </div>
  );
};
