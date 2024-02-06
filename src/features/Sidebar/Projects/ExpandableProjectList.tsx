import { useState } from "react";
import { ExpandableProject } from "./ExpandableProject";
import { useAppSelector } from "../../../hooks/storeHook";
import { Header } from "../Header";

export const ExpandableProjectList = () => {
  const projects = useAppSelector((state) => state.project.projects);
  const { activeProject } = useAppSelector((state) => state.project);

  const [isExpanded, setIsExpanded] = useState(activeProject !== null);

  const toggleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="mt-4 flex w-full flex-col justify-start">
      <Header isExpanded={isExpanded} onClick={toggleExpand} />

      {isExpanded && projects.length === 0 && (
        <div className="flex h-[2rem] items-center pl-4 text-sm opacity-40">
          <span className="pl-1">No projects yet</span>
        </div>
      )}

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
