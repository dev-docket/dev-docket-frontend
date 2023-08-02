import { Link } from "react-router-dom";

interface Props {
  redirectPath: string;
  title: string;
  onButtonClick?: () => void;
}

export const SmallButton = ({ redirectPath, title, onButtonClick }: Props) => {
  return (
    <Link
      to={redirectPath}
      type="button"
      onClick={() => {
        console.log("Button clicked");
        onButtonClick && onButtonClick();
      }}
      className="flex items-center justify-center px-3 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {title}
    </Link>
  );
};
