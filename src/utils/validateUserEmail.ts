export const validateUserEmail = (
  email: string,
  setError: (
    value: React.SetStateAction<
      | {
          emailError: "error" | null;
        }
      | undefined
    >
  ) => void
) => {
  const re = /\S+@\S+\.\S+/;
  const test = re.test(email);

  if (!test) {
    setError({ emailError: "error" });
  } else {
    setError({ emailError: null });
  }
};
