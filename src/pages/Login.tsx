import { useState } from "react";
import { useLogin } from "../hooks/auth/useLogin";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await login(email, password);

    console.log(response);

    if (response) {
      navigate("/");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* <form> */}
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="
            border border-gray-300
            rounded-md
            px-4
            py-2
            mt-1
            w-full
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="
            border border-gray-300
            rounded-md
            px-4
            py-2
            mt-1
            w-full
            focus:outline-none
            focus:ring-2
            focus:ring-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" onClick={handleLogin}>
          Login
        </button>
      </div>
      {/* </form> */}
    </div>
  );
};
