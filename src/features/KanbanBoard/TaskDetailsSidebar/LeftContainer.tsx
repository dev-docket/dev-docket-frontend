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
          className="m-0 w-full rounded-md border-b border-none border-[#2f81f7d9] bg-transparent p-2"
        />
      );
    }

    if (descriptionInput) {
      return <p className="text-gray-300">{descriptionInput}</p>;
    }

    return (
      <span className="text-sm italic text-gray-500">
        No description provided
      </span>
    );
  };

  return (
    <div className="w-[66%] border-r border-gray-600 p-5">
      {task && task.id ? (
        <div className="flex flex-col gap-[1rem]">
          <div className="flex items-center justify-between">
            <div>
              {/* TODO: Profile image, profile name and time of last edited task. */}
              profile
            </div>
            <button
              onClick={() => setIsInputEnabled(true)}
              className="rounded-md p-2 text-sm transition-colors ease-out hover:bg-button-hover-dark active:bg-slate-900"
            >
              Edit
            </button>
          </div>

          <div>{conditionalDescription()}</div>
        </div>
      ) : (
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent" />
      )}
    </div>
  );
};
