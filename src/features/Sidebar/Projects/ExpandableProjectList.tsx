import { useState } from "react";
import { ChevronRight } from "@mui/icons-material";
import { ExpandableProject } from "./ExpandableProject";
import { useAppSelector } from "../../../hooks/storeHook";

export const ExpandableProjectList = () => {
  const projects = useAppSelector((state) => state.project.projects);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex w-full flex-col mt-4 justify-start">
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsExpanded((prev) => !prev);
        }}
        className="w-full rounded-md py-1 hover:cursor-pointer hover:bg-[#262836]"
      >
        <div className="flex h-[2rem] items-center text-sm opacity-40 pl-2">
          <span className="pl-1">Your projects</span>
          <div className="flex h-[2rem] w-[2rem] items-center">
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6l1.41-1.42Z"
                ></path>
              </svg>
            ) : (
              <ChevronRight />
            )}
          </div>
        </div>
      </div>

      {isExpanded &&
        projects.map((project) => (
          <ExpandableProject
            key={project.id}
            name={project.name}
            slug={project.slug}
          />
        ))}
    </div>
  );
};
