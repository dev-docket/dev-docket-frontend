import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GppBadIcon from "@mui/icons-material/GppBad";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

interface Props {
  type: string;
  id: string;
  value: string;
  isError?: boolean;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
  type,
  id,
  value,
  isError = false,
  errorMessage,
  onChange,
}: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(isError);

    return () => {
      setShowTooltip(false);
    };
  }, [isError]);

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className="w-full p-2 border bg-[#222428] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-300"
        value={value}
        onChange={onChange}
      />
      <Transition
        show={showTooltip}
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
          className="absolute transform -translate-y-2 right-0 bg-red-500 text-white rounded-md px-2 py-1 mt-2 text-sm h-[2rem] w-[70%]"
        >
          <div className="absolute">{errorMessage}</div>
        </Transition.Child>
      </Transition>

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
