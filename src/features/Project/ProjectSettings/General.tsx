import { SmallButton } from "../../../components/common/buttons/SmallButton";
import { Project } from "../../../types/Project";

interface Props {
  project?: Project;
  setNewProject: (value: Project) => void;
  handleUpdateProject: () => void;
}

export const General = ({
  project,
  setNewProject,
  handleUpdateProject,
}: Props) => {
  return (
    <div className="mt-5">
      <h3 className="text-sm font-medium">Project name</h3>
      <input
        className="mt-1 w-1/2 rounded-md border border-white border-opacity-30 bg-transparent p-2"
        placeholder="Project name"
        value={project?.name}
        onChange={(e) => setNewProject({ ...project, name: e.target.value })}
      />

      <div className="mt-4 w-fit">
        <SmallButton title="Save changes" onClick={handleUpdateProject} />
      </div>
    </div>
  );
};
