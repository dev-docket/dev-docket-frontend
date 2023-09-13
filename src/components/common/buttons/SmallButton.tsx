import { Link } from "react-router-dom";

interface SpinIndicator {
  size?: number;
  color: string;
}

interface Props {
  redirectPath?: string;
  title: string;
  isLoading?: boolean;
  spinIndicator?: SpinIndicator;
  onClick?: () => void;
}

export const SmallButton = ({
  redirectPath,
  title,
  isLoading = false,
  spinIndicator,
  onClick,
}: Props) => {
  return (
    <>
      {redirectPath ? (
        <Link
          to={redirectPath}
          type="button"
          onClick={() => {
            onClick && onClick();
          }}
          className="flex items-center justify-center rounded-md bg-button-primary px-3 py-2 font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {title}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className="flex w-full items-center justify-center rounded-md bg-button-primary px-3 py-2 font-medium text-white transition-all hover:bg-gray-700 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent pl-2 text-blue-600"
              style={{
                color: spinIndicator?.color,
                fontSize: spinIndicator?.size,
              }}
              role="status"
              aria-label="loading"
            />
          ) : (
            title
          )}
        </button>
      )}
    </>
  );
};
