import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/storeHook";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
}

export const DropdownMenu = ({ title }: Props) => {
  const projects = useAppSelector((state) => state.project.projects);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", closeMenu);

    return () => {
      window.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const options = projects.map((project) => (
    <Link
      onClick={() => setIsOpen(false)}
      key={project.id}
      to={`/projects/${project.slug}/dashboard`}
      className="text-md block rounded-md px-4 py-2 text-white hover:bg-secondary-background"
      role="menuitem"
    >
      {project.name}
    </Link>
  ));

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-white hover:bg-icon-gray hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span className="mr-1">{title}</span>
        <svg
          width="20"
          height="20"
          role="presentation"
          focusable="false"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 w-56 origin-top-right rounded-md border border-icon-gray border-opacity-20 bg-dark-background px-2 py-2 shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <React.Fragment>
              {options.length === 0 ? (
                <p className="block px-4 py-2 text-sm text-white hover:cursor-pointer">
                  No projects yet
                </p>
              ) : (
                options
              )}
            </React.Fragment>
            {/* <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Option 3
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
};
