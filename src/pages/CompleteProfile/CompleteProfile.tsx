import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useCompleteProfile } from "../../hooks/user/useCompleteProfile";
import { useAppSelector } from "../../hooks/storeHook";

const CompleteProfile = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const { completeProfile } = useCompleteProfile();

  // Get user ID from Redux state
  const userId = useAppSelector((state) => state.user.userId);

  const validateUsername = (value: string) => {
    // Username should be at least 3 characters and only contain letters, numbers, and underscores
    const isValid = /^[a-zA-Z0-9_]{3,}$/.test(value);
    setUsernameError(!isValid);
    return isValid;
  };

  const handleSetupProfile = async () => {
    if (!username) {
      toast.error("Please enter a username");
      return;
    }

    if (!validateUsername(username)) {
      toast.error(
        "Username must be at least 3 characters and can only contain letters, numbers, and underscores",
      );
      return;
    }

    setIsLoading(true);
    try {
      if (!userId) {
        throw new Error("User ID not found");
      }
      await completeProfile(userId, username);
      toast.success("Profile setup complete!");
    } catch (error) {
      // Error handling is already done in the hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mb-3">
              <Icon
                icon="mdi:account-circle"
                className="mx-auto h-16 w-16 text-blue-500"
              />
            </div>
            <h1 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
              COMPLETE YOUR PROFILE
            </h1>
            <h2 className="text-2xl font-bold text-white">
              Set up your username
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Choose a unique username for your account
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-200"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Icon icon="mdi:at" />
                </div>
                <input
                  type="text"
                  id="username"
                  className={`w-full rounded-lg border bg-gray-800 p-3 pl-10 text-sm text-white 
                    placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 
                    ${usernameError ? "border-red-500 ring-2 ring-red-500" : "border-gray-600"}`}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    validateUsername(e.target.value);
                  }}
                  placeholder="Enter your username"
                />
                {usernameError && (
                  <div className="absolute right-3 top-3 text-red-500">
                    <Icon icon="mdi:alert-circle" width="20" />
                  </div>
                )}
              </div>
              {usernameError && (
                <p className="text-xs text-red-500">
                  Username must be at least 3 characters and can only contain
                  letters, numbers, and underscores
                </p>
              )}
            </div>

            <button
              onClick={handleSetupProfile}
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 p-3 text-sm font-semibold text-white 
                transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Icon
                    icon="mdi:loading"
                    className="mr-2 h-4 w-4 animate-spin"
                  />
                  Setting up...
                </span>
              ) : (
                "Complete Profile"
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-400">
              <p>
                This username will be your unique identifier across the platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
