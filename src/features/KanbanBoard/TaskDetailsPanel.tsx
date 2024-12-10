import { Fragment, useEffect, useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '@/types/Task';
import { Icon } from '@iconify/react';
import { Dialog, Transition } from '@headlessui/react';
import { useTaskStore } from '@/stores/taskStore';
import { useAuthStore } from '@/stores/authStore';
import { toast } from 'react-toastify';
import { User } from '@/types/User';

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

interface TaskDetailsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  teamMembers: User[];
}

export const TaskDetailsPanel = ({ isOpen, onClose, task, teamMembers }: TaskDetailsPanelProps) => {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [isEditing, setIsEditing] = useState(false);
  const { updateTask } = useTaskStore();
  const { token } = useAuthStore();

  useEffect(() => {
    setEditedTask(task);
  }, [task]);

  const handleSave = async () => {
    if (!token) return;

    try {
      await updateTask({
        taskId: task.id,
        task: editedTask,
        teamId: task?.teamId,
        token
      });
      setIsEditing(false);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={onClose}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">
                <div className="flex h-full flex-col overflow-y-auto bg-[#1a1f2e] shadow-xl">
                  {/* Header */}
                  <div className="border-b border-gray-700 px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`${getPriorityColor(editedTask.priority)} flex h-8 w-8 items-center justify-center rounded-md bg-opacity-10`}>
                          <Icon icon={getPriorityIcon(editedTask.priority)} className="h-5 w-5" />
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editedTask.name}
                            onChange={(e) => setEditedTask(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full rounded-md bg-[#141824] px-3 py-1 text-lg font-semibold text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500"
                          />
                        ) : (
                          <Dialog.Title className="text-lg font-semibold text-white">
                            {editedTask.name}
                          </Dialog.Title>
                        )}
                      </div>
                      <div className="ml-3 flex items-center space-x-4">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="rounded-md bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditedTask(task);
                                setIsEditing(false);
                              }}
                              className="rounded-md px-3 py-1 text-sm font-medium text-gray-400 hover:text-white"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="rounded-md px-3 py-1 text-sm font-medium text-gray-400 hover:text-white"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={onClose}
                          className="text-gray-400 hover:text-white"
                        >
                          <Icon icon="ph:x-bold" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 px-6 py-4">
                    <div className="space-y-6">
                      {/* Status and Priority */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm text-gray-400">Status</label>
                          <select
                            value={editedTask.status}
                            onChange={(e) => setEditedTask(prev => ({ ...prev, status: e.target.value as TaskStatus }))}
                            disabled={!isEditing}
                            className="w-full rounded-md bg-[#141824] p-2 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500 disabled:opacity-50"
                          >
                            {Object.values(TaskStatus).map((status) => (
                              <option key={status} value={status}>
                                {status.replace('_', ' ')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-2 block text-sm text-gray-400">Priority</label>
                          <select
                            value={editedTask.priority}
                            onChange={(e) => setEditedTask(prev => ({ ...prev, priority: e.target.value as TaskPriority }))}
                            disabled={!isEditing}
                            className="w-full rounded-md bg-[#141824] p-2 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500 disabled:opacity-50"
                          >
                            {Object.values(TaskPriority).map((priority) => (
                              <option key={priority} value={priority}>
                                {priority.replace('_', ' ')}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Assignee */}
                      {/* <div>
                        <label className="mb-2 block text-sm text-gray-400">Assignee</label>
                        <select
                          value={editedTask.assignedUser?.id}
                          onChange={(e) => {
                            const selectedUser = teamMembers.find(member => member.id === e.target.value);
                            if (selectedUser) {
                              setEditedTask(prev => ({ ...prev, assignedUser: selectedUser }));
                            }
                          }}
                          disabled={!isEditing}
                          className="w-full rounded-md bg-[#141824] p-2 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500 disabled:opacity-50"
                        >
                          {teamMembers.map((member) => (
                            <option key={member.id} value={member.id}>
                              {member.name}
                            </option>
                          ))}
                        </select>
                      </div> */}

                      {/* Description */}
                      <div>
                        <label className="mb-2 block text-sm text-gray-400">Description</label>
                        {isEditing ? (
                          <textarea
                            value={editedTask.description || ''}
                            onChange={(e) => setEditedTask(prev => ({ ...prev, description: e.target.value }))}
                            className="h-32 w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500"
                            placeholder="Add a description..."
                          />
                        ) : (
                          <div className="rounded-md bg-[#141824] p-3 text-white">
                            {editedTask.description || 'No description provided.'}
                          </div>
                        )}
                      </div>

                      {/* Activities */}
                      {editedTask.activities && editedTask.activities.length > 0 && (
                        <div>
                          <h3 className="mb-3 text-sm font-medium text-gray-400">Activity</h3>
                          <div className="space-y-4">
                            {editedTask.activities.map((activity, index) => (
                              <div key={index} className="flex items-start space-x-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
                                  <span className="text-xs text-white">
                                    {activity.user.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-white">
                                      {activity.user.name}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                      {new Date(activity.createdAt).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-300">{activity.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};