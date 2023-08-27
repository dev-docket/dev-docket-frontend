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

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      enterPressed && enterPressed();
    }
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
          className="absolute transform right-0 bg-red-500 text-white rounded-md px-2 py-1 mt-2 text-sm overflow-hidden"
          ref={tooltipRef}
          style={{ transform: "translateY(calc(-100%))" }}
        >
          <div>{errorMessage}</div>
        </Transition.Child>
      </Transition>

      <input
        type={type}
        id={id}
        className="w-full p-2 border bg-[#222428] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-300"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handlePressEnter}
      />

      <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
        {isError ? (
          <GppBadIcon className="text-red-500" />
        ) : (
          <CheckCircleOutlineIcon className="text-green-500" />
        )}
      </div>
    </div>
  );
};
