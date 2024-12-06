import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTeamStore } from '@/stores';

// Modern Create Team Modal
export const CreateTeamModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { projectSlug } = useParams();

  const {createTeam} = useTeamStore();

  const handleCreateTeam = async () => {
    if (!name.trim() || !projectSlug) return;

    setIsLoading(true);
    try {
      await createTeam( 
        {
          name: name.trim(),
          projectSlug,
        }
      );
      onClose();
    } catch (error) {
      toast.error('Failed to create team');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-lg bg-[#1a1f2e] shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-white">Create New Team</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <Icon icon="ph:x-bold" className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Team Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Design Team"
                className="w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will this team work on?"
                rows={3}
                className="w-full rounded-md bg-[#141824] p-3 text-white outline-none ring-1 ring-gray-700 transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="rounded-md bg-blue-500/10 p-4">
              <h3 className="mb-2 font-medium text-blue-500">Quick Tips</h3>
              <ul className="space-y-1 text-sm text-blue-400">
                <li className="flex items-center">
                  <Icon icon="ph:check-circle" className="mr-2 h-4 w-4" />
                  Use clear, descriptive names for teams
                </li>
                <li className="flex items-center">
                  <Icon icon="ph:check-circle" className="mr-2 h-4 w-4" />
                  Add a description to help members understand the team's purpose
                </li>
                <li className="flex items-center">
                  <Icon icon="ph:check-circle" className="mr-2 h-4 w-4" />
                  You can invite members after creating the team
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-gray-700 p-6">
          <button
            onClick={onClose}
            className="mr-3 rounded-md px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTeam}
            disabled={!name.trim() || isLoading}
            className="flex items-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading && <Icon icon="ph:spinner" className="mr-2 h-5 w-5 animate-spin" />}
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
};

// Team Card Component
export const TeamCard = ({ team, onClick }) => {
  const memberCount = team.members?.length || 0;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-lg bg-[#1a1f2e] ring-1 ring-gray-800 transition-all hover:ring-blue-500/50"
    >
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 font-medium text-white">{team.name}</h3>
            {team.description && (
              <p className="text-sm text-gray-400 line-clamp-2">{team.description}</p>
            )}
          </div>
          <div className="rounded-full bg-blue-500/10 p-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
            <Icon icon="ph:arrow-right" className="h-4 w-4" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {team.members?.slice(0, 3).map((member, index) => (
                <div
                  key={member.id || index}
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 ring-2 ring-[#1a1f2e]"
                >
                  <Icon icon="ph:user" className="h-3 w-3 text-gray-300" />
                </div>
              ))}
            </div>
            {memberCount > 3 && (
              <span className="text-xs text-gray-400">+{memberCount - 3} more</span>
            )}
          </div>
          
          <div className="flex items-center text-xs text-gray-400">
            <Icon icon="ph:list-checks" className="mr-1 h-4 w-4" />
            {team.tasksCount || 0} tasks
          </div>
        </div>
      </div>
      
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
};