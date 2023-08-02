import { useState } from "react";
import { useLogin } from "../hooks/auth/useLogin";
import { useNavigate } from "react-router-dom";
import { SmallButton } from "../components/common/buttons/SmallButton";

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
    <div className="bg-[#141318] h-screen">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-[#222428] p-8 rounded-lg shadow-lg text-white">
          <h1 className="text-center uppercase text-opacity-50 text-sm">
            Welcome back
          </h1>
          <h2 className="text-2xl font-bold text-center ">
            Log into your account
          </h2>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
          </div>

          <input
            type="email"
            id="email"
            className="w-full p-2 border bg-[#222428] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-4">
            <label htmlFor="email">Email</label>
          </div>

          <input
            type="password"
            id="password"
            className="w-full p-2 border bg-[#222428] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-6">
            <SmallButton redirectPath="/" title="Login" onClick={handleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};
