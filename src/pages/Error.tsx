import { SmallButton } from "../components/common/buttons/SmallButton";

export const Error = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background-primary text-2xl text-white">
      <h1>404 Error</h1>
      <p>The page you requested could not be found.</p>

      <div className="my-4">
        <SmallButton title="Go back to live" redirectPath="/" />
      </div>
    </div>
  );
};
