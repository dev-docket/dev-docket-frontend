import { useState } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'react-toastify';
import { Task, TaskPriority, TaskStatus } from '@/types/Task';
import { User } from '@/types/User';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Partial<Task>) => void;
  initialStatus?: TaskStatus;
  teamMembers: User[];
}

const CreateTaskModal = ({ 
  isOpen, 
  onClose, 
  onCreateTask, 
  initialStatus = TaskStatus.TODO,
  teamMembers 
}: CreateTaskModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(initialStatus);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.NO_PRIORITY);
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Please enter a task name");
      return;
    }

    if (!assignedUserId) {
      toast.error("Please assign the task to a team member");
      return;
    }

    const assignedUser = teamMembers.find(member => member.id === assignedUserId);
    if (!assignedUser) {
      toast.error("Selected team member not found");
      return;
    }

    setIsLoading(true);
    try {
      await onCreateTask({
        name: name.trim(),
        description: description.trim(),
        status,
        priority,
        assignedUser
      });
      onClose();
      resetForm();
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setStatus(TaskStatus.TODO);
    setPriority(TaskPriority.NO_PRIORITY);
    setAssignedUserId("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-[#1a1f2e] p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            disabled={isLoading}
          >
            <Icon icon="ph:x-bold" className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500"
              placeholder="Enter task name"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500"
              placeholder="Enter task description"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm text-gray-300">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500"
                disabled={isLoading}
              >
                {Object.values(TaskStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500"
                disabled={isLoading}
              >
                {Object.values(TaskPriority).map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Assign To</label>
            <select
              value={assignedUserId}
              onChange={(e) => setAssignedUserId(e.target.value)}
              className="w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 focus:ring-blue-500"
              disabled={isLoading}
            >
              <option value="">Select team member</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="rounded-md px-4 py-2 text-gray-300 hover:bg-gray-800"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !name.trim() || !assignedUserId}
              className="flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading && (
                <Icon icon="ph:spinner" className="mr-2 h-5 w-5 animate-spin" />
              )}
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;