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
    <div className="bg-[#141318] h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-[#222428] p-8 m-4 w-1/3 max-lg:w-auto rounded-lg shadow-lg text-white">
          <h1 className="text-center uppercase opacity-50 text-sm">
            {headerTitle}
          </h1>
          <h2 className="text-2xl font-bold text-center ">{headerSubTitle}</h2>

          {renderInput(input1)}
          {renderInput(input2)}

          <div className="mt-6">
            <SmallButton
              // redirectPath="/"
              title={buttonTitle}
              onClick={onButtonClick}
            />

            <p className="text-xs mt-3">
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
