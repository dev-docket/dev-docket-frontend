import { useEffect, useState } from 'react';
import { Icon } from "@iconify/react";
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar, Sidebar } from '../../features/Project/Navbar';
import { Project } from '@/types/Project';
import { useProjectStore, UserProjectMember } from '@/stores/projectStore';

export const ProjectSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { activeProject, projectMembers } = useAppSelector((state) => state.project);

  const {activeProject, updateProject, fetchProjectMembers, members} = useProjectStore();

  const [project, setProject] = useState(activeProject);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const navigate = useNavigate();

  const { projectSlug} = useParams<{
    projectSlug: string;
  }>();

  const handleUpdateProject = () => {
    if (!project) return;

    if (project.id) {
      updateProject(project).then(() => {
        navigate(`/projects/${project.slug}/settings`);
      });
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!projectSlug) return;

    fetchProjectMembers(projectSlug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className="min-h-screen bg-[#0f1219] text-white">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
      />
      <Navbar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setIsSidebarOpen}
        />
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-8">
        
        {/* Mobile Header with Menu Button */}
        <div className="flex items-center justify-between sm:hidden">
          <h1 className="text-xl font-semibold">Settings</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-800"
          >
            <Icon icon={isMobileMenuOpen ? "mdi:close" : "mdi:menu"} className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="mb-8 hidden sm:block">
          <h1 className="text-2xl font-semibold">Project Settings</h1>
          <p className="mt-2 text-gray-400">Manage your project preferences and team access</p>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#0f1219] sm:hidden">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-xl font-semibold">Settings Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-800"
                >
                  <Icon icon="mdi:close" className="h-6 w-6" />
                </button>
              </div>
              <nav className="space-y-1 p-4">
                {/* Mobile Navigation Items */}
                <MobileNavItem
                  icon="mdi:settings"
                  label="General"
                  isActive={activeTab === 'general'}
                  onClick={() => handleTabChange('general')}
                />
                <MobileNavItem
                  icon="mdi:account-group"
                  label="Access"
                  isActive={activeTab === 'access'}
                  onClick={() => handleTabChange('access')}
                />
              </nav>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-8 sm:flex-row">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden w-64 sm:block">
            <nav className="space-y-1">
              <NavItem
                icon="mdi:settings"
                label="General"
                isActive={activeTab === 'general'}
                onClick={() => setActiveTab('general')}
              />
              <NavItem
                icon="mdi:account-group"
                label="Access"
                isActive={activeTab === 'access'}
                onClick={() => setActiveTab('access')}
              />
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <General 
                project={project} 
                setNewProject={setProject}
                handleUpdateProject={handleUpdateProject}
              />
            )}
            {activeTab === 'access' && (
              <Access projectMembers={members} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors ${
      isActive
        ? 'bg-blue-600/10 text-blue-500'
        : 'text-gray-400 hover:bg-gray-800'
    }`}
  >
    <Icon icon={icon} className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

interface MobileNavItemProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const MobileNavItem = ({ icon, label, isActive, onClick }: MobileNavItemProps) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-4 py-4 text-left text-lg transition-colors ${
      isActive
        ? 'bg-blue-600/10 text-blue-500'
        : 'text-gray-400 hover:bg-gray-800'
    }`}
  >
    <Icon icon={icon} className="h-6 w-6" />
    <span>{label}</span>
  </button>
);

interface GeneralProps {
  project: Project | undefined;
  setNewProject: (project: Project) => void;
  handleUpdateProject: () => void;
}

const General = ({ project, setNewProject, handleUpdateProject }: GeneralProps) => {
  return (
    <div className="rounded-lg border border-gray-800 bg-[#1a1f2d] p-4 sm:p-6">
      <h2 className="mb-6 text-lg font-medium">General Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm text-gray-400">Project Name</label>
          <input
            type="text"
            value={project?.name}
            onChange={(e) => setNewProject({ ...project, name: e.target.value })}
            className="w-full rounded-lg border border-gray-700 bg-[#0f1219] px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
            placeholder="Enter project name"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdateProject}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

interface AccessProps {
  projectMembers: UserProjectMember[];
}

const Access = ({ projectMembers }: AccessProps) => {
  // Function to get initials from name
  const getInitials = (name: string) => {
    if (!name) return '?';
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-[#1a1f2d] p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-medium">Project Members</h2>
        <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto">
          Add Member
        </button>
      </div>
      
      <div className="space-y-4">
        {projectMembers.map((member, index) => (
          <div
            key={member?.user.id || index}
            className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-[#0f1219] p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/20">
                <span className="text-sm font-medium text-blue-500">
                  {getInitials(member?.user?.name || 'Unknown User')}
                </span>
              </div>
              <div>
                <div className="font-medium">
                  {member?.user?.name || 'Unknown User'}
                </div>
                <div className="text-sm text-gray-400">
                  {member?.user?.email || 'No email provided'}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                className="w-full rounded-lg border border-gray-700 bg-[#0f1219] px-3 py-1.5 text-sm text-gray-400 sm:w-auto"
                defaultValue={member?.role || 'member'}
              >
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
              </select>
              
              <button className="flex w-full items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 p-2 text-red-400 hover:bg-red-500/20 sm:w-auto">
                <Icon icon="mdi:trash-can" className="h-4 w-4" />
                <span className="ml-2 sm:hidden">Remove Member</span>
              </button>
            </div>
          </div>
        ))}

        {(!projectMembers || projectMembers.length === 0) && (
          <div className="rounded-lg border border-gray-700 bg-[#0f1219] p-6 text-center text-gray-400">
            No members found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSettings;