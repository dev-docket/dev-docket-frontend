import { Link } from "react-router-dom";
import { FormInput } from "../common/inputs/FormInput";
import { SmallButton } from "../common/buttons/SmallButton";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

interface Input {
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
  errorMessage?: string;
  title: string;
  onValidation?: (value: string) => void;
}

interface Props {
  headerTitle: string;
  headerSubTitle: string;
  input1: Input;
  input2: Input;
  linkRedirectPath: string;
  buttonTitle: string;
  onButtonClick: () => void;
  underButtonText: string;
  underButtonTextBold: string;
  isLoading?: boolean;
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
}: Props) => {
  const renderInput = (input: Input) => {
    return (
      <>
        <div className="mt-4">
          <label htmlFor={input.id}>{input.title}</label>
        </div>
        <FormInput
          type={input.type}
          id={input.id}
          value={input.value}
          onChange={input.onChange}
          enterPressed={onButtonClick}
          isError={input.isError}
          errorMessage={
            input.errorMessage ??
            `Please provide valid ${input.title.toLowerCase()}`
          }
        />
      </>
    );
  };

  return (
    <div className="h-screen bg-[#141318]">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="m-4 w-1/3 rounded-lg bg-[#222428] p-8 text-white shadow-lg max-lg:w-auto">
          <h1 className="text-center text-sm uppercase opacity-50">
            {headerTitle}
          </h1>
          <h2 className="text-center text-2xl font-bold ">{headerSubTitle}</h2>

          {renderInput(input1)}
          {renderInput(input2)}

          <div className="mt-6">
            <SmallButton
              title={buttonTitle}
              onClick={onButtonClick}
              isLoading={isLoading}
              spinIndicator={{
                color: "#fff",
              }}
            />

            <p className="mt-3 text-xs">
              <span className="opacity-50">{underButtonText}</span>{" "}
              <Link to={linkRedirectPath}>
                {underButtonTextBold} <ArrowRightAltIcon />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
