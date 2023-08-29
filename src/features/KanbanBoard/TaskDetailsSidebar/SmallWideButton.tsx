interface Props {
  children: React.ReactNode;
  customHoverBgColor?: CustomHoverBgColor;
}

type CustomHoverBgColor = "default" | "red";

export const SmallWideButton = (props: Props) => {
  const { children, customHoverBgColor = "default" } = props;

  const className = {
    default: "hover:bg-primary-background",
    red: "hover:bg-red-800 hover:bg-opacity-30",
  };

  return (
    <button
      className={`${className[customHoverBgColor]} w-full h-10 px-2 bg-primary-background transition-colors ease-in-out
      hover:bg-button-hover-dark hover:bg-opacity-80 active:bg-opacity-100 text-whit text-left rounded-md`}
    >
      {children}
    </button>
  );
};
