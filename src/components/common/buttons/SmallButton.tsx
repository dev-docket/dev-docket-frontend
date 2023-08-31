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
          className="flex items-center justify-center rounded-md bg-indigo-500 px-3 py-2 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {title}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 font-medium text-white transition-all hover:bg-gray-700 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {title}
        </button>
      )}
    </>
  );
};
