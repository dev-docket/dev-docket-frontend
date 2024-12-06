import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

interface FormInputProps {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError: boolean;
  errorMessage: string;
  enterPressed?: () => void;
  title: string;
}

const FormInput = ({
  type,
  id,
  value,
  onChange,
  isError,
  errorMessage,
  enterPressed,
  title,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-200">
        {title}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          className={`w-full rounded-lg bg-gray-800 p-3 text-sm text-white placeholder-gray-400 
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
            ${isError ? "border-red-500 ring-2 ring-red-500" : "border-gray-600"}`}
          value={value}
          onChange={onChange}
          onKeyPress={(e) => e.key === "Enter" && enterPressed?.()}
          placeholder={`Enter your ${title.toLowerCase()}`}
        />
        {isError && (
          <div className="absolute right-3 top-3 text-red-500">
            <Icon icon="mdi:alert-circle" width="20" />
          </div>
        )}
      </div>
      {isError && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
};

interface ButtonProps {
  title: string;
  onClick: () => void;
  isLoading: boolean;
  spinIndicator: { color: string };
}

const Button = ({ title, onClick, isLoading }: ButtonProps) => (
  <button
    onClick={onClick}
    disabled={isLoading}
    className="w-full rounded-lg bg-blue-600 p-3 text-sm font-semibold text-white 
      transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 
      focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
  >
    {isLoading ? (
      <span className="flex items-center justify-center">
        <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
        Processing...
      </span>
    ) : (
      title
    )}
  </button>
);

interface FormAuthProps {
  headerTitle: string;
  headerSubTitle: string;
  input1: FormInputProps;
  input2: FormInputProps;
  linkRedirectPath: string;
  buttonTitle: string;
  onButtonClick: () => void;
  underButtonText: string;
  underButtonTextBold: string;
  isLoading: boolean;
}

export const FormAuth = ({
  headerTitle,
  headerSubTitle,
  input1,
  input2,
  linkRedirectPath,
  buttonTitle,
  onButtonClick,
  underButtonText,
  underButtonTextBold,
  isLoading,
}: FormAuthProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
              {headerTitle}
            </h1>
            <h2 className="text-2xl font-bold text-white">{headerSubTitle}</h2>
          </div>

          <div className="space-y-6">
            <FormInput {...input1} />
            <FormInput {...input2} />

            <div className="space-y-4 pt-4">
              <Button
                title={buttonTitle}
                onClick={onButtonClick}
                isLoading={isLoading}
                spinIndicator={{ color: "#fff" }}
              />

              <div className="text-center">
                <p className="text-sm">
                  <span className="text-gray-400">{underButtonText}</span>{" "}
                  <Link
                    to={linkRedirectPath}
                    className="inline-flex items-center font-medium text-blue-400 
                      hover:text-blue-300"
                  >
                    {underButtonTextBold}
                    <Icon icon="mdi:arrow-right" className="ml-1 h-4 w-4" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAuth;
