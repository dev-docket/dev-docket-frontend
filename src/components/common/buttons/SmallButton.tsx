import { Link } from "react-router-dom";

interface Props {
  redirectPath?: string;
  title: string;
  onClick?: () => void;
}

export const SmallButton = ({ redirectPath, title, onClick }: Props) => {
  return (
    <>
      {redirectPath ? (
        <Link
          to={redirectPath}
          type="button"
          onClick={() => {
            onClick && onClick();
          }}
          className="flex items-center justify-center px-3 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {title}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="flex transition-all items-center min-w-full justify-center px-3 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-gray-700 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          {title}
        </button>
      )}
    </>
  );
};
