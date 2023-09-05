interface Props {
  children: React.ReactNode;
  customHoverBgColor?: CustomHoverBgColor;
  onClick?: () => void;
}

type CustomHoverBgColor = "default" | "red";

export const SmallWideButton = (props: Props) => {
  const { children, customHoverBgColor = "default", onClick } = props;

  const className = {
    default: "hover:bg-primary-background",
    red: "hover:bg-red-800 hover:bg-opacity-30",
  };

  return (
    <button
      onClick={onClick}
      className={`${className[customHoverBgColor]} bg-primary-background text-whit h-10 w-full rounded-md px-2
      text-left transition-colors ease-in-out hover:bg-button-hover-dark hover:bg-opacity-80 active:bg-opacity-100`}
    >
      {children}
    </button>
  );
};
