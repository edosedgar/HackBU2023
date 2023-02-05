import { useMutation } from "react-query";
import authApi from "@/modules/auth/api";
import { useSnackbar } from "notistack";

const useLogin = (loginSuccessCb?: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutateAsync: login, isLoading: isLoggingIn } = useMutation(
    ["auth-login"],
    authApi.login,
    {
      onSuccess: async (res) => {
        localStorage.setItem("token", res.data.token);
        if (loginSuccessCb) loginSuccessCb();
      },
      onError: () => {
        enqueueSnackbar("There was an error while trying to log in", {
          variant: "error",
        });
      },
    }
  );

  return {
    login,
    isLoggingIn,
  };
};

export { useLogin };
