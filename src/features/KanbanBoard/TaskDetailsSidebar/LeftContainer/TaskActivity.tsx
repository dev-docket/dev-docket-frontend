import React from "react";
import { TaskActivity as Activity } from "../../../../store/slices/teamPageSlice";
import { DateTime } from "luxon";
import { TaskPriority, TaskStatus } from "../../../../types/Task";

interface TaskActivityProps {
  activities: Activity[] | undefined;
  handleHowLongAgo: (date: DateTime) => string | null;
}

// Mapping for human-friendly task status display
const humanFriendlyStatus: { [key in TaskStatus]?: string } = {
  [TaskStatus.BACKLOG]: "Backlog",
  [TaskStatus.TODO]: "Todo",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.DONE]: "Done",
};

const humanFriendlyPriority: { [key in TaskPriority]?: string } = {
  [TaskPriority.NO_PRIORITY]: "No Priority",
  [TaskPriority.URGENT]: "Urgent",
  [TaskPriority.HIGH]: "High",
  [TaskPriority.MEDIUM]: "Medium",
  [TaskPriority.LOW]: "Low",
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
      const statusKey = lowerCaseWord.toUpperCase();
      if (statusKey in TaskStatus) {
        const friendlyStatus =
          humanFriendlyStatus[statusKey as keyof typeof TaskStatus];
        return (
          <span key={index} className="font-bold">
            {friendlyStatus || lowerCaseWord}{" "}
          </span>
        );
      } else if (statusKey in TaskPriority) {
        const friendlyPriority =
          humanFriendlyPriority[statusKey as keyof typeof TaskPriority];
        return (
          <span key={index} className="font-bold">
            {friendlyPriority || lowerCaseWord}{" "}
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

    return <span>{styledDescription}</span>;
  };

  return (
    <div className="p-5">
      <h3 className="mb-4 text-xl font-semibold">Activity</h3>
      {activities && activities.length === 0 && (
        <span className="text-base italic text-gray-500">No activity yet</span>
      )}
      {activities &&
        activities.map((activity) => (
          <div
            key={activity.id}
            className="mb-2 mt-4 flex items-center text-sm"
          >
            <span className="pr-2 text-base font-medium text-gray-400">
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
