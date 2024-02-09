import ReactMarkdown from "react-markdown";
import { DescriptionEditMode } from "../DescriptionEditMode";
import ProfileWithEditButton from "./ProfileWithEditButton";
import remarkGfm from "remark-gfm";

interface TaskDescriptionProps {
  isDescriptionInputActive: boolean;
  taskDescription?: string;
  onEditClick: () => void;
}

export const TaskDescription = ({
  isDescriptionInputActive,
  taskDescription,
  onEditClick,
}: TaskDescriptionProps) => {
  if (isDescriptionInputActive) return <DescriptionEditMode />;

  return taskDescription ? (
    <>
      <ProfileWithEditButton onClick={onEditClick} />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="markdown-preview prose prose-slate text-white"
        components={{
          a: ({ ...props }) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
        }}
      >
        {taskDescription}
      </ReactMarkdown>
    </>
  ) : (
    <>
      <ProfileWithEditButton onClick={onEditClick} />
      <span className="text-sm italic text-gray-500">
        No description provided
      </span>
    </>
  );
};
