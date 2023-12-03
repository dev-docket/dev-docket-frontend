import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GppBadIcon from "@mui/icons-material/GppBad";
import { useState, useLayoutEffect, useRef } from "react";
import { Transition } from "@headlessui/react";

interface Props {
  type: string;
  id: string;
  value: string;
  isError?: boolean;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  enterPressed?: () => void;
}

export const FormInput = (props: Props) => {
  const {
    type,
    id,
    value,
    isError = false,
    errorMessage,
    onChange,
    enterPressed,
  } = props;
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [hasInput, setHasInput] = useState(false);

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enterPressed && enterPressed();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInput(true); // Set hasInput to true when user types
    onChange(e);
  };

  useLayoutEffect(() => {
    if (tooltipRef.current) {
      tooltipRef.current.style.height = `${tooltipRef.current.scrollHeight}px`;
    }
  }, [errorMessage]);

  return (
    <div className="relative">
      <Transition
        show={isError && isFocused}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="absolute -top-8 right-0 w-full"
      >
        <Transition.Child
          enter="transform transition ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transform transition ease-in duration-75"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="absolute right-0 mt-2 transform overflow-hidden rounded-md bg-red-500 px-2 py-1 text-sm text-white"
          ref={tooltipRef}
          style={{ transform: "translateY(calc(-100%))" }}
        >
          <div>{errorMessage}</div>
        </Transition.Child>
      </Transition>

      <input
        type={type}
        id={id}
        className="w-full rounded-lg border border-gray-300 bg-[#222428] p-2 focus:border-gray-300 focus:outline-none focus:ring-2"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handlePressEnter}
      />

      {hasInput && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 transform">
          {isError ? (
            <GppBadIcon className="text-red-500" />
          ) : (
            <CheckCircleOutlineIcon className="text-green-500" />
          )}
        </div>
      )}
    </div>
  );
};
