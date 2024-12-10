import { Task, TaskPriority } from '@/types/Task';
import { Icon } from '@iconify/react';
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { TaskDetailsPanel } from './TaskDetailsPanel';

interface TaskCardProps {
  task: Task;
  index: number;
}

const getPriorityIcon = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.URGENT:
      return 'mdi:alert-circle';
    case TaskPriority.HIGH:
      return 'mdi:arrow-up-bold';
    case TaskPriority.MEDIUM:
      return 'mdi:equal';
    case TaskPriority.LOW:
      return 'mdi:arrow-down-bold';
    default:
      return 'mdi:minus-circle-outline';
  }
};

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.URGENT:
      return 'text-red-500';
    case TaskPriority.HIGH:
      return 'text-orange-500';
    case TaskPriority.MEDIUM:
      return 'text-yellow-500';
    case TaskPriority.LOW:
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
};

export const TaskCard = ({ task, index }: TaskCardProps) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setIsDetailsOpen(true)}
            className="cursor-pointer rounded-lg border border-gray-700 bg-[#0f1219] p-4 shadow-sm transition-all hover:border-gray-600"
          >
            <div className="mb-2 flex items-start justify-between">
              <h3 className="font-medium text-white">{task.name}</h3>
              <Icon
                icon={getPriorityIcon(task.priority)}
                className={`h-5 w-5 ${getPriorityColor(task.priority)}`}
              />
            </div>
           
            {task.description && (
              <p className="mb-3 text-sm text-gray-400 line-clamp-2">
                {task.description}
              </p>
            )}
           
            <div className="mt-3 flex items-center justify-between">
              {task.assignedUser && (
                <div className="flex items-center space-x-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700">
                    <span className="text-xs text-white">
                      {task.assignedUser.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{task.assignedUser.name}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </Draggable>

      <TaskDetailsPanel
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        task={task}
      />
    </>
  );
};