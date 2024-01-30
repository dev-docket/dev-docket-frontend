import { Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface Props {
  projectSlug?: string;
}

export const ProjectSettings = ({ projectSlug }: Props) => {
  return (
    <div>
      <h3 className="mt-10 text-2xl">Edit settings in project</h3>
      <p>Here you can edit all settings in this project</p>
      <div className="ml-2 mt-4 flex items-center">
        <Link
          to={`/projects/${projectSlug}/settings`}
          className="cursor-pointer rounded-md p-2 hover:bg-icon-gray hover:bg-opacity-30"
        >
          <Settings /> Edit settings
        </Link>
      </div>
    </div>
  );
};
