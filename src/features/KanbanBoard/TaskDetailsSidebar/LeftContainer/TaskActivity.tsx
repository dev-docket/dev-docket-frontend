import React from "react";
import { TaskActivity as Activity } from "../../../../store/slices/teamPageSlice";
import { DateTime } from "luxon";

interface TaskActivityProps {
  activities: Activity[] | undefined; // Replace with your activity type
  handleHowLongAgo: (date: DateTime) => string | null; // Replace with appropriate type
}

const TaskActivity: React.FC<TaskActivityProps> = ({
  activities,
  handleHowLongAgo,
}) => {
  return (
    <div className="p-5">
      <h3 className="mb-4 text-xl font-semibold">Activity</h3>
      {activities && activities.length === 0 && (
        <span className="text-base italic text-gray-500">No activity yet</span>
      )}
      {activities &&
        activities.map((activity) => (
          <div key={activity.id} className="mb-2 mt-4 flex items-center">
            {/* <img
              className="w-8 h-8 rounded-full mr-3"
              src={activity.user.image}
              alt="User"
            /> */}
            <span className="pr-4 text-lg font-medium text-gray-400">
              {activity.user.username}
            </span>
            <span className="text-lg">{activity.description}</span>
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
