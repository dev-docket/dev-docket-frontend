import React from 'react';
import { Icon } from '@iconify/react';

const InviteMemberModal = ({ isOpen, onClose, projectSlug }) => {
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('member');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Here you would typically make an API call to invite the member
      // await inviteMember({ email, role, projectSlug });
      onClose();
      setEmail('');
      setRole('member');
    } catch (err) {
      setError('Failed to invite member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-[#1a1f2d] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Invite Team Member</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-700/30"
          >
            <Icon icon="akar-icons:close" className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-[#0f1219] p-2 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-[#0f1219] p-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-gray-400 hover:bg-gray-700/30 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Inviting...' : 'Send Invitation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;