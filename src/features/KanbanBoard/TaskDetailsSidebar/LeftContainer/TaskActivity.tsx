import React from "react";
import { TaskActivity as Activity } from "../../../../store/slices/teamPageSlice";
import { DateTime } from "luxon";
import { TaskStatusEnum } from "../../../../types/Task";

interface TaskActivityProps {
  activities: Activity[] | undefined;
  handleHowLongAgo: (date: DateTime) => string | null;
}

// Mapping for human-friendly task status display
const humanFriendlyStatus: { [key in TaskStatusEnum]?: string } = {
  [TaskStatusEnum.BACKLOG]: "Backlog",
  [TaskStatusEnum.TODO]: "Todo",
  [TaskStatusEnum.IN_PROGRESS]: "In Progress",
  [TaskStatusEnum.DONE]: "Done",
};

const TaskActivity: React.FC<TaskActivityProps> = ({
  activities,
  handleHowLongAgo,
}) => {
  // Function to style specific parts of the description and convert to lowercase
  const styleDescription = (description: string) => {
    const styledDescription = description.split(" ").map((word, index) => {
      const lowerCaseWord = word.toLowerCase();
      // Convert to uppercase and use type assertion
      const statusKey =
        lowerCaseWord.toUpperCase() as keyof typeof TaskStatusEnum;
      if (statusKey in TaskStatusEnum) {
        const friendlyStatus = humanFriendlyStatus[statusKey];
        return (
          <span key={index} className="font-bold">
            {friendlyStatus || lowerCaseWord}{" "}
          </span>
        );
      } else {
        return (
          <span key={index} className="text-gray-400">
            {lowerCaseWord}{" "}
          </span>
        );
      }
    });

    return <span className="text-lg">{styledDescription}</span>;
  };

  return (
    <div className="p-5">
      <h3 className="mb-4 text-xl font-semibold">Activity</h3>
      {activities && activities.length === 0 && (
        <span className="text-base italic text-gray-500">No activity yet</span>
      )}
      {activities &&
        activities.map((activity) => (
          <div key={activity.id} className="mb-2 mt-4 flex items-center">
            <span className="pr-4 text-lg font-medium text-gray-400">
              {activity.user?.username}
            </span>
            {styleDescription(activity.description)}
            <span className="mx-2 inline-block font-bold text-gray-400">
              {"\u00B7"}
            </span>
            <span className="text-gray-400">
              {handleHowLongAgo(DateTime.fromISO(activity.createdAt))}
            </span>
          </div>
        ))}
    </div>
  );
};

export default TaskActivity;
