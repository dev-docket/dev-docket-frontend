import { useState } from "react";
import { toast } from "react-toastify";
import { FormAuth } from "../components/Form/FormAuth";
import { useRegister } from "../hooks/auth/useRegister";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const { register, isLoading } = useRegister();

  const handleRegistration = async () => {
    if (emailError) {
      toast.error("Please provide a valid email address");
      return;
    }

    if (passwordError) {
      toast.error("Please provide a valid password");
      return;
    }

    await register(email, password);
  };

  const validateUserEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    const isValidEmail = re.test(email);
    setEmailError(!isValidEmail);
  };

  const validateUserPassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-])[a-zA-Z\d!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <FormAuth
      headerTitle={"welcome new user"}
      isLoading={isLoading}
      headerSubTitle={"Create your new account"}
      input1={{
        type: "text",
        id: "email",
        isError: emailError,
        errorMessage: "Please provide a valid email address",
        value: email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
          validateUserEmail(e.target.value);
        },
        title: "Email",
      }}
      input2={{
        type: "password",
        id: "password",
        isError: passwordError,
        errorMessage:
          "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number and one special character",
        value: password,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
          validateUserPassword(e.target.value);
        },
        title: "Password",
      }}
      buttonTitle={"Register now"}
      onButtonClick={handleRegistration}
      linkRedirectPath={"/login"}
      underButtonText={"Already registered?"}
      underButtonTextBold={"Login"}
    />
  );
};
