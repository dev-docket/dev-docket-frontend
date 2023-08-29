import { Task } from "../../../types/Task";

interface Props {
  task?: Task;
  isInputEnabled: boolean;
  setIsInputEnabled: (value: boolean) => void;
  descriptionInput: string;
  setDescriptionInput: (value: string) => void;
}

export const LeftContainer = (props: Props) => {
  const {
    task,
    isInputEnabled,
    setIsInputEnabled,
    descriptionInput,
    setDescriptionInput,
  } = props;

  const conditionalDescription = () => {
    if (isInputEnabled) {
      return (
        <textarea
          disabled={!isInputEnabled}
          autoFocus
          onFocus={(e) => {
            const { target } = e;
            setTimeout(() => {
              target.selectionStart = target.value.length;
              target.selectionEnd = target.value.length;
            }, 0);
          }}
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          className="bg-transparent border-none m-0 p-2 w-full border-b border-[#2f81f7d9] rounded-md"
        />
      );
    }

    if (descriptionInput) {
      return <p className="text-gray-300">{descriptionInput}</p>;
    }

    return (
      <span className="text-gray-500 text-sm italic">
        No description provided
      </span>
    );
  };

  return (
    <div className="p-5 border-r border-gray-600 w-[66%]">
      {task && task.id ? (
        <div className="flex flex-col gap-[1rem]">
          <div className="flex items-center justify-between">
            <div>
              {/* TODO: Profile image, profile name and time of last edited task. */}
              profile
            </div>
            <button
              onClick={() => setIsInputEnabled(true)}
              className="text-sm hover:bg-button-hover-dark active:bg-slate-900 transition-colors ease-out p-2 rounded-md"
            >
              Edit
            </button>
          </div>

          <div>{conditionalDescription()}</div>
        </div>
      ) : (
        <div className="w-12 h-12 border-4 border-white border-t-transparent border-solid rounded-full animate-spin mx-auto" />
      )}
    </div>
  );
};
