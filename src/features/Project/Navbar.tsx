import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthStore, useProjectStore } from "@/stores";

// Navbar Component
const Navbar = ({ isSidebarOpen, setSidebarOpen, activeProject }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-20 mb-6 border-b border-gray-700/50 bg-[#1a1f2e] px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-700/50 hover:text-white"
          >
            <Icon
              icon={isSidebarOpen ? "ph:x-bold" : "ph:list-bold"}
              className="h-5 w-5"
            />
          </button>

          {activeProject && (
            <div className="flex items-center space-x-2">
              <Icon icon="ph:folder-simple" className="h-5 w-5 text-blue-500" />
              <h1 className="text-lg font-medium text-white">
                {activeProject.name}
              </h1>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button className="rounded-full p-2 text-gray-400 hover:bg-gray-700/50 hover:text-white">
            <Icon icon="ph:bell" className="h-5 w-5" />
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center rounded-full bg-gray-700/50 p-2 text-white hover:bg-gray-600/50"
            >
              <Icon icon="ph:user-circle" className="h-5 w-5" />
              <Icon icon="ph:caret-down" className="ml-1 h-4 w-4" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-700 bg-[#1a1f2e] py-1 shadow-lg">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
                >
                  <Icon icon="ph:user" className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50"
                >
                  <Icon icon="ph:gear" className="mr-2 h-4 w-4" />
                  Settings
                </Link>
                <hr className="my-1 border-gray-700" />
                <button className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-700/50">
                  <Icon icon="ph:sign-out" className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logoutUser } = useLogout();
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);

  const {isAuthenticated} = useAuthStore();
  const {projects} = useProjectStore();

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      {isSidebarOpen && (
        <motion.aside
          initial="closed"
          animate="open"
          exit="closed"
          variants={sidebarVariants}
          transition={{ duration: 0.3 }}
          className="fixed left-0 z-30 flex h-screen w-64 flex-col border-r border-gray-700/50 bg-[#1a1f2e] pt-4"
        >
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-700/50 hover:text-white"
            >
              <Icon icon="ph:x-bold" className="h-5 w-5" />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 space-y-1 px-2">
            <Link
              to="/dashboard"
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                location.pathname === "/dashboard"
                  ? "bg-blue-600/10 text-blue-500"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              <Icon icon="ph:house" className="mr-2 h-5 w-5" />
              Dashboard
            </Link>

            {/* Projects Section */}
            <div className="mt-4">
              <button
                onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/50 hover:text-white"
              >
                <div className="flex items-center">
                  <Icon icon="ph:folder-simple" className="mr-2 h-5 w-5" />
                  Projects
                </div>
                <Icon
                  icon={isProjectsExpanded ? "ph:caret-up" : "ph:caret-down"}
                  className="h-4 w-4"
                />
              </button>

              {isProjectsExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.slug}/dashboard`}
                      className={`flex items-center rounded-md px-3 py-2 text-sm ${
                        location.pathname.includes(project.slug)
                          ? "bg-blue-600/10 text-blue-500"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                    >
                      <span className="truncate">{project.name}</span>
                    </Link>
                  ))}

                  <Link
                    to="/dashboard"
                    className="flex items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  >
                    <Icon icon="ph:plus" className="mr-2 h-4 w-4" />
                    New Project
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-700/50 p-4">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logoutUser();
                  navigate("/login");
                }}
                className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white"
              >
                <Icon icon="ph:sign-out" className="mr-2 h-5 w-5" />
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white"
              >
                <Icon icon="ph:sign-in" className="mr-2 h-5 w-5" />
                Sign in
              </Link>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export { Navbar, Sidebar };
