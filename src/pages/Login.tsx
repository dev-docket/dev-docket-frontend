import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormAuth } from "../components/Form/FormAuth";
import { toast } from "react-toastify";
import { useLoginMutation } from "../store/slices/authApi";
import { useAppDispatch } from "../hooks/storeHook";
import { addToken } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [login] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    if (emailError) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const response = await login({ email, password });

    if ("data" in response && response.data) {
      dispatch(addToken(response.data.token));
      dispatch(setUser(response.data.user));

      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password");
    }
  };

  const validateUserEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    const isValidEmail = re.test(email);
    setEmailError(!isValidEmail);
  };

  return (
    <FormAuth
      headerTitle={"welcome back"}
      headerSubTitle={"Log into your account"}
      input1={{
        type: "text",
        id: "email",
        isError: emailError,
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
        value: password,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        },
        title: "Password",
      }}
      buttonTitle={"Login now"}
      onButtonClick={handleLogin}
      linkRedirectPath={"/register"}
      underButtonText={"Not registered yet?"}
      underButtonTextBold={"Register"}
    />
  );
};
