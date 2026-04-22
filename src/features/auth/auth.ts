import { loginUser } from "./auth.action";

export function useLogin() {
  return {
    login: loginUser,
  };
}
